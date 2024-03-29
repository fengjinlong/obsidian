## 1. 引用类型
```js
let o = {
  a: 1,
};
function fun(obj) {
  obj.a = 2;
}
// o.a === 2
```

## 2. 数据类型判断

- typeof
  - 可以判断基础类型，null除外
  - 在引用类型中除了 function 外，其他不能判断
  - 返回的是 小写的类型
- instanceof
  - 可以判断复杂引用类型
  - 不可判断基础
```js
let car = new Car()
car instanceof Car // true

// 实现instanceof
function myInstanceof(left, right) {
  // 必须是引用类型
  if (typeof left !== "object" || left === null) {
    return false;
  }
  let proto = Object.getPrototypeOf(left);
  while (1) {
    if (proto === null) return false;
    if (proto === right.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
}
```
- Object.prototype.toString.call()
  - 返回 [object Xxx] 第一个 X 要大写

## 3. 数据类型转换
##### Number() 方法的强制类型转换原则
1. 布尔值, 0 或 1
2. 数字, 本身
3. null, 0
4. undefined, NaN
5. 字符串
   1. 只包含数字，转换为十进制
   2. 只包含浮点数，浮点数
   3. 空字符串 0
   4. 其他，NaN
6. Symbol, 错误
7. 对象
   1. 如果对象部署了 [Symbol.toPrimitive] 那么调用此方法
   2. 否则，调用valueOf() 方法

```js
const a = {
  [Symbol.toPrimitive]() {
    return 200;
  },
  valueOf() {
    return 300;
  },
};
Number(a); // 200
```
## 4 深浅拷贝
##### 浅拷贝 情况
1. object.assign
2. let o1 = {...o2}
3. concat 拷贝数组
4. let newArr = arr.slice(begin, end)

```js
// 手写浅拷贝
const shallowClone = (target) => {
  if (typeof target === "object" && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {};
    for (let key in target) {
      if (target.hasOwnProperty(key)) {
        cloneTarget[key] = target[key];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
};
```
##### 深拷贝
将一个对象从内存中完整的拷贝出来一份给目标对象，并从堆内存开辟一全新的空间存放新对象，且新对象的修改不影响原对象。
1. JSON.parse(JSON.stringify(obj))，存在以下问题
- 对象的值如果是函数，undefined,symbol,经过拷贝后，键值对 会消失
- Date 会变成 字符串
- 无法拷贝不可枚举类型
- 无法拷贝对象原型链
- RegExp 会变成 空对象
- 对象含有 NaN Infinity -Infinity 序列化后变成 null
- 无法拷贝对象的循环引用
```js

// is obj ? function ?
const isComplexDataType = (obj) => {
  return (typeof obj === "object" || typeof obj === "function") && obj !== null;
};
const deepClone = function (obj, hash = new WeakMap()) {
  // 处理日期类型
  if (obj.constructor === Date) {
    return new Date(obj);
  }
  // 正则
  if (obj.constructor === RegExp) {
    return new RegExp(obj);
  }
  //如果循环引用了就用 weakMap 来解决
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  //遍历传入参数所有键的特性
  let allDesc = Object.getOwnPropertyDescriptors(obj);
  //继承原型链
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
  hash.set(obj, cloneObj);
  for (const key of Reflect.ownKeys(obj)) {
    /**
     * isComplexDataType(obj[key]) 是 obj 或 function
     * isComplexDataType(obj[key]) && typeof obj[key] !== "function"  是 obj
     * 如果是 obj 递归
     * 如果不是 obj 直接返回
     */
    cloneObj[key] =
      isComplexDataType(obj[key]) && typeof obj[key] !== "function"
        ? deepClone(obj[key], hash)
        : obj[key];
  }
  return cloneObj;
};

```

## 5 继承

（1）第一种是以`原型链的方式来实现继承`，但是这种实现方式存在的缺点是，在包含有引用类型的数据时，会被所有的实例对象所共享，容易造成修改的混乱。还有就是在创建子类型的时候不能向超类型传递参数。

（2）第二种方式是使用`借用构造函数`的方式，这种方式是通过在子类型的函数中调用超类型的构造函数来实现的，这一种方法解决了不能向超类型传递参数的缺点，但是它存在的一个问题就是无法实现函数方法的复用，并且超类型原型定义的方法子类型也没有办法访问到。

（3）第三种方式是`组合继承`，组合继承是将原型链和借用构造函数组合起来使用的一种方式。通过借用构造函数的方式来实现类型的属性的继承，通过将子类型的原型设置为超类型的实例来实现方法的继承。这种方式解决了上面的两种模式单独使用时的问题，但是由于我们是以超类型的实例来作为子类型的原型，所以调用了两次超类的构造函数，造成了子类型的原型中多了很多不必要的属性。

