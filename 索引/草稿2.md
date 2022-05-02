更新逻辑分为更新属性，更新children
# patch children
children 类型可能为 text，array

| 老节点类型 | 新节点类型 | 处理方式                      |
| ---------- | ---------- | ----------------------------- |
| array      | text       | 清空老节点的数组，赋值新text  |
| text       | array      | 清空老节点的text，赋值新array |
| text       | text       | 清空老节点的text, 赋值新text  |
| array      | array      | 双端对比 diff 算法                              |

## 双端对比 diff 算法( 新旧节点都是 array 类型 )
#### 目的，算出中间乱序节点的范围
先找到左边相同的节点，在找到右边相同的节点，最终找到中间不同的节点
![](Pasted%20image%2020220501092806.png)
- 创建新的 d
- 删除老的 y
- 移动位置的 c e

#### 约定,起点指针i, 旧节点尾 e1, 新节点尾 e2

1. 情况 1 处理左侧
![](Pasted%20image%2020220501163414.png)

2. 情况 2 处理右侧
 ![](Pasted%20image%2020220501163319.png)
 
 3. 左右移动后，新的比老的多，老的已经处理完
 ![](Pasted%20image%2020220501162749.png)
 
 4. 左右移动后，老的比新的多，新的已经处理完
![](Pasted%20image%2020220501163855.png)

5. 左右移动后，中间对比，删除不在新节点中的老节点
![](Pasted%20image%2020220501174111.png)

6. 左右移动后，中间对比，旧节点存在新节点中，进行深度对比时候有个优化点
![](Pasted%20image%2020220501201047.png)

7. 左右移动后，中间对比，移动逻辑, 获取最长递增子序列
![](Pasted%20image%2020220502111326.png)
![](Pasted%20image%2020220502000702.png)
![](Pasted%20image%2020220502000733.png)

8. 左右移动后，中间对比，添加节点逻辑
如果newIndexToOldIndexMap[i] === 0,说明新索引在老索引中没有对应的，创建逻辑。patch(null, h, ...)
![](Pasted%20image%2020220502112321.png)

- 根据新节点建立数组
- newIndexToOldIndexMap = [0, 0, 0]
- 在中间深度patch时候，遍历旧节点，根据映射关系，我们已经拿到了旧节点在新节点映射表里的值（如果没有之前的删掉旧节点了，这里走的逻辑是肯定有这个映射值）。
- 映射表是这样的{ newVnode.key : newIndex}，也就是说 `我们拿到了newIndex`,这个`newIndex`就是 `一个旧节点在新节点中的索引位置`
- newIndexToOldIndexMap[newIndex-s2] = oldIndex+1，加1防止为0，-s2 是处理左边的初始移动，因为newIndexToOldIndexMap 数组是中间未处理的新节点的长度
- newIndexToOldIndexMap[i] === 0 的意义是没有对应的老节点，需要创建逻辑
#### 遍历新节点 0, 1, 2是否在 [ 1, 2 ]里面，我们对 012进行倒序遍历，后面的稳点


### 总结一个while 伪代码？







![](Pasted%20image%2020220430200236.png)