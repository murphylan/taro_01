# 微信小程序开发指南

## 目标

- 了解微信小程序的基本概念与开发流程
- 掌握 Taro 框架的安装与项目初始化
- 能够独立搭建并运行一个基础微信小程序
- 熟悉开发工具与常用资源

### 公众号、服务号、小程序及企业微信

微信小程序是一种无需下载安装即可使用的应用，具有开发门槛低、用户体验好、生态完善等优点。适用于多种业务场景，如电商、工具、内容分发等。

- [微信公众平台](https://mp.weixin.qq.com/)

### 微信开发者工具
微信开发者工具（[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)）是微信官方提供的小程序开发与调试 IDE，功能类似于 Visual Studio Code。我们通常用它来预览、调试和发布小程序。  

虽然开发过程中可以使用自己喜欢的编辑器（如 Visual Studio Code）进行编码，但小程序最终必须在微信开发者工具中进行校验和预览，并通过该工具上传发布。

## 跨端开发框架 Taro

Taro([官方地址](https://docs.taro.zone/docs/)) 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 微信 / 京东 / 百度 / 支付宝 / 字节跳动 / QQ / 飞书 / 快手 小程序 / H5 / RN 等应用。

### 安装环境准备

简要命令如下：

```sh
node -v
nvm ls
nvm install 20
% node -v
v20.19.4

% npm install -g @tarojs/cli

added 479 packages in 45s

88 packages are looking for funding
  run `npm fund` for details


```
可以参照官方的[快速上手](https://docs.taro.zone/docs/GETTING-STARTED)


### 初始化项目

```sh
% taro init qun_02
👽 Taro v4.1.6

Taro 即将创建一个新项目!
Need help? Go and open issue: https://tls.jd.com/taro-issue-helper

? 请输入项目介绍 qun event
? 请选择框架 React
? 是否需要使用 TypeScript ？ Yes
? 是否需要编译为 ES5 ？ Yes
? 请选择 CSS 预处理器（Sass/Less/Stylus） Sass
? 请选择包管理工具 pnpm
? 请选择编译工具 Vite
? 请选择模板源 Github（最新）
✔ 拉取远程模板仓库成功！
? 请选择模板 react-NutUI（NutUI + React 模板（https://nutui.jd.com/react/））

```

### 编译项目
初始化项目完成后，需要将其编译为 微信小程序 代码（前面提到 Taro 是一个跨端开发框架，顾名思义，同一套代码也可以编译为其他端的小程序，具体命令参照项目根目录下的package.json文件中的scripts节点内容）。
```sh
% pnpm run dev:weapp
```

然后，打开`微信开发者工具`，`项目` --> `导入项目`, 选择`dist目录`


## 遇到问题时

### 与 LLM 交互技巧

好的 Prompt 能让效率提升百倍。
每次开始一个新的话题时，copy 下面的内容开头：

1. 你是我的 AI 代理，请在问题完全解决前持续工作，不要提前结束对话；
2. 如对文件内容或结构不确定，请先读取相关内容再作答；
3. 在调用工具函数前，先制定计划并说明步骤和结论，不要仅依赖工具输出，需综合推理后再给出答案。

### UI组件
NutUI([预览地址](https://nutui.jd.com/taro/react/3x/)) 和 Taro 一样，同属京东出品。


### 微信开放社区
微信开放社区([地址](https://developers.weixin.qq.com/community/develop/mixflow
))是官方提供的问题交流处，基本上常见的问题，都能在微信开放社区搜索到。

### 性能优化指南
微信官方提供了常见的[性能优化指南](https://developers.weixin.qq.com/community/develop/doc/00040e5a0846706e893dcc24256009)。
