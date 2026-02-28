# 架构设计（Clean Architecture + DDD + SOLID）

## 一、分层与依赖规则

- **Domain Layer（最内层）**
  - 实体：`Page`
  - 值对象：`Title`
  - 仓储接口：`PageRepository`
- **Application Layer**
  - 用例：`CreatePageUseCase`、`GetWorkspaceTreeUseCase`
- **Infrastructure Layer**
  - `InMemoryPageRepository`（可替换为 PostgreSQL / MongoDB / Elastic）
- **Interface Layer（API / Web / Mobile / Desktop）**
  - `services/api` 当前提供 REST API

依赖方向：

```text
Interface -> Application -> Domain
Interface -> Infrastructure -> Domain
```

Domain 不依赖外部框架，满足 Clean Architecture 的核心约束。

## 二、DDD 战术设计

- **实体（Entity）**：`Page` 具有身份标识和行为（重命名、更新内容）。
- **值对象（Value Object）**：`Title` 封装不可变与校验规则。
- **仓储（Repository）**：`PageRepository` 只表达领域需要，不暴露存储细节。
- **应用服务（Use Case）**：用例负责事务边界与流程编排。

## 三、SOLID 映射

- **S（单一职责）**
  - `Page` 只处理页面业务行为；`Title` 只处理标题规则。
- **O（开闭原则）**
  - 新增数据库实现时扩展 `PageRepository` 即可。
- **L（里氏替换）**
  - `InMemoryPageRepository` 可无缝替换 `PageRepository` 抽象。
- **I（接口隔离）**
  - 仓储接口仅保留页面场景必需方法。
- **D（依赖倒置）**
  - 用例依赖 `PageRepository` 抽象，不依赖具体实现。

## 四、全平台推进建议

1. **Web**：优先实现块编辑器、页面树、搜索。
2. **Mobile**：聚焦阅读与轻编辑，强化离线同步。
3. **Desktop**：增强快捷键、文件系统能力、重度编辑体验。
4. **协作能力**：引入 CRDT（如 Yjs）+ Presence 服务。
5. **多租户与权限**：Workspace / Space / Page 三级模型 + RBAC/ABAC。
