---
name: 数据贡献 / 修正（seed.csv）
about: 提交或修正词条数据（建议附 CSV 行）
title: "[Data] "
labels: ["data"]
assignees: []
---

## 你在提交什么？
- [ ] 新增词条
- [ ] 修正现有词条

## 数据格式
请直接在下方粘贴 **CSV 行** 或上传 `.csv` 文件（UTF-8）：

```
zhh,chs,en,aliases,variants_chs,variants_en,notes,examples
示例正字,示例中文,example,,变体A|变体B,variantA|variantB,备注,"例句一||Example two"
```

- 多值分隔：别名/变体使用 `|`；例句使用 `||`
- 字段含义：
  - `zhh`：粤语正字（繁体）
  - `chs`：简体释义/直译
  - `en`：英文释义
  - `aliases`：别名/同义
  - `variants_chs` / `variants_en`：变体
  - `notes`：备注/用法提示
  - `examples`：例句（可中英混写）

## 参考与来源（可选）
> 如有来源或用法出处，请写明（避免侵权）：

## 确认项
- [ ] 我已阅读并同意 **docs/CONTRIBUTION_CLA.md** 与 **docs/LICENSE_USAGE.md**
- [ ] 我确认内容未侵犯他人版权或隐私
