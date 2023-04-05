![](Pasted%20image%2020230404222502.png)

1. reactElement 用来第一次渲染转成真实 dom，拿到 nodes, 保存 state，拿到相应的 node
2. vue 的keepAlive 是框架提供的，react 没有提供，我们缓存组件，必然要对组件进行封装
```jsx
import { KeepAlive, keepAliveTransfer } from "./KeepAlive";

import About from "./components/About";
import Home from "./components/Home";
const AliveAbout  = keepAliveTransfer(About, "about");
const AliveHome = keepAliveTransfer(Home, "home");

<keepAlive>
	<button></button>
	<Routes>
		<Route path="/" element={<AliveHome />} />
		<Route path="/about" element={<AliveAbout />} />
	</Routes>
</keepAlive>

// 主要实现的是 KeepAlive, keepAliveTransfer 这两个方法
```

3. 第一次渲染state 存 nodes，第二次渲染直接复用 state 的 node 
4. 父组件肯定是 <KeepAlive>, 所以 由 它 控制 子组件的 state 
5. 数据传递用 Context.Provider。父组件给子组件传递 useReducer，子组件调用并改变 父组件的 state
6. 父组件的 state --- id --- { 组件信息 }
```js
{
	home: {
		...
	},
	about: {
		...
	}
}
```

7. 第一次渲染，进入路由组件,  K 对应的 id 的 states 没有缓存的 nodes , K 代表 keepAlive 组件，T 代表包裹组件 keepAliveTransfer
	1. K 通过 reactElement 渲染出相应的 Home 组件
	2. 渲染子组件 T, 发现没有缓存的 nodes , 以{ id, reactElement } 向父组件K 发送 dispatch, K 此时 的 state 记录了 id, reactElement 。
	3. K 由于第一步已经有了 Home 视图，可以通过 ref={ node => { ... } } 方式拿到 视图的 node, 并发送 dispatch , 更新 自己的 state , state 有了 nodes 属性，记录当前的 dom 节点。
	4. K state 变化，导致子组件 T 从新 渲染。
	5. T 渲染时候，判断 K 对应的 id -> state 上存在 nodes（真实的 dom)。直接将之前保存的 nodes 移动到自己的 子节点。
	6. _ref.current.appendChild(node)  注意   这里是移动！移动！移动！
```jsx
// 7-1 
function KeepAlive(props) {
  return (
    <KeepAliveContext.Provider
      value={{ keepAliveStates, setKeepAliveState, dispatch }}
    >
      {props.children}
      {Object.values(keepAliveStates).map(({ keepAliveId, reactElement }) => {
        return (
          <div ref={(node) => { ... }}>
	        // 这里更具 reactElement 创建 dom, 是为了初始存 相应的 nodes
	        // 初始化的最后，会将这里的 dom 移走！移走！移走！
	        // 移走到 T 组件内
            {reactElement}
          </div>
        );
      })}
    </KeepAliveContext.Provider>
  );
}
```

8. 第二次渲染, 切换 T 组件，能够查找到 缓存的 nodes
	1. T 直接将 nodes 移动到自己的 children 位置
	2. 不用在渲染 reactElement 了 ，也就是不用在执行 <Home />

```jsx
function keepAliveTransfer(KeepAliveComponent, keepAliveId) {
  return function (props) {

    const _ref = useRef(null);
    useEffect(() => {
      const state = keepAliveStates[keepAliveId];

      if (state && state.nodes) {
        state.nodes.forEach((node) => {
          _ref.current.appendChild(node);
        });
      } else {
       // 第一次
      }
    }, [keepAliveStates, setKeepAliveState, props]);
    return <div ref={_ref}></div>;
  };
}
```