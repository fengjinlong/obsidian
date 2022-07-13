class myPromise {
  // 省略部分代码
  static allSettled(promises) {
    return new myPromise((resolve, reject) => {
      if (Array.isArray(promises)) {
        let result = []; // 存储结果
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
  static all(promises) {
    // 1
    return new myPromise((resolve, reject) => {
      // 2-1
      if (Array.isArray(promises)) {
        let count = 0;
        let result = [];
        // 3
        if (promises.length === 0) {
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
  static race(promises) {
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
}
