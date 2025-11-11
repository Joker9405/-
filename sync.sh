#!/usr/bin/env bash
set -e

if ! command -v jq >/dev/null 2>&1; then
  echo "需要 jq，请先安装：macOS 可 'brew install jq'，或用你系统的包管理器安装。"
  exit 1
fi

CONFIG_FILE="config.json"
if [ ! -f "$CONFIG_FILE" ]; then
  echo "⚠️ 找不到 config.json，请复制 config.sample.json 并填写后再运行。"
  exit 1
fi

PRIVATE_REPO=$(jq -r '.private_repo' "$CONFIG_FILE")
PRIVATE_BRANCH=$(jq -r '.private_branch' "$CONFIG_FILE")
PUBLIC_REPO=$(jq -r '.public_repo' "$CONFIG_FILE")
PUBLIC_BRANCH=$(jq -r '.public_branch' "$CONFIG_FILE")
COMMIT_PREFIX=$(jq -r '.commit_message_prefix' "$CONFIG_FILE")
mapfile -t FILES < <(jq -r '.files[]' "$CONFIG_FILE")

WORKDIR=$(mktemp -d)
echo "🧪 临时目录: $WORKDIR"

echo "⬇️ 克隆私有仓库: $PRIVATE_REPO"
git clone --depth=1 --branch "$PRIVATE_BRANCH" "$PRIVATE_REPO" "$WORKDIR/private"

echo "⬇️ 克隆公开仓库: $PUBLIC_REPO"
git clone --depth=1 --branch "$PUBLIC_BRANCH" "$PUBLIC_REPO" "$WORKDIR/public"

cd "$WORKDIR/public"

# 同步文件
for f in "${FILES[@]}"; do
  SRC="$WORKDIR/private/$f"
  DST="$WORKDIR/public/$f"
  if [ -f "$SRC" ]; then
    mkdir -p "$(dirname "$DST")"
    cp "$SRC" "$DST"
    echo "✔️ 复制: $f"
  else
    echo "⚠️ 跳过(源文件不存在): $f"
  fi
done

git add -A
if git diff --cached --quiet; then
  echo "ℹ️ 无改动，结束。"
else
  TS=$(date "+%Y-%m-%d %H:%M:%S")
  git commit -m "$COMMIT_PREFIX @ $TS"
  echo "⤴️ 推送到公开仓库..."
  git push origin "$PUBLIC_BRANCH"
fi

echo "✅ 完成。"