<template>
  <div class="messageBox" id="messageBox" v-if="messageBoxStatus">
    <el-card>
      <div class="care-header">
        <i class="el-icon-error" @click="$emit('close')"></i>
        <div class="card-text">
          <p>确定要删除{{ showMessageBoxText }}吗</p>
        </div>
      </div>
      <div class="care-body">
        <span class="spanleft" @click="removePhone">替换</span>
        <span @click="closeMessageBox">删除</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'messageBox',
  props: {
    showMessageBoxText: {
      type: String,
    },
    messageBoxStatus: {
      type: Boolean,
    },
  },
  methods: {
    closeMessageBox() {
      this.$emit('closeMessage', this.showMessageBoxText)
    },
    removePhone() {
      this.$emit('removeMessage', this.showMessageBoxText)
    },
  },
}
</script>

<style lang="scss" scoped>
.messageBox {
  .el-card {
    position: relative;
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
