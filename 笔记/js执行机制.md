```js
console.log("start");

setTimeout(() => {
  console.log("setTimeout1");
}, 0);

(async function foo() {
  console.log("async 1");

  await asyncFunction();

  console.log("async2");

})().then(console.log("foo.then"));

async function asyncFunction() {
  console.log("asyncFunction");

  setTimeout(() => {
    console.log("setTimeout2");
  }, 0);

  new Promise((res) => {
    console.log("promise1");

    res("promise2");
  }).then(console.log);
}

console.log("end");

```

-   最开始碰到 console.log("start"); 直接执行并打印出 `start`
-   往下走，遇到一个 setTimeout1 就放到`宏任务队列`
-   碰到立即执行函数 foo， 打印出 `async 1`
-   遇到 await 堵塞队列，先 `执行await的函数`
-   执行 asyncFunction 函数， 打印出 `asyncFunction`
-   遇到第二个 setTimeout2， `放到宏任务队列`
-   new Promise 立即执行，打印出 `promise1`
-   执行到 res("promise2") 函数调用，就是Promise.then。`放到微任务队列`
-   asyncFunction函数就执行完毕， 把后面的打印 async2 会放到`微任务队列`
-   然后打印出立即执行函数的then方法 `foo.then`
-   最后执行打印 `end`
-   开始执行微任务的队列 打印出第一个 `promise2`
-   然后打印第二个 `async2`
-   微任务执行完毕，执行宏任务 打印第一个 `setTimeout1`
-   执行第二个宏任务 打印 `setTimeout2`、
-   就此，函数执行完毕

