1. app.component 全局组件
```js

const app = createApp(App);
app.component("my-c", C);

app.mount("#app");
```

2. app.use 插件
```js

// index.js
import U from "./u.vue";

export default {
	install(A) {
		A.component("UU", U);
	},
};

import UU from "./index.js";
const app = createApp(App);

app.use(UU).mount("#app");
```