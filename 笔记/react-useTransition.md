**useTransition**

useTransition 执行返回一个数组。数组有两个状态值：

-   第一个是，当处于过渡状态的标志——isPending。
-   第二个是一个方法，可以理解为上述的 startTransition。可以把里面的更新任务变成过渡任务。

```js
import { useTransition } from 'react' 
/* 使用 */
const  [ isPending , startTransition ] = useTransition ()
```

```js
export default function Index(){
  const [ active, setActive ] = React.useState('tab1') //需要立即响应的任务，立即更新任务
  const [ renderData, setRenderData ] = React.useState(tab[active]) //不需要立即响应的任务，过渡任务
  const [ isPending,startTransition  ] = React.useTransition() 
  const handleChangeTab = (activeItem) => {
     setActive(activeItem) // 立即更新 tab 状态
     startTransition(()=>{ // startTransition 里面的任务优先级低，延迟加载数据
       setRenderData(tab[activeItem])
     })
  }
  return <div>
    <div className='tab' >
       { Object.keys(tab).map((item)=> <span className={ active === item && 'active' } onClick={()=>handleChangeTab(item)} >{ item }</span> ) }
    </div>
    <ul>
       { isPending && <div> loading... </div> }
       { renderData.map(item=> <li key={item} >{item}</li>) }
    </ul>
  </div>
}
```

```tsx
import React, { useState, useEffect, useTransition } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    // 使用了并发特性，开启并发更新
    startTransition(() => {
      setList(new Array(10000).fill(null));
    });
  }, []);
  return (
    <>
      {list.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```
### useDeferredValue

返回一个延迟响应的值，可以让一个`state` 延迟生效，只有当前没有紧急更新时，该值才会变为最新值。`useDeferredValue` 和 `startTransition` 一样，都是标记了一次非紧急更新。

从介绍上来看 `useDeferredValue` 与 `useTransition` 是否感觉很相似呢？

-   相同：`useDeferredValue` 本质上和内部实现与 `useTransition` 一样，都是标记成了`延迟更新`任务。
-   不同：`useTransition` 是把更新任务变成了延迟更新任务，而 `useDeferredValue` 是产生一个新的值，这个值作为延时状态。（一个用来包装方法，一个用来包装值）

所以，上面 `startTransition` 的例子，我们也可以用 `useDeferredValue` 来实现：
```tsx
import React, { useState, useEffect, useDeferredValue } from 'react';

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    setList(new Array(10000).fill(null));
  }, []);
  // 使用了并发特性，开启并发更新
  const deferredList = useDeferredValue(list);
  return (
    <>
      {deferredList.map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </>
  );
};

export default App;
```

  



**useLayoutEffect 基础介绍：**

useLayoutEffect 和 useEffect 不同的地方是采用了同步执行，那么和useEffect有什么区别呢？

① 首先 useLayoutEffect 是在 DOM 更新之后，浏览器绘制之前，这样可以方便修改 DOM，获取 DOM 信息，这样浏览器只会绘制一次，如果修改 DOM 布局放在 useEffect ，那 useEffect 执行是在浏览器绘制视图之后，接下来又改 DOM ，就可能会导致浏览器再次回流和重绘。而且由于两次绘制，视图上可能会造成闪现突兀的效果。

② useLayoutEffect callback 中代码执行会阻塞浏览器绘制。

```jsx
const DemoUseLayoutEffect = () => {
    const target = useRef()
    useLayoutEffect(() => {
        /*我们需要在dom绘制之前，移动dom到制定位置*/
        const { x ,y } = getPositon() /* 获取要移动的 x,y坐标 */
        animate(target.current,{ x,y })
    }, []);
    return (
        <div >
            <span ref={ target } className="animate"></span>
        </div>
    )
}
```

  ### 3.3 useInsertionEffect

**useInsertionEffect 基础介绍：**

useInsertionEffect 是在 React v18 新添加的 hooks ，它的用法和 useEffect 和 useLayoutEffect 一样。那么这个 hooks 用于什么呢?

在介绍 useInsertionEffect 用途之前，先看一下 useInsertionEffect 的执行时机。

```jsx
React.useEffect(()=>{
    console.log('useEffect 执行')
},[])

React.useLayoutEffect(()=>{
    console.log('useLayoutEffect 执行')
},[])

React.useInsertionEffect(()=>{
    console.log('useInsertionEffect 执行')
},[])
```
打印： useInsertionEffect 执行 -> useLayoutEffect 执行 -> useEffect 执行

可以看到 useInsertionEffect 的执行时机要比 useLayoutEffect 提前，useLayoutEffect 执行的时候 DOM 已经更新了，但是在 useInsertionEffect 的执行的时候，DOM 还没有更新。本质上 useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题。

```jsx
export default function Index(){

  React.useInsertionEffect(()=>{
     /* 动态创建 style 标签插入到 head 中 */
     const style = document.createElement('style')
     style.innerHTML = `
       .css-in-js{
         color: red;
         font-size: 20px;
       }
     `
     document.head.appendChild(style)
  },[])

  return <div className="css-in-js" > hello , useInsertionEffect </div>
}
```

  