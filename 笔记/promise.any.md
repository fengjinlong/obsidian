## Promise.any
#### 使用
```js
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"
```
#### 本质上，这个方法和Promise.all()是相反的。
1. Promise.any() 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。
2. 如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个 **失败的** promise 和AggregateError类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。
3. 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
4. 如果传入的参数不包含任何 promise，则返回一个 异步完成 （asynchronously resolved）的 Promise。(即将非Promise值，转换为Promise并当做成功)
5. 只要传入的迭代对象中的任何一个 promise 变成成功（resolve）状态，或者其中的所有的 promises 都失败，那么返回的 promise 就会 异步地（当调用栈为空时） 变成成功/失败（resolved/reject）状态。(如果所有Promise都失败，则报错)

#### 实现
```js
class myPromise{
  static any(promises) {
    return new myPromise((resolve, reject) => {
      // 参数校验
      if (Array.isArray(promises)) {
        let errors = []; //
        let count = 0; // 计数器

        // 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
        if (promises.length === 0)
          return reject(new AggregateError("All promises were rejected"));

        promises.forEach((item) => {
          // 非Promise值，通过Promise.resolve转换为Promise
          myPromise.resolve(item).then(
            (value) => {
              // 只要其中的一个 promise 成功，就返回那个已经成功的 promise
              resolve(value);
            },
            (reason) => {
              cout++;
              errors.push(reason);
              /**
               * 如果可迭代对象中没有一个 promise 成功，就返回一个失败的 promise 和AggregateError类型的实例，
               * AggregateError是 Error 的一个子类，用于把单一的错误集合在一起。
               */
              cout === promises.length && reject(new AggregateError(errors));
            }
          );
        });
      } else {
        return reject(new TypeError("Argument is not iterable"));
      }
    });
  }
}
```