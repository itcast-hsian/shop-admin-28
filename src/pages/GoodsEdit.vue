<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择所属类别">
        <el-option
          v-for="(item, index) in categorys"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类名">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片">
        <!-- action指定上传路径 -->
        <!-- show-file-list 上传多种图片才使用 -->
        <!-- on-success上传成功后的回调函数 -->
        <!-- before-upload 上传之前的事件 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- img 用于预览图片，imageUrl来自于上传图片成功后 -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="商品数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
        <!-- list-type="picture-card"卡片多种图片类型 -->
        <!-- :on-preview预览图片
        :on-remove删除图片 -->
        <!-- file-list用于显示已存在图片列表 -->
        <el-upload
            action="http://localhost:8899/admin/article/uploadimg"
            list-type="picture-card"
            :file-list="form.fileList"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handlePictureCard">
            <i class="el-icon-plus"></i>
        </el-upload>

        <!-- visible显示隐藏 -->
        <!-- dialogImageUrl预览图片路径 -->
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>
    
    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <div class="editor">
        <el-form-item label="内容描述">
            <quillEditor v-model="form.content"></quillEditor>
        </el-form-item>
    </div>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item> 
  </el-form>
</template>
<script>

// 导入外部的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  data() {
    return {
      form: {
        category_id: "", // 所属类别id
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        fileList: [],
        content: "",
        zhaiyao: "",
        is_slide: false // 在商品详情中不使用
      },
      // 保存类别列表
      categorys: [],
      imageUrl: "",
      // 预览图片的路径
      dialogImageUrl: '',
      // 是否显示预览窗口
      dialogVisible: false
    };
  },
  components: {
      // 编辑器组件
    quillEditor
  },
  methods: {
    onSubmit() {
      // 提交form数据
      this.$axios({
          url:  `/admin/goods/edit/${this.$route.params.id}`,
          method: "POST",
          data: this.form,
          // 由于在8080端口下去请求8899端口，涉及到跨域
          withCredentials: true
      }).then(res => {
          const {message, status} = res.data;

          if(status == 0){
              // 1. 提示用户
            this.$message({
                message,
                type: "success"
            });
            //2.返回上一页
            this.$router.back();
          }    
      })
    },
    // 上传成功
    handleAvatarSuccess(res, file) {
        // URL.createObjectURL是html5的新接口，可以用于预览本地图片
        // file.raw路径
        this.imageUrl = window.URL.createObjectURL(file.raw);
        this.form.imgList[0] = res
    },
    // 上传之前,file就是当前上传的文件对象
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 预览图片
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    // 删除图片时候触发
    handleRemove(file, fileList) {
        // fileList每一项的respone的属性才是 { name:xxx, shotUrl: xxx, url: xxx },
        console.log(fileList)
        this.form.fileList = fileList.map(v => {
            return v.response;
        });

        console.log(this.form.fileList)
    },
    // 上传图片成功后的回调
    handlePictureCard(res, file){
       this.form.fileList.push(res);
    }
  },
  mounted() {
    // 请求类别数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      // 保存到categorys
      this.categorys = message;
    });

    // 1.获取id
    const id = this.$route.params.id;
    // 2.请求商品数据
    this.$axios({
      url: `/admin/goods/getgoodsmodel/${id}`,
    }).then(res => {
      const {message, status} = res.data;
      // 把返回赋值给form的默认值
      this.form = message;

      // 预览封面图片
      this.imageUrl = message.imgList[0].url;

      // 因为接口有bug，处理图片显示,叫后台过来
      this.form.fileList = message.fileList.map(v=> {
        return {
          ...v,
          url: `http://127.0.0.1:8899` + v.shorturl
        }
      })
    })
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
 
.editor .el-form-item__content{
    line-height: unset;
}
</style>