（4）第四种方式是`原型式继承`，原型式继承的主要思路就是基于已有的对象来创建新的对象，实现的原理是，向函数中传入一个对象，然后返回一个以这个对象为原型的对象。这种继承的思路主要不是为了实现创造一种新的类型，只是对某个对象实现一种简单继承，ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链方式相同。

（5）第五种方式是`寄生式继承`，寄生式继承的思路是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。这个扩展的过程就可以理解是一种继承。这种继承的优点就是对一个简单对象实现继承，如果这个对象不是我们的自定义类型时。缺点是没有办法实现函数的复用。

（6）第六种方式是`寄生式组合继承`，组合继承的缺点就是使用超类型的实例做为子类型的原型，导致添加了不必要的原型属性。寄生式组合继承的方式是使用超类型的原型的副本来作为子类型的原型，这样就避免了创建不必要的属性。


#### 1 原型链继承

```js
function Parent() {
  this.name = "parent";
  this.play = [1, 2];
}
function Child() {
  this.type = "child";
}
// 可以调用父类的原型链的方法
Child.prototype = new Parent();

let c = new Child();
```
问题
```js
  var s1 = new Child1();
  var s2 = new Child1();

  s1.play.push(4);
  console.log(s1.play, s2.play);
  // [1,2,4] [1,2,4]
```
两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化，这就是使用原型链继承方式的一个缺点。

##### 2 构造函数继承（call）
```js
function Parent1() {
  this.name = "parent1";
}
Parent1.prototype.getName = function () {
  return this.name;
};

function Child1() {
  Parent1.call(this);
  this.type = "child1";
}
let child = new Child1();
console.log(child); // 没问题
console.log(child.getName()); // 报错
```
构造函数实现继承的优缺点，它使父类的引用属性不会被共享，优化了第一种继承方式的弊端；但是随之而来的缺点也比较明显——只能继承父类的实例属性和方法，不能继承原型属性或者方法。

#### 3 组合继承（前两种组合）
```js
function Parent3() {
  this.name = "parent3";
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
};

function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = "child3";
}

// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play); // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'
```
通过注释我们可以看到 Parent3 执行了两次，第一次是改变Child3 的 prototype 的时候，第二次是通过 call 方法调用 Parent3 的时候，那么 Parent3 多构造一次就多进行了一次性能开销，这是我们不愿看到的。

#### 4 原型式继承
ES5 的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）。
```js
let parent4 = {
  name: "parent4",
  friends: [],
  getName: function () {
    return this.name;
  },
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");

console.log(person4.name);  //  tom
console.log(person4.name === person4.getName()); // true
console.log(person5.name); // parent4
console.log(person4.friends); // ["jerry", "lucy"]
console.log(person5.friends); // ["jerry", "lucy"]
```
关于这种继承方式的缺点也很明显, Object.create 方法是可以为一些对象实现浅拷贝的

#### 5 寄生式继承
使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫作寄生式继承。
虽然其优缺点和原型式继承一样，但是对于普通对象的继承方式来说，寄生式继承相比于原型式继承，还是在父类基础上添加了更多的方法。
```js
let parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function () {
    return this.name;
  },
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function () {
    return this.friends;
  };
  return clone;
}

let p = clone(parent5);

console.log(p.getName()); // parent5
console.log(p.getFriends()); // ["p1", "p2", "p3"]
```
#### 6 寄生组合式继承
上面第三种组合继承方式中提到了一些弊端，即两次调用父类的构造函数造成浪费，寄生组合继承就可以解决这个问题。
```js
function P6() {
  this.name = "p6";
  this.play = [1, 2, 3];
}
P6.prototype.getName = function () {
  return this.name;
};
function C6() {
  /**
   * 模拟 call，构造函数的继承
   * 可以解决父类引用属性被共享，因为上下文不一样
   * 但是，不能继承父类原型属性及方法
  */
  P6.call(this);
  this.friends = "c5";
}

function clone(p, c) {
  /**
   * 模拟 组合的继承
   * 组合是这样写的， c.prototype = new p()
   * 可以继承父类原型属性及方法
   * 但是，执行了两次父类，多一次性能开销。
   * 
   * 这里采用 c.prototype = Object.create(p.prototype);
   * 解决了多执行一次 父类 的问题
  */
  c.prototype = Object.create(p.prototype);
  c.prototype.constructor = c;
}
clone(P6, C6);
C6.prototype.getFriends = function () {
  return this.friends;
};

let person6 = new C6();
console.log(person6);
console.log(person6.getName());
console.log(person6.getFriends());
```
#### 7 ES6 的 extends 关键字实现逻辑
```js
class Parent {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
class Game extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}
const ga = new Game("ga", 20);
ga.getName();
```
```js
// 编译
function _possibleConstructorReturn(self, call) {
  // ...

  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  // 这里可以看到

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,

      enumerable: false,

      writable: true,

      configurable: true,
    },
  });

  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var Parent = function Parent() {
  // 验证是否是 Parent 构造出来的 this

  _classCallCheck(this, Parent);
};

var Child = (function (_Parent) {
  _inherits(Child, _Parent);

  function Child() {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments)
    );
  }

  return Child;
})(Parent);
```

