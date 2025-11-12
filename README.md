# CanTong MVP – Public (Crowdsourcing)

面向社区的**公开仓库**，仅作为「词条众包入口 + 文档」。线上正式站点由**私有仓库**部署：  
👉 **https://can-tong.vercel.app/**

> 我们的策略是 **展示理念，隐藏配方**：代码与流程可以公开讨论，但生产词库与运行细节全部留在私有仓库中（由 Vercel 直接构建）。

---

## 我们在收集什么（data/seed.csv）
请按下列字段贡献（列名区分大小写）：

- `zhh`：粤语正字（繁体）  
- `chs`：简体释义（直译/中文解释）  
- `en`：英文释义（英文解释或翻译）  
- `aliases`：别名/同义（使用 `|` 分隔，多项可写，如 `唔好|咪`）  
- `variants_chs`：中文变体（`|` 分隔）  
- `variants_en`：英文变体（`|` 分隔）  
- `notes`：备注/用法提示（简短说明场景、语气、礼貌程度等）  
- `examples`：例句（多条用 `||` 分隔；中英可混写）

> **字段数量可按需扩展**，但列名需与内核映射一致；维护者会在私有库进行清洗、去重、合并。

---

## 贡献流程（Pull Request）
1. **Fork** 本仓库。  
2. 编辑或新增 `data/seed.csv`（保持 UTF-8、逗号分隔；行尾不加多余逗号）。  
3. 提交 **PR**：推荐将新增文件放在 `contrib/inbox/`（或直接改动 `data/seed.csv`，以维护者公告为准）。  
4. 合并前，请确认已阅读并同意：  
   - [docs/CONTRIBUTION_CLA.md](docs/CONTRIBUTION_CLA.md)  
   - [docs/LICENSE_USAGE.md](docs/LICENSE_USAGE.md)

**审核与上线**  
- 维护者会在**私有仓库**中对提交内容做去重、正字校对与安全检查；  
- 合格内容将并入生产词库并触发站点更新；  
- 我们会在公开仓库公示增量与致谢（如开启贡献者名单）。

---

## 许可与数据策略
- **代码/脚本**：MIT（如有脚本存在时）。  
- **数据**：提交即同意授予项目**可撤销性以外的**商用与再许可权，详见：  
  - [docs/CONTRIBUTION_CLA.md](docs/CONTRIBUTION_CLA.md)  
  - [docs/LICENSE_USAGE.md](docs/LICENSE_USAGE.md)  
- **生产词库（data/lexeme.csv）**：不在此仓库；仅在私有仓库保存与使用。

---

## 模板与自部署（可选）
如你想自行尝试前端壳或搭建演示站，建议使用**独立的模板仓库**（避免与本众包仓库耦合）。  
> 模板仓库提供零后端、零密钥的纯前端演示；生产环境不建议直接使用该模板的公开数据。

（稍后将公布模板仓库链接）

---

## FAQ
- **更新了 CSV 但线上没变化？**  
  公开仓库只是**众包入口**。生产数据由私有仓库维护，审核通过后才会触发部署。
- **为什么看不到完整词库？**  
  为保护项目资产与合规性，生产词库仅存在于私有仓库。
- **可以离线/无后端使用吗？**  
  可以使用模板仓库在本地跑演示；但该演示不包含生产数据与私密逻辑。
- **我提交的内容可以商用吗？**  
  贡献即授予项目商用与再许可权，条款以 CLA 与使用许可为准。

---

<details><summary><strong>维护者：如何与公开仓库同步？（仅 seed/docs/README）</strong></summary>

请参阅维护文档 👉 [docs/SYNC.md](docs/SYNC.md)  
我们只从**私有仓库**同步以下**安全白名单**到公开仓库：

- `data/seed.csv`  
- `docs/CONTRIBUTION_CLA.md`  
- `docs/LICENSE_USAGE.md`  
- `README.md`（可选）

</details>

---

**© 2025 CanTong MVP – Code MIT；数据与贡献条款见 docs/**