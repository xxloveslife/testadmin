<template>
  <div class="home">
    <el-container class="container">
      <!-- 侧边 -->
      <el-aside width="200px" class="side">
        <m-sidebar></m-sidebar>
      </el-aside>
      <el-container class="rt_container">
        <!-- 头部 -->
        <el-header height="118px" class="header">
          <m-header></m-header>
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
export default {
  name: "Home",
  components: {
    mSidebar,
    mHeader,
  },
};
</script>
<style lang="scss" >
.home {
  height: 100%;
  .container {
    height: 100%;
  }
}
.main {
  padding: 0;
  // background-color: #f2f6fc;
}
.side {
  background-color: #409eff;
}
.header {
  padding-top: 13px;
  padding-right: 28px;
  // background-color: #f2f6fc;
}
.rt_container {
  background-color: #f2f6fc;
}
</style>
