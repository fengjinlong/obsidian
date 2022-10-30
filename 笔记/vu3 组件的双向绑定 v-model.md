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

`如果父组件是 v-model:age="",则 子组件对应的是 emit("update:age", 888);`


-   vue3 默prop与event为：`modelValue`和`update:modelValue`；vue2 中则是：`value`和`input`；
-   vue3 中直接通过 v-model 后面参数`v-model:msg`来指定属性名，并且`支持绑定多个 v-model`；而 vue2 中通过子组件的`model 属性中的prop值和event值`来指定属性名和事件名。
```js

<script setup> 
const props = defineProps({ foo: String }) 
const emit = defineEmits(['change', 'delete']) // setup code 
</script>
```