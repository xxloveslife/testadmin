<template>
  <div class="add-tomine-container" v-if="addTomineStatus">
    <div class="add-tomine-container-header">
      <p class="add-tomine-container-header-text">布置作业</p>
      <i class="el-icon-error" @click="$emit('close')"></i>
    </div>
    <div class="add-tomine-container-footer">
      <span>确认</span>
      <span @click="$emit('close')">取消</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addTomine',
  props: {
    addTomineStatus: {
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.add-tomine-container {
  position: relative;
  width: 500px;
  height: 268px;
  background: #ffffff;
  box-shadow: 0px 5px 16px 0px #d6dbe7;
  border-radius: 8px;
  .add-tomine-container-header {
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #dcdfe6;
    .add-tomine-container-header-text {
      margin-left: 30px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
    .el-icon-error {
      position: absolute;
      top: 9px;
      right: 9px;
      font-size: 20px;
      color: #c0c4cc;
    }
    .el-icon-error:hover {
      color: #f56c6c;
    }
  }
  .add-tomine-container-footer {
    position: absolute;
    display: flex;
    left: 0;
    bottom: 0;
    height: 52px;
    line-height: 52px;
    width: 100%;
    border-top: 1px solid #dcdfe6;
    span {
      flex: 1;
      text-align: center;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
    span:hover {
      color: #409eff;
    }
    span:first-child {
      border-right: 1px solid #dcdfe6;
    }
  }
}
</style>
