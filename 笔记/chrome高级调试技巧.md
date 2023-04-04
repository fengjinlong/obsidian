## 一键重复发请求

1.  选中`Network`
2.  点击`Fetch/XHR`
3.  选择要重新发送的请求
4.  右键选择`Replay XHR`

## 控制台发请求

1.  选中`Network`
2.  点击`Fetch/XHR`
3.  选择`Copy as fetch`
4.  控制台粘贴代码
5.  修改参数，回车搞定
6. 
## 复制 js 变量

1.  使用`copy`函数，将`对象`作为入参执行即可

## 控制台获取Elements面板选中的元素
1.  通过`Elements`选择要调试的元素
2.  控制台直接用`$0`访问

## ## 截取一张全屏的网页

偶尔咱们也会有对网页截屏的需求，一屏还好，系统自带的截屏或者微信截图等都可以办到，但是要求**将超出一屏的内容也截下来咋办呢**？

1.  准备好需要截屏的内容
2.  `cmd + shift + p` 执行`Command`命令
3.  输入`Capture full size screenshot` 按下回车

## 一键展开所有DOM元素
1.  按住`opt`键 + click（需要展开的最外层元素）

## 控制台引用上一次执行的结果
使用`$_`引用上一次操作的结果，不用每次都复制一遍
```js
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
$_.reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
$_.join('') // hsiftaf
```

## "`$`"和"`$$`"选择器

在控制台使用`document.querySelector`和`document.querySelectorAll`选择当前页面的元素是最常见的需求了，不过着实有点太长了，咱们可以使用`$`和`$$`替代。

## .# `$i`直接在控制台安装npm包

你遇到过这个场景吗？有时候想使用比如`dayjs`或者`lodash`的某个`API`，但是又不想去官网查，如果可以在控制台直接试出来就好了。

[Console Importer](https://link.juejin.cn?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fconsole-importer%2Fhgajpakhafplebkdljleajgbpdmplhie%2Frelated "https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related") 就是这么一个插件，用来在控制台直接安装`npm`包。

1.  安装`Console Importer`插件
2.  $i('name')安装npm包

## Add conditional breakpoint条件断点的妙用

假设有下面这段代码，咱们希望食物名字是`🍫`时才触发断点，可以怎么弄？
右键选择 添加条件短点
```js
const foods = [
  {
    name: '🍔',
    price: 10
  },
  {
    name: '🍫',
    price: 15
  },
  {
    name: '🍵',
    price: 20
  },
]

foods.forEach((v) => {
  console.log(v.name, v.price)
})

```
![](Pasted%20image%2020221127124446.png)