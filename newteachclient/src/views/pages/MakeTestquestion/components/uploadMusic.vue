<template>
  <div class="upload-music-container">
    <div class="leftTitle">音乐文件 :</div>
    <div class="rightBox">
      <avatar-uploader class="avatar-uploader" :text="text"></avatar-uploader>
      <span>根据题目需求上传乐曲文件</span>
    </div>
  </div>
</template>

<script>
import avatarUploader from './avatarUploader'
export default {
  name: 'uploadMusic',
  data() {
    return {
      text: '上传文件',
    }
  },
  components: {
    avatarUploader,
  },
}
</script>

<style lang="scss" scoped>
.upload-music-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }
  .rightBox {
    margin-left: 60px;
    margin-top: 10px;
  }
  .avatar-uploader {
    margin-right: 10px;
  }
  span {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
  }
}
</style>
