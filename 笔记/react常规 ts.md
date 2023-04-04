https://juejin.cn/post/6844904175831089165#heading-0
## props 
```tsx
// 父组件
const App: React.FC = () => {
  return (
    <Layout a={0}>
      <Routes>
        <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Layout>
  );
};

// 子组件
interface Pro {
  children: React.ReactNode;
  a: number;
}
const Layout: React.FC<Pro> = (props) => {
  return (
    <div>
      {props.a}
      {props.children}
    </div>
  );
};
```

## useState
```tsx
const [state, setState] = useState<string | null>(null); 
// state的类型为 string | null
```

## useRef
```tsx
function Hello() {
  const p = useRef<HTMLParagraphElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input type="text" ref={input} />
      <button ref={btn}></button>
      <h1 ref={h1}>about - Hello</h1>
      <p ref={p}>{count}</p>
    </div>
  );
}
export default Hello;
```

## useReducer
```ts
// state类型
interface ReducerState {
  value: string;
}
// action类型
interface AnyAction {
  type: string;
  [key: string]: any;
}
// reducer函数
const reducer: React.Reducer<ReducerState, AnyAction> = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
// 初始值
const initialState: ReducerState = { value: "" };

const [state, dispatch] = useReducer(reducer, initialState);
// state 的类型为 ReducerState
// dispatch 的类型为 React.Dispatch<AnyAction>
```

## React.forwardRef
```ts
// 父组件 
function Hello() {
  console.log("rendering Hello");
  const [count, setCount] = React.useState(0);
  const click = () => {
    setCount(count + 1);
    console.log("ccc", (child.current!.innerHTML = count + ""));
  };
  const child = useRef<HTMLDivElement>(null);

  return (
    <div>
      <button onClick={click}>button</button>
      <Child ff={1} ref={child} />
    </div>
  );
}

// 子组件 
interface Props {
  ff: number;
}
const Child = React.forwardRef<HTMLDivElement, Props>(
  (props: any, ref: any) => {
    console.log("rendering Child");
    return (
      <div>
        <div ref={ref}>This is the C page</div>
      </div>
    );
  }
);
```

## useImperativeHandle
1. `useImperativeHandle`这个钩子可以把内部方法通过`ref`暴露出去
2. 需要使用到`React.forwardRef`
```ts
interface Handler {
  changeValue: (v: string) => void;
}
function Hello() {
  const click = () => {
    childRef.current!.changeValue("666");
  };
  const childRef = useRef<Handler>(null);
  return (
    <div>
      <button onClick={click}>button</button>
      <Child ff={1} ref={childRef} />
    </div>
  );
}
export default Hello;

// 子组件 
interface Props {
  ff: number;
}
const Child = React.forwardRef<HTMLDivElement, Props>(
  (props: any, ref: any) => {
    const inputRef = React.useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
      return {
        changeValue(v: string) {
          inputRef.current!.innerHTML = v;
        },
      };
    });
    return (
      <div>
        <div ref={inputRef}>This is the C page</div>
      </div>
    );
  }
);
```

## React.ForwardRefRenderFunction
定义为该类型的函数可以放进`React.forwardRef`函数中作为参数
```ts
import { Handler } from "./Hello";
interface Props {
  ff: number;
}
const forwardRender: React.ForwardRefRenderFunction<Handler, Props> = (props, ref) => {
  const inputRef = React.useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => {
    return {
      changeValue(v: string) {
        inputRef.current!.innerHTML = v;
      },
    };
  });
  return (
    <div>
      <div ref={inputRef}>This is the C page</div>
    </div>
  );
};
const Child = React.forwardRef<Handler, Props>(forwardRender);
```

## 事件处理
```ts
const App = () => {
  // React.MouseEventHandler
  const onClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  // React.ChangeEventHandler
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  // React.FocusEventHandler
  const onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    console.log(e.currentTarget.value);
  };
  return <input onClick={onClick} onChange={onChange} onFocus={onFocus} />;
};
```