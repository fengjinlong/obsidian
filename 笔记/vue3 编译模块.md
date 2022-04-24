# 编译
## 编译插值表达式
```js
// {{massage}}
{
	type: NodeTypes.INTERPOLATION,// 插值
    content: {
    	type:NodeTypes.SIMPLE_EXPRESSION,// 简单表达式
        content: "message"
	}
}
        
```

## 元素标签
```js
// <div></div>

{
	type: NodeTypes.ELEMENT,
    tag: "div",
}
```


![](Pasted%20image%2020220425000134.png)

## 实现编译 template 成 render 函数

1. Parse transform codegen 需要统一的出口

核心baseCompile

```js
export function baseCompile(template) {
  const ast: any = baseParse(template);
  transform(ast, {
    nodeTransforms: [transformExpression, transformElement, transformText],
  });
  return generate(ast);
}
```

index.ts 导出核心方法 baseCompile

由于用户不回去写 render 函数，用户只会写 template 模板，所以 应该在 finishComponentSetup 里面 调用核心方法，

应该在 finishComponentSetup 里面 把template 编译成 render 函数么 ？？？？

```
                                    +---------------------+
                                    |                     |
                                    |  @vue/compiler-sfc  |
                                    |                     |
                                    +-----+--------+------+
                                          |        |
                                          v        v
                      +---------------------+    +----------------------+
                      |                     |    |                      |
        +------------>|  @vue/compiler-dom  +--->|  @vue/compiler-core  |
        |             |                     |    |                      |
   +----+----+        +---------------------+    +----------------------+
   |         |
   |   vue   |
   |         |
   +----+----+        +---------------------+    +----------------------+    +-------------------+
        |             |                     |    |                      |    |                   |
        +------------>|  @vue/runtime-dom   +--->|  @vue/runtime-core   +--->|  @vue/reactivity  |
                      |                     |    |                      |    |                   |
                      +---------------------+    +----------------------+    +-------------------+
```
Never use direct relative paths when importing items from another package - export it in the source package and import it at the package level.

当从另一个包导入项时，不要使用直接相对路径——将其导出到源包中，然后在包级别导入。

Compiler packages should not import items from the runtime, and vice versa. If something needs to be shared between the compiler-side and runtime-side, it should be extracted into @vue/shared instead.

编译器包不应该从运行时导入项，反之亦然。如果需要在编译器端和运行时端共享某些内容，则应该将其提取到@vue/shared 中。

If a package (A) has a non-type import, or re-exports a type from another package (B), then (B) should be listed as a dependency in (A)'s package.json. This is because the packages are externalized in the ESM-bundler/CJS builds and type declaration files, so the dependency packages must be actually installed as a dependency when consumed from package registries.

如果一个包(a)有一个非类型导入，或者从另一个包(b)重新导出一个类型，那么(b)应该在(a)的 package.json 中作为依赖项列出。这是因为这些包在 esm bundler/CJS 构建和类型声明文件中被外部化了，所以当从包注册中心使用这些依赖包时，实际上这些依赖包必须作为一个依赖项安装。


- finishComponentSetup 是 runtime-core 模块的内容

- baseCompile 是 compile-core 模块的内容
- 文档告诉我们这两个模块不要相互引用，不要强引用，各模块可以单独使用

怎么引用关系？？？？

- vue 先引用compiler-core 
- 通过vue 给runtime-core  使用

baseCompile 最终被被编译成一个render 函数，参数是Vue，也就是runtimeDom

```js
// 这是在vue 的出口文件封装的
function compileToFunction(template) {
  const { code } = baseCompile(template);
  const render = new Function("Vue", code)(runtimeDom);
  return render;
}
```

外部只要 调用compileToFunction 就可以拿到 render 的引用了

Runtime-core 里面 的 registerRuntimeCompiler

```js
let compiler
export function registerRuntimeCompiler(_compiler) {
  compiler = _compiler;
}
```

这是在vue 的出口文件 index.ts

```js
function compileToFunction(template) {
  const { code } = baseCompile(template);
  const render = new Function("Vue", code)(runtimeDom);
  return render;
}
registerRuntimeCompiler(compileToFunction)
```

此时 compiler 就拿到了 render的引用

使用

```js
function finishComponentSetup(instance: any) {
  const Component = instance.type;
  if (compiler && !Component.render) {
    if (Component.template) {
      Component.render = compiler(Component.template);
    }
  }
  instance.render = Component.render;
}
```

ok, render 函数已经拿到了

看一下编译的目标代码长啥样

```js
const {
  toDisplayString: _toDisplayString,
  openBlock: _openBlock,
  createElementBlock: _createElementBlock,
} = Vue;

return function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock(
      "div",
      null,
      "hi, " + _toDisplayString(_ctx.message),
      1 /* TEXT */
    )
  );
};
```

这里还差两个函数没有实现，toDisplayString，_createElementBlock（这个函数里面有优化的逻辑，我们只需要实现_createElementVNode 即可）

```js
export function toDisplayString(value) {
  return String(value);
}

// createVNode 就是 createElementVNode
export { createVNode as createElementVNode };

// 两个函数均在 runtime-core 的出口 导出即可
```




