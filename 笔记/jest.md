## Jest 具体好用在哪些方面呢
- 速度快（可以自动监测修改过的代码，不会重复测试）
- API 简单、数量少
- 易配置
- 隔离性好
- 监控模式
- IDE 整合（比如vs code）
- Snapshot（快照测试）
- 多项目并行
- 覆盖率
- Mock 丰富
- 对新技术支持度好

## 安装
`第1步：初始化npm环境：`
npm init

在执行命令的时候会遇到一些选项或者问题，无脑按回车即可，如果看到目录下出现了一个 package.json 文件，那么这就是一个标准的 npm 包了。

`第2步：安装依赖`

npm install jest -D

`第3步：配置 package.json 文件`

将如下代码添加到 package.json 中：

"scripts": {
  "test": "jest"
},
## 配置
`Jest 的简单配置`

Jest 和 Webpack 一样都有默认配置，我们可以运行 npx jest --init 命令来
初始化默认配置。在运行命令行的时候，会弹出一些选项，比如：

是否需要开启typescript
是否需要生成覆盖率报告
选择node 环境或者浏览器环境
在测试完成之后，是否需要进行一些清除工作
……

`代码测试覆盖率`
npx jest --coverage
如果觉得执行npx jest --coverage命令太麻烦，你也可以将如下代码添加到 package.json 中：

"scripts": {
  "test": "jest",
  "coverage": "jest --coverage"
},
除了控制台可以看到图表信息之外，你还可以在当前目录下看到一个生成的coverage目录
![](Pasted%20image%2020220422132317.png)
在里面有一个lcov-report文件夹，里面有一个index.html，我们打开它会看到：
![](Pasted%20image%2020220422132441.png)
总结来说：测试覆盖率就是我们编写的测试代码对原来的功能代码的占比。
tips: 配置文件中的coverageDirectory就是代码测试覆盖率生成报告所在的文件夹的名字：
module.exports = {
  coverageDirectory: "abc"
};

例如，我们让coverageDirectory的值为abc，那么生成的测试报告就在目录abc下面。

`把 commonjs 改成 es module`
安装依赖：

npm install @babel/core @babel/preset-env -D
创建完成之后，将如下代码添加到 .babelrc 中：

{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
}

## 适配器

## 常用的匹配器
1. toBe使用 Object.is来进行精准匹配的测试。 如果您想要检查对象的值，请使用 toEqual 代替
    expect({}).toEqual({}) // ok
    expect({}).toBe({}) // error
2. toEqual 递归检查对象或数组的每个字段
```js
const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
```
3. 测试相反的匹配
```js
expect(1).not.toBe(0)
```
4. 真值
- toBeNull 只匹配 null
- toBeUndefined 只匹配 undefined
- toBeDefined 与 toBeUndefined 相反
- toBeTruthy 匹配任何 if 语句为真
- toBeFalsy 匹配任何 if 语句为假
- 对于比较浮点数相等，使用 toBeCloseTo 而不是 toEqual，因为你不希望测试取决于一个小小的舍入误差

5. 字符串
可以检查对具有 toMatch 正则表达式的字符串
```js
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});
```
6. 数组和可迭代对象
```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('shoppingList数组中包含milk', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```
6. 例外
若你想测试某函数在调用时是否抛出了错误，你需要使用 toThrow。
```js
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // 你可以自己定义确切的错误消息内容或者使用正则表达式
  expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```
7. expect.anything()
- 除了 null 或未定义之外，任何匹配都可以
- 使用它来代替文字值 toEqual 或 
- toBeCalledWith(函数调用的参数)，检查一个 mock 函数是否使用非空参数调用

```js
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn();
  [1].map(x => mock(x));
  expect(mock).toBeCalledWith(expect.anything());
  expect(0).toEqual(expect.anything());
});
```

8. expect.arrayContaining(array)
- 所期望的数组是所接收数组的子集
```js
describe('arrayContaining', () => {
  const expected = ['Alice', 'Bob'];
  it('matches even if received contains additional elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected));
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected));
  });
});

describe('Beware of a misunderstanding! describe('Beware of a misunderstanding! A sequence of dice rolls', () => {
  const expected = [1, 2, 3, 4, 5, 6];
  it('matches even with an unexpected number 7', () => {
    expect([4, 1, 6, 7, 3, 5, 2, 5, 4, 6]).toEqual(
      expect.arrayContaining(expected),
    );
  });
  it('does not match without an expected number 2', () => {
    expect([4, 1, 6, 7, 3, 5, 7, 5, 4, 6]).not.toEqual(
      expect.arrayContaining(expected),
    );
  });
});


```

9. toBeNull：测试对象的值是否为null，效果相当于.toBe(null)
10. toBeUndefined：测试对象的值是否为undefined，效果相当于.toBe(undefined)
11. toBeTruthy：检查值转成布尔值之后是否为真值
12. toBeFalsy：检查值转成布尔值之后是否为假值
13. not：取反匹配器，相当于 js 中的 ! 运算符
14. toBeGreaterThan：检查接收值是否大于期待值
15. toBeLessThan：检查接收值是否小于期待值
16. toBeGreaterThanOrEqual：检查接收值是否大于等于期待值
17. toBeLessThanOrEqual：检查接收值是否小于等于期待值
18. toBeCloseTo：检查浮点数是否接近（是否近似相等）
```js
// toBeCloseTo

test("测试 0.1 + 0.2 是否等于 0.3", () => {
  expect(0.1 + 0.2).toBe(0.3); // 不通过
  expect(0.1 + 0.2).toBeCloseTo(0.3); //通过
});

```
19. toContain：检查数组中是否包含某一项（类似于 js 中的 includes 方法）
20. toThrow：测试函数在调用时是否有异常抛出

## 异步测试
安装 axios，安装好 axios 之后，不管是在node环境还是浏览器环境，我们都可以发送请求了

```js
import axios from "axios";

export const getData = () => {
  return axios.get("http://www.dell-lee.com/react/api/demo.json");
};

```
#### Promises 规范
`测试成功的返回值：`
```js
import { getData } from "./index";

test("测试 getData 的返回值为 { success: true }", () => {
  return getData().then(res => {
    expect(res.data).toEqual({ success: true });
  });
});
```

在测试成功返回值的时候，需要在.then里面执行测试用例，而且必须在开头加上`return`，返回整个异步代码，否则这个测试是没有意义的。
如果你忽略了这个return，你的测试将在异步函数返回的 promise 解析之前完成。

`测试失败的返回值：`
```js
import { getData } from "./index";

test("测试 getData 的返回值包含 404", () => {
  return getData().catch(err => {
    expect.assertions(1);
    expect(err.toString()).toMatch("404");
  });
});

```
#### Async / Await
测试成功的返回值：
```js
import { getData } from "./index";

test("测试 getData 的返回值为 { success: true }", async () => {
  const { data } = await getData();
  expect(data).toEqual({ success: true });
});

```
测试失败的返回值：
```js
import { getData } from "./index";

test("测试 getData 的返回值包含 404", async () => {
  expect.assertions(1);
  try {
    await getData();
  } catch (err) {
    expect(err.message).toMatch("404");
  }
});

```
## Jest 中的钩子函数

https://juejin.cn/post/7066792153027969032#heading-4

