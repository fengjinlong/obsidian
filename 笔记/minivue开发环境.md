1. 创建tsconfig.json
```js
npx tsx --init
```
2. 安装 typescript
3. 安装 jest
```js
yarn add jest @types/jest --dev
```
4. tsconfig.json
```json
types: ["jest"]
```
5. package.json
```json
"script": ["jest"]
```
6. 支持 es 模块
```
// babel
yarn add --dev babel-jest @babel/core @babel/preset-env

yarn add --dev @babel/preset-typescript
```

7. babel.config.js
```js
module.exports = {
  presets: [
    ["@babel/preset-env", {targets: {node: "current"}}],
    "@babel/preset-typescript"
  ]
}
```