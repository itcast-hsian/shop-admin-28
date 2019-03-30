<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',

  mounted(){
    // 请求判断当前的用户是否是登录状态
    this.$axios({
      url: "/admin/account/islogin",
      // 由于在8080端口下去请求8899端口，涉及到跨域
      withCredentials: true
    }).then(res =>{
      // 如果用户没有登录的话，跳转到登录页
      if(res.data.code == "nologin"){
        this.$router.push("/login")
      }
    })
  }
}
</script>

<style>
/*公共样式*/
*{
  margin:0;
  padding:0;
}
</style>
