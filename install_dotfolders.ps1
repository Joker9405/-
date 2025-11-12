# PowerShell install: rename github -> .github and ensure contrib/inbox
if (Test-Path "github") {
  if (Test-Path ".github") { Remove-Item -Recurse -Force ".github" }
  Rename-Item -Path "github" -NewName ".github"
}
New-Item -ItemType Directory -Force "contrib/inbox" | Out-Null
Write-Host "Done. If using git:"
Write-Host "  git add .; git commit -m 'chore: add templates'; git push"
