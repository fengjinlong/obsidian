## promise
1. [[手写关键点]]
2. [[promise.all]]
## mini-vue
1. [vue3响应式原理.excalidraw](vue3响应式原理.excalidraw.md)
2. [vue3-diff-脑图](vue3-diff-脑图.md)
3. [[总览 diff.md#最长递增子序列|diff 的最长递增子序列]]
4. 
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
    

#### keep-alive
1. 只缓存组件
2. 将组件放到一个缓存容器
3. **activated**取出组件，**deactivated** 放进容器
4. 挂在组件实则就是 判断是否是存在 **keepAlivee** 状态
	- 存在，调用activate
	- 不存在，mountComponent



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

  