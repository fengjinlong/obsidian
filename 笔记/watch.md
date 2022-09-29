## .watch 和 watchEffect 区别

我们已经大概知道了 `watch` 和 `watchEffect` 的用法，那么它们之间的区别相信大家也了解了一些，这里我们总结一下它们之间的区别。

-   `watch` 和 `watchEffect` 都能监听响应式数据的变化，不同的是它们监听数据变化的方式不同。
-   `watch` 会明确监听某一个响应数据，而 `watchEffect` 则是隐式的监听回调函数中响应数据。
-   `watch` 在响应数据初始化时是不会执行回调函数的，`watchEffect` 在响应数据初始化时就会立即执行回调函数。



# watch

## 不同数据类型的监听

基础数据类型的监听：

```js
const name = ref<string>('张三')
watch(name, (newValue, oldValue) => {
  console.log('watch===', newValue, oldValue)
})

```

复杂数据类型的监听：

```js
interface UserInfo {
  name: string
  age: number
}

const userInfo = reactive<UserInfo>({
  name: '张三',
  age: 10
})
// 监听整个对象
watch(userInfo, (newValue, oldValue) => {
  console.log('watch userInfo', newValue, oldValue)
})

// 监听某个属性
watch(() => userInfo.name,  (newValue, oldValue) => {
  console.log('watch name', newValue, oldValue)
})

```

## 支持监听多个源

在`Vue3`里，`watch`多了一个特性，可以传入一个数组同时侦听多个数据，这比起`Vue2`确实优雅多了，以往在`Vue2`中为了实现同时监听多个数据，往往需要借助computed，现在在Vue3里我们可以少一些不必要的代码了。

```js
const name = ref<string>('张三')
const userInfo = reactive({
  age: 18
})

// 同时监听name和userInfo的age属性
watch([name, () => userInfo.age], ([newName, newAge], [oldName, oldAge]) => {
  // 
})

```

# watchEffect

## watchEffect与watch的区别

相比`Vue2`，`Vue3多`了`watchEffect`这个API，`watchEffect`传入一个函数参数，该函数会立即执行，同时会响应式的最终函数内的依赖变量，并在依赖发生改变时重新运行改函数。

```js
const name = ref<string>('张三')
const age = ref<number>(18)

watchEffect(() => {
  console.log(`${name.value}：${age.value}`) // 张三：18
})

setTimeout(() => {
  name.value = '李四' // 李四：18
}, 3000)

setTimeout(() => {
  age.value = 20 // 李四：20
}, 5000)

```

和watch的区别：

-   运行时机不同，`watchEffect`会立即执行，相当于设置了`immediate: true`的`watch`。
-   `watchEffect`无法获取改变前后的值。
-   与`watch`显示的指定依赖源不同，`watchEffect`会自动收集依赖源。

## 用`watchEffect`还是`watch`？

建议在大部分时间里使用`watch`，避免一些不必要的重复触发。

