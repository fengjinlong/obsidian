## Promise.race
#### 1 使用
```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```
#### 2 特性
1. Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
2. 一个待定的 Promise 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的返回值，从而异步地解析或拒绝（一旦堆栈为空）。
3. race 函数返回一个 Promise，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。
4. 如果传的迭代是空的，则返回的 promise 将永远等待。
5. 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。

#### 3 实现
```js
class myPromise {
  return new myPromise((resolve, reject) => {
    // 参数校验
    if (Array.isArray(promises)) {
      // 如果传入的迭代promises是空的，则返回的 promise 将永远等待。
      if (promises.length > 0) {
        promises.forEach((item) => {
          /**
           * 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，
           * 则 Promise.race 将解析为迭代中找到的第一个值。
           */
          myPromise.resolve(item).then(resolve, reject);
        });
      }
    } else {
      return reject(new TypeError("Argument is not iterable"));
    }
  });
}
```