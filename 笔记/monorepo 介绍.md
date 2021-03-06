1. 一种将多个项目代码存储在一个仓库里的软件开发策略
![](Pasted%20image%2020220430170603.png)
通过 monorepo 策略组织代码，您代码仓库的目录结构看起来会是这样
```js
.
├── lerna.json
├── package.json
└── packages/ # 这里将存放所有子 repo 目录
    ├── project_1/
    │   ├── index.js
    │   ├── node_modules/
    │   └── package.json
    ├── project_2/
    │   ├── index.js
    │   ├── node_module/
    │   └── package.json
    ...
```
2. monorepo 策略的优势
  1. 代码重用将变得非常容易
  2. 依赖管理将变得非常简单
  3. 代码重构将变得非常便捷, 阻止您进行代码重构，不确定某个项目的修改是否对于其他项目而言是「致命的」，这将导致整个项目代码的腐烂度会以惊人的速度增长。而在 monorepo 策略的指导下，您能够明确知道您的代码的影响范围，并且能够对被影响的项目可以进行统一的测试，这会鼓励您不断优化代码；
  4. 它倡导了一种开放，透明，共享的组织文化，这有利于开发者成长，代码质量的提升
3. monorepo 策略的劣势
   1. 项目粒度的权限管理变得非常复杂
   2. 新员工的学习成本变高
   3. 对于公司级别的 monorepo 策略而言，需要专门的 VFS 系统，自动重构工具的支持

https://segmentfault.com/a/1190000039157365