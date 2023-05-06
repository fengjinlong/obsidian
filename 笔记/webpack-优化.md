## 时间方向(8个)

1.  开发环境 - `EvalSourceMapDevToolPlugin`**排除第三方模块**
    -   `devtool:false`
    -   `EvalSourceMapDevToolPlugin`,通过传入 `module: true` 和 `column:false`,达到和预设 `eval-cheap-module-source-map` 一样的质量
2.  缩小`loader`的搜索范围：`test、include、exclude`
3.  **`Module.noParse`**
    -   `noParse: /jquery|lodash/`,
4.  `TypeScript` 编译优化
5.  **`Resolve.modules`指定查找模块的目录范围**
6.  **`Resolve.alias`**
7.  **`Resolve.extensions`指定查找模块的文件类型范围**
8.  `HappyPack`

## 资源大小（9个）

1.  按需引入类库模块 (工具类库)
    -   使用`babel-plugin-import`对其处理
2.  **使用`externals`优化`cdn`静态资源**
3.  **CSS抽离+剔除无用样式** -`MiniCssExtractPlugin` + `PurgeCSS`
4.  **CSS压缩** - `CssMinimizerWebpackPlugin`
5.  **`TreeSharking`**
    -   CSS 方向 - `glob-all` `purify-css` `purifycss-webpack`
    -   JS方向 - `babel-loader`版本问题
6.  `Code Spilt` - `optimization` - `splitChunks` - `chunks:all`
7.  **魔法注释 - `webpackChunkName：’xxx‘`**
8.  `Scope Hoisting` - `optimization` - `concatenateModules:true`
    -   普通打包只是将一个模块最终放入一个单独的函数中,如果模块很多，就意味着在输出结果中会有很多的模块函数。concatenateModules 配置的作用,尽可能将所有模块合并到一起输出到一个函数中，既提升了运行效率，又减少了代码的体积。
9.  **图片压缩** - `image-webpack-loader` - 只要在 `file-loader` 之后加入 `image-webpack-loader` 即可

  