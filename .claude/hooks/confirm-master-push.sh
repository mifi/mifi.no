#!/usr/bin/env bash
# PreToolUse hook: require confirmation before any git push that targets
# master/main. Pushes to other branches are unaffected.
set -uo pipefail

cmd=$(cat | jq -r '.tool_input.command // ""')

# Only interested in git push.
printf '%s' "$cmd" | grep -qE '\bgit\b[^;&|]*\bpush\b' || exit 0

ask() {
  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"ask","permissionDecisionReason":"%s"}}\n' "$1"
  exit 0
}

# Deleting a branch is not a push *to* it.
printf '%s' "$cmd" | grep -qE '(--delete|[[:space:]]-d)\b' && exit 0

# master/main named explicitly, as a branch argument or refspec target.
if printf '%s' "$cmd" | grep -qE '(^|[[:space:]:])(master|main)([[:space:]]|$)'; then
  ask 'This pushes to master/main.'
fi

# No refspec given (git push / git push origin): the current branch is the
# target, so resolve it -- honoring git -C if the command uses it.
refspec_count=$(printf '%s' "$cmd" | sed -E 's/.*\bpush\b//' | tr ' ' '\n' |
  grep -vE '^-|^$' | wc -l)
if [ "$refspec_count" -le 1 ]; then
  dir=$(printf '%s' "$cmd" | grep -oE '\-C[[:space:]]+[^[:space:]]+' | head -1 |
    sed -E 's/^-C[[:space:]]+//')
  if [ -n "$dir" ]; then
    branch=$(git -C "$dir" rev-parse --abbrev-ref HEAD 2>/dev/null || true)
  else
    branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)
  fi
  case "$branch" in
    master | main) ask 'The current branch is master/main and this push has no explicit target.' ;;
  esac
fi

exit 0
