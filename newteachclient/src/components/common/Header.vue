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
    <div class="logout" @click="logout">
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    teacher_name: String,
    teacher_style: {
      type: String,
      default: '',
    },
    login_account: String,
  },
  date() {
    return {
      name: 'XX',
    }
  },

  computed: {
    m_teacher_style: function() {
      if (this.teacher_style) {
        if (this.teacher_style == '1') {
          return '音乐'
        } else if (this.teacher_style == '2') {
          return '美术'
        } else {
          return '音乐 | 美术'
        }
      }
      return ''
    },
  },
  methods: {
    logout() {
      // 退出登录
      this.$store.commit('user/DEL_TOKEN')
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="scss">
.home_header {
  float: left;
  width: 100%;
  height: 5rem;
  background-color: #ffffff;
  border-radius: 0.25rem;
  .teacher {
    float: left;

    span {
      line-height: 5rem;
      margin-left: 1.5625rem;
      font-family: PingFang-SC-Heavy;
      font-size: 1.5rem;
      color: #303133;
    }
  }
  .teacherInfo {
    margin-left: 1.5rem;
    float: left;
    span {
      display: inline-block;
      margin-top: 2.3125rem;
      font-family: PingFang-SC-Medium;
      color: #909399;
    }
  }
  .logout {
    width: 2.5rem;
    cursor: pointer;
    float: right;
    margin-top: 1.0625rem;
    margin-right: 1.6875rem;
    background-image: url('../../assets/imgs/workbench/logout.png');
    background-size: 2.5rem 2.5rem;
    background-repeat: no-repeat;
    span {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      // background-color: orange;
      text-align: center;
      line-height: 2.5rem;
    }
  }
  .logout:hover {
    // background-color: rgba(255, 255, 255, 0.8);
    // background-color: red;
    // z-index: 1;

    opacity: 0.5;
    filter: alpha(opacity=40); /* 针对 IE8 以及更早的版本 */
  }
}
</style>
