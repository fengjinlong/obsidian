```html
<img :src="require('../assets/images/' + ele.layerBg)" />

<div :style="{background: `url(${require('../assets/images/' +
item.layerBg)}) no-repeat`,'background-size': '100% 100%'}"></div>
```