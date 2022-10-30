## parse 
#### 目的转换为ast
#### baseParse主要逻辑
1. 代码
```js
export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

// createParserContext 返回一个上下文对象 { source: content}
// parseChildren 判断类型，进行不同转换，插值，element，text 等，返回vnodes=[...]
// createRoot 创建ast {children: vnodes}
```

#### 处理插值
1. 处理插值表达式
```js
// {{message}} 通过截取字符串获取到 message
// ast
{
	type: "interpolation",
	content: {
		type: "simple_expression",
		content: "message"
	}
}
```
解析完要删除 {{message}}

2. 处理element

```js
// <div></div> 通过正则表达式
// ast
{
    type: NodeTypes.ELEMENT,
    tag: "div",
}
```
解析完删除 element

3. 解析 text 类型
- 如果不是插值且不是 element 那么就走text逻辑
- 获取 text
- 删除推进 

4. 混合型, element text 插值 并存

- 处理完 element，element被销毁，继续递归处理即可 parseChildren
- 处理 text 时候，销毁的长度逻辑，要考虑后面是否有 插值（ "{{" ）和 标签 ( "<" )的情况
- parseChildren 内部循环停止条件
	- 遇见结束标签
	- context 为空
- 当缺少结束标签时候，上面逻辑就会进入死循环
```js
// <div><p></div>
// 找不到 p 的结束标签，不能跳出 parseChildren 的循环
// 解决思路

/**
 * parseElement 时候将 tag push一个栈
 * 在 parseChildren 结束时候 从栈 pop
 * 正常情况 <div><p></p></div>
 */
// 1 获取到 div，推进消除，此后 context 是 <p></p></div>
const element: any = parseTag(context, TagType.Start);
// 2 ancestor -> [ div ]
ancestor.push(element);
// 3 获取到 p, 消除推进，此后 context 是 </p></div>
// ancestor -> [ div, p ]
element.children = parseChildren(context, ancestor);
// 4 ancestor -> [ div ]
ancestor.pop();
parseTag(context, TagType.End);
// 5 ancestor -> []
// 此时 isEnd 的逻辑可以使循环结束

/**
 * 非正常情况<div><p></div>
 */
// 1 获取到 div，推进消除，此后 context 是 <p></div>
const element: any = parseTag(context, TagType.Start);
// 2 ancestor -> [ div ]
ancestor.push(element);
// 3 获取到 p, 消除推进，此后 context 是 </div>
// ancestor -> [ div, p ]
element.children = parseChildren(context, ancestor);
// 找不到结束标签
// 此时 isEnd 的逻辑不可以使循环结束

/**
 * 优化
 * 依然是 parseElement 时候将元素进栈
 * 处理完子节点，就近pop
 * 修改isEnd 逻辑
 *
 */
function isEnd(context, ancestor) {
  const s = context.source;
  if (s.startsWith("</")) {
    for (let i = ancestor.length - 1; i >= 0; i--) {
      const tag = ancestor[i].tag;
      // 在栈中找到相同的标签，即可退出循环
      if (startsWithEndTagOpen(s, tag)) {
        return true;
      }
    }
  }
  return !s;
}
function startsWithEndTagOpen(source, tag) {
  return (
    source.startsWith("</") &&
    source.slice(2, 2 + tag.length).toLowerCase() === tag.toLowerCase()
  );
}
```

5. 有限状态机
![](Pasted%20image%2020220418230706.png)


## transform
#### 对  ast 做增删改查
#### 思路：深度优先遍历ast，在处理函数内做相应的修改
1. 简易demo
```js
// 修改文本节点内容
export function transform(root) {
  // 遍历
  traverseNode(root);
  // 修改
}

function traverseNode(node: any) {
  // 相应的修改
  if (node.type === NodeTypes.TEXT) {
    node.content = "hi, mini-vue";
  }
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node);
    }
  }
}
```

2. 优化
- 考虑要区分 程序的变动点与不变动点
- 插件化思想
- 由用户决定调用什么插件

