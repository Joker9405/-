Param()

$ErrorActionPreference = "Stop"
$CONFIG_FILE = "config.json"

if (!(Test-Path $CONFIG_FILE)) {
  Write-Host "⚠️ 找不到 config.json，请复制 config.sample.json 并填写后再运行。"
  exit 1
}

$config = Get-Content $CONFIG_FILE | Out-String | ConvertFrom-Json

$PRIVATE_REPO = $config.private_repo
$PRIVATE_BRANCH = $config.private_branch
$PUBLIC_REPO = $config.public_repo
$PUBLIC_BRANCH = $config.public_branch
$COMMIT_PREFIX = $config.commit_message_prefix
$FILES = $config.files

$WORKDIR = Join-Path ([System.IO.Path]::GetTempPath()) ("cantong_sync_" + [System.Guid]::NewGuid())
New-Item -ItemType Directory -Path $WORKDIR | Out-Null
Write-Host "🧪 临时目录: $WORKDIR"

Write-Host "⬇️ 克隆私有仓库: $PRIVATE_REPO"
git clone --depth=1 --branch $PRIVATE_BRANCH $PRIVATE_REPO (Join-Path $WORKDIR "private")

Write-Host "⬇️ 克隆公开仓库: $PUBLIC_REPO"
git clone --depth=1 --branch $PUBLIC_BRANCH $PUBLIC_REPO (Join-Path $WORKDIR "public")

$pubDir = Join-Path $WORKDIR "public"
$priDir = Join-Path $WORKDIR "private"

Set-Location $pubDir

foreach ($f in $FILES) {
  $src = Join-Path $priDir $f
  $dst = Join-Path $pubDir $f
  if (Test-Path $src) {
    New-Item -ItemType Directory -Force -Path (Split-Path $dst) | Out-Null
    Copy-Item $src $dst -Force
    Write-Host "✔️ 复制: $f"
  } else {
    Write-Host "⚠️ 跳过(源文件不存在): $f"
  }
}

git add -A
$changes = git diff --cached --name-only
if (-not $changes) {
  Write-Host "ℹ️ 无改动，结束。"
} else {
  $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  git commit -m "$COMMIT_PREFIX @ $ts"
  Write-Host "⤴️ 推送到公开仓库..."
  git push origin $PUBLIC_BRANCH
}

Write-Host "✅ 完成。"