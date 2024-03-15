1. # Profiler
```jsx

``import React, { useState, Profiler } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const onRender = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    console.log({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
      interactions,
    });
  };
  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Profiler id="child" onRender={onRender}>
        <Child />
      </Profiler>
    </>
  );
}
// 以下 actualDuration === 0 
const Child1 = React.memo(() => {
  console.log("child no reRender");
  return <div>Child</div>;
});
// 以下 actualDuration !== 0
const Child = () => {
  console.log("child reRender");
  return <div>Child</div>;
};