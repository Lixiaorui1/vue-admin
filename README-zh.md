## Build Setup

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
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
