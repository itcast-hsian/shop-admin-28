<template>
    <el-row type="flex" justify="center" align="middle"  class="login">
        
        <el-form :model="form" label-width="60px" class="form">
            <div class="header">登录</div>

            <el-form-item label="账号">
                <el-input v-model="form.uname"></el-input>
            </el-form-item>

            <el-form-item label="密码">
                <el-input v-model="form.upwd" type="password"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="onReset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>
<script>
  export default {
    data() {
      return {
        form: {
            uname: '',
            upwd: ""
        }
      }
    },
    methods: {
      onSubmit() {
        // 获取到form的值
        this.$axios({
          url: "http://localhost:8899/admin/account/login",
          data: this.form,
          // 注意：没有s
          method: "POST",
          // 由于在8080端口下去请求8899端口，涉及到跨域
          withCredentials: true
        }).then(res => {
          const {status, message} = res.data;
          // 登录失败
          if(status == 1){
            // 使用elementui的消息弹窗
            this.$message.error(message)
          }else{
            // 登录成功
            this.$router.push("/admin");
          }
        })
      },
      onReset(){
          // 清空form的数据
          this.form = {
            username: '',
            password: ""
          }
      }
    }
  }
</script>

<style scoped>
.login{
    position: absolute;
    width:100%;
    top:0; 
    bottom:0;
}

.form{
    width:350px;

}

.header{
    line-height: 2;
    margin-bottom: 20px;
    color:#409EFF;
    text-align: center;
}

</style>
