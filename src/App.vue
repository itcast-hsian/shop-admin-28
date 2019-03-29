<template>
  <div id="app">
    hello vue
    <p>
      <el-button type="primary">主要按钮</el-button>
    </p>

  </div>
</template>

<script>
export default {
  name: 'app',
  mounted(){
    
    // 调用axios请求数据,axios的成功的回调要是.then这个方法来调用
    this.$axios({
      method: "GET",
      url: "https://api.github.com/users",
    }).then(res => {
      console.log(res)
    })
  },
}
</script>

<style>

</style>
