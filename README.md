# README

## 安装准备
1.安装node
https://nodejs.org/dist/v16.17.1/
选择msi结尾的安装包安装
32位系统选择x86版本，64位系统选择x64，如果是其他系统也可以按照对应系统安装

2.安装yarn

```
npm install -g pnpm
```
然后输入自己的用户名和密码

3.找到项目目录dingodb-web
安装依赖包
```
yarn
```
运行项目
```
yarn dev
```
4.访问 http://localhost:8000
```
// 拓扑图页面
http://localhost:8000/coordinator
// table页面
http://localhost:8000/home
```

5.打包
```
 yarn run build
```
6.找到dist文件夹放入nginx

7.代理
```
proxy: {
    '/fetchApi': {
      target: 'http://172.20.3.93:13001/',
      changeOrigin: true,
      pathRewrite: { '^/fetchApi': '/' },
    },
  }
```

