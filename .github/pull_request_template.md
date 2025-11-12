## 概要
> 简要说明本 PR 的目的与改动点（控制在 3~5 行）

## 变更类型（至少勾选一项）
- [ ] 数据：新增/修改 `data/seed.csv` 或 `contrib/inbox/*.csv`
- [ ] 文档：更新 `docs/*` 或 `README.md`
- [ ] 其他：请在下方说明

## 自检清单（必选）
- [ ] 我已阅读并同意 **[docs/CONTRIBUTION_CLA.md](../docs/CONTRIBUTION_CLA.md)** 与 **[docs/LICENSE_USAGE.md](../docs/LICENSE_USAGE.md)**  
- [ ] 未提交任何**敏感或运行相关文件**（例如：`data/lexeme.csv`、`public/*`、`assets/*`、`api/*`、`vercel.json` 等）
- [ ] CSV 使用 UTF-8（无 BOM），无多余空列或尾随逗号
- [ ] 列名与字段一致：`zhh, chs, en, aliases, variants_chs, variants_en, notes, examples`
- [ ] 多值分隔符：别名/变体用 `|`；例句用 `||`
- [ ] 我确认内容不含违法/侵权/隐私泄露

## 变更说明
> 说明新增/修改了哪些词条或文档要点，可附示例行：
> 
> ```csv
> zhh,chs,en,aliases,variants_chs,variants_en,notes,examples
> 唔好,不要,don't,,别|别要,do not,"口语、日常场景","唔好講大話||Please don't lie."
> ```

## 关联 Issue
> 例如：Closes #123 / Related to #456
