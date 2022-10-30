# 解决 npm login 登录报错问题

准备将代码部署发布到公共 `npm` 上, 执行 `npm login` 命令时报错,网上查找得知这是由于本地 `npm` 使用了淘宝镜像，解决办法有两种:

1.  切回 npm 官方镜像

```bash
npm config set registry https://registry.npmjs.org/
复制代码
```

-   如需切回淘宝新版镜像, 可执行

```bash
npm config set registry https://registry.npmmirror.com/
复制代码
```

2.  登录时指定为官方镜像

```bash
npm login --registry https://registry.npmjs.org
```

  

