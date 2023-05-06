### `infer` 操作符

> 在有条件类型的`extends`子语句中，允许出现`infer`声明，它会引入一个待推断的类型变量。

我们获取到的信息是：

1.  `infer`操作符只允许出现在`extends`子语句中；
2.  它是用来推断类型变量的。

一个例子：

```ts
// ReturnType 为内置工具类型，作用：由函数类型 T 的返回值类型构造一个类型。
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

type func = () => number;
type variable = () => string;
type funcReturnType = ReturnType<func>; // funcReturnType 类型为 number
type varReturnType = ReturnType<variable>; // varReturnType 类型为 string
复制代码
```

`infer`还可以用于解包，下面是一个解包数组里的元素类型的例子：

```ts
type Ids = number[];
type Names = string[];
type Unpacked<T> = T extends (infer R)[] ? R : T;

type idType = Unpacked<Ids>; // idType 类型为 number
type nameType = Unpacked<Names>; // nameType 类型为string
复制代码
```

`infer`还有个相当重要的特性：

-   `infer`推导的名称相同并且都处于**协变**的位置，则推导的结果将会是**联合类型**；
-   `infer`推导的名称相同并且都处于**逆变**的位置，则推导的结果将会是**交叉类型**。

**协变**与**逆变**的解释可以看这里[Ts高手篇](https://juejin.cn/post/6994102811218673700#heading-2 "https://juejin.cn/post/6994102811218673700#heading-2")

协变的例子：

```ts
// 例1
type Foo<T> = T extends { a: infer U; b: infer U } ? U : never;

type T10 = Foo<{ a: string; b: string }>; // T10类型为 string
type T11 = Foo<{ a: string; b: number }>; // T11类型为 string | number

// 例2
type ElementOf<T> = T extends (infer R)[] ? R : never;

type Tuple = [string, number];
type Union = ElementOf<Tuple>; // Union 类型为 string | number
复制代码
```

逆变的例子：

```ts
type Bar<T> = T extends {
  a: (x: infer U) => void;
  b: (x: infer U) => void;
} ? U : never;

// type T1 = string
type T1 = Bar<{ a: (x: string) => void; b: (x: string) => void }>;

// type T2 = never
type T2 = Bar<{ a: (x: string) => void; b: (x: number) => void }>;
```

  
