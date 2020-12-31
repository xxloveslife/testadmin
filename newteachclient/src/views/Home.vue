<template>
  <div class="home">
    <el-container class="container">
      <!-- 侧边 -->
      <el-aside width="200px" class="side">
        <m-sidebar></m-sidebar>
      </el-aside>
      <!-- rightside -->
      <el-container class="rt_container">
        <!-- 头部 -->
        <el-header height="118px" class="header">
          <m-header
            :teacher_name="userWorkBench.teacher_name"
            :teacher_style="userWorkBench.teacher_style"
            :login_account="userWorkBench.login_account"
          ></m-header>
        </el-header>
        <!-- 展示区   子路由出口 -->
        <el-main class="main">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import mSidebar from "@/components/common/Sidebar.vue";
import mHeader from "@/components/common/Header.vue";
import $axios from "@/api/index.js";
export default {
  name: "Home",
  data() {
    return {
      userWorkBench: {},
    };
  },
  components: {
    mSidebar,
    mHeader,
  },
  created() {
    this.$store.dispatch("user/getWorkBench").then((res) => {
      this.userWorkBench = this.$store.getters.userWorkBench;
    });
  },
};
</script>
<style lang="scss">
@import "@/style/variable.scss";

.home {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .side {
      background-color: #409eff;
      width: 12.5rem !important;
    }
    .rt_container {
      .main {
        background-color: #f2f6fc;
      }
    }
  }
}

.el-main {
  padding: 0;
  padding-left: 1.0625rem;
  padding-right: 1.75rem;
}
.header {
  // width: 107.5rem;
  padding: 0.8125rem 1.75rem 0 1.0625rem;
  background-color: #f2f6fc;
}
</style>
