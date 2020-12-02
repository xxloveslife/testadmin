<template>
  <!-- header -->
  <div class="home_header">
    <!-- teacher -->
    <div class="teacher">
      <span>你好,{{ teacher_name }}</span>
    </div>
    <!-- teacherInfo -->
    <div class="teacherInfo">
      <span> {{ m_teacher_style }} | 系统账号: {{ login_account }}</span>
    </div>
    <!-- logout -->
    <div class="logout">
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    teacher_name: String,
    teacher_style: {
      type: Number,
      default: 0,
    },
    login_account: String,
  },
  date() {
    return {
      name: "XX",
    };
  },

  computed: {
    m_teacher_style: function () {
      if (this.teacher_style) {
        // console.log("jinlail");
        // console.log(this.teacher_style);
        if (this.teacher_style == 1) {
          return "音乐";
          // console.log(this.m_teacher_style);
        } else if (this.teacher_style == 2) {
          return "美术";
        } else {
          return "音乐 | 美术";
        }
      }
      return "";
    },
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
    float: left;

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
    float: left;
    span {
      display: inline-block;
      margin-top: 37px;
      font-family: PingFang-SC-Medium;
      color: #909399;
    }
  }
  .logout {
    width: 2.5rem;

    float: right;
    margin-top: 17px;
    margin-right: 27px;
    background-image: url("../../assets/imgs/workbench/logout.png");
    background-size: 2.5rem 2.5rem;
    background-repeat: no-repeat;
    span {
      display: inline-block;
      width: 40px;
      height: 40px;
      // background-color: orange;
      text-align: center;
      line-height: 40px;
    }
  }
  .logout:hover {
    // background-color: rgba(255, 255, 255, 0.8);
    background-color: red;
    z-index: 1;
  }
}
</style>