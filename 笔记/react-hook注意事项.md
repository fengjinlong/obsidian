React Hooks在平时开发中需要注意的问题和原因
1. 不要在循环，条件或嵌套函数中调用Hook，必须始终在 React函数的顶层使用Hook
2. 使用useState时候，使用push，pop，splice等直接更改数组对象的坑
使用push直接更改数组无法获取到新值，应该采用析构方式，但是在class里面不会有这个问题。代码示例：
3. 善用useCallback
父组件传递给子组件事件句柄时，如果我们没有任何参数变动可能会选用useMemo。但是每一次父组件渲染子组件即使没变化也会跟着渲染一次。
4. 不要滥用useContext 可以使用基于 useContext 封装的状态管理工具。

5. `useContext` 是 `React` 官方推荐的共享状态的方式，然而在需要**共享状态的组件非常多的情况下，这有着严重的性能问题**，例如有A/B组件， A 组件只更新 `state.a`，并没有用到 `state.b`，B 组件更新 `state.b` 的时候 A 组件也会刷新，在组件非常多的情况下，就卡死了，用户体验非常不好。解决办法是 封装一层,通过 props 访问数据
```jsx
// App
import { useCallback, useMemo } from "react";
export const Con = createContext({ a: 0, b: 0 });

// 测试 useContext
function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const click = () => {
    setA(a + 1);
  };
  const click2 = () => {
    setB(b + 1);
  };
  const C11 = useMemo(() => {
    return <C1 a={a} />;
  });
  return (
    <div className="App">
      <Con.Provider value={{ a, b }}>
        {C11}
        <C2 />
        <button onClick={click}>change a</button>
        <button onClick={click2}>change b</button>
      </Con.Provider>
    </div>
  );
}

export default App;

// C1
// import React, { useContext } from "react";
// import { Con } from "./App";
// const C1 = () => {
// 总是重新渲染
//   const { a } = useContext(Con);
//   console.log("C1 render", a);
//   return <div>C1</div>;
// };
// export default React.memo(C1);

// 解决方案 改用 props
import React, { useContext } from "react";
const C1 = ({ a }) => {
  console.log("C1 render", a);
  return <div>C1</div>;
};
export default React.memo(C1);

// C2
import { useContext } from "react";
import { Con } from "./App";
const C2 = () => {
  const { b } = useContext(Con);
  console.log("C2 render", b);
  return <div>C2</div>;
};
export default C2;
```



