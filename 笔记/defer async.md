### defer属性

- 异步下载script代码。（同async）
- 不支持内联方式，也就是script标签必须有src属性。（同async）
- 执行时机：下载完后，在dom解析完之后、触发DOMContentLoaded之前执行。（不同于async）
- 执行顺序：如果带defer的script有多个，那它们将按照在页面中出现的顺序来依次执行。（不同于async）

### async属性

- 异步下载script代码。
- 不支持内联方式，也就是script标签必须有src属性。
- 执行时机：下载完后，立即执行。
- 执行顺序：下载完js文件的顺序，即网络请求返回顺序，无法提前预知。
- 使用示例：
