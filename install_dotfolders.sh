#!/usr/bin/env bash
set -e
# 1) move github -> .github
if [ -d "github" ]; then
  rm -rf .github
  mv github .github
fi
# 2) ensure contrib/inbox exists
mkdir -p contrib/inbox
# 3) git add (optional)
echo "Done. If using git:"
echo "  git add . && git commit -m 'chore: add templates' && git push"
