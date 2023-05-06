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
1. 函数声明FD（如果函数在上下文），不包含函数表达式（不包含 var a = function () {}）
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
1. 在函数执行上下文中，变量对象VO 被表示为活动对象AO
2. 函数调用后，AO被创建
3. AO 在函数上下文中作为VO 使用

```js
/**
 * 1 在函数执行上下文，VO是不能直接访问的，此时由AO 扮演VO 的角色
 * 2 Arguments对象它包括如下属性：callee 、length
 * 3 内部定义的函数
 * 4 绑定上对应的变量环境
 * 5 内部定义的变量
 */

VO(functionContext) === AO;
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function () {};
  (function x() {}); // 这里是函数表达式，带括号了
}
test(10)
// 当带有参数10 的test 函数上下文时，AO 表现为下面：
AO(test) = {
  a: 10,
  b: undefined,
  c: 10,
  d: <reference to FunctionDeclaration "d">,
  e: undefined
}
//AO⾥并不包含函数“x”。这是因为“x” 是⼀个函数表达式(FunctionExpression, 缩写为 FE) ⽽不是函数声明，函数表达式不会影响VO
```
#### 4. 深度活动对象（Activation Object）
##### AO 分为 创建阶段 和 执行阶段
```js
function foo(i) {
  var a = "hello";
  var b = function privateB() {};
  function c() {}
}
foo(22);
  // 当我们执⾏foo(22)的时候，EC创建阶段 会类似⽣成下⾯这样的对象
fooExecutionContext = {
    scopeChain: { Scope },
    AO: {
      arguments: {
        0: 22,
        length: 1
      },
      i: 22,
      c: pointer to function c(),
      a: undefined,
      b: undefined
    },
    VO:{...}
    Scope: [AO, globalContext.VO],
}
  //
```
 - 1 创建阶段，发生属性名称的定义，但并没有赋值。这也就是 `变量提升阶段`
 - 2 创建结束，进入执行阶段，那么 函数上下文 完成赋值
 - 3 运⾏函数内部的代码，对变量复制，代码⼀⾏⼀⾏的被解释执⾏
```js
fooExecutionContext = {
  scopeChain: { ... },
  AO: {
    arguments: {
      0: 22,
      length: 1
    },
    i: 22, 
    c: pointer to function c()
    a: 'hello', 
    b: pointer to function privateB()
  },
  VO:{..}
  Scope: [AO, globalContext.VO],
  this: { 运⾏时确认 }
}
```
#### 5. 补充活动对象
```js
var x = 10;
function foo() {
  var barFn = Function('alert(x); alert(y);');
  barFn(); // 10, "y" is not defined
}
foo();

//1.通过函构造函数创建的函数的[[scope]]属性总是唯⼀的全局对象（LexicalEnvironment）。
//2.Eval code - eval 函数包含的代码块也有同样的效果
```
#### 6. 整合体运⾏流程如下
```js
//VO函数上下⽂的链接 AO是函数⾃身的
ECStack = [
  fun3
  fun2,
  fun1,
  globalContext
];
```

#### 7. 写到最后
##### 当一个异步代码执行后会如何？接下来了解一下 `事件队列  Task Queue`
1. 当js引擎遇到一个异步事件后，不会等到异步事件的返回，而是`将异步事件进行挂起`。
2. 等到异步事件执行完毕，会被加入事件队列中。此时只是`异步事件执行完毕`,其中的`回调函数并没有去执行`。
3. 当执行队列执行完毕，主线程闲置，会去异步队列抽取最先被推入队列的异步事件，放入执行栈，`执行其中的回调同步代码`。
4. 如此反复，形成⼀个⽆限的循环。这个过程被称为“事件循环（Event Loop）”的原因。

## 那么其实⼀切也就迎刃⽽解了。闭包的原理是Scope(堆空间中存储closure(foo))，this的原理是动态绑定，作⽤域链的原理是Scope: [AO, globalContext.VO],eval不能回收的原理是推不进AO,变量提升的原理是AO的准备阶段，异步队列的原理是ECS.
### 闭包 就是 外层函数的 AO 没有被释放，还在堆空间

## ⾛进ES5
```js
// this 值的决定，也被称为 This Binding。（即 this 绑定）
// LexicalEnvironment（词法环境）
// VariableEnvironment（变量环境）
ExecutionContext = {
  ThisBinding = <this value>,
  LexicalEnvironment = { ... },
  VariableEnvironment = { ... },
}
```

#### 全局执行上下文
```js
GlobalExectionContext = {
  // 词法环境
  LexicalEnvironment: {
    // 环境记录
    EnvironmentRecord: {
      Type: "Object", // 全局环境
      // ... 标识符绑定在这⾥
      outer: <null>, // 对外部环境的引⽤
   }
  }
}
```
#### 函数执行上下文
```js
FunctionExectionContext = {
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",// 函数环境
      // ... 标识符绑定在这⾥
      // 对全局环境或外部函数环境的引⽤
      outer: <Global or outer function environment reference>,
    }
  }
}

```
##### 为了继续去适配早期的JS的var等，新的规范增加了变量环境（VariableEnvironment）。
##### 变量环境也是⼀个词法环境，其环境记录器包含了由变量声明语句
##### 在ES6 中，词法环境组件和变量环境组件的区别
1. 词法环境存储函数声明和变量（ let 和 const ）绑定，
2. 变量环境存储变量（ var ）绑定。

```js
let a = 20;
const b = 30;
var c;
function multiply(e, f){
  var g = 20;
  return e*f*g; 
};
c = multiply(20, 30);


// 全局执⾏上下⽂
GlobalExectionContext = {
  ThisBinding: <Global Object>,
  // 词法环境
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定，let、const、函数声明
      // ***************** 重点 ******************
      a: <uninitialized>, 
      b: <uninitialized>,
      // ***************** 重点 ******************
      multiply:< func > 
    }
      outer: <null>
    },
  // 变量环境
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Object",
      // 标识符绑定，var 声明
      // ***************** 重点 ******************
      c: undefined,
      // ***************** 重点 ******************
    }
    outer: <null>
  }
}


let a = 20;
const b = 30;
var c;
function multiply(e, f){
  var g = 20;
  return e*f*g; 
};
c = multiply(20, 30);

// 函数执⾏上下⽂
FunctionExectionContext = {
  ThisBinding: <Global Object>,
  LexicalEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 标识符绑定
      Arguments: { 0:20, 1:30, length: 2},
    },
    outer: <GlobalLexicalEnvironment>
  },
  VariableEnvironment: {
    EnvironmentRecord: {
      Type: "Declarative",
      // 在这⾥绑定标识符

      // ***************** 重点 ******************
      g: undefined
    },
    outer: <GlobalLexicalEnvironment> 
  } 
}
```
#### 以上 let 和 const 定义的变量并没有关联任何值 uninitialized(未初始化) ，
#### var 定义的变量被初始化成undefined 。这也就是造成TDZ(临时性死区)的原因了。
接下来就是执⾏阶段，完成对所有变量的分配，最后执⾏代码。⽆论是ES3还是ES5,上下⽂的⽣命周期包括三个阶段：创建阶段 -> 执⾏阶段 -> 回收阶段。
