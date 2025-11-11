# CanTongMVP Public Template (Pieter-Style)

本仓库是 **零成本、零后端** 的前端模板：
- 直接上传到 GitHub → 开启 **GitHub Pages** 即可访问（免费）。
- 或导入到 Vercel 作为 **静态站点**（无 Serverless，无费用）。
- 无需新建账号、无需环境变量、无需数据库。

> 设计理念：**展示理念，隐藏配方**。代码公开，核心数据（`lexeme.csv`）默认不提交。

---

## 目录结构

```
public/           # 公开的前端页面
  index.html
  app.js
  style.css
data/
  seed.csv        # 示例数据（可编辑/扩展）
docs/
  LICENSE_USAGE.md
  CONTRIBUTION_CLA.md
vercel.json       # Vercel 静态部署配置（可选）
.gitignore
.nojekyll         # GitHub Pages 推荐添加
```

> 若你有私密数据文件 `data/lexeme.csv`，默认被 `.gitignore` 忽略，不会上传到 GitHub。前端会**优先加载** `lexeme.csv`，不存在则**回退**到 `seed.csv`。

---

## 数据字段说明（CSV）

**列顺序建议：**

- `zhh`：粤语正字（繁体）
- `chs`：简体中文（直译/释义）
- `en`：英文（含释义）
- `aliases`：别名/同义（用 `|` 分隔）
- `variants_chs`：中文变体（`|` 分隔）
- `variants_en`：英文变体（`|` 分隔）
- `notes`：备注/用法提示
- `examples`：例句（中英可混写，`||` 分隔多条）

> 可按需增减，列名只要与 `app.js` 中的 `FIELD_MAP` 对齐即可。

---

## 部署方式 A：GitHub Pages（推荐零成本）

1. 新建 GitHub 仓库（Public 或 Private 皆可）。
2. 将本模板所有文件上传至仓库根目录。
3. 打开仓库 **Settings → Pages**：
   - 构建源选择 **Deploy from a branch**
   - 选择分支 `main` 和根目录 `/`
   - 保存后等待几分钟，生成访问链接。
4. 访问 `https://你的用户名.github.io/你的仓库名/`。

> 如需自定义域名：在仓库 Pages 设置里绑定即可，免费。

---

## 部署方式 B：Vercel（静态，无函数）

1. 将本模板推送到 GitHub。
2. 登录 Vercel（无需付费），**Import Project** → 选择仓库。
3. 自动检测为静态站点，保持默认。点击 **Deploy**。
4. 访问 Vercel 分配的域名（可后续绑定自定义域名）。

> 本模板不包含 `api/` 文件夹，避免 Node/旧 Runtime 报错。

---

## 使用方式

- 词库放在：
  - 私密：`data/lexeme.csv`（**不会**被提交到 GitHub）
  - 示例/公开：`data/seed.csv`
- 前端加载逻辑：先尝试 `lexeme.csv`，失败则回退到 `seed.csv`。
- 浏览器缓存：已添加时间戳 `?t=...` 以减少缓存未更新问题。

---

## 众包与授权

- 修改 `docs/CONTRIBUTION_CLA.md` 与 `docs/LICENSE_USAGE.md`，明确 **贡献即授予你商用权**。
- 公开 `seed.csv` 的同时，**保留私密的 `lexeme.csv`** 作为你的核心资产。

---

## FAQ

**Q1：能否离线/无后端直接用？**  
A：可以。本模板完全前端运行。

**Q2：CSV 更新了但页面没刷新？**  
A：已在 `app.js` 中添加了时间戳参数防缓存；若仍未生效，请尝试强制刷新（Ctrl/Cmd + Shift + R）。

**Q3：可以导出为 ZIP 给他人？**  
A：可直接下载 GitHub 仓库 ZIP 或者使用本模板打包文件。

---

© 2025-11-11 CanTong MVP – Code MIT，数据条款见 `docs/LICENSE_USAGE.md`