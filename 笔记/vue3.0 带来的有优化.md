## 源码优化
### 更好的代码管理方式：monorepo
#### monorepo
参考[monorepo 介绍](monorepo%20介绍.md)
1. Vue.js 3.0 ，整个源码是通过 monorepo 的方式维护的，根据功能将不同的模块拆分到 packages 目录下面不同的子目录中：每个 package 有各自的 API、类型定义和测试。这样使得模块拆分更细化，职责划分更明确，模块之间的依赖关系也更加明确
2. 一些 package（比如 reactivity 响应式库）是可以独立于 Vue.js 使用的

#### typescript
TypeScript提供了更好的类型检查，能支持复杂的类型推导

## 性能优化
#### 代码体积优化
1. 移除一些冷门的 feature
2. 引入 tree-shaking 的技术，减少打包体积

## 数据劫持优化
1. Vue.js 1.x 和 Vue.js 2.x 内部都是通过 Object.defineProperty 这个 API 去劫持数据的 getter 和 setter。不能检测对象属性的添加和删除， 尽管Vue.js 为了解决这个问题提供了 $set 和 $delete 实例方法。
2. vue2.x 如果要劫持它内部深层次的对象变化，就需要递归遍历这个对象，执行 Object.defineProperty 把每一层对象数据都变成响应式的
3. Vue.js 3.0 使用了 Proxy API，它劫持的是整个对象，那么自然对于对象的属性的增加和删除都能检测到
4. Proxy API 并不能监听到内部深层次的对象变化，因此 Vue.js 3.0 的处理方式是在 getter 中去递归响应式，这样的好处是真正访问到的内部对象才会变成响应式，而不是无脑递归

## 编译优化
1. 通过编译阶段对静态模板的分析，编译生成了 Block tree，区分静态节点和动态节点。
2. 静态节点，静态属性提升
3. 预字符串化
4. 缓存内联事件处理函数
5. v-once 指令

## 语法 API 优化：Composition API
1. 优化逻辑组织，将某个逻辑关注点相关的代码全都放在一个函数里
![](Pasted%20image%2020220430174236.png)
2. 优化逻辑复用
   1. Vue.js 2.x 中，我们通常会用 mixins 去复用逻辑。导致命名冲突，数据来源不清晰
   2. Composition API 对 tree-shaking 友好

## 引入 RFC：使每个版本改动可控
