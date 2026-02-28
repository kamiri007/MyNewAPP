# MyNewAPP - Notion-like 全平台工作空间（从零起步）

这是一个从零搭建的 **Notion 类全平台工作空间** Monorepo 起始工程，重点落实：

- **Clean Architecture**（依赖方向从外向内）
- **DDD**（实体、值对象、仓储接口、用例）
- **SOLID**（单一职责、依赖倒置等）

## 目录结构

```text
apps/
  web/       # Web 客户端（基础 UI）
  mobile/    # Mobile 客户端（占位）
  desktop/   # Desktop 客户端（占位）
packages/
  domain/         # 领域层：实体、值对象、仓储抽象
  application/    # 应用层：用例编排 + ViewModel
  infrastructure/ # 基础设施层：仓储实现、外部系统适配
services/
  api/            # 接口层：HTTP API（组合根 + 静态资源）
docs/
  architecture.md # 架构与演进规划
```

## 快速开始

```bash
npm test
npm run start:api
```

启动后访问：`http://localhost:3000`

- 左侧可创建页面（workspaceId + title + content）
- 右侧可查看页面树并刷新

## 当前已落地的 DDD / Clean Architecture 实践

1. `packages/domain`：不依赖外层模块，定义核心业务模型。
2. `packages/application`：通过仓储接口编排用例，不关心数据来源。
3. `packages/infrastructure`：实现仓储接口（当前为内存实现）。
4. `services/api`：作为组合根，将实现注入用例并暴露 HTTP 接口。

## 可测试性

- 领域/应用层单元测试：覆盖用例与 ViewModel 逻辑。
- API 集成测试：覆盖静态页面访问、创建页面、获取页面树。

后续可继续扩展实时协作、离线同步、权限体系、块编辑器与插件系统。
