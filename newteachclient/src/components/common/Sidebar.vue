<template>
  <div class="sidebar">
    <!-- logo -->
    <div class="logo">
      <div class="logo_box">
        <img src="../../assets/header-logo/header-logo.png" />
      </div>
    </div>
    <!-- sidebar -->
    <el-menu
      :unique-opened="uniqueopen"
      class="el-menu-vertical-demo"
      background-color="#409EFF"
      text-color="#FFFFFF"
      active-text-color="#FFFFFF"
      router
    >
      <!-- //  列表渲染 -->
      <div v-for="(item, i) in items" :key="i">
        <!-- 子路径判断 -->
        <template v-if="item.subs">
          <el-submenu :index="i.toString()" :key="item.index">
            <template class="submenu" slot="title">
              <i :class="item.icon"></i>
              <span class="font-des" slot="title">{{ item.title }}</span>
            </template>

            <div class="cussubitem" v-for="(subItem, i) in item.subs" :key="i">
              <el-menu-item :index="subItem.index">{{
                subItem.title
              }}</el-menu-item>
            </div>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span class="font-des" slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      uniqueopen: true,
      items: [],
      // items: [
      //   {
      //     icon: "",
      //     index: "/dashboard",
      //     title: "工作台",
      //   },
      //   {
      //     icon: "",
      //     index: "",
      //     title: "题库卷库",
      //     //二级菜单
      //     subs: [
      //       {
      //         index: "/testquestionlibrary",
      //         title: "试题库",
      //       },
      //       {
      //         index: "/maketestquestion",
      //         title: "制作试题",
      //       },
      //       {
      //         index: "/testpaperlibrary",
      //         title: "试卷库",
      //       },
      //       {
      //         index: "/maketestpaper",
      //         title: "制作试卷",
      //       },
      //     ],
      //   },
      //   // 课堂教学
      //   {
      //     icon: "",
      //     index: "",
      //     title: "课堂教学",
      //     subs: [
      //       { index: "/courselist", title: "课程列表" },
      //       {
      //         index: "/newcourse",
      //         title: "新建课件",
      //       },
      //     ],
      //   },
      //   // 考试中心
      //   {
      //     icon: "",
      //     index: "",
      //     title: "考试中心",
      //     subs: [
      //       { index: "/examRecorder", title: "考试记录" },
      //       {
      //         index: "/studentdata",
      //         title: "学生数据",
      //       },
      //     ],
      //   },
      //   // 教务管理
      //   {
      //     icon: "",
      //     index: "",
      //     title: "教务管理",
      //     subs: [
      //       { index: "/teachermanage", title: "老师管理" },
      //       {
      //         index: "/studentmanage",
      //         title: "学生管理",
      //       },
      //       {
      //         index: "/classmanage",
      //         title: "班级管理",
      //       },
      //       {
      //         index: "/studentturnout",
      //         title: "学生出勤",
      //       },
      //     ],
      //   },
      //   // 课外练习
      //   {
      //     icon: "",
      //     index: "",
      //     title: "课外练习",
      //     subs: [
      //       { index: "/practicelib", title: "练习库" },
      //       {
      //         index: "/practicerecord",
      //         title: "练习记录",
      //       },
      //     ],
      //   },
      //   // 过程性评价
      //   {
      //     icon: "",
      //     index: "",
      //     title: "过程性评价",
      //     subs: [
      //       {
      //         index: "/processgrade",
      //         title: "过程性评价评分",
      //       },
      //       {
      //         index: "/datapreview",
      //         title: "数据总览",
      //       },
      //       {
      //         index: "/activity",
      //         title: "艺术活动",
      //       },
      //     ],
      //   },
      //   // 账号管理
      //   {
      //     icon: "",
      //     index: "",
      //     title: "账号管理",
      //     //二级菜单
      //     subs: [
      //       {
      //         index: "/personalInformation",
      //         title: "个人资料",
      //       },
      //       {
      //         index: "/operationLog",
      //         title: "操作日志",
      //       },
      //       {
      //         index: "/messageCenter",
      //         title: "消息中心",
      //       },
      //     ],
      //   },
      //   {
      //     icon: "",
      //     index: "/test",
      //     title: "test",
      //   },
      // ],
    };
  },
  methods: {
    // handleOpen() {
    //   // console.log("handleOpen");
    // },
    // handleClose() {},
  },
  computed: {
    ...mapGetters(["sidebarItems"]),
  },
  created() {
    this.items = this.sidebarItems;
  },
};
</script>
<style lang="scss">
.sidebar {
  width: 100%;
  // width: 200px;
  height: 100%;
  overflow: hidden;
  .sidebar > ul {
    width: 100%;
    // background-color: white !important;
  }

  .logo {
    height: 7.375rem;
    background-color: #409eff;
    .logo_box {
      width: 4.55rem;
      height: 3.88125rem;
      margin-top: 1.3125rem;
      margin-left: 3.8125rem;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .el-icon-arrow-down:before {
    color: #ffffff;
  }

  // el-menu-item > li {
  //   padding-left: 60px !important;
  // }

  .el-menu {
    background-color: white !important;
  }

  // 工作台

  .el-menu-item > span {
    font-size: 1rem;
    margin-left: 1.25rem;
  }

  // .el-menu-item:focus {
  //   background-color: #79bbff !important;
  //   margin-left: 5px;
  // }

  .el-menu-item.is-active {
    background-color: #79bbff !important;
    margin-left: 0.3125rem;
  }

  // .el-menu-item:hover {
  //   background-color: #409eff !important;
  // }

  //题库题卷
  .el-submenu__title > span {
    font-size: 1rem;
    margin-left: 1.25rem;
  }

  // .el-submenu__title:hover {
  //   background-color: #409eff !important;
  // }

  //二级 制作试题
  .cussubitem > li {
    // margin-left: 60px;
    font-size: 0.875rem;
    padding-left: 3.75rem !important;
  }
}
</style>
