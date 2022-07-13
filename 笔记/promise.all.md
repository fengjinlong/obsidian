# promise.all 
## 1 使用
promise.all([a,b,c]) 等待所有都完成，或者第一个失败
```js
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```
## 2 实现
#### 关键点 promise.all([a, b, c])
1. 返回一个promise
2. 参数校验 arg = [a, b, c], 
    2-1. 是数组，定义 记录执行个数count，返回的结果数组 result
    2-2. 不是数组，reject 参数错误
3. 如果传参 arg 是个 空的可迭代对象 返回一个已完成的 promise
4. 参数 a 是 promise 或者 thenable对象,返回一个已完成状态的 promise，就是调用 resolve 的静态方法。并进行 then 的操作
    4-1 onFullfilled 记录，赋值，判断是否都执行完
    4-2 onRejected 直接 reject
5. 参数 b 不是 promise ，原样返回在结果数组里。判断是否都执行完
#### 代码
```js

class myPromise {
  // 省略部分代码
  static all(promises) {
    // 1
    return new myPromise((resolve, reject) => {
      // 2-1
      if (Array.isArray(promises)) {
        let count = 0;
        let result = [];
        // 3
        if (promises.length === 0  || (value instanceof Object && 'then' in value)) {
          return resolve(promises);
        }
        promises.forEach((item, index) => {
          // 4
          if (item instanceof myPromise) {
            myPromise.resolve(item).then(
              (value) => {
                // 4-1
                count++;
                result[index] = value;
                count === promises.length && resolve(result);
              },
              (reason) => {
                // 4-2
                reject(reason);
              }
            );
          } else {
            count++;
            result[index] = item;
            count === promises.length && resolve(result);
          }
        });
      } else {
        // 2-2
        return reject(new TypeError("参数错误"));
      }
    });
  }
}

```