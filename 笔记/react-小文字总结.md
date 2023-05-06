createContainer
- root
- hostRootFiber添加更新，并根据 容器 与 hostRootFiber 生成 root
  - hostRootFiber.updateQueue

updateContainer(element, root）
- element 是 reactElement 或者 null
- 将更新挂载到 hostRootFiber
- 根节点调度 更新
  - 将 root 传入 渲染流程，renderRoot(root);
- 普通节点调度 更新
  - 递归找到 root后，renderRoot(root);


#### renderRoot

更新流程的目的：

- 递归生成`wip fiberNode`树
- 标记副作用`flags`

更新流程的步骤：

- 递：`beginWork`
  - 返回子 fiberNode
- 归：`completeWork`

beginWork(wip)
- HostRoot 类型
  - 计算状态最新值 ( App )
  - 返回子 fiberNode 
    - reconcileChildren(wip, App)
- updateHostComponent
  - 返回子 fiberNode 
    - reconcileChildren(wip, children)
- HostText
  - 返回 null

#### reconcileChildren

current ？update : mount

mount 不添加 插入 flag，Placement

update 添加 插入 flag, Placement

那么怎么完成初始挂载呢？

- workLoop 之前，初始化时候 current 已经被赋值为 hostRootFiber。所以初始挂载根组件也是 update 流程



completeWork

需要解决的问题：

- mout ----  对于`Host`类型`fiberNode`：构建离屏DOM树
  - 构建 dom，插入到 dom 树中（ HostComponent, HostText  ）
  - 将子 fiber 的flag 冒泡到父 fiber 的flag（目的：根据父 fiber 的 flag 就知道子孙 有没有相应的flag 操作）（ HostComponent, HostText，HostRoot ，FunctionComponent ）
- upstae ----
- 标记 flag（TODO）

#### react内部3个阶段：

- schedule阶段
- render阶段（beginWork completeWork）
- commit阶段（commitWork）

`commit`阶段要执行的任务：

- `fiber`树的切换
- 执行`Placement`对应操作
- commit 三个子阶段
  - beforeMutation阶段
  - mutation阶段
  - layout阶段

commitRoot

- mutation flag
  - 递归查找带有相应的flag的所有fiber( 子孙，自己，兄弟，父 ) ，并进行dom操作
    - 子
    - 自己
    - 兄弟
    - 父

- 切换 root.current = finishedWork;



# hooks

定义一个**内部数据共享层**

```js
{
	currentDispatcher : {
		current: null
	}
};
```



fn fiber 不同阶段 给   内部共享层   挂载不同的 hooks

```js
当前 render的fn fiber -> currentlyRenderingFiber = {
  memoizedState: {
    hook1 : {
      memoizedState: data,
      updateQueue,
      next: hook2
    },
    hook2 : {...},
  }
}
```



##### useState mount 阶段的流程

- 从数据共享层拿到 mount 阶段的 useState

- 返回 [ initState, dispatch ]

-  dispatch    就是   const update = createUpdate(action);

    enqueueUpdate(updateQueue, update);

    scheduleUpdateOnFiber(fiber);

- dispatch

  - 创建当前fn fiber的 update，并插入更新队列
  - 在当前 fn 的 fiber 上调度更新，scheduleUpdateOnFiber( fiber1 )
  - scheduleUpdateOnFiber(fiber1) 根据 fiber1 找到根 root，然后执行 renderRoot(root)，完成 mount 流程



#### 更新流程

`update`流程与`mount`流程的区别。

对于`beginWork`：

- 删除
  - 能复用就复用

  - 不能复用，先标记删除，在创建

- 移动 ，多节点的移动就是diff


对于`completeWork`：标记 update flags 的过程

- 需要处理`HostText`内容更新的情况，标记 Update flag
- 需要处理`HostComponent`属性变化的情况

对于`commitWork`：

- 对于`ChildDeletion`，需要遍历被删除的子树
- 对于`Update`的 flags，需要更新文本内容

对于 useState

- 从数据共享层拿到 update 阶段的 useState



单节点 diff

- 这里的单节点指的是，新节点是单节点，老节点可能是多节点

- 对比type key ，如果存在不同，标记删除，再创建

多节点diff，**同级对比**，老的的 tree的结构，新的是 array 的结构

- 构建当前 fiber tree 的 map [ { key1, fiber1 },{ key2, fiber2 },{ key3, fiber3 },{ key4, fiber4 } ]
- 新 newReactElement 放在在 map 中查找是否存在复用的 fiber ，有就复用并在 map 中删除，没有就创建一个。此时 有一个 newFiber
- 最终构建一个 tree ，newFiber1 ---  newFiber2 ---newFiber3

- 老的 b1 c2 a3，新的 a3 b1 c2，哪些需要标记移动 flag
  - 首先定义当前最后不要移动的老节点的索引 lastOldIndexNoMove = 0
  - 因为我们遍历新 fiber的顺序是 从 0开始的，也就是 a3 b1 c2
    - 当遍历新节点 a3 时候，对应老节点的 a3 索引是 2，2 > 0 不需要移动，改变 lastOldIndexNoMove = 2
    - 当遍历新节点 b1 时候，对应老节点的 b1 索引是 0，0 < 2  需要移动，标记 移动flag
    - 当遍历新节点 c2 时候，对应老节点的 c2 索引是 1，1 < 2 不需要移动，标记 移动flag
- 此时 map 中 变成  [ { key4, fiber4 } ]，都标记删除

## 批处理

update 是个环状链表，添加 next lane 字段

fiberRootNode 添加需要处理的 lanes 和 正在处理的 lane



scheduleUpdateOnFiber

- 合并优先级
- 进入调度入口
  - 找到优先级最高的
  - 同步优先级 用微任务调度
    - 将同步 render 更新逻辑 fn 放入一个队列，并用微任务调度队列
    - 在 fn 的逻辑中， 再次判读是否是同步优先级，是就进行 render，不是就重新调度
      - render 的 beginwork 阶段 初始化时候全局挂载当前的 lane，在消费更新时候会判断是否 与当前的 lane 一样，一样才消费更新
  - 其他优先级 用宏任务调度
  - commitRoot 阶段清除已经执行的 lane


## useEffect

```js
export interface Effect {
	tag: Flags;
	create: EffectCallback | void;
	destroy: EffectCallback | void;
	deps: EffectDeps;
	next: Effect | null;
}

export interface FCUpdateQueue<State> extends UpdateQueue<State> {
	lastEffect: Effect | null;
}
```

1. **render阶段**  beginWork  renderWithHooks    初始化  相应的hooks

2. mountEffect

   1. ```
      	hook.memoizedState = pushEffect(
      		Passive | HookHasEffect,
      		create,
      		undefined,
      		nextDeps
      	);
      ```

   2. 

3. updateEffect

   1. 依赖相等, hook.memoizedState = pushEffect(Passive, create, destroy, nextDeps); 不需要执行副作用, commit阶段副作用是否执行的依据
   2. 依赖钱比较不相等 hook.memoizedState = pushEffect( Passive | HookHasEffect, create, destroy, nextDeps); 需要执行副作用，commit阶段副作用是否执行的依据

4. pushEffect 构成 effect 的环状链表

5. commit 阶段 

   1. 调度副作用
      1. 异步调度副作用，也就是 commit 阶段执行后，异步执行副作用 fn
   2. 将 副作用函数收集到 root
      1. 挂载 更新 删除之后 才进行 收集回调   root.pendingPassiveEffects = { unmount: [ ], update: [ ] }
   3. 执行副作用 fn，用顺序的   卸载的 destroy----更新的 destroy----更新的 creata
      1. 卸载阶段 执行 destroy 副作用，清空 unmount
      2. 更新 递归判处并执行 destroy，
      3. 更新 递归判处并执行 create 里面的副作用