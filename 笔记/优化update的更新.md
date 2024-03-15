### 问题：如果按照[update 逻辑](update%20逻辑.md)的更新逻辑
1. 任何一个组件的更新后，如果通过执行 React.update 方法从root 重新渲染一次（ commitWork(wipRoot.child) ），造成性能损失。
2. 我们只想单一组件的更新只影响它自己内部（包括子组件）的更新，而不会引起兄弟节点的重新渲染
### 解决方案：只要在 commitWork(wipRoot.child) 阶段，把Root 改为当前更新的组件，这样，只会 commit 当前更新的组件，而不影响兄弟组件。这样要解决两件事情：
#### 问题一 怎么记录当前更新的fiber
#### 问题二 怎么停止递归 performUnitOfWork

```jsx
// 组件结构
let countFoo = 1;
function Foo() {
  console.log("foo return");
  const update = React.update();
  function handleClick() {
    countFoo++;
    update();
  }

  return (
    <div>
      <button onClick={handleClick}>foo click {countFoo}</button>
    </div>
  );
}

let countBar = 1;
function Bar() {
  console.log("bar return");
  const update = React.update();
  function handleClick() {
    countBar++;
    update();
  }

  return (
    <div>
      <button onClick={handleClick}>bar click {countBar}</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <Foo></Foo>
      <Bar></Bar>
    </div>
  );
}
export default App;
```
#### 解决问题 1
1. 把 React.update() 方法改成一个闭包的方式，在 render 时期，执行一次React.update()，返回一个 update 函数，这个 update 函数  记录一个当前 fiber 的记录。由于是闭包，所以每次记录的 fiber 都是不一样的。
2. 当 click，执行 update 函数，把当前的 fiber 信息赋值给 wipRoot，给后续的commitWork 调用，到此，已经找到了当前更新的 fiber 根节点。同时记录 当前的工作单元 nextWorkOfUnit = wipRoot
3. nextWorkOfUnit != null 为 performUnitOfWork 的执行条件（铺垫第二个问题）
```jsx
function update() {
  let currentFiber = wipFiber;
  return () => {
    wipRoot = {
      ...currentFiber,
      alternate: currentFiber,
    };
    nextWorkOfUnit = wipRoot;
  };
}
```

#### 解决问题 2 （点击 Foo 组件的click）

1. 解决问题一后可以按照之前的逻辑执行了，执行 nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit)
	1. performUnitOfWork(Foo)
	2. performUnitOfWork(div)  UPDATE
	3. performUnitOfWork(button)  UPDATE
	4. performUnitOfWork(foo click)  UPDATE
	5. performUnitOfWork({countFoo})  UPDATE
	6. performUnitOfWork(Bar) 这里就是问题的所在了，Foo 的更新不要引起 Bar 的 performUnitOfWork 流程。也就是说，就不能执行到  performUnitOfWork(Bar)。
	7. 也就是 performUnitOfWork({countFoo})  UPDATE 后续 如果 返回 Bar，就不要执行 performUnitOfWork
2. 关键：Foo 组件 performUnitOfWork 如果返回 兄弟 fiber 作为工作单元，就不要执行 performUnitOfWork 了

```jsx
 while (!shouldYield && nextWorkOfUnit) {
    nextWorkOfUnit = performUnitOfWork(nextWorkOfUnit);
    if (wipRoot?.sibling?.type === nextWorkOfUnit?.type) {
      nextWorkOfUnit = undefined;
      // 跳出 whild 循环
    }
  }
  ```



  3. 这样  commitWork 阶段，只是 commitWork(fooFiber.child), 后续的
	  1. updateProps
	  2. commitWork(fooFiber.child.child);
	  3. commitWork(fooFiber.child.sibling);
4. 不执行 Bar 的 performUnitOfWork 也就不执行 fiber.type(fiber.props)，Bar 也就不会 再次执行了。


[代码](https://github.com/fengjinlong/mini-react/blob/updateChildren/core/React.js)