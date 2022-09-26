# 生命周期

-   api 导出的方式
-   将勾子函数挂载到 instance
-   初始化节点取出相应的勾子数组
-   遍历执行
# 生命周期钩子

1.  onBeforeMount()
2.  onMounted()
    
3.  onBeforeUpdate()
4.  onUpdated()
    
5.  onBeforeUnmount()
6.  onUnmounted()
    
7.  onErrorCaptured() 捕获了后代组件传递的错误时调用
    
8.  onRenderTracked(dev)
9.  onRenderTriggered()
    
10.  onActivated()
11.  onDeactivated()
    
12.  onServerPrefetch()