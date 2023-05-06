```jsx
import React, { useRef, useImperativeHandle } from "react";

// const TextInput = React.forwardRef((props, ref) => {
//   return <input ref={ref}></input>;
// });
const TextInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  // 关键代码
  // 只是暴露出父组件需要的值或者方法，这样可以让代码更加明确
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log("focus");
      inputRef.current.focus();
    },
  }));
  return (
    <div>
      <input ref={inputRef} />
    </div>
  );
});
// 测试 ref
function App() {
  const click2 = () => {
    inputEl.current.focus();
  };

  const inputEl = useRef(null);
  return (
    <div className="App">
      <TextInput ref={inputEl} />
      <button onClick={click2}>change b</button>
    </div>
  );
}

export default App;```