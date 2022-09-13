#### npm 安装的依赖在 node_modules 里面是扁平的
- npm install express
- 实际上 node_modules 里面有很多相关连的包，比如 debuge
- 当我使用 debuge 包时候，不需要进行 npm install debuge 也可以正常工作
- 项目上线后，有一天我不想用 express 了，卸载。同样 debuge 也没了
- 但我实际还在用 debuge，这就是问题
#### pnpm 按照的依赖不是扁平的
- npm install express 
- node_modules 里面只有 express 
- 想用 debuge 必须先安装
- 有一天卸载了 express，对于我用 debuge 是没有影响的