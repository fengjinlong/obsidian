```ts
const TestMemery: React.FC = () => {
  const [age, setAge] = useState(0);
  const click2 = useCallback(() => { // useCallback
    setAge((age) => age + 1);
  }, []);
  return (
    <div>
      <button onClick={click2}>{age}</button>
      <Child click={click2} /> // 保证 props 不变，React.Memo 才生效
    </div>
  );
};

// 
interface P {
  click: () => void;
}
const Child: React.FC<P> = (props: P) => {
  return (
    <div>
      <button onClick={props.click}>{age}</button>
    </div>
  );
};
export default React.memo(Child); // React.memo
```