## .watch 和 watchEffect 区别

我们已经大概知道了 `watch` 和 `watchEffect` 的用法，那么它们之间的区别相信大家也了解了一些，这里我们总结一下它们之间的区别。

-   `watch` 和 `watchEffect` 都能监听响应式数据的变化，不同的是它们监听数据变化的方式不同。
-   `watch` 会明确监听某一个响应数据，而 `watchEffect` 则是隐式的监听回调函数中响应数据。
-   `watch` 在响应数据初始化时是不会执行回调函数的，`watchEffect` 在响应数据初始化时就会立即执行回调函数。
