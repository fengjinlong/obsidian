1. currentRoot 记录当前的 fiber结构 
	1. 在commitRoot 时候，执行完统一提交, 也就是commitWork
	2. 在清空当前正在处理的wipRoot之前，赋值 currentRoot = wipRoot
```jsx
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

```js
// 此时 fiber 结构
currentRoot = {
	dom: div#root, // 根节点
	props: {
		children: [
			{
				type: f App(), // App 函数组件，返回值 是 button
				props: { id: app}, // <App id='app' />
			}
		]
	},
	child: {
		dom: null, // App 函数组件 没有 dom
		effectTag: "PLACEMENT", // 首次 添加
		parent: {dom:div#roo, props: {}, ...}, // 是上级 root根节点
		props: { id: app}, // <App id='app' />
		type: f App(), // App 函数组件，返回值 
		sibling: null, // App 没有兄弟
		child: {
			type: 'button', // App 的返回值
			sibling: null, // btn 没有兄弟
			dom: buttom#btn // button 元素
			effectTag: "PLACEMENT", // 首次 添加
			props: {
				id: btn, // btn 属性
				children: [ // 有一个文本节点 10
					{
						type: "TEXT_ELEMENT"，
						props: {
							nodeValue: 10
						}
					}
				],
				onClick: () => {}
			},
			parent: {}, // App 函数组件
			child: { // 那个文本是10的节点
				dom: text#10, // 10
				effectTag: "PLACEMENT",// 首次 添加
				parent: {}, // button
				props: {nodeValue: 10, children: Array(0)},
				sibling: null,
				type: "TEXT_ELEMENT"
			}
			
		}
		
	}
}
```

2. 此时页面呈现的是 一个 内容为10 的button，当点击按钮 时候，触发click 事件,conut 变为 11，然后执行 React.update 方法
3. React.update 方法
```js
function update() {
  wipRoot = {
    dom: currentRoot.dom,
    props: currentRoot.props,
    alternate: currentRoot,
  };

  nextWorkOfUnit = wipRoot;
}```

	1. 创建 新的 工作中的根节点 wipRoot，并与 currentRoot 建立关系 ，并赋给当前的工作单元 nextWorkOfUnit = wipRoot
	2. 工作中的根节点 wipRoot 生命周期是 从render 到 commitRoot，然后 赋值 null
	3. nextWorkOfUnit 最初是 wipRoot, 随着程序递归是发生变化的，直到为 null，进入 commitRoot 阶段
5. 执行 workLoop, 满足 performUnitOfWork 的执行条件, 处理各个工作单元
	1. div#root 
		1. 如果没有dom, 创建dom并updateProps：属性只有children，不用处理。
		2. reconcileChildren：fiber.child = {}

```js
fiber.child = { // fiber root, 这里的 child 是新加的 属性
	type: child.type, // 这个child是fiber.props.children里的child元素，如第一部分的结构，这个child 也就是 APP()
    child: null,
    sibling: null,
    parent: fiber,
    props: child.props, // 同上 child
    dom: oldFiber.dom, // oldFiber fiberRoot的alternate所指向的faber的 child，oldFiber = fiber.alternate?.child; 为 null
    effectTag: "UPDATE",
    alternate: oldFiber,
}
```

5. 执行下一轮 workLoop,
	1. App() 函数组件
		1.只处理reconcileChildren：
```js
fiber.child = { // 这里的 fiber 是 APP()对应的
	type: child.type, // 这个child是fiber.props.children里的child元素，如第一部分的结构，这个child 也就是 button
    child: null,
    sibling: null,
    parent: fiber,
    props: child.props, // 同上 child{id, children, onClick}
    dom: oldFiber.dom, // oldFiber fiberRoot的alternate所指向的faber的 child，oldFiber = fiber.alternate?.child; 为 button#dom
    effectTag: "UPDATE",
    alternate: oldFiber,
}
```
6. 执行下一轮 workLoop 
	1. button#btn 
		1. 如果没有dom, 创建dom并updateProps：children不用处理，id没变不处理，onClick 没变可以不出来
		2. reconcileChildren：fiber.child = {}
```js
fiber.child = { // 这里的 fiber 是 button 对应的
	type: child.type, // 这个child是fiber.props.children里的child元素，如第一部分的结构，这个child 也就是 text 类型 "TEXT_ELEMENT"
    child: null,
    sibling: null,
    parent: fiber,
    props: child.props, // 同上 child {nodeValue}
    dom: oldFiber.dom, // oldFiber fiberRoot的alternate所指向的faber的 child，oldFiber = fiber.alternate?.child; 为 button#dom
    effectTag: "UPDATE",
    alternate: oldFiber,
}
```
7. 执行下一轮 workLoop 
	1. text 节点
		1. 如果没有dom, 创建dom并updateProps：children = [] 不用处理，nodeValue 改变了，更新nodeValue
		2. reconcileChildren，没有children，不执行
8. 执行完毕，或者说，workLoop 里没有符合条件的 performUnitOfWork 了。
9. 进入 commitRoot(fiberRoot.child), 也就是 commitWork(fiber)
	1. PLACEMENT， 添加dom
	2. UPDATE，updateProps
	3. commitWork(fiber.child);
	4. commitWork(fiber.sibling);
	5. currentRoot = wipRoot;
	6. wipRoot = null; 结束更新的生命周期