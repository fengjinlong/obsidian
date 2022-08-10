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





![](Pasted%20image%2020220810193305.png)
![](Pasted%20image%2020220810193858.png)


```ts

let id = 1
const generateId = ()=> id++
```

导出变量响应式丢失
vue3 用toRefs 解决
pinia 用 storeToRefs  解决
```ts

import {storeToRefs} from 'pinia'
const {a} = storeToRefs(todoStore)
```