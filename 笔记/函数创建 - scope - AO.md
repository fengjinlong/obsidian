# 执行上下文，作用域链
```js

var scope = "global scope";  
function checkscope(){  
    var scope2 = 'local scope';  
    return scope2;  
}  
checkscope();
```


#### 执行上下文 EC 包括

1.  VO
2.  scope chain
3.  this

#### [[scope]]

1.  函数创建时，函数有一个内部属性 [[scope]]，当函数 **创建** 的时候，就会保存 **所有父变量对象** 到其中，但是注意：[[scope]] 并不代表完整的作用域链！
2.  函数激活时，作用域链是 Scope = [AO].concat([[Scope]]);

#### 执行过程

1.  `checkscope` 函数被创建，保存作用域链到函数的[[scope]]
```js

checkscope.[[scope]] = [  
    globalContext.VO  
];
```



2.  执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 函数执行上下文被压入执行上下文栈 ECS
```js

ECStack = [  
    checkscopeContext,  
    globalContext  
];
```


3.  checkscope 函数并不立刻执行，开始做准备工作
    
    1.  第一步：复制函数 [[scope]] 属性创建作用域链
    ```js
	checkscopeContext = {  
        Scope: checkscope.[[scope]],  
    }
    ```
    
    2.  第二步：创建活动对象( AO创建阶段)，随后初始化活动对象，加入形参、函数声明、变量声明
    ```js

	checkscopeContext = {  
        AO: {  
            arguments: {  
                length: 0  
            },  
            scope2: undefined  
        }，  
        Scope: checkscope.[[scope]],  
    }
	```
    

    
    3.  第三步：将活动对象压入 checkscope 作用域链顶端
        
    ```js

	checkscopeContext = {  
        AO: {  
            arguments: {  
                length: 0  
            },  
            scope2: undefined  
        },  
        Scope: [AO, [[Scope]]]  
    }
	```

    
4.  准备工作做完，开始执行函数，修改 AO 的属性值
    
```js

checkscopeContext = {  
    AO: {  
        arguments: {  
            length: 0  
        },  
        scope2: 'local scope'  
    },  
    Scope: [AO, [[Scope]]]  
}
```


5.  查找到 scope2 的值，返回后函数执行完毕，函数上下文从执行上下文栈中弹出
    
```js

ECStack = [  
    globalContext  
];
```
