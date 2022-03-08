#### Vue 3.0获取单个DOM

```js
<template>
  <div ref="myRef">获取单个DOM元素</div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const myRef = ref(null);

    onMounted(() => {
      console.dir(myRef.value);
    });
    return {
      myRef
    };
  }
};
</script>

```

#### Vue 3.0获取多个DOM

```js
<template>
  <div>获取多个DOM元素</div>
  <ul>
    <li v-for="(item, index) in arr" :key="index" :ref="setRef">
      {{ item }}
    </li>
  </ul>
</template>

<script>
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const arr = ref([1, 2, 3]);

    // 存储dom数组
    const myRef = ref([]);

    const setRef = (el) => {
      myRef.value.push(el);
    };

    nextTick(() => {
      console.dir(myRef.value);
    });
    return {
      arr,
      setRef
    };
  }
};
</script>

```