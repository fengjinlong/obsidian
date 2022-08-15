## promise
1. [[手写关键点]]
2. [[promise.all]]
## mini-vue
1. [vue3响应式原理.excalidraw](vue3响应式原理.excalidraw.md)
## 手写js
## 项目经验
1. 低代码可视化
2. mini-vue 
3. 小程序

## mini-webpack





## 看题
![](Pasted%20image%2020220801162907.png)
- js 图片懒加载？
- 浏览器缓存
- 二进制的看看之前的笔记
- 闭包
- 原型
- new
- bind
- 深克隆
o![](Pasted%20image%2020220802145058.png)
1. instanceof 运算符用于检测`构造函数的 prototype` 是否在某个`实例对象的原型链上`


#### patch 待总结
5.

-   更快
-   虚拟DOM重写
    
-   编译器优化：静态提升、patchFlags、block等
    

看一下更新 100次执行几次的大概逻辑
keep-alive


问我们template到render过程，其实是问vue`编译器`工作原理



## 九、性能优化

代码层面：

-   防抖和节流（resize，scroll，input）。
-   减少回流（重排）和重绘。
-   事件委托。
-   css 放 ，js 脚本放 最底部。
-   减少 DOM 操作。
-   按需加载，比如 React 中使用 `React.lazy` 和 `React.Suspense` ，通常需要与 webpack 中的 `splitChunks` 配合。

构建方面：

-   **压缩代码文件**，在 webpack 中使用 `terser-webpack-plugin` 压缩 Javascript 代码；使用 `css-minimizer-webpack-plugin` 压缩 CSS 代码；使用 `html-webpack-plugin` 压缩 html 代码。
-   **开启 gzip 压缩**，webpack 中使用 `compression-webpack-plugin` ，node 作为服务器也要开启，使用 `compression`。
-   **常用的第三方库使用 CDN 服务**，在 webpack 中我们要配置 externals，将比如 React， Vue 这种包不打倒最终生成的文件中。而是采用 CDN 服务。

其它：

-   使用 http2。因为解析速度快，头部压缩，多路复用，服务器推送静态资源。
-   使用服务端渲染。
-   图片压缩。
-   使用 http 缓存，比如服务端的响应中添加 `Cache-Control / Expires` 。

  
作者：vortesnail  
链接：https://juejin.cn/post/7061588533214969892  
来源：稀土掘金  
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。