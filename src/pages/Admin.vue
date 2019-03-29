<template>
    <el-container>
        <el-aside width="200px">
            <!-- 左侧菜单 -->
            <Menu></Menu>
        </el-aside>
        <el-container>
            <el-header>
                <!-- 头部 -->
                <Header></Header>
            </el-header>
            <el-main>
                <!-- 面包屑 -->
                <Breakcrumb></Breakcrumb>

                <!-- 匹配到的子组件 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

// 导入固定的组件
import Header from "../components/Header";
import Menu from "../components/Menu";
import Breakcrumb from "../components/Breakcrumb";

export default {

    // 注册组件
    components: {
        Header,
        Menu,
        Breakcrumb
    }
}
</script>

<style>
  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
    /*指向最外层的container样式*/
  #app > .el-container {
    position:absolute;
    width:100%;
    top:0;
    bottom:0;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
