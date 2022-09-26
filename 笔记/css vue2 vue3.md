### 1 scope

1.  当 `<style>` 标签有 `scoped` 属性时，它的 CSS 只作用于当前组件中的元素
    
2.  通过使用 PostCSS 来实现以下转换
    
3.  使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 scoped CSS 和子组件的 scoped CSS 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。
    
4.  你希望 `scoped` 样式中的一个选择器能够作用得“更深”，例如影响子组件
    
    1.  vue2 用 >>>
    2.  vue3 用 :deep(className)

### 2 vue3 v-bind 
![](image-20220926122232803.png)
![](image-20220926122250697.png)

全局的样式
```vue

<style scoped>
:global(.red) {
  color: red;
}
</style>

```

##### CSS Modules
1. 一个 < style module > 标记被编译为 CSS Module，并将生成的 CSS 类作为 $style 键下的一个对象向组件公开:
```vue

<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>

```

2. 自定义名称
```vue

<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>

```

3. with Composition API
```js

import { useCssModule } from 'vue'

// inside setup() scope...
// default, returns classes for <style module>
useCssModule()

// named, returns classes for <style module="classes">
useCssModule('classes')

```

4. v-bind 