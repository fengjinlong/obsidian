1. 元组转换为对象

```ts
type TupleToObject<T extends readonly any[]> = {
  [p in T[number]]: p
}
```

2. 第一个元素

   ```tsx
   type First<T extends any[]> = T extends [infer f, ...infer R] ? f: never
   ```

3. 元组的长度

   ```ts
   type Length<T extends readonly any[]> = T['length']
   ```

4. 元组的Exclude

   ```ts
   type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
   type MyExclude<T, U> = T extends U ? never : T
   ```

5. if

   ```ts
   type If<C extends boolean, T, F> = C extends true?T:F
     type B = If<false, 'a', 'b'> // expected to be 'b'
   // @ts-expect-error
   type error = If<null, 'a', 'b'>
   ```

   