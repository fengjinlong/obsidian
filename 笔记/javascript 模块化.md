```js

// 报错 type error  
(function aa() {  
})()  
​  
(function aa() {  
})()  
--------------------------------------------------
// ok  
(function aa() {  
})()  
​  
;(function aa() {  
})()
```

## js 模块化

1.  要解决的问题
    1.  加载顺序
    2.  污染全局

2.  最初怎么
    1.  很多 script 标签

3.  es5 怎么解决的模块化
    1.  匿名函数立即执行
    2.  不能解决加载顺序问题
    
```js
    var moduleA = (function () {  
      return {  
        a: 1,  
      };  
    })();  
    var moduleB = (function (moduleA) {  
      var b = moduleA.a;  
      return {  
        b,  
      };  
    })(moduleA);  
```
    
4.  jquery 时代的插件化
    
    1.  new 一个对象，传一些初始参数
        
5.  nodejs 的 commonjs 规范 可以解决加载顺序问题
    
    1.  自动缓存
    2.  同步执行
    3.  只能在node 平台
    
    ```js
    module.exports = {}  
    require('...')
    ```
    
6.  amd 为了把 commonjs 引用到浏览器 用 requirejs
    1.  依赖前置
    2.  需要配置url
        
    ```js
    // moduleA.js 定义模块  
    define("moduleA", function () {  
      return { a: [1] };  
    });  
    // moduleB.js 定义模块  
    define("moduleB", ["moduleA"], function (moduleA) {  
      return {  
        b: moduleA.a,  
      };  
    });  
    // index.js 引用模块  
    // 配置路径  
    require.config({  
      paths: {  
        moduleA: "js/moduleA.js",  
        moduleB: "js/moduleB.js",  
      },  
    });  
    require(["moduleA", "moduleB"], function (moduleA, moduleB) {});
    ```
7.  cmd 规范，阿里的 seajs
    
    1.  配置url
    2.  依赖就近
    3.  按需加载
        
    ```js
    // moduleA.js  
    define(function (require, exports, module) {  
      return { a: [] };  
    });  
    // moduleB.js  
    define(function (require, exports, module) {  
      var b = require("moduleA");  
      return { b };  
    });  
    // index.js 使用  
    seajs.use(["moduleA", "moduleB"], function (moduleA, moduleB) {});
    ```
8.  es6 import export
    
9.  es6 与 commonjs 的区别
    
    1.  语法不同
    2.  commonjs 输出的是一个值的拷贝，es6是值的引用
    3.  commonjs是运行时，es6是编译时加载