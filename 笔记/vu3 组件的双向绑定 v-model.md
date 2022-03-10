### 父组件
```js
<template>
  <div class="home">
    <HelloWorld v-model="vvv" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  components: {
    HelloWorld,
  },
  setup() {
    const vvv = ref(2)
    return { vvv };
  },
};
</script>
```

`vv 必须是响应式数据`

### 子组件
```js
<template>
  <div>
    <h1>{{ modelValue }}</h1>
    <button @click="click">btn</button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
  },
  setup(props, { emit }) {
    return {
      click() {
        emit("update:modelValue", 888);
      },
    };
  },
};
</script>
```
`emit("update:modelValue", 888);`

`如果父组件是 v-model:age,则 子组件对应的是 emit("update:age", 888);`