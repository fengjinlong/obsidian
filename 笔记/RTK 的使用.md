1. store/index.ts
```ts
import { createSlice, configureStore } from "@reduxjs/toolkit";
const stuSlice = createSlice({
  name: "stu",
  initialState: {
    name: "张三",
    age: 18,
  },
  reducers: {
    getStuName(state, action) {
      state.name = action.payload;
    },
    setAge(state, action) {
      console.log("a", action);

      state.age = action.payload;
    },
  },
});
console.log("stuSlice", stuSlice);
export const { getStuName, setAge } = stuSlice.actions;

const store = configureStore({
  reducer: {
    student: stuSlice.reducer,
  },
});
export default store;
```

2. demo
```tsx
import { useSelector, useDispatch } from "react-redux";
import { setAge } from "./store";

function StoreDemo() {
  const student = useSelector((state: any) => state.student);
  const dispatch = useDispatch();
  return (
    <div>
      <p>年龄：{student.age}</p>
      <button onClick={() => dispatch(setAge(21))}>change age</button>
    </div>
  );
}
export default StoreDemo;
```