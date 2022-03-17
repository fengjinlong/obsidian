# 1 封装fetch
### 简单封装一个异步 fetch，使用 async await 的方式来使用

#### fetch 基本操作

```js
fetch('http://example.com/movies.json').then(function(response) { 	return response.json();}).then(function(myJson) { console.log(myJson);});
```

#### 为何不直接使用fetch

-   当接收到一个代表错误的 http 状态码时,比如400, 500，fetch不会把promise 标记为reject, 而是标记为resolve，仅当网络故障时或请求被阻止时，才会标记为 reject。
-   默认情况下fetch 不会从服务端发送或接收任何cookies, 如果站点依赖于用户 session，则会导致未经认证的请求（要发送 cookies，必须设置 credentials 选项）。

#### 使用async / await 原因

-   解决promise 的then catch 依然是回调函数

#### 封装
```js
class EasyHttp {
  //get
  async get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  //POST
  async post(url, datas) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datas),
    });
    const data = await response.json();
    return data;
  }

  //PUT
  async put(url, datas) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(datas),
    });
    const data = await response.json();
    return data;
  }

  //delete
  async delete(url) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await "数据删除成功"; //await后面还可以直接跟字符串额 这操作666...
    return data;
  }
}

```