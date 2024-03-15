### react 是没有 update 方法的，状态的更新是 useState 触发的，核心逻辑也就是 update 方法
### case 1 解决返回状态和改变状态的功能？
1. 组件
```jsx
function Foo() {
  const [count, setCount] = React.useState(10);
  function handleClick() {
    setCount((c) => c + 1);
  }

  return (
    <div>
      {count}
      <button onClick={handleClick}>click</button>
    </div>
  );
}
```

2. useState 实现

```js
function useState(initial) {

  let currentFiber = wipFiber;
  
  const stateHook = {
    state: initial,
  };

  function setState(action) {
    stateHook.state = action()

	// 赋值 nextWorkOfUnit，进行 performUnitOfWork 逻辑
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextWorkOfUnit = wipRoot;
  }
  
  return [stateHook.state, setState];
}
```

**一切看着那么美好🌹，但是... ....
click 点击 虽然 state 改变了，再次执行 performUnitOfWork，再次 执行reconcileChildren 之前，获取 children 的时候，执行 Foo(), const [count, setCount] = React.useState(10); useState 的初始值还是 10，state 又被改变成 10了**

### case 2 怎么保存更新后的 state？
1. 当 触发 setState 的时候，把 state 保存到当前的 fiber 上
2. 上一次的fiber 如果有保存的state，那就返回，没有就返回 initial 
3. 所以 把 当前 的state 保存在此时的fiber 节点上

```js
function useState(initial) {
  let currentFiber = wipFiber;

  const oldHook = currentFiber.alternate?.stateHook;
  const stateHook = {
    state: oldHook ? oldHook.state : initial,
  };
  // 保存 stateHook 到 此时的 fiber
  currentFiber.stateHook = stateHook;

  function setState(action) {
    stateHook.state = action(stateHook.state);
    // 赋值 nextWorkOfUnit，进行 performUnitOfWork 逻辑
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };

    nextWorkOfUnit = wipRoot;
  }

  return [stateHook.state, setState];
}
```

**这样每个 fiber 只有一个 stateHook ，如果用户执行多个不一样的hook，那么就出现的问题**

### case 3 处理多个 state 
 1. 组件
```jsx
function Foo() {
  const [count, setCount] = React.useState(10);
  const [bar, setBar] = React.useState(20);
  function handleClick() {
    setCount((c) => c + 1);
    setBar((c) => c + 10);
  }

  return (
    <div>
      {count}
      {bar}
      <button onClick={handleClick}>foo click </button>
    </div>
  );
}
```

2. 我们需要一个收集 stateHook 的数组，更新时候统一执行。并通过 索引 来安排执行顺序，顺序不能乱。这也就是 为什么 hook 不能放在 if 逻辑里面的原因。 
3. 函数组件初始化时候，从第一个 hook 开始执行。
4. useState 实现
```js
// 全局
let stateHooks;
let stateHookIndex;

function useState(initial) {
  let currentFiber = wipFiber;

  const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex++];
  const stateHook = {
    state: oldHook ? oldHook.state : initial,
  };

  stateHooks.push(stateHook);
  currentFiber.stateHooks = stateHooks;

  function setState(action) {
    stateHook.state = action(stateHook.state);

    // 赋值 nextWorkOfUnit，进行 performUnitOfWork 逻辑
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextWorkOfUnit = wipRoot;
  }
  return [stateHook.state, setState];
}

// performUnitOfWork 处理 FC 的逻辑
function updateFunctionComponent(fiber) {
  wipFiber = fiber;
  stateHookIndex = 0;
  stateHooks = [];
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
```

### case3 的详细的执行流程
1. updateFunctionComponent 处理  Foo 组件，执行Foo()，stateHookIndex = 0，stateHooks = []
2. 执行 const [count, setCount] = React.useState(10);
	1. const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex++]，oldHook 是 undefined;  
	2. stateHook = { state: 10 }; stateHooks = [  { state: 10 } ]；此时FooFiber.stateHooks =  [  { state: 10 } ]
	3. 返回 [ 10 , setStateCount ]
