**什么是fiber，fiber解决了什么问题**

在React16以前，React更新是通过**树的深度优先遍历**完成的，遍历是不能中断的，当树的层级深就会产生栈的层级过深，页面渲染速度变慢的问题，为了解决这个问题引入了fiber，React fiber就是虚拟DOM，它是一个链表结构，返回了return、children、siblings，分别代表父fiber，子fiber和兄弟fiber，随时可中断

**Fiber是纤程，比线程更精细，表示对渲染线程实现更精细的控制**

**应用目的**  
实现增量渲染，增量渲染指的是把一个渲染任务分解为多个渲染任务，而后将其分散到多个帧里。增量渲染是为了实现任务的可中断、可恢复，并按优先级处理任务，从而达到更顺滑的用户体验

**Fiber的可中断、可恢复怎么实现的**

_**fiber**_是协程，是比线程更小的单元，可以被人为中断和恢复，当react更新时间超过1帧时，会产生视觉卡顿的效果，因此我们可以通过fiber把浏览器渲染过程分段执行，每执行一会就让出主线程控制权，执行优先级更高的任务

fiber是一个链表结构，它有三个指针，分别记录了当前节点的下一个兄弟节点，子节点，父节点。当遍历中断时，它是可以恢复的，只需要保留当前节点的索引，就能根据索引找到对应的节点

**Fiber更新机制**

**初始化**

1.  创建fiberRoot（React根元素）和rootFiber(通过ReactDOM.render或者ReactDOM.createRoot创建出来的)
2.  进入beginWork

**workInProgress**:正在内存中构建的fiber树叫workInProgress fiber，在第一次更新时，所有的更新都发生在workInProgress树，在第一次更新后，workInProgress树上的状态是最新状态，它会替换current树

**current**:正在视图层渲染的树叫current fiber树

```ini
currentFiber.alternate = workInProgressFiber
workInProgressFiber.alternate = currentFiber
复制代码
```

3.  深度调和子节点，渲染视图

在新建的alternate树上，完成整个子节点的遍历，包括fiber的创建，最后会以workInProgress树最为最新的渲染树，fiberRoot的current指针指向workInProgress使其变成current fiber，完成初始化流程

**更新**

1.  重新创建workInProgress树，复用当前current树上的alternate，作为新的workInProgress

渲染完成后，workInProgress树又变成current树

**双缓冲模式**

话剧演出中，演员需要切换不同的场景，以一个一小时话剧来说，在舞台中切换场景，时间来不及。一般是准备两个舞台，切换场景从左边舞台到右边舞台演出

在计算机图形领域，通过让图形硬件交替读取两套缓冲数据，可以实现画面的无缝切换，减少视觉的抖动甚至卡顿。

react的current树和workInProgress树使用双缓冲模式，可以减少fiber节点的开销，减少性能损耗

**React渲染流程**

如图，React用JSX描述页面，JSX经过babel编译为render function，执行后产生VDOM，VDOM不是直接渲染的，会先转换为fiber，再进行渲染。vdom转换为fiber的过程叫reconcile，转换过程会创建DOM，全部转换完成后会一次性commit到DOM，这个过程不是一次性的，而是可打断的，这就是fiber架构的渲染流程

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d05402136ac44f87971d9f0b89466911~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp)

vdom（React Element对象）中只记录了子节点，没有记录兄弟节点，因此渲染不可打断

fiber（fiberNode对象）是一个链表，它记录了父节点、兄弟节点、子节点，因此是可以打断的
