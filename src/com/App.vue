<!--
 * @Description: Some description
 * @Version: 1.0
 * @Author: jonsam
 * @Date: 2019-09-15 20:06:36
 * @LastEditors: jonsam
 * @LastEditTime: 2019-09-15 20:24:28
 -->
<template>
  <div id="app">
    <login></login>
    <h1>app 组件</h1>
  </div>
</template>

<script>
import login from "./login.vue"
export default {
  components:{
    login
  }
}
</script>

<style lang="less" scoped>
  div{
    h1{
      color: lightblue;
    }
  }
</style>