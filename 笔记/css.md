## 原生 CSS 开发的问题
1. 开发体验欠佳。比如原生 CSS 不支持选择器的嵌套:
2. 样式污染问题。如果出现同样的类名，很容易造成不同的样式互相覆盖和污染。
3. 浏览器兼容问题。为了兼容不同的浏览器，我们需要对一些属性(如transition)加上不同的浏览器前缀，比如 -webkit-、-moz-、-ms-、-o-，意味着开发者要针对同一个样式属性写很多的冗余代码。
4. 打包后的代码体积问题。如果不用任何的 CSS 工程化方案，所有的 CSS 代码都将打包到产物中，即使有部分样式并没有在代码中使用，导致产物体积过大。

针对如上原生 CSS 的痛点，社区中诞生了不少解决方案，常见的有 5 类

1. CSS 预处理器：主流的包括Sass/Scss、Less和Stylus。
2. CSS Modules：能将 CSS 类名处理成哈希值，这样就可以避免同名的情况下样式污染的问题。
3. CSS 后处理器PostCSS，用来解析和处理 CSS 代码，可以实现的功能非常丰富，比如将 px 转换为 rem、根据目标浏览器情况自动加上类似于--moz--、-o-的属性前缀等等。
4. CSS in JS 方案，主流的包括emotion、styled-components等等，顾名思义，这类方案可以实现直接在 JS 中写样式代码，基本包含CSS 预处理器和 CSS Modules 的各项优点，非常灵活，解决了开发体验和全局样式污染的问题。
5. CSS 原子化框架，如Tailwind CSS、Windi CSS，通过类名来指定样式，大大简化了样式写法，提高了样式开发的效率，主要解决了原生 CSS 开发体验的问题。

## CSS 预处理器

stylus demo
```js
// 0 配置
pnpm i stylus -D
```
[Sass](https://link.juejin.cn/?target=https%3A%2F%2Fsass-lang.com%2Fdocumentation%2Fjs-api%2Fmodules%23render)
[Less](https://link.juejin.cn/?target=https%3A%2F%2Flesscss.org%2Fusage%2F%23less-options)
[Stylus](https://link.juejin.cn/?target=https%3A%2F%2Fsass-lang.com%2Fdocumentation%2Fjs-api%2Fmodules%23render)

## CSS Modules
CSS Modules 在 Vite 也是一个开箱即用的能力，Vite 会对后缀带有.module的样式文件自动应用 CSS Modules
```js
<script setup lang="ts">
import styles from "./1.module.styl";
</script>

<template>
  <div :class="styles.div">1234</div>
</template>

<style scoped lang="stylus"></style>
```

![](Pasted%20image%2020220727202210.png)

说明现在 CSS Modules 已经正式生效了！同样的，你也可以在配置文件中的css.modules选项来配置 CSS Modules 的功能，比如下面这个例子
```ts
// vite.config.ts
export default {
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    preprocessorOptions: {
      // 省略预处理器配置
    }

  }
}
```

![](Pasted%20image%2020220727202450.png)



## PostCSS
一般你可以通过 `postcss.config.js` 来配置 postcss ，不过在 Vite 配置文件中已经提供了 PostCSS 的配置入口，我们可以直接在 Vite 配置文件中进行操作。
安装一个常用的 PostCSS 插件——autoprefixer:
```js
pnpm i autoprefixer -D
```
vite.config.ts 增加如下的配置
```js
import autoprefixer from 'autoprefixer';

export default {
  css: {
    // 进行 PostCSS 配置
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    }
  }
}
```

- postcss-pxtorem： 用来将 px 转换为 rem 单位，在适配移动端的场景下很常用。
- postcss-preset-env: 通过它，你可以编写最新的 CSS 语法，不用担心兼容性问题。
- cssnano: 主要用来压缩 CSS 代码，跟常规的代码压缩工具不一样，它能做得更加智能，比如提取一些公共样式进行复用、缩短一些常见的属性值等等。


关于 PostCSS 插件，这里还给大家推荐一个站点：www.postcss.parts/ ，你可以去里面探索更多的内容。

## CSS In JS
## css 原子化