3. 执行 const [bar, setBar] = React.useState(20);
	1. const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex++]，oldHook 是 undefined;  
	2. stateHook = { state: 10 }; stateHooks = [  { state: 20 } ]；此时FooFiber.stateHooks =  [  { state: 10 }，{ state: 20 } ]
	3. 返回 [ 20 , setStateBar ]
4. 由于**闭包**，setStateCount 和 setStateBar 记录的内容是不一样的
	1. setStateCount 记录的 stateHook 是 {state: 10}
	2. setStateBar 记录的 stateHook 是 {state: 20}
5. Foo 返回 children，进行后续 reconcileChildren，
6. 递归 performUnitOfWork，直到渲染出页面
7. 点击按钮触发 click事件， 分别执行 setCount((c) => c + 1);setBar((c) => c + 10); 分别执行 stateHook.state = action(stateHook.state); 数据如下8, 9 进行变化
8. 执行 setCount((c) => c + 1)，也就是setStateCount((c) => c + 1)
	1. FooFiber.stateHooks =  [  { state: 11 }，{ state: 20 } ]
9. 执行 setBar((c) => c + 10)，也就是setStateBar((c) => c + 10)
	1. FooFiber.stateHooks =  [  { state: 11 }，{ state: 30 } ]
10. wipRoot = { ...FooFiber, alternate: FooFiber }
11. click事件执行完毕，nextWorkOfUnit = wipRoot。工作单元有值，继续进行performUnitOfWork 操作
12. updateFunctionComponent 处理  Foo 组件，执行Foo()；stateHookIndex = 0，stateHooks = []
13. 执行 const [count, setCount] = React.useState(10);
	1. const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex++]，oldHook 是 { state: 11 }; currentFiber 是 新的FooFiber, 也就是wipRoot
	2. stateHook = { state: 11 }; stateHooks = [  { state: 11 } ]；此时FooFiber.stateHooks =  [  { state: 11 } ]
	3. 返回 [ 11 , setStateCount ]
14. 执行 const [bar, setBar] = React.useState(20);
	1. const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex++]，oldHook 是 { state: 30 }; currentFiber 是 新的FooFiber, 也就是wipRoot
	2. stateHook = { state: 30 }; stateHooks = [  { state: 30 } ]；此时FooFiber.stateHooks =  [  { state: 11 }，{ state: 30 } ]
	3. 返回 [ 30 , setStateBar ]
15. Foo 返回 children，进行后续 reconcileChildren， 
16. 递归 performUnitOfWork，直到渲染出新的页面

### case 4 批量更新，同时处理 非函数 action
1. 多次 相同的 setState 只执行一次更新
```js
function useState(initial) {
  let currentFiber = wipFiber;

  const oldHook = currentFiber.alternate?.stateHooks[stateHookIndex++];
  const stateHook = {
    state: oldHook ? oldHook.state : initial,
    queue: oldHook ? oldHook.queue : [],
  };
  // 批量处理
  stateHook.queue.forEach((action) => {
    stateHook.state = action(stateHook.state);
  });
  stateHook.queue = [];

  stateHooks.push(stateHook);
  currentFiber.stateHooks = stateHooks;

  function setState(action) {
	// 收集 action，处理 非函数action
    stateHook.queue.push(typeof action === "function" ? action : () => action);
    
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextWorkOfUnit = wipRoot;
  }
  return [stateHook.state, setState];
}
```

### case 5 优化非必要的更新
1. state 的值没有改变就没有必要更新
```js
function useState(initial) {
  // ...
  function setState(action) {
    const eagerState =
      typeof action === "function" ? action(stateHook.state) : action;
    // 非不要更新
    if (eagerState === stateHook.state) {
      return;
    }

    stateHook.queue.push(typeof action === "function" ? action : () => action);
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextWorkOfUnit = wipRoot;
  }
  return [stateHook.state, setState];
}
```