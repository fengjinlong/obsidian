![](Pasted%20image%2020230407091746.png)
### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

-   constructor()
-   static getDerivedStateFromProps()
-   render()
-   componentDidMount()

### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

-   static getDerivedStateFromProps()
-   shouldComponentUpdate()
-   render()
-   getSnapshotBeforeUpdate()
-   componentDidUpdate()

### 卸载

当组件从 DOM 中移除时会调用如下方法：

-   componentWillUnmount()