```js
// 下面程序的变动点，不应该在程序的核心逻辑
if (node.type === NodeTypes.TEXT) {
  node.content = "hi, mini-vue";
}
// 我们希望是这样的，当调用transform 方法处理ast时候，我需要这个插件我才配置这个插件，不需要就不配置
transform(ast, {
  nodeTransformer: [myPlugin]
});
// 这样就达到了，分离变动点与不变动点，插件化
// 最后我们拿到nodeTransformer 的参数，遍历执行 ok
  
```
3. 全局上下文
创建全局上下文，用于相关数据的传输,存储属性和方法
```js
function createTransformContext(root: any, options: any) {
  const context = {
    root,
    nodeTransformer: options.nodeTransformer || {},
  };
  return context;
}
```
4. 实现 transform 逻辑
```js

export function transform(root, options) {
  // 全局上下文
  const context = createTransformContext(root, options);
  // 遍历
  traverseNode(root, context);
  // 修改
}

function traverseNode(node: any, context) {
  const nodeTransformer = context.nodeTransformer;
  for (let i = 0; i < nodeTransformer.length; i++) {
    let transform = nodeTransformer[i];
    transform(node);
  }
  traverseChildren(node, context);
}
function traverseChildren(node: any, context: any) {
  const children = node.children;
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const node = children[i];
      traverseNode(node, context);
    }
  }
}
```

## codegen
1. 生成代码，根据ast 拼接字符串，生成 render 函数
2. 只生成代码，不处理ast
3. 所有对 ast 处理的逻辑都应该放在 transform 里面
4. toDisplayString 是处理插值的


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




#### 编译 template

1. patse 将 string 转化为 ast
   1. 解析三种类型，（根据的是解析 html 的文档规范）利用有限状态机原理
      - 差值 处理截取推进

        ```javascript
        // {{message}}
        {
          type: NodeTypes.INTERPOLATION,
            content: {
              type: NodeTypes.SIMPLE_EXPRESSION,
                content: "message",
            },
        }
        ```
    
      - element 处理截取推进

        ```javascript
        // <div><p></p></div>
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
          children: [
            {
              type: NodeTypes.ELEMENT,
              tag: "p",
              children: [],
            },
          ],
        }
        ```

      - text （默认处理）处理截取推进

        ```javascript
        // some test
        {
          type: NodeTypes.TEXT,
          content: "some text",
        }
        ```

      - 综合类型

        ```javascript
        // <div>hi,{{message}}</div>
        {
          type: NodeTypes.ELEMENT,
          tag: "div",
            children: [
            {
              type: NodeTypes.TEXT,
              content: "hi,",
            },
            {
              type: NodeTypes.INTERPOLATION,
              content: {
                type: NodeTypes.SIMPLE_EXPRESSION,
                content: "message",
              },
            },
          ],
        }
        ```

      - case

        ```
        // 之前处理<div>hi,{{message}}</div>中的text 节点时候，是遇见 {{ 为text判断的结束点
        // 如果 demo 是<div><p>hi</p>{{message}}</div>,之前的逻辑是有问题的，text 节点截取为hi</p>，是不对的
        // 变更 text 的结束条件，< 与 {{ 谁先出现以谁为结束的标志
        ```

      - case

        ```
        // <div><span></div>
        ```


2. transform 将ast 进行增删改查

   1. 递归遍历

   2. 插件体系式调用

      ```javascript
      transform(ast, {
      	nodeTransforms: [ plugin ]
      })
      ```

3. codegen 根据ast 生成 代码   render

   1. 生成模板方法，快照测试

   ```javascript
   // hi
   return function render(_ctx, _cache) {
     return "hi"
   }
   
   // {{message}} 
   const { toDisplayString: _toDisplayString } = Vue
   return function render(_ctx, _cache) {
     return _toDisplayString(_ctx.message)
   }
   
   // <div>hi, {{message}}</div>
   const { toDisplayString: _toDisplayString, _createElementVNode: _createElementVNode } = Vue
   return function render(_ctx) {
     return _createElementVNode("div", null, "hi, " + _toDisplayString(_ctx.message)
   }
   ```

   2. compile

   ```javascript
   export function baseCompile(template) {
     const ast = baseParse(template);
     transform(ast, {
       nodeTransforms: [transformExpression, transformElement, transformText],
     });
     return generate(ast);
   }
   ```

   3. 最后的 render 的样子

   ```javascript
   // 编译后的样子
   const render = renderFunction()
   function renderFunction(Vue) {
   	const {...} = Vue
     return function render (_ctx) {
       return _createElementVNode("div", null, "hi, " + _toDisplayString(_ctx.message)
     }
   }
   // 也就是包装一下
   function complieToFunction(template) {
     const {code} = baseCompile(template)
     const render = new Function("Vue", code)(runtimeDom)
     return render
   }
   ```



