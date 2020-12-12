## BLOG-WEB

一个使用 [Vue](https://github.com/vuejs/vue) 框架和 [element](https://github.com/ElemeFE/element) 组件库开发的个人博客网站 Web 端。

### 一、项目简介

该项目为个人博客网站 Web 端，采用 [Vue](https://github.com/vuejs/vue) 框架编写，集成了[vue router](https://github.com/vuejs/vue-router) 和 [axios](https://github.com/axios/axios)，并且采用 [element](https://github.com/ElemeFE/element) 作为UI组件库，需要配合服务端以及后台管理端。

- 项目的服务端地址为: [https://github.com/fzcoder/blog-server](https://github.com/fzcoder/blog-server)
- 项目的后台管理端地址为: [https://github.com/fzcoder/blog-admin](https://github.com/fzcoder/blog-admin)

**注意**

- 项目的服务端和后台管理端自`v2.0`版本起将不再支持本项目，请下载`v1.x`版本的服务端和后台管理端。
- 由于个人精力有限，本项目暂时停止维护，如果有愿意继续维护本项目的朋友，欢迎`fork`本仓库进行二次开发或者提交`pull request`至`dev`分支。

### 二、功能特性

网站整体包含以下功能特性：

- 采用弹性布局，可根据设备进行布局的调整，支持PC端、Pad端和移动端
- 支持头部导航栏固定，头部导航栏支持链接跳转和搜索功能
- 支持一键返回顶部
- 支持页底版权声明、备案信息展示及链接跳转

下面将详细介绍每个页面的功能特性：

#### 1、主页

- 支持轮播(走马灯)
- 支持展示最新动态
- 支持展示个人信息(包括：头像、昵称、座右铭)
- 支持展示个人仓库地址链接(包括: Github仓库地址、Gitee仓库地址)
- 支持显示推荐文章

#### 2、目录界面

- 支持分页查询
- 支持展示所有目录
- 支持按目录进行分类查询

#### 3、文章界面

- 支持TOC(Table of Content)
- 支持左侧工具栏(返回顶部、点赞、复制文章链接)
- 支持显示推荐文章列表
- 支持显示阅读量

#### 4、导航页面

- 支持按目录进行分类展示
- 支持根据目录快速定位
- 支持展示链接的图标和名称

#### 5、搜索界面

- 支持混合查询(即查询文章和导航链接)
- 支持分页查询

#### 6、关于界面

- 支持展示个人信息(头像、昵称、座右铭、简介)
- 支持自定义声明

### 三、部署项目

#### 1、克隆到本地

```bash
$ git clone https://github.com/fzcoder/blog-web.git
```

#### 2、安装NPM依赖

首先请确保您已经安装了 [node.js](https://github.com/nodejs/node) 和 [npm](https://github.com/npm/cli)。

在安装完`node.js`和`npm`之后输入以下指令安装依赖：

```shell
$ npm i
```
如果您位于中国大陆，也可以通过淘宝镜像进行安装。首先需要安装`cnpm`

```shell
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

之后便可用`cnpm`安装NPM依赖

```shell
$ cnpm i
```

#### 3、修改配置文件

在`src/`目录下找到`main-dev.js`和`main-prod.js`分别修改以下内容：

```javascript
// 配置请求的根路径
axios.defaults.baseURL = 'http://<host>:<port>/api'
```

将其中的`host`和`port`更改为你本地服务端的地址和端口号即可

#### 4、运行项目

首先请确保您已经安装了 [vue cli](https://github.com/vuejs/vue-cli)。

在安装完`vue cli`之后在项目根目录下打开控制台，输入以下命令以开发模式启动项目：

```shell
$ npm run serve
```

