#!/bin/bash
# Sets up a Mac (for example a Mac mini) as an always-on dev box for coding agents: no sleep,
# restart after power loss, Homebrew, dev tools, Chrome, Tailscale and Claude Code.
# Safe to run again: it skips what is already installed.
# Original: https://mifi.no/scripts/mac-always-on-setup.sh (mifi.no repo: static/scripts/mac-always-on-setup.sh).
# Run it on the Mac itself (locally or over SSH) as the user who will do the work:
#   curl -fsSL https://mifi.no/scripts/mac-always-on-setup.sh -o /tmp/mac-always-on-setup.sh && bash /tmp/mac-always-on-setup.sh
#
# Not done here, because macOS only allows them in System Settings:
# - General > Sharing: Remote Login (SSH) and Screen Sharing
# - Users & Groups: automatic login (needs FileVault off)

set -euo pipefail

step() { printf '\n==> %s\n' "$*"; }

if [ "$(uname)" != Darwin ]; then
  echo "This script is for macOS." >&2
  exit 1
fi

step "Asking for your password once (for power settings and Homebrew)"
sudo -v
# Keep sudo alive until the script ends
while true; do sudo -n true; sleep 50; kill -0 "$$" 2>/dev/null || exit; done 2>/dev/null &

step "Power: never sleep, keep the network up, start again after a power failure"
# The display may sleep; the computer and disks may not.
sudo pmset -a sleep 0 disksleep 0 displaysleep 10 womp 1 autorestart 1 powernap 0
# Restart automatically if the system freezes
sudo systemsetup -setrestartfreeze on >/dev/null 2>&1 || true
pmset -g | grep -E ' (sleep|autorestart|womp) '

step "Homebrew"
if ! command -v brew >/dev/null 2>&1 && [ ! -x /opt/homebrew/bin/brew ]; then
  NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
eval "$(/opt/homebrew/bin/brew shellenv)"
# Make brew available in new shells, including non-interactive SSH sessions
for rc in ~/.zprofile ~/.bash_profile; do
  grep -q 'brew shellenv' "$rc" 2>/dev/null || echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >>"$rc"
done

# Don't ask "Do you want to proceed with the installation?" for every install
export HOMEBREW_NO_ASK=1

step "Command line tools"
brew install git gh node jq ripgrep

step "Apps (the Tailscale installer may ask for your password again)"
# A failing cask (renamed, already installed by hand) should not stop the rest.
for cask in google-chrome tailscale-app; do
  brew install --cask "$cask" || echo "!! Could not install $cask, install it by hand." >&2
done

step "Claude Code"
if ! command -v claude >/dev/null 2>&1 && [ ! -x ~/.local/bin/claude ]; then
  curl -fsSL https://claude.ai/install.sh | bash
fi
grep -q '.local/bin' ~/.zprofile 2>/dev/null || echo 'export PATH="$HOME/.local/bin:$PATH"' >>~/.zprofile

step "Done. Still to do by hand:"
cat <<'EOF'
- Open Tailscale and log in, then turn on "Run at login" (or "Start on boot").
- Log in to GitHub, preferably with a fine-grained token for only the repos it needs:
  `gh auth login --with-token` (paste it), then `gh auth setup-git`.
- Run `claude` once to log in.
- System Settings > General > Sharing: turn on Remote Login and Screen Sharing (if not done yet).
  Screen Sharing must be turned on there, at the Mac: macOS refuses it if it's only started over SSH.
- For background jobs and GPU-accelerated browsers without anyone at the Mac: turn on automatic
  login (Users & Groups), which needs FileVault off. No monitor is needed: Screen Sharing's
  High Performance mode makes its own virtual display.
EOF
