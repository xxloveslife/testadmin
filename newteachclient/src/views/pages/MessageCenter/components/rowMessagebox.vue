<template>
  <div class="messageBox" v-if="rowMessageBoxStatus">
    <el-card>
      <div class="care-header">
        <i class="el-icon-error" @click="closeMessageBox"></i>
      </div>
      <div class="care-body-header">
        <p class="ptitle">{{ rowObj.title }}</p>
        <p class="ptext">{{ rowObj.time }}</p>
      </div>
      <div class="contents">{{ rowObj.contents }}</div>
      <div class="care-body">
        <el-button type="primary" @click="closeMessageBox">确定</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'rowmMessageBoxStatus',
  props: {
    rowMessageBoxStatus: {
      type: Boolean,
    },
    rowObj: {
      type: Object,
    },
  },
  methods: {
    closeMessageBox() {
      this.$emit('closeMessage')
    },
    removePhone() {
      this.$emit('removeMessage')
    },
  },
}
</script>

<style lang="scss" scoped>
.messageBox {
  .el-card {
    position: relative;
    width: 743px;
    height: 286px;
    background: #ffffff;
    border-radius: 8px;
    margin: auto;
    box-shadow: none;
    .care-header {
      i {
        z-index: 999999;
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
        margin-top: 10px;
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
    .contents {
      height: 169px;
      margin-top: 47px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      line-height: 30px;
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
      .el-button {
        position: relative;
        top: 10px;
        left: 26px;
        padding: 8px 20px;
        width: 77px;
        height: 32px;
        border-radius: 6px;
      }
    }
    .care-body-header {
      position: absolute;
      top: 0;
      left: 0;
      height: 66px;
      width: 100%;
      border-bottom: 1px solid #d6dbe7;
      padding: 17px 25px 12px;
      .ptitle {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .ptext {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
  }
}
</style>
