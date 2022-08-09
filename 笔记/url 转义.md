#### 实现一个函数，把 url 里的 querystring 转化为对象，希望考虑尽量多的边界情况。（没有 query，相同的 key，转义后的字符需要转回来）

```js
function querystring(querystr) {
  const [, query] = querystr.split("?")
  if (query) {
    return query.split("&").reduce((pre, cur) => {
      const [key ,val] = cur.split("=")
      if (pre[key]) {
        pre[key] = [...pre[key], decodeURIComponent(val)]
      } else {
        pre[key] = [decodeURIComponent(val)]
      }
      return pre
    }, {});
  }
  return {}
}
```

```js

function getUrlParams(url){
  let reg = /([^?&=]+)=([^?&=]+)/g
  let obj = { }
  url.replace(reg, function(){
      obj[arguments[1]] = arguments[2]
  })
  return obj
}
let url = 'https://www.junjin.cn?a=1&b=2'
console.log(getUrlParams(url)) // { a: 1, b: 2 }
```