# 从输入URL开始建立前端知识体系
## 第一部分 输入网址并解析
### URL 组成
URL 主要由 协议、主机、端口、路径、查询参数、锚点6部分组成！
![](Pasted%20image%2020220519232519.png)
### 解析URL
输入URL后，浏览器会解析出协议、主机、端口、路径等信息，并构造一个HTTP请求。
1. 浏览器发送请求前，根据请求头的expires和cache-control判断是否命中（包括是否过期）强缓存策略，如果命中，直接从缓存获取资源，并不会发送请求。如果没有命中，则进入下一步。
2. 没有命中强缓存规则，浏览器会发送请求，根据请求头的If-Modified-Since和If-None-Match判断是否命中协商缓存，如果命中，直接从缓存获取资源。如果没有命中，则进入下一步。
3. 如果前两步都没有命中，则直接从服务端获取资源。

#### HSTS
### 浏览器缓存
所有关于缓存资源的问题，都仅仅针对 GET 请求。而对于 POST , DELETE , PUT 这类行为性操作通常不做任何缓存
#### 三级缓存原理 (访问缓存优先级)
1 先在内存中查找,如果有,直接加载。

2 如果内存中不存在,则在硬盘中查找,如果有直接加载。

3 如果硬盘中也没有,那么就进行网络请求。

4 请求获取的资源缓存到硬盘和内存。
#### 缓存机制
强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存
#### 强缓存
![](Pasted%20image%2020220520221346.png)
1. 不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。
2. 这里的 header 中的信息指的是 expires 和 cahe-control.
3. Cache-Control 与 Expires 可以在服务端配置同时启用，同时启用的时候 Cache-Control 优先级高。
#### 协商缓存
![](Pasted%20image%2020220520223146.png)
1. 协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
2. 这里的 header 中的信息指的是 Last-Modify/If-Modify-Since 和 ETag/If-None-Match
3. Last-Modified 与 ETag 是可以一起使用的，服务器会优先验证 ETag，一致的情况下，才会继续比对 Last-Modified，最后才决定是否返回 304。

#### 存储位置
1. Service Worker
2. Memory Cache
   Memory Cache 也就是内存中的缓存,读取内存中的数据肯定比磁盘快，会随着进程的释放而释放。 一旦我们关闭 Tab 页面，内存中的缓存也就被释放了。
3. Disk Cache
  Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，比之 Memory Cache 胜在容量和存储时效性上。

- 对于大文件来说，大概率是不存储在内存中的，反之优先
- 当前系统内存使用率高的话，文件优先存储进硬盘
4.Push Cache
#### 强缓存和协商缓存分别适用于哪些场景
1. 强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存

2. 对于频繁变动的资源，首先需要使用Cache-Control: no-cache 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

3. 处理不常变化的资源时，给它们的 Cache-Control 配置一个很大的 max-age=31536000 (一年)，这样浏览器之后请求相同的 URL 会命中强制缓存。而为了解决更新的问题，就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。 在线提供的类库 (如 jquery-3.3.1.min.js, lodash.min.js 等) 均采用这个模式。

### DNS 域名解析
![](Pasted%20image%2020220522225352.png)
## 第二部分 TCP/IP连接：**三次握手**
### 网络协议分层
| 应用层 | TCP/IP 协议族   |
| ------ | --------------- |
| 应用层 | HTTP , FTP, DNS |
| 传输层 | TCP, UDP        |
| 网络层 | IP                |
### 三次握手
1. 客服端和服务端在进行http请求和返回的工程中，需要创建一个TCP connection（由客户端发起）。请求和响应都是数据包，它们之间的传输通道就是TCP connection。

