<template>
  <div class="messageBox" id="messageBox" v-if="confirmSubmitPopupStatus">
    <el-card class="confirmSubmitPopup">
      <div class="care-header">
        <i class="el-icon-error" @click="$emit('close')"></i>
        <div class="card-text">
          <p>新建题目成功</p>
        </div>
      </div>
      <div class="care-body">
        <span class="spanleft" @click="$emit('ContinueUploading')"
          >继续上传</span
        >
        <span class="spanleft" @click="reEdit">重新编辑</span>
        <span @click="backTopicWarehouse">返回题库</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'messageBox',
  props: {
    confirmSubmitPopupStatus: {
      type: Boolean,
    },
  },
  methods: {
    reEdit() {
      this.$emit('reEdit')
    },
    backTopicWarehouse() {
      this.$emit('backTopicWarehouse')
    },
  },
}
</script>

<style lang="scss" scoped>
.messageBox {
  .el-card {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 366px;
    height: 191px;
    background: #ffffff;
    border-radius: 8px;
    margin: auto;
    box-shadow: none;
    .care-header {
      i {
        position: absolute;
        top: 12px;
        right: 12px;
        font-size: 20px;
        color: #c0c4cc;
      }
      i:hover {
        color: #f56c6c;
      }
      .card-text {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        line-height: 41px;
        text-align: center;
        margin-top: 28px;
        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
        .spanItem {
          font-size: 12px;
        }
      }
    }
    .care-body {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 49px;
      line-height: 49px;
      border-top: 1px solid #dcdfe6;
      display: flex;
      span {
        text-align: center;
        display: block;
        flex: 1;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      span:hover {
        color: #409eff;
      }
      .spanleft {
        border-right: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
