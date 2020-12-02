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
          <router-view />
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
      // console.log("res", res);
      console.log("storeinfos", this.$store.getters.userWorkBench);
    });
  },
};
</script>
<style lang="scss" >
@import "@/style/variable.scss";

.home {
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    .side {
      background-color: #409eff;
    }
    .rt_container {
      .main {
        background-color: #f2f6fc;
      }
    }
  }
}

.el-main {
  padding-left: 17px;
  padding-right: 28px;
}
.el-header {
  // width: 107.5rem;
  padding: 13px 28px 0 17px;
  background-color: #f2f6fc;
}
</style>
