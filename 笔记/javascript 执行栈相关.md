# JavaScript执⾏堆栈详细解读
## 堆⾥存放着⼀些对象。⽽栈中则存放着⼀些基础类型变量以及对象的指针。但是我们这⾥说的执⾏栈和上⾯这个栈的意义却有些不同。
js 执行可执行脚本时候
1. 首先创建一个全局的可执行上下文 globalContext
2. 每当执行一个函数会创建一个可执行上下文 （execution【执行】 context）EC
3. 多个函数，也就多个EC
4. javascript 引擎创建了`执行上下文栈`（execution context stack）ECS,来管理 EC 们
5. 函数调用完，js会退出这个执行环境并把这个执行环境销毁
6. 回到上一个方法的执行环境，这个过程反腐执行，直到 `执行栈ECS` 的代码执行完毕

![](Pasted%20image%2020220331233528.png)

如下是以上的⼏个关键词，我们来⼀次分析⼀下
- 执⾏栈（Execution Context Stack）
- 全局对象（GO Global Context）
- 活动对象（Activation Object）
-  变量对象（Variable Object）
- 全局上下⽂(GC global execution context )
- 执⾏上下⽂（EC execution context）
- 函数调⽤栈（Callee Stack)
- 执⾏上下⽂栈（ECS execution context Stack )
- 垃圾回收（GC Garbage Collection ）
- 词法环境（LexicalEnvironment）
- 变量环境（VariableEnvironment）
- 环境记录（Environment record）

## 执行栈 Execution Context Stack
1. 浏览器解释器执⾏ js 是单线程的过程，这就意味着同⼀时间，只能有⼀个事情在进⾏。
2. 其他的活动和事件只能排队等候，⽣成出⼀个等候队列执⾏栈（Execution Stack）。

## 执行栈压栈顺序
1. 执行代码，确定了全局执行上下文 global execution context 作为默认值
2. 在全局环境调用其他函数，创建一个新的EC（执行上下文），将此 EC 推入 执行栈
3. 函数内部执行其他函数，步骤相同。创建⼀个新的EC -> 把EC推⼊执⾏栈
4. 一旦一个EC执行完，便会从执行栈中推出

```js
ECStack = [
  globalContext
];
```
#### 1 继续分析压栈过程
```js
function fun3() {
  console.log("fun3");
}
function fun2() {
  fun3();
}
function fun1() {
  fun2();
}
fun1();
//执⾏fun1 结果如下
ECStack = [
  fun1, 
  globalContext
];
```
#### 2. 变量对象（Variable Object）,VO
- 变量对象VO是与执行上下文相关的特殊对象
- 存储上下文的  `函数声明，形参，变量`

##### VO 存储上下文声明的以下内容
1. 函数声明（如果函数在上下文），不包含函数表达式（不包含 var a = function () {}）
2. 函数形参function arguments
3. 变量声明
   1. b = 10 不是变量
   2. var b = 10 是变量，变量有提升
```js
  alert(a); // undefined 提升了
  alert(b); // “b” 没有声明
  b = 10;
  var a = 20;
```

##### VO分为 全局上下⽂的变量对象VO，函数上下⽂的变量对象VO
分析下面代码
```js
var a = 10;

function test(x) {
  var b = 20;
};

test(30);

// 全局上下⽂的变量对象
VO(globalContext) = {
  a: 10,
  test: <reference to function>
};

// test函数上下⽂的变量对象
VO(test functionContext) = {
  x: 30, 
  b: 20
};
//全局上下⽂的变量对象VO 就是 global
VO(globalContext) === global;
```
#### 3. 活动对象（Activation Object）
