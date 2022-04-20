## 1.  当 n<=10 时，采用插入排序；
#### 原因
- 插入排序理论上是平均时间复杂度为 O(n^2) 的算法，快速排序是一个平均 O(nlogn) 级别的算法
- 插入排序的 n 足够小，那么就会超过快排
- 对于很小的数据量，应用插入排序是一个非常不错的选择。
```js
function InsertionSort(arr, start, end) {
  // 插入排序
  for (var i = start + 1; i < end; i++) {
    var element = arr[i];
    for (var j = i - 1; j >= start; j--) {
      var tmp = arr[j];
      var order = comparefn(tmp, element);
      if (order > 0) {
        arr[j + 1] = tmp;
      } else {
        break;
      }
    }
    arr[j + 1] = element;
  }
}

```
    
## 2.  当 n>10 时，采用三路快速排序；

### 2-1.  10<n <=1000，采用中位数作为哨兵元素,进行快速排序
```js
third_index = from + ((to - from) >> 1);
```


    
### 2-2.  n>1000，每隔 200~215 个元素挑出一个元素，放到一个新数组中，然后对它排序，找到中间位置的数，以此作为中位数，进行快速排序。
#### 优化
- 快速排序的性能瓶颈在于递归的深度
- 最坏的情况是每次的哨兵都是最小元素或者最大元素
- 如果这么排下去，递归的层数就达到了 n , 而每一层的复杂度是 O(n)，因此快排这时候会退化成 O(n^2) 级别。
- 这种情况是要尽力避免的，那么如何来避免？就是让哨兵元素尽可能地处于数组的中间位置，让最大或者最小的情况尽可能少
```js
third_index = GetThirdIndex(a, from, to);
function GetThirdIndex(a, from, to) {
  // 元素个数大于1000时寻找哨兵元素
  var t_array = new InternalArray();
  var increment = 200 + ((to - from) & 15);
  var j = 0;
  from += 1;
  to -= 1;
  for (var i = from; i < to; i += increment) {
    t_array[j] = [i, a[i]];
    j++;
  }
  t_array.sort(function (a, b) {
    return comparefn(a[1], b[1]);
  });
  var third_index = t_array[t_array.length >> 1][0];
  return third_index;
}
```

## 3 快速排序
```js
function partition(arr, low, high) {
  if (low > high) return;
  let i;
  let j;
  let middle;
  i = low;
  j = high;
  middle = arr[low];
  while (i < j) {
    while (arr[j] > middle) {
      // 找到小于 基点的索引
      j--;
    }
    while (middle >= arr[i] && i < j) {
      // 找到大于节点的 索引
      i++;
    }
    // 交换 两个索引的对应值 的位置
    swap(arr, i, j);
  }
  // 交换基准点与 最后大于基准点位置的值
  swap(arr, low, i);

  //   递归 1
  partition(arr, low, i - 1);
  //   递归 2
  partition(arr, i + 1, high);
}
let arr = [1, 5, 2, 4, 3, 8];

const swap = (arr, i, j) => {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};
partition(arr, 0, arr.length - 1);
console.log(arr);

```
<img src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/11/23/1673e00a0d10d84d~tplv-t2oaga2asx-zoom-in-crop-mark:1304:0:0:0.awebp">