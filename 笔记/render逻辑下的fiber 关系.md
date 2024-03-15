#### 只看单一子节点的情况，多节点只是多一次 sibling 的处理
## 当执行 ReactDOM.createRoot(container).render(App) 流程
```js
// App()
let count = 10
function App() {
  return (
    <button
      id="btn"
      onClick={() => {
        count++;
        React.update();
      }}
    >
      {count}
    </button>
  );
}
```

```html
<!-- dom结构 -->
<div id="root">
	<button id="btn">10</button>
</div>
```
#### 1 render(el, container) 标记档期根rootfiber,也就是 wipRoot，和当前的工作单元nextWorkOfUnit
```js
wipRoot = {
	dom: container,
    props: {
      children: [el],// 这里的el 就是 App()
    },
}
nextWorkOfUnit = wipRoot
```
#### 2 执行 workLoop，满足performUnitOfWork 执行条件（!shouldYield && nextWorkOfUnit）。
#### 3 第一次执行 performUnitOfWork(fiberRoot), fiberRoot 如下图
 ![](Pasted%20image%2020240122185029.png)
1. 执行 updateHostComponent
2. 有 dom 不用添加dom，不用处理props。处理 children，执行 reconcileChildren
3. oldFiber = fiber.alternate?.child，没有 oldFiber, 创建(注意effectTag是 ："PLACEMENT")新的 newfiber 并挂载到 fiber.child 上
4. 当前 fiber tree 结构如下图
![](Pasted%20image%2020240122185348.png)
5. 返回 fiber.child。nextWorkOfUnit = fiber.child 
#### 第二次执行 performUnitOfWork(nextWorkOfUnit)
1. 因为是函数组件，直接处理children，执行reconcileChildren(fiber, children)，children 就是函数的返回值, 也就是 button
2. oldFiber = fiber.alternate?.child，没有 oldFiber, 创建(注意effectTag是 ："PLACEMENT")新的 newfiber 并挂载到 fiber.child 上
4. 当前 fiber tree 结构如下图
![](Pasted%20image%2020240122185830.png)
5. 返回 fiber.child。nextWorkOfUnit = fiber.child 
#### 第三次执行 performUnitOfWork(nextWorkOfUnit)
1. 执行 updateHostComponent
2. 没有 dom 创建dom，并关联dom，fiber.dom = dom。更新属性props
3. 处理 children，执行 reconcileChildren
4. oldFiber = fiber.alternate?.child，没有 oldFiber, 创建(注意effectTag是 ："PLACEMENT")新的 newfiber 并挂载到 fiber.child 上
5.  当前 fiber tree 结构如下图 
![](Pasted%20image%2020240122190108.png)

5. 返回 fiber.child。nextWorkOfUnit = fiber.child
#### 第四次执行performUnitOfWork(nextWorkOfUnit)
1. 执行 updateHostComponent
2. 没有 dom 创建dom，并关联dom，fiber.dom = dom。更新属性props
3. 处理 children，执行 reconcileChildren 没有 children
4. 返回 fiber.child，为 null。
5. 5.  当前 fiber tree 结构如下图 
![](Pasted%20image%2020240122190224.png)

#### 结束 performUnitOfWork 调用
#### 进入 commitRoot 阶段