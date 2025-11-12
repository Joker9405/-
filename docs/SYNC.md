# SYNC.md — 私有仓库 → 公开仓库 的安全同步指南

> 目标：像 Pieter Levels 一样“公开拉新、私有部署”。**只同步可公开材料**，不暴露生产数据与运行细节。

## 同步范围（白名单）
仅从**私有仓库**同步到**公开仓库**以下文件：

- `data/seed.csv`
- `docs/CONTRIBUTION_CLA.md`
- `docs/LICENSE_USAGE.md`
- `README.md`（可选）

> **不要**同步 `public/*`、`assets/*`、`api/*`、`data/lexeme.csv` 等任何可运行前端、服务端或私密词库。

---

## 方案 A：GitHub Actions（推荐）

把以下工作流文件放到 **私有仓库**：`.github/workflows/sync-to-public.yml`。

需要在 **私有仓库** → *Settings → Secrets and variables → Actions* 新增机密：

- `PUBLIC_REPO`：例如 `Joker9405/Can-Tong-Public`
- `PUBLIC_REPO_TOKEN`：具备写入目标仓库权限的 **PAT**（Personal Access Token，建议只授予 `repo` 最小权限）

### 工作流示例
```yaml
name: Sync to Public Repo

on:
  push:
    branches: [ main ]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout private repo
        uses: actions/checkout@v4

      - name: Prepare export (whitelist only)
        run: |
          mkdir -p export/docs export/data
          # 可选同步 README.md（公开说明）
          cp README.md export/ 2>/dev/null || true
          # 必要文档
          cp docs/CONTRIBUTION_CLA.md export/docs/
          cp docs/LICENSE_USAGE.md export/docs/
          # 公开 seed（示例/收集用）
          cp data/seed.csv export/data/

      - name: Push to public repo
        env:
          PUBLIC_REPO: ${{ secrets.PUBLIC_REPO }}
          GH_TOKEN: ${{ secrets.PUBLIC_REPO_TOKEN }}
        run: |
          cd export
          git init
          git config user.name "sync-bot"
          git config user.email "sync-bot@users.noreply.github.com"
          git add .
          git commit -m "chore: sync public files from private $(date -u +'%Y-%m-%dT%H:%M:%SZ')"
          git branch -M main
          git remote add origin https://x-access-token:${GH_TOKEN}@github.com/${PUBLIC_REPO}.git
          git push -f origin main
```

> 若你偏好 **Deploy Key（SSH）**，将 `PUBLIC_REPO_SSH_KEY` 作为机密，改用 `git@github.com:<owner>/<repo>.git` 推送即可。

---

## 方案 B：本地（macOS/Linux）一次性同步

> 不在公开仓库保留脚本；维护者在本地运行临时命令即可。

```bash
# 私有仓库工作副本根目录执行
set -e

PUBLIC_REPO="git@github.com:Joker9405/Can-Tong-Public.git"

rm -rf /tmp/ct-export && mkdir -p /tmp/ct-export/docs /tmp/ct-export/data

# 可选：公开说明
[ -f README.md ] && cp README.md /tmp/ct-export/

# 必要文档与 seed
cp docs/CONTRIBUTION_CLA.md /tmp/ct-export/docs/
cp docs/LICENSE_USAGE.md /tmp/ct-export/docs/
cp data/seed.csv /tmp/ct-export/data/

cd /tmp/ct-export
git init
git config user.name "sync-local"
git config user.email "sync-local@users.noreply.github.com"
git add .
git commit -m "chore: manual sync"
git branch -M main
git remote add origin "${PUBLIC_REPO}"
git push -f origin main
```

---

## 方案 C：本地（Windows PowerShell）一次性同步

```powershell
# 在私有仓库根目录
$PublicRepo = "git@github.com:Joker9405/Can-Tong-Public.git"

Remove-Item -Recurse -Force "$env:TEMP\ct-export" -ErrorAction SilentlyContinue
New-Item -ItemType Directory "$env:TEMP\ct-export\docs" | Out-Null
New-Item -ItemType Directory "$env:TEMP\ct-export\data" | Out-Null

if (Test-Path ".\README.md") { Copy-Item ".\README.md" "$env:TEMP\ct-export" }
Copy-Item ".\docs\CONTRIBUTION_CLA.md" "$env:TEMP\ct-export\docs"
Copy-Item ".\docs\LICENSE_USAGE.md" "$env:TEMP\ct-export\docs"
Copy-Item ".\data\seed.csv" "$env:TEMP\ct-export\data"

Set-Location "$env:TEMP\ct-export"
git init
git config user.name "sync-local"
git config user.email "sync-local@users.noreply.github.com"
git add .
git commit -m "chore: manual sync"
git branch -M main
git remote add origin $PublicRepo
git push -f origin main
```

---

## 公开仓库建议配置

- **目录最小化**：只保留 `README.md`、`docs/`、`data/seed.csv`、（可选）`contrib/inbox/`。  
- **保护分支**：开启分支保护与强制 PR 审核（CODEOWNERS）。  
- **忽略私密数据**：
  - 在公开仓库 `.gitignore` 中确保包含：  
    ```
    data/lexeme.csv
    api/
    public/
    assets/
    ```
  - 公开仓库**不**放 `vercel.json`、`public/*` 等可运行内容。

---

## 常见问题

- **为什么不同步 `public/*`？**  
  因为浏览器能直接下载上线的 HTML/CSS/JS。为降低“一键复刻”与数据抓取风险，公开仓库仅同步文档与 seed。

- **seed 更新，但线上不变？**  
  线上依赖**私有仓库**。seed 属于示例/众包收集；通过审核并合并到私有库后才会触发部署。

- **PAT 与 Deploy Key 选哪个？**  
  小团队用 PAT 更直观；企业/多仓库建议 Deploy Key（按仓库粒度授权）。

---

_维护者：如需扩展同步文件，请仅将“可公开”内容加入白名单，并在本文件更新。_
