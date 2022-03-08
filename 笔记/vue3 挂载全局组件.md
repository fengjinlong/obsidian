### 收集要挂载的组件
```js

import VText from './VText'
import VButton from './VButton'
const components = {
  VText,
  VButton
}
const GlobalComponents = (app) => {
  Object.keys(components).forEach(key => {
    app.component(`${key}`, components[key])
  })
}
export default GlobalComponents

```
### 挂载到 app
```js
import GlobalComponents from "@/custom-component"; // 注册自定义组件

const app = createApp(App);
// 挂载组件
app.use(Antd).use(store).use(router).mount("#app");
GlobalComponents(app);
```
