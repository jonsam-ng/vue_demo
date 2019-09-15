/*
 * @Description: Some description
 * @Version: 1.0
 * @Author: jonsam
 * @Date: 2019-09-15 16:57:47
 * @LastEditors: jonsam
 * @LastEditTime: 2019-09-15 20:14:17
 */
// let sum = (a,b)=>a+b;
// console.log(sum(3,2));
// import pic from "./images/02.png";
// let img = new Image();
// img.src=pic;
// document.body.appendChild(img);
import Vue from "vue"
import App from "./com/App.vue"
new Vue({
  el:"#app",
  render:r=>r(App)
})