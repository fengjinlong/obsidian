1.  准备秘钥 我们都知道，以往在发布 npm 包的时候，我们需要先运行 npm login 登录我们自己的账号，用来验证我们的身份，使用 github action 也要验证我们的身份，不过需要用另外一种方式。

登录 npmjs.com 后，找到个人中心菜单里面的 “Access Tokens” 菜单，然后点击右上角的 “Generate New Token” 生成 token 按钮，生成一个新token ，然后把新token复制出来，我们后面步骤要用到

  ![](Pasted%20image%2020221021213307.png)


![](Pasted%20image%2020221021213402.png)


```yml


name: Public Npm

on:
  push:
    branches: [ master ]

jobs:
  publish:
    runs-on: ubuntu-latest

    name: 'publish npm'

    environment: npm

    steps:
      - uses: actions/checkout@master

      - name: Install and Build 
        run: |
          npm install
          npm run build # 这是我的项目的打包命令，你也可以改成你的

      - name: 'Publish to the npm registry'
        uses: primer/publish@3.0.0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_AUTH_TOKEN: ${{ secrets.NPM_AUTH_TOKEN }} # 跟前面步骤中的 NPM_AUTH_TOKEN 保持一致
        with:
          default_branch: 'master'
```