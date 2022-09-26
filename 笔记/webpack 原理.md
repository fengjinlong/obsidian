### 将多个js文件打包到一个 js

##### foo --- main --- dist

1.  获取文件内容 fs
2.  获取依赖关系
    -   main.js 用 babel 生成 ast
    -   遍历 ast 拿到 foo.js
    -   最终到文件的代码和依赖关系
    -   得到每个文件的 path，source，deps，[{ ... }]
    -   esm 换成 cjs，用 babel 的插件

3.  ejs 模板生成器，生产目标代码