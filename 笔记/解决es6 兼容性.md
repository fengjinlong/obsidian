一、解决方案分析
在很多情况下, 对于 js 的版本兼容, 一般使用 babel 系列进行处理;

babel 实际是是一个 js 的编译器, 是一个源码转换源码的一个编译器主要通过内部的 Babylon 解析然后经过一系列的 babel-traverse 然后通过 babel-generator 生成后成为我们运行环境支持的源码

这里 babel 之所以能够识别我们的 js 代码主要归功于 Babylon 的 ast 语法分析, Babylon 基于 ast, 但是又定义很多自己的语法相关的类型, Babylon 对每个节点类型都进行了详细的说明, 我们可以对照每个节点类型在这查找到所需要的信息

babel 主要的三步是解析(parse) 转换(transform) 生成(generate)
babel 的解析就是一个 js 解析过程, 主要是接收代码并输出 ast, 这个步骤分为两个阶段, 词法分析(把字符串形式的代码转换为 令牌（token） 流) 和 语法分析(令牌流转换成 AST 的形式)。
第二步转换, 其中也是 babel 最重要的一步, 这里涉及到输入源码的删改过程, 不过这一步也归功于第一步解析
第三步生成, 将转换过的 ast 代码转换过的代码生成对应的源码
在 ast 分析的时候 babel 主要是有一个 visitor 访问者模式, es6-destructuring-jstransform.js 中就是对 visitors.js 文件进行说明

二、使用方式
2.1 安装 babel
npm install --save-dev @babel/core
2.2 配置文件 .babel
Babel 的配置文件是.babelrc，存放在项目的根目录下。使用第一步就说要配置这个文件

基本格式

```json
{
  "presets": [],
  "plugins": []
}
```

presets 字段设定转码规则，可以通过这个规则集来解码不同的语言，如：

### 最新转码规则

$ npm install --save-dev @babel/preset-env

### react 转码规则

$ npm install --save-dev @babel/preset-react
将规则加入.babelrc

```json
{
  "presets": ["@babel/env", "@babel/preset-react"],
  "plugins": []
}
```

2.3 命令行转码
Babel 提供命令工具@babel/cli，用于命令行转码

2.4 babel-node
@babel/node 模块的 babel-node 命令，提供一个支持 ES6 的 REPL 环境。能够支持 Node 的 REPL 环境的所有功能

// 执行命令代码
npx babel-node xxx.js
2.5 @babel/register 模块
@babel/register 模块改写 require 命令，为它加上一个钩子，此后每当使用加载.js,.jsx,.es 和.es6 后缀名的文件，就会先用 Babel 进行转码

// index.js
require("@babel/register");
require("./es6.js");
这样就不用对 index.js 转码

但是要注意的是，@babel/register 只会对 require 命令加载的文件转码，而不会对当前文件转码

2.6 polyfill
babel 只默认转换新的 JavaScript 语法，而不转换新的 API,比如：Iterator,Generator,Set,Map,Map,Reflect,Symbol,Promise 等全局对象，以及全局对象上的方法（如：Object.assign）都不会转

如果需要对这些 API 解码，就需要用到不同的方法。如：Array.from，就可以使用 core-js 和 regenerator-runtime

2.7 浏览器环境
Babel 也可以用于浏览器环境，使用@babel/standalone 模块提供的浏览器版本，将其插入网页

```js
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
  // Your ES6 code
</script>
```

注意，网页实时将 es6 代码转为 es5，对性能会有影响。生产环境需要加载已经转码完成的脚本。

Babel 提供一个 REPL 在线编辑期，可以在线将 es6 转换为 es5 代码，转换后的代码，可以直接作为 ES5 代码插入网页运行