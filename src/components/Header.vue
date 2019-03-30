<template>
    <el-row type="flex" justify="space-between" align="middle">
        <i class="el-icon-back" @click="handleClick"></i>
        <div>admin 超级管理员 
          <span class="logout" @click="logout">退出</span>
        </div>
    </el-row>
</template>

<script>
export default {
  methods: {
    // 切换菜单
    handleClick(){
      this.$emit("changeShow")
    },

    // 退出
    logout(){
      this.$axios({
        url: "/admin/account/logout",
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        if(res.data.status === 0){
          // replace和push方法一样，都可以跳转，直接替换掉当前页面
          this.$router.replace("/login");
        }
      })
    }
  }
}
</script>

<style scoped>
.logout{
  cursor: pointer;
}
</style>
