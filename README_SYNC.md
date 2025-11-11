# CanTong 一键同步（只同步 4 项公开文件）

本工具仅同步这 **四类文件** 从私有仓库 → 公开仓库：

- `public/index.html`
- `public/app.js`
- `public/style.css`
- `data/seed.csv`

> 目的：避免手动拷贝失误；不触碰任何私密数据（如 `data/lexeme.csv`、`/api/*` 等）。

---

## 用法一：本地命令（macOS/Linux：bash）

1. 安装 Git 与 jq（macOS 可 `brew install jq`，Linux 用包管理器安装）。
2. 复制 `config.sample.json` 为 `config.json` 并填好：
3. 运行：

```bash
bash sync.sh
```

---

## 用法二：本地命令（Windows PowerShell）

1. 安装 Git；确认你对两个仓库都有 push 权限。
2. 复制 `config.sample.json` 为 `config.json` 并填好：
3. 运行：

```powershell
powershell -ExecutionPolicy Bypass -File .\sync.ps1
```

---

## 用法三：GitHub Actions（自动同步）

> 在 **私有仓库** 使用此工作流（把 `.github/workflows/sync-to-public.yml` 放到私有仓库）。
> 需要在私有仓库 Settings → Secrets and variables → Actions 创建机密：

- `PUBLIC_REPO_SSH_KEY`：公开仓库的 **Deploy Key 私钥**（建议写入权限）。
- `PUBLIC_REPO`：形如 `Joker9405/Can-Tong-Public`。

部署步骤：
1. 在公开仓库添加 Deploy Key 的 **公钥**（允许写入）。
2. 在私有仓库添加对应的 **私钥** 到 `PUBLIC_REPO_SSH_KEY`。
3. 把 `sync-to-public.yml` 提交到私有仓库的 `.github/workflows/` 路径。
4. 之后每次私有仓库 `main` 分支 push，会自动把上述 4 个文件同步到公开仓库并发布。

---

## 注意事项

- 仅同步上述 4 个文件；不会覆盖其他任何内容。
- 若目标仓库不存在对应目录，会自动创建。
- 若你需要扩展更多文件，请在脚本中的 `FILES` 列表里追加相对路径即可。
- **强烈建议**公开仓库中 `.gitignore` 忽略 `data/lexeme.csv`，确保私密词库永不外露。