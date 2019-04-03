<template>
    <el-row type="flex" justify="space-between" align="middle">
        <i class="el-icon-back" @click="handleClick"></i>
        <div>{{user.username}}  {{user.realname}}
          <span class="logout" @click="logout">退出</span>
        </div>
    </el-row>
</template>

<script>

// 导入vuex的数据
import {mapState} from "vuex";


export default {
  data(){
    return {}
  },

  computed: {
    ...mapState({
      // key的值自己定义的属性，在页面根据这个值来渲染
      // “user”是vuex中定义的属性
      user: "user"
    })
  },

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
