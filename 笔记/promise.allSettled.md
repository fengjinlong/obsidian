## Promise.allSettled
#### 1 关键点
  1. 方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果
  2. 多个彼此不依赖的异步任务成功完成时，或者你总是想知道每个promise的结果时，通常使用它。
  3. 对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。
  4. value（或 reason ）反映了每个 promise 决议（或拒绝）的值。
  5. 参数 iterable 是一个可迭代的对象，例如Array，其中每个成员都是Promise，非 Promise 参数转换成 Promise 了
#### 2 代码实现
**建议先看一下 [[promise.all]]**
```js
class myPromise{
  static allSettled(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result: any[] = []; // 存储结果
        let count = 0; // 计数器

        // 如果传入的是一个空数组，那么就直接返回一个resolved的空数组promise对象
        if (promises.length === 0) return resolve(promises);
        promises.forEach((item, index) => {
          myPromise.resolve(item).then(
            (value) => {
              count++;
              result[index] = {
                status: "fulfilled",
                value,
              };
              // 所有给定的promise都已经fulfilled或rejected后,返回这个promise
              count === promises.length && resolve(result);
            },
            (reason) => {
              count++;
              result[index] = {
                status: "rejected",
                value: reason,
              };
              // 所有给定的promise都已经fulfilled或rejected后,返回这个promise
              count === promises.length && resolve(result);
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