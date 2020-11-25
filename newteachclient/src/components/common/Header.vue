<template>
  <!-- header -->
  <div class="home_header">
    <!-- teacher -->
    <div class="teacher">
      <span>你好,</span>
    </div>
    <!-- teacherInfo -->
    <div class="teacherInfo">
      <span>xx | xx | 系统账号:</span>
    </div>
    <!-- logout -->
    <div class="logout">
      <span>注销</span>
    </div>
  </div>
</template>
<script>
export default {
  date() {
    return {
      name: "XX",
    };
  },
};
</script>
<style lang="scss">
.home_header {
  float: left;
  width: 100%;
  height: 80px;
  background-color: #ffffff;
  .teacher {
    // float: left;

    span {
      line-height: 80px;
      margin-left: 53px;
      font-family: PingFang-SC-Heavy;
      font-size: 24px;
      color: #303133;
    }
  }
  .teacherInfo {
    margin-left: 24px;
    // float: left;
    span {
      display: inline-block;
      margin-top: 37px;
      font-family: PingFang-SC-Medium;
      color: #909399;
    }
  }
  .logout {
    float: right;
    margin-top: 17px;
    margin-right: 27px;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      background-color: orange;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>