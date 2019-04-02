<template>
  <div>
    <!-- 新增/删除/搜索 -->
    <el-row type="flex" justify="space-between" style="margin-bottom:20px;">
      <div>
        <el-button @click="handleToAdd">新增</el-button>
        <el-button @click="handleDeletes">删除</el-button>
      </div>

      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchvalueCache" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handelSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- data当前表格的数据 -->
    <!-- 在多选中选择元素时候触发该事件,事件的参数是一个数组，数组里面由详细数据组成 -->
    <!-- selection-change表格多选时候触发 -->
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 选择列 -->
      <el-table-column type="selection" width="55"></el-table-column>

      <!-- 标题 -->
      <el-table-column label="标题" width="250">
        <!-- 自定义模板, scope.row就可以获取到当前一行的数据。行的数据来自于data -->
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="goods-image">
            {{ scope.row.title }}
          </el-row>
        </template>
      </el-table-column>

      <!-- prop用于绑定当前行的数据属性 -->
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>

      <!-- 促销价格 -->
      <el-table-column prop="sell_price" label="价格" width="120"></el-table-column>

      <!-- 操作的自定义模板 -->
      <!-- scope.$index 当前行数 -->
      <!-- scope.row当前行的数据 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- size-change改变条数时候触发 -->
    <!-- current-change 改变页数时候触发 -->
    <!-- current-page当前页数 -->
    <!-- layout 是界面排序 -->
    <!-- total是总条数，总条数的值是接口返回 -->
    <el-pagination
      style="margin-top:20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 8, 16]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格列表的数据
      tableData: [],
      multipleSelection: [],

      // 因为这3个数据都是可以变化的，所以要存放到data
      pageIndex: 1,
      pageSize: 4,
      searchvalue: "",
      // 用于当做搜索内容的缓存，在点击搜索按钮把值赋给searchvalue
      searchvalueCache: "",
      total: 0,
      ids: []
    };
  },

  mounted() {
    // 请求列表数据
    this.getList();
  },

  methods: {
    // methods不只是页面上的事件，methods中的函数可以直接通过组件实例this访问
    // 负责请求列表的数据
    getList() {
      // 请求列表的数据,axios的get可以用params属性添加请求的参数
      this.$axios({
        url: "/admin/goods/getlist",
        // params相当于post请求的data
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
        this.tableData = res.data.message;
        // 总条数
        this.total = res.data.totalcount;
      });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 表格多选时候触发
    handleSelectionChange(val) {
      const ids = val.map(v => {
        return v.id;
      });
      
      // 选中的商品的id的数组
      this.ids = ids;
    },

    // 编辑商品
    handleEdit(index, row) {
      // 跳转到编辑页，并且带上id
      this.$router.push(`/admin/goods-edit/${row.id}`);
    },

    // 删除
    handleDelete(index, row) {
      // 调用的删除的接口
      this.$axios({
        url: `/admin/goods/del/${row.id}`,
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;

        // 删除成功
        if (status == 0) {
          // 1.提示消息框
          this.$message({
            message,
            type: "success"
          });
          // 2.重新加载页面数据
          this.getList();
        }
      });
    },

    // 删除多个商品
    handleDeletes(){
    // 调用的删除的接口
      this.$axios({
        url: `/admin/goods/del/${this.ids.join(",")}`,
        // 由于在8080端口下去请求8899端口，涉及到跨域
        withCredentials: true
      }).then(res => {
        const { status, message } = res.data;

        // 删除成功
        if (status == 0) {
          // 1.提示消息框
          this.$message({
            message,
            type: "success"
          });
          // 2.重新加载页面数据
          this.getList();
        }
      });
    },

    // 改变页数时候触发
    // val就是当前点击的页数
    // 1.修改页数，2.再次请求数据
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },

    // 修改条数时候触发
    // 1.修改条数，2.再次请求数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },

    // 搜索
    // 1.把pageIndex改为第1页
    // 2.刷新数据
    handelSearch(){
      this.searchvalue = this.searchvalueCache;
      this.pageIndex = 1;
      this.getList();
    },
    // 跳转到新增商品
    handleToAdd(){
      this.$router.push("/admin/goods-add");
    }
  }
};
</script>

<style scoped>
.goods-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  /* 设置为0后元素在flex布局中就不会被挤压 */
  flex-shrink: 0;
}
</style>