![](Pasted%20image%2020220328221611.png)

## 6 new apply call bind
#### new 的原理
1. new 作用是执行一个 构造函数，返回一个实例对象，在new 过程中，根据构造函数的情况，确定是否可以接受参数的传递

```js
function Person(){
  this.name = 'Jack';
}
var p = new Person(); 
console.log(p.name)  // Jack

```
2. new 在这个生成实例的过程中到底进行了哪些步骤来实现呢
   1. 创建一个新对象
   2. 将构造函数的上下文 指向 这个新对象，this指向新对象
   3. 执行构造函数代码
   4. 返回新对象

3. 那么当构造函数中有 return 一个对象的操作，结果又会是什么样子呢？
```js
function Person() {
  this.name = "Jack";
  return { age: 18 };
}

var p = new Person();
console.log(p); // {age: 18}
console.log(p.name); // undefined
console.log(p.age); // 18
// 当构造函数最后 return 出来的是一个和 this 无关的对象时，new 命令会直接返回这个新对象，而不是通过 new 执行步骤生成的 this 对象。
```

但是这里要求构造函数必须是返回一个对象，如果返回的不是对象，那么还是会按照 new 的实现步骤，返回新生成的对象。接下来还是在上面这段代码的基础之上稍微改动一下。
```js
function Person() {
  this.name = "Jack";
  return "tom";
}

var p = new Person();
console.log(p); // {name: 'Jack'}
console.log(p.name); // Jack
```
`new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象。`

```js
function neww(fun, ...args) {
  let obj = {};
  Object.setPrototypeOf(obj, fun.prototype);
  // or let obj = Object.create(fun.prototype)
  let result = fun.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```
#### 一些场景
```js
// 类数组
let obj = {
  a: 1,
  b: 2,
  length: 2,
};
Array.prototype.push.call(obj, "c", "d");

console.log(obj); // {2: 'c', 3: 'd', a: 1, b: 2, length: 4}

// 最大值
let arr = [1,2,3]
const max = Math.max.apply(Math, arr)
```
```js
Function.prototype._call = (ctx, ...arg) => {
  // 绑定上下文
  ctx = ctx ? Object(ctx) : window;
  // 获取方法
  ctx.fn = this
  // 结果
  let result = ctx.fn(...arg);
  delete ctx.fn
  return result
}

Function.prototype._apply = (ctx, args) => {
  ctx = ctx || window;
  ctx.fn = this;
  let result = ctx.fn(...args);
  delete ctx.fn;
  return result;
};

/**
 * bind 思路
 * 1 this 是不是函数
 * 2 返回一个方法 F
 *    1 确定 F 的上下文，this ? ctx ?
 *    2 合并 两次的参数
 *    3 F 内部执行 this函数
 * 3 如果 this 存在原型对象，那么 F 需要继承 this 的原型对象
 * 
 * 
 * this instanceOf F -> F 的 prototype 属性是否出现在 实例this 的原型链上
 * 
*/
// fun._bind(obj, 1)
Function.prototype._bind = function (ctx, ...args) {
  // fun 是不是 方法
  if (typeof this !== "function") {
    return new Error("this must be a function");
  }
  // this is fun
  let selt = this;
  const bound = function () {
    selt.apply(
      this instanceOf bound ? this : ctx,
      args.concat(Array.prototype.slice.call(arguments))
    );
  };
  // 如果方法有原型，那么继承
  if (this.prototype) {
    Object.setPrototypeOf(bound, this.prototype);
  }
  return bound
};
```

```js

Function.prototype.myBind = function(context, ...args1) {
  if(typeof this !== 'function') {
    throw Error('error')
  }
  context = context ? Object(context) : Window

  const currentFunc = this
  return function(...args2) {
    if(new.target) {
      return new currentFunc(...[...args1, ...args2])
    }
    return currentFunc.apply(context, [...args1, ...args2])
  }
}
```