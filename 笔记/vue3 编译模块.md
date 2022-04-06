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