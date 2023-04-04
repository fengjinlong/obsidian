-   shouldComponentUpdate
-   memo
-   getDerviedStateFromProps
-   使用Fragment
-   v-for使用正确的key
-   拆分尽可能小的可复用组件，ErrorBoundary
-   使用React.lazy和React.Suspense延迟加载不需要立马使用的组件

看 bilibili 
https://space.bilibili.com/453618117?share_medium=android&share_plat=android&share_session_id=5d91a556-8e76-43f8-9629-59863bab68de&share_source=COPY&share_tag=s_i&timestamp=1651585919&unique_k=RqJZrr3


![](Pasted%20image%2020230403150357.png)
![](Pasted%20image%2020230403150704.png)
#### 父组件的 传给子组件的 state 不变，子组件的 props(父的 state)，state，context 不变才能性能优化

## 变与不变分离开

demo1
```ts
function App() {
  const [count, setCount] = useState(1);
  const click = () => {
    setCount((c) => c + 1);
  };
  return (
    <div className="App">
      <button onClick={() => click()}>btn{count}</button>
      <Child />
    </div>
  );
}
function Child() {
  console.log("child render");
  return <div>child</div>;
}

export default App;
```

<font  color=yellowGreen>demo1 优化 💐💐💐💐💐💐</font>
```ts
function App() {
  // const [count, setCount] = useState(1);
  // const click = () => {
  //   setCount((c) => c + 1);
  // };
  return (
    <div className="App">
      <Change />
      <Child />
    </div>
  );
}
function Change() {
  const [count, setCount] = useState(1);
  const click = () => {
    setCount((c) => c + 1);
  };
  return (
    <>
      <button onClick={() => click()}>btn{count}</button>
    </>
  );
}
function Child() {
  console.log("child render");
  return <div>child</div>;
}
export default App;
```

demo2,  children 抽离
```ts
function App() {
  const [count, setCount] = useState(1);
  const click = () => {
    setCount((c) => c + 1);
  };
  return (
    <div className={"class" + count}>
      <button onClick={() => click()}>btn</button>
      <Child />
    </div>
  );
}

function Child() {
  console.log("child render");
  return <div>child</div>;
}

export default App


```

 <font  color=yellowGreen>demo2 优化 💐💐💐💐💐💐</font>
```ts
function App() {
  // const [count, setCount] = useState(1);
  // const click = () => {
  //   setCount((c) => c + 1);
  // };
  return (
    // <div className={"class" + count}>
    //   <button onClick={() => click()}>btn</button>
    //   <Child />
    // </div>
    <Parent>
      <Child />
    </Parent>
  );
}

function Parent({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(1);
  const click = () => {
    setCount((c) => c + 1);
  };
  return (
    <div className={"class" + count}>
      <button onClick={() => click()}>btn</button>
      {children}
    </div>
  );
}

function Child() {
  console.log("child render");
  return <div>child</div>;
}

export default App;
```

demo3 , useMemo 缓存组件  💐💐💐💐💐💐
如果useMemo 缓存一个组件，且依赖是 [], 也能起到缓存效果
```ts
function App() {
  const [count, setCount] = useState(1);
  const click = () => {
    setCount((c) => c + 1);
  };

  return (
    <div>
      <button onClick={() => click()}>btn{count}</button>
      <C />
    </div>
  );
}
const C = () => {
  return useMemo(() => {
    return <Child />;
  }, []);
};
function Child() {
  console.log("child rendera"); // 不会重复渲染
  return <div>child</div>;
}

export default App;
```

3. 当比较 props 时候
	1. react 默认是全等的，即使 props（对象类型） 没有变化，也是不等的，{} !== {}。使用 React.memo 时候， props进行的 是浅比较，也就是 {} === {}，这样，父组件的 props 没有变化，更容易命中优化。也就是全等比较高效，但不以命中；浅比较低效，但易命中


![](Pasted%20image%2020230403153805.png)

应用 devtool 排查

useMemo 起作用的前提是组件必须是浅比较
