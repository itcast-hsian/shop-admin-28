<template>
    <el-menu
      default-active="1-2"
      class="el-menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>购物商城</span>
        </template>

        <el-menu-item index="1-1">商品管理</el-menu-item>

        <el-menu-item index="1-2">栏目管理</el-menu-item>

      </el-submenu>
     
    </el-menu>
</template>

<script>
export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
.el-menu{
    height:100%;
}
</style>
