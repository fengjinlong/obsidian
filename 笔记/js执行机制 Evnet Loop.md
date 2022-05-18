## Event Loop
在`JavaScript`中，任务被分为两种，一种宏任务（`MacroTask`）也叫`Task`，一种叫微任务（`MicroTask`）

### MacroTask（宏任务）
-   `script`全部代码、`setTimeout`、`setInterval`、`I/O`、`UI Rendering`。

### MicroTask（微任务）
-   `Process.nextTick（Node独有）`、`Promise`、`Object.observe(废弃)`、`MutationObserver`

## 浏览器中的Event Loop
`Javascript` 有一个 `main thread` 主线程和 `call-stack` 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

### JS调用栈
JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

### 同步任务和异步任务

`Javascript`单线程任务被分为**同步任务**和**异步任务**，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。
![](Pasted%20image%2020220518215339.png)
任务队列`Task Queue`，即队列，是一种先进先出的一种数据结构

![](Pasted%20image%2020220518221851.png)
执行栈在执行完**同步任务**后，查看**执行栈**是否为空，如果执行栈为空，就会去检查**微任务**(`microTask`)队列是否为空，如果为空的话，就执行`Task`（宏任务），否则就一次性执行完所有微任务。  
每次单个**宏任务**执行完毕后，检查**微任务**(`microTask`)队列是否为空，如果不为空的话，会按照**先入先**出的规则全部执行完**微任务**(`microTask`)后，设置**微任务**(`microTask`)队列为`null`，然后再执行**宏任务**，如此循环。

🌰
```js
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});
console.log('script end');
// script start、script end、promise1、promise2、setTimeout
```

```js
console.log('script start') // 1

async function async1() {
  await async2()
  console.log('async1 end') // 5
}
async function async2() {
  console.log('async2 end') // 2
}
async1()

setTimeout(function() {
  console.log('setTimeout') // 8
}, 0)

new Promise(resolve => {
  console.log('Promise') // 3
  resolve()
})
  .then(function() {
    console.log('promise1') // 6
  })
  .then(function() {
    console.log('promise2') // 7
  })

console.log('script end') // 4 


```
`async/await` 在底层转换成了 `promise` 和 `then` 回调函数。  
也就是说，这是 `promise` 的语法糖。  
每次我们使用 `await`, 解释器都创建一个 `promise` 对象，然后把剩下的 `async` 函数中的操作放到 `then` 回调函数中。
```js
async function f() {
  await p
  console.log('ok')
}

// 简化理解为：
function f() {
  return RESOLVE(p).then(() => {
    console.log('ok')
  })
}

```


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

