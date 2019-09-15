<!--
 * @Description: Some description
 * @Version: 1.0
 * @Author: jonsam
 * @Date: 2019-09-15 15:23:04
 * @LastEditors: jonsam
 * @LastEditTime: 2019-09-15 15:23:04
 -->
# 不使用脚手架，一步一步配置vue的环境
## 初始化项目依赖

在项目文件夹输入命令行：npm init -y（-y:yes 使用默认的）

建立一个项目依赖的json文件，这个文件用于管理后面的依赖包。然后用编辑器打开刚刚建立的项目文件夹。

## 配置运行脚本

在package.json中进行配置：

```javascript
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
```

## 初始化文件结构

> “dist”:产品目录；
>
> “src”:源码目录；
>
> “index.html”:首页；
>
> “main.js”:程序入口

## **安装webpack包**

命令行：npm install --save-dev(-D) webpack webpack-cli wenpack-dev-server

注意：webpack 我们安装的时候带上：--save-dev 参数，目的是让依赖包只在本地开发环境安装，在线上环境不会安装，如果需要在线上进行安装依赖的，可以使用命令：npm install --save webpack,  卸载依赖包的命令是：npm uninstall --save / --save-dev  webpack  

## 配置webpack

在根目录下新建webpack.config.js文件：

```javascript
const path = require("path");
const {CleanWebpackPlugin} = 

module.exports={
  mode:"development",
  entry:"./src/main.js",
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"js/bundle.[hash].js"
  },
  plugins:[
    
  ]
}
```

运行webpack:npm run build,在dev/js下生成Bundle.js文件。

## 安装插件

​    "babel-core":  es6 转换核心插件

​    "babel-loader": js 的loader 插件，主要是模块化js

​    "babel-plugin-transform-runtime": 提供一个沙盒插件,参看：https://segmentfault.com/a/1190000009065987

​    "babel-preset-env": es预处理插件

​    "babel-preset-stage-2": es 的stage - 2 的插件，参看stage-0   到   stage - 4 的区别

​    "chalk": 文本样式化插件

​    "child_process": node 子进程包

​    "clean-webpack-plugin":清除内容插件

​    "css-loader": css 的模块化插件

​    "extract-text-webpack-plugin": 提取独立的文件插件

​    "html-webpack-plugin":  html 自动构建插件

​    "less": less 的编译包 

​    "less-loader":  less 的模块化插件

​    "ora": 分割器，

​    "rimraf":  删除插件

​    "semver": 版本检查插件

​    "shelljs": shell 命令插件

​    "style-loader":style  标签 插件

​    "uglifyjs-webpack-plugin":压缩插件

​    "url-loader":一般用于图片的地址，可转换为base64格式

​    "webpack-dev-middleware":中间件，用于热重载  HRM

​    "webpack-dev-server": webpack 的本地服务器， 也可以HRM

​    "webpack-hot-middleware": "^2.21.0"   //  中间件，用于热重载，HRM

​    "express": 提供服务器端的中间件  和HRM的中间件一起，做到HRM

**以下插件安装为 --save 的线上依赖**

​    "vue": "^2.5.13",   

​    "vue-loader": "^13.6.2",

​    "vue-router": "^3.0.1",

​    "vue-template-compiler": "^2.5.13",

​    "vuex": "^3.0.1"

### clean-webpack-plugin

` 作用:`为生产环境编译文件的时候，先把 `build或dist` (就是放生产环境用的文件) 目录里的文件先清除干净，再生成新的。

1. 安装clean-webpack-plugin

   ```javascript
   npm i clean-webpack-plugin --save-dev
   ```

2. 在webpack.config.js中配置：

   ```javascript
   const { CleanWebpackPlugin } = require('clean-webpack-plugin');
   //在plugins中注册
   new CleanWebpackPlugin()
   ```

### html-webpack-plugin

` 作用：`

+ 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题；
+ 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口。

1. 安装html-webpack-plugin

   ```javascript
   npm i html-webpack-plugin --save-dev
   ```

2. 在webpack.config.js中配置：

   ```javascript
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   //在plugins中注册
   new HtmlWebpackPlugin({
         template:"./src/index.html"
       })
   ```

### webpack.BannerPlugin

` 作用:`为每个 chunk 文件头部添加 banner。

1. webpack自带，不需要安装

2. 在webpack.config.js中配置：

   ```javascript
   const webpack = require("webpack")
   //在plugins中注册
   new webpack.BannerPlugin("made at "+Date.now())
   ```

### Babel

` 作用:`编译es6语法。

1. 安装

   ```javascript
   npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime babel-loader
   npm i @babel/runtime @babel/polyfill
   ```

2. 在webpack.config.js中配置：

   ```javascript
   module:{
       rules:[
         {
           test:/\.js$/,
           use:{
             loader:"babel-loader",
             options:{
               presets:[
                 "@babel/preset-env"
               ],
               plugins:[
                 "@babel/plugin-transform-runtime"
               ]
             }   
           },
           exclude:/node_modules/
         },  
       ]
     }
   ```
### css

` 作用:`编译css。

1. 安装

   ```javascript
   npm i -D css-loader less less-loader postcss-loader autoprefixer mini-css-extract-plugin
   ```
   
2. 在webpack.config.js中配置：

   ```javascript
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   //在plugins中注册
   new MiniCssExtractPlugin({
         filename:"css/main.css"
       })
   //在module/rules中配置
   {
           test:/\.css$/,
           use:[
             MiniCssExtractPlugin.loader,
             'css-loader',
             'postcss-loader'
           ]
         },
         {
           test:/\.less$/,
           use:[
             MiniCssExtractPlugin.loader,
             'css-loader',
             'postcss-loader',
             'less-loader'
           ]
         }
   ```
### 图片

` 作用:`编译图片。

1. 安装

   ```javascript
   npm i -D url-loader file-loader
   ```
   
2. 在webpack.config.js中配置：

   ```javascript
   //在module/rules中配置
   {
           test:/\.(jpg|png|jpeg|gif)$/,
           use:{
              loader:"url-loader",
              options:{
                limit:30*1024,
                outputPath:"images"
              } 
           }
         },
         {
           test:/\.(eot|woff|woff2|ttf)$/,
           use:"url-loader"      
         }
   ```

## **安装Vue**

1. 安装

   ```javascript
   npm i vue vuex vue-router
   npm i vue vuex vue-router
   ```

2. 修改css和less的解析规则

   ```javascript
   {
           test:/\.css$/,
           use:[
             "vue-style-loader",
             'css-loader',
             'postcss-loader'
           ]
         },
         {
           test:/\.less$/,
           use:[
             "vue-style-loader",
             'css-loader',
             'postcss-loader',
             'less-loader'
           ]
         }
   
   //添加vue文件的解析
   {
           test:/\.vue$/,
           use:"vue-loader"
         }
   ```

   ## 配置devServer

   在webpack.config.js 中配置：

   ```javascript
   devServer:{
         port:3000,
         contentBase:"./dist",
         host:"192.168.31.42",
         hot:true,
         open:true
       }
   ```