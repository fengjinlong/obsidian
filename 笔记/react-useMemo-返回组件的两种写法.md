```ts
function App() {
  const [count, setCount] = useState(1);
  const click = () => {
    setCount((c) => c + 1);
  };

  const Child4 = useMemo(() => {
    console.log("child4 render");
    return <Child5 />;
  }, []);
  return (
    <div>
      <button onClick={() => click()}>btn{count}</button>

      {/* 注意 Child2 Child4 的使用方式 */}
      <Child2 />
      { Child4 }
      {/* 注意 Child2 Child4 的使用方式 */}
      
    </div>
  );
}
const Child2 = () =>
  useMemo(() => {
    console.log("child2 render");
    return <Child3 />;
  }, []);
const Child3 = () => {
  console.log("child3 render");
  return <p>child3</p>;
};
const Child5 = () => {
  console.log("child5 render");
  return <p>child5</p>;
};

export default App;
```