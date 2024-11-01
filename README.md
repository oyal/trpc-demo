# tRPC 演示项目

## 项目简介

本项目是一个使用 **tRPC**、**React**、**TypeScript** 和 **Vite** 构建的全栈示例应用。它展示了如何通过 tRPC 在前后端之间实现类型安全的通信，从而提高开发效率和代码可靠性。

## 技术栈

- **tRPC**：实现前后端类型共享，提供类型安全的 API。
- **React**：用于构建用户界面。
- **TypeScript**：为 JavaScript 提供静态类型支持。
- **Vite**：快速的前端构建工具，提供极速的开发体验。
- **Express**：基于 Node.js 的 Web 应用框架，用于搭建后端服务器。
- **pnpm**：高效的包管理器，替代 npm 和 yarn。

## 项目结构

```
trpc-demo/
├── packages/
│   ├── api-server/    # 后端服务代码
│   └── client/        # 前端应用代码
├── package.json       # 根配置文件
├── pnpm-lock.yaml     # pnpm 锁定文件
└── README.md          # 项目说明文档
```

## 安装

在开始之前，请确保已安装 [Node.js](https://nodejs.org/) 和 [pnpm](https://pnpm.io/)。

```bash
# 克隆项目
git clone https://github.com/oyal/trpc-demo.git

# 进入项目目录
cd trpc-demo

# 安装依赖
pnpm install
```

## 启动项目

### 启动后端服务

```bash
pnpm run dev:server
```

后端服务将运行在 `http://localhost:8080`。

### 启动前端应用

在另一个终端中运行：

```bash
pnpm run dev:client
```

前端应用将运行在 `http://localhost:5173`。

## 使用方法

打开浏览器，访问 `http://localhost:5173`，即可查看前端应用。该应用通过 tRPC 与后端通信，获取并展示用户数据。

## 功能特性

- **类型安全的 API 通信**：利用 tRPC，在前后端共享类型定义，减少数据不一致和类型错误。
- **用户数据展示**：简单的用户信息查询与展示，实现前后端交互。

## 配置说明

### 前端（client）

位于 

packages/client 目录下，使用 React 和 Vite 构建。主要文件和配置：

- `src/`：前端源码目录。
- `vite.config.ts`：Vite 配置文件。
- `tsconfig.json`：TypeScript 配置文件。

### 后端（api-server）

位于 

packages/api-server 目录下，使用 Express 和 tRPC 搭建。主要文件：

- `src/index.ts`：后端入口文件，定义了服务器和 API 路由。
- `src/trpc.ts`：tRPC 配置文件。

## 注意事项

- 确保在启动前端应用之前，后端服务已经运行。
- 如需修改端口或其他配置，请更新对应的配置文件。

## 参考资料

- [tRPC 官方文档](https://trpc.io/)
- [React 官方文档](https://reactjs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Express 官方文档](https://expressjs.com/)
