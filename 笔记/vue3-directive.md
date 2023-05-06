```vue
<template>
  <div>
    <div v-demo="{ p: 'show' }">show</div>
    <div v-demo="{ p: 'hide' }">hide</div>
  </div>
</template>
```

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import D from "./directive";
const app = createApp(App);
app.use(D);
app.mount("#app");
```

```js
// directive.js
export default {
  install(Vue) {
    Vue.directive("demo", {
      // When the bound element is inserted into the DOM...
      mounted: function (el, binding) {
        console.log("binding", binding.value);
        const { p } = binding.value;
        if (p === "hide") {
          el.style.display = "none";
        }
      },
    });
  },
};

```