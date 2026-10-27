---
tags: [git, tips, coding]
---
# Git tricks

## Update another branch without checking it out

Fast-forward your local `master` to `origin/master` while you're on a different branch:

```bash
git fetch origin master:master
```

The same works locally, with `.` as the "remote". This fast-forwards `release` to `master` without leaving your branch ([source](https://stackoverflow.com/questions/3216360/merge-update-and-pull-git-branches-without-using-checkouts)):

```bash
git fetch . master:release
```

Both refuse if it isn't a fast-forward, so they never create a merge commit or lose work.

## Recover lost commits

Commits that no branch points to anymore (after a bad reset, rebase or deleted branch) usually still exist until garbage collection. This lists them with date, subject and author, newest last, so you can find the one you want and `git branch rescued <hash>` it:

```bash
git fsck --full --no-reflogs --unreachable --lost-found | grep commit | cut -d' ' -f3 \
  | xargs -n 1 git log -n 1 --pretty=format:"%ci %s %ae %H"$'\n' | sort
```

Try `git reflog` first: it's simpler, and has every commit your branches pointed to recently.
