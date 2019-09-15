/*
 * @Description: Some description
 * @Version: 1.0
 * @Author: jonsam
 * @Date: 2019-09-15 17:00:10
 * @LastEditors: jonsam
 * @LastEditTime: 2019-09-15 20:19:00
 */
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports={
  mode:"development",
  entry:"./src/main.js",
  output:{
    path:path.resolve(__dirname,"dist"),
    filename:"js/bundle.[hash].js"
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:"./src/index.html"
    }),
    new webpack.BannerPlugin("made at "+Date.now()),
    new MiniCssExtractPlugin({
      filename:"css/main.css"
    }),
    new VueLoaderPlugin()
  ],
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
      },
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
      },
      {
        test:/\.vue$/,
        use:"vue-loader"
      }
      
    ]
  },
    devServer:{
      port:3000,
      contentBase:"./dist",
      host:"192.168.31.42",
      hot:true,
      open:true
    }
}