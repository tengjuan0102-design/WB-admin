# 旺宝 AI 服务商后台

旺宝 AI 服务商业务的后台管理系统，用于服务商管理商户、门店、设备、下级服务商和内部账号。

## 当前功能

- 登录：手机号密码登录、手机号验证码登录、忘记密码
- 首页：后台首页占位
- 商户中心：商户管理、门店管理
- 设备中心：我的设备、设备调配、设备采购、审批中心
- 下级管理：下级服务商
- 账号管理：账号分配、角色管理、我的账号
- 公共组件：标准列表页、筛选区、表单抽屉、详情展示

## 设计规范

- UI 框架：Ant Design Vue
- 图标库：Lucide
- 品牌主色：`#F04144`
- 默认使用浅色主题
- 列表页和表单页已提取公共组件，新增同类页面时应优先复用

## 技术栈

- Vue 3
- TypeScript
- Vite
- Ant Design Vue
- Vben Admin 5
- pnpm

## 本地运行

环境要求：Node.js 20.15 及以上版本，pnpm 9 及以上版本。

```bash
pnpm install
pnpm dev:antd
```

本地访问地址：`http://localhost:5666`

## 代码检查

```bash
pnpm -F @vben/web-antd run typecheck
```

## 主要代码位置

- 后台应用：`apps/web-antd`
- 页面：`apps/web-antd/src/views`
- 路由和菜单：`apps/web-antd/src/router/routes/modules`
- 公共业务组件：`apps/web-antd/src/components`
- 品牌配置：`apps/web-antd/src/preferences.ts`
- Mock 接口：`apps/backend-mock`

## 开发说明

当前页面使用模拟数据完成交互和样式演示。开发接入真实后端时，应保留现有页面结构和公共组件，替换页面内的模拟数据与提交逻辑。

本项目基于 [Vben Admin](https://github.com/vbenjs/vue-vben-admin) 开发，并遵循其开源许可。