## 第五部分 浏览器渲染页面
![](Pasted%20image%2020220522220824.png)
### DOM树
字节 → 字符 → 令牌 → 节点 → 对象模型。
![](Pasted%20image%2020220522221901.png)
### CSS 对象模型 (CSSOM)
```css
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right }

```
![](Pasted%20image%2020220522222951.png)
### 布局树Layout Tree
- DOM 树与 CSSOM 树合并后形成渲染树。
- 渲染树只包含渲染网页所需的节点。
- 布局计算每个对象的精确位置和大小。
- 最后一步是绘制，使用最终渲染树将像素渲染到屏幕上。

![](Pasted%20image%2020220522223233.png)

### 渲染
渲染流程：

1. 获取DOM后分割为多个图层
2. 对每个图层的节点计算样式结果		（Recalculate style--样式重计算）
3. 为每个节点生成图形和位置			（Layout--重排,回流）
4. 将每个节点绘制填充到图层位图中		（Paint--重绘）
5. 图层作为纹理上传至GPU
6. 组合多个图层到页面上生成最终屏幕图像	（Composite Layers--图层重组）

#### 回流和重绘
- 重绘

当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

- 回流

当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。

**回流必将引起重绘，而重绘不一定会引起回流。**

引起回流：

1. 页面首次渲染
2. 浏览器窗口大小发生改变
3. 元素尺寸或位置发生改变
4. 元素内容变化（文字数量或图片大小等等）
5. 元素字体大小变化
6. 添加或者删除可见的DOM元素
7. 激活CSS伪类（例如：:hover）
8. 查询某些属性或调用某些方法


引起回流的属性和方法：

- clientWidth、clientHeight、clientTop、clientLeft
- offsetWidth、offsetHeight、offsetTop、offsetLeft
- scrollWidth、scrollHeight、scrollTop、scrollLeft
- scrollIntoView()、scrollIntoViewIffNeeded()
- getComputedStyle()
- getBoundingClientRect()
- scrollTo()

#### 如何减少回流

css

1. 避免使用table布局;
2. 尽可能在DOM树的最末端改变class;
3. 避免设置多层内联样式;
4. 将动画效果应用到position属性为absolute或fixed的元素上;
5. 避免使用CSS表达式（例如：calc()）。

JS

1. 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性。
2. 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有DOM操作，最后再把它添加到文档中。
3. 也可以先为元素设置display: none，操作结束后再把它显示出来。因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘。
4. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
5. 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流。

## 总结
![](Pasted%20image%2020220522225525.png)
- 浏览器主进程处理用户 URL 输入：

  - 触发旧页面的 beforeunload 事件；
  - 判断是搜索内容还是页面请求的 URL；

    - 如果是搜索内容，地址栏会使用浏览器默认的搜索引擎，来合成新的带搜索关键字的URL。
    - 如果判断输入内容符合URL规则，比如输入的是 juejin.cn 那么地址栏会根据规则，把这段内容加上协议，合成为完整的URL，如 https://juejin.cn。

  - 浏览器主进程把收到的 URL 转给网络进程；

- 网络进程处理 HTTP 请求：

  - 构建请求；
  - 查找缓存，有缓存就直接返回了；
  - DNS (基于 UDP)解析，准备 IP 地址及端口号（递归查询，迭代查询），如果没有端口号，http默认80，https默认443；
  - 等待 TCP 队列；
  - 建立 TCP 连接，三次握手（为了确认客户端和服务端的接收和发送能力）；
  - 如果是https请求 还有TSL，四次握手；
  - 排队等待，最多可以发送6个http请求，发送 HTTP 请求（请求行 请求头 请求体）；

    - chrome 针对同一域名只能建立6个tcp链接，
    - 同一域名下，同一GET请求的并发数是1，也就是说上一个请求结束，才会执行下一个请求，否则置入队列等待发送；
    - 同一域名下，不同GET/POST请求的并发数量是6。当发送的请求数量达到6个，并且都没有得到响应时，后面的请求会置入队列等待发送
![](Pasted%20image%2020220522225903.png)
![](Pasted%20image%2020220522225956.png)
![](Pasted%20image%2020220522230006.png)
![](Pasted%20image%2020220522230018.png)