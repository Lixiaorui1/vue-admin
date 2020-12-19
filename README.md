# st-cli-vue

English | [简体中文](./README-zh.md)

```bash
# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

## 项目结构

```bash
|-- prd-web-st-cli-
    |-- public  ----------------------------------项目公共静态资源
    |   |-- index.html  --------------------------首页
    |   |-- favicon.ico  -------------------------ico 资源
    |   |-- logo.png  -------------------------LOGO图
    |-- src  -------------------------------------源代码
    |   |-- App.vue  -----------------------------vue 入口组件
    |   |-- main.js  -----------------------------vue 入口
    |   |-- api  ---------------------------------ajax 请求层
    |   |-- assets  ------------------------------静态资源存放区
    |   |-- components  --------------------------组件区
    |   |   |-- bussiness  -----------------------业务组件
    |   |   |-- common  --------------------------通用组件
    |   |-- config  ------------------------------项目静态配置
    |   |-- utils  -------------------------------工具库
    |   |   |-- request  -------------------------ajax 请求处理逻辑层
    |   |   |-- validate  ------------------------校验方法封装
    |   |-- views  -------------------------------页面存放区
    |   |-- layout  ------------------------------布局组件
    |   |-- router  ------------------------------路由层
    |   |-- store  -------------------------------vuex 状态数据存放区
    |   |-- styles  ------------------------------主题样式区
    |-- .env.development  ------------------------本地打包环境
    |-- .env.staging  ----------------------------测试打包环境
    |-- .env.production  -------------------------生产打包环境
    |-- .eslintrc.js  ----------------------------eslint配置
    |-- .gitignore  ------------------------------git忽略项
    |-- .eslintignore  ---------------------------eslint忽略项
    |-- babel.config.js  -------------------------babel配置
    |-- deploy_vue.sh  ---------------------------前端跳转机脚本存放
    |-- package-lock.json  -----------------------锁定npm包版本
    |-- package.json  ----------------------------项目入口文件，包含项目信息与依赖、配置管理
    |-- prettier.config.js  ----------------------prettier代码格式化插件配置
    |-- postcss.config.js  -----------------------px->rem配置文件
    |-- README.md  -------------------------------项目介绍
    |-- vue.config.js  ---------------------------Vue Cli配置文件
```
