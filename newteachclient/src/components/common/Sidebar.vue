<template>
  <div class="sidebar">
    <!-- logo -->
    <div class="logo">logo</div>
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
export default {
  data() {
    return {
      uniqueopen: true,
      items: [
        {
          icon: "",
          index: "/dashboard",
          title: "工作台",
        },
        {
          icon: "",
          index: "",
          title: "题库卷库",
          //二级菜单
          subs: [
            {
              index: "/testquestionlibrary",
              title: "试题库",
            },
            {
              index: "/maketestquestion",
              title: "制作试题",
            },
            {
              index: "/testpaperlibrary",
              title: "试卷库",
            },
            {
              index: "/maketestpaper",
              title: "制作试卷",
            },
          ],
        },
        // 课堂教学
        {
          icon: "",
          index: "",
          title: "课堂教学",
          subs: [
            { index: "/courselist", title: "课程列表" },
            {
              index: "/newcourse",
              title: "新建课件",
            },
          ],
        },
        {
          icon: "",
          index: "",
          title: "账号中心",
          //二级菜单
          subs: [
            {
              index: "/personalInformation",
              title: "个人资料",
            },
            {
              index: "/operationLog",
              title: "操作日志",
            },
            {
              index: "/messageCenter",
              title: "消息中心",
            },
          ],
        },
        {
          icon: "",
          index: "/test",
          title: "test",
        },
      ],
    };
  },
  methods: {
    // handleOpen() {
    //   // console.log("handleOpen");
    // },
    // handleClose() {},
  },
};
</script>
<style lang="scss">
.sidebar {
  width: 100%;
  // width: 200px;
  height: 100%;
  overflow: hidden;
}

.sidebar > ul {
  width: 100%;
  // background-color: white !important;
}

.logo {
  height: 118px;
  background-color: #409eff;
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
  font-size: 16px;
  margin-left: 20px;
}

.el-menu-item:focus {
  background-color: #79bbff !important;
  margin-left: 5px;
}

// .el-menu-item:hover {
//   background-color: #409eff !important;
// }

//题库题卷
.el-submenu__title > span {
  font-size: 16px;
  margin-left: 20px;
}

// .el-submenu__title:hover {
//   background-color: #409eff !important;
// }

//二级 制作试题
.cussubitem > li {
  // margin-left: 60px;
  font-size: 14px;
  padding-left: 60px !important;
}
</style>
