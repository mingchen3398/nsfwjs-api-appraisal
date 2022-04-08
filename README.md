## 说明
 **1.因为`@tensorflow/tfjs-node`安装对于服务器而言过于复杂(<b>需要安装Visual Studio</b>),所以就安装了`@tensorflow/tfjs`  
2.目前图片鉴定仅支持png与jpg两种格式  
3.node版本建议使用14.18+,且小于17,部署过程中,由于服务器使用的是12.22.x,导致了报错** 
## 安装依赖
```shell
npm install / yarn 
```
## 安装 <a href="https://nodemon.io/">nodemon</a> 
```shell
npm install nodemon -g
```
>nodemon是一种工具，可以自动检测到目录中的文件更改时通过重新启动应用程序来调试基于node.js的应用程序。----引用自<a href="https://www.jianshu.com/p/f60e14db0b4e">简书</a>

## 运行
```shell
npm run start / npm run monstart
```
日志:
```log
[nodemon] restarting due to changes...
[nodemon] starting `node app.js`

============================
Hi there 👋. Looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, which binds to TensorFlow C++, by running npm i @tensorflow/tfjs-node, or npm i @tensorflow/tfjs-node-gpu if you have CUDA. Then call require('@tensorflow/tfjs-node'); (-gpu suffix for CUDA) at the start of your program. Visit https://github.com/tensorflow/tfjs-node for more details.     
============================
项目已运行在端口 3456
模块已运行
```
