```ts
type K1 = keyof Person; // "name" | "age" | "location"

type K2 = keyof Person[]; // number | "length" | "push" | "concat" | ...

type K36 = keyof { [x: string]: Person }; // string | number
```


keyof: 取interface的键后保存为联合类型
 in: 取联合类型的值，主要用于数组和对象的构建