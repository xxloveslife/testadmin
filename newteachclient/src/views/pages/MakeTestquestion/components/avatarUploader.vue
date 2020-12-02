<template>
  <div class="avatar-uploader-container">
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />

      <div class="imageBox" v-else>
        <img class="avatar-uploader-icon" src="@/assets/imgs/jiahao.png" />
        <span class="iconText">{{ text }}</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'avatarUploader',
  data() {
    return {
      imageUrl: '',
    }
  },
  props: {
    text: {
      type: String,
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
  },
}
</script>

<style>
.avatar-uploader-container {
  display: inline-block;
}
.avatar-uploader {
  position: relative;
}
.avatar-uploader .el-upload {
  background-color: #ebeef5;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 78px;
  height: 78px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  margin: 10px 0 5px;
  font-size: 28px;
  color: #8c939d;
  width: 28px;
  height: 28px;
}
.imageBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.iconText {
  width: 62px;
  height: 14px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #909399;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>
