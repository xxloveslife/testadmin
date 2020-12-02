<template>
  <div class="upload-image-container">
    <div class="leftTitle">{{ changeRadioVal }}图片 :</div>
    <div class="rightBox">
      <avatar-uploader
        v-if="changeRadioVal === '音乐'"
        class="avatar-uploader"
        :text="text"
      ></avatar-uploader>
      <avatar-uploader
        class="avatar-uploader"
        :text="text1"
        v-if="changeRadioVal === '音乐'"
      ></avatar-uploader>
      <avatar-uploader
        class="avatar-uploader"
        :text="text2"
        v-else
      ></avatar-uploader>

      <el-button type="primary">查看图列</el-button>
      <span>请上传简谱图片，图片限宽670px，高度根据实际题目需要</span>
    </div>
  </div>
</template>

<script>
import avatarUploader from './avatarUploader'
export default {
  name: 'uploadImage',
  data() {
    return {
      text: '上传五线谱',
      text1: '上传简谱',
      text2: '上传图片',
    }
  },
  props: {
    // 题型选择值
    radioDefault: {
      type: String,
    },
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 试题list
    testQuestionlists: {
      type: Object,
    },
  },
  components: {
    avatarUploader,
  },
}
</script>

<style lang="scss" scoped>
.upload-image-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }
  .avatar-uploader {
    margin-right: 15px;
  }
  .rightBox {
    margin-left: 60px;
    margin-top: 50px;
    span {
      position: relative;
      top: -17px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
    .el-button {
      transform: translateY(-18px);
      margin-right: 11px;
    }
  }
}
</style>
