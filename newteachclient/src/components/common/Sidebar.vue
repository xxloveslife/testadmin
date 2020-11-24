<template>
  <div class='sidebar'>
    <div class='logo'>LOGO</div>
    <!-- sidebar -->
    <el-menu default-active="2"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             background-color="#409EFF"
             text-color="#FFFFFF"
             active-text-color='#FFFFFF'
             router=true
             >
      <!-- //  列表渲染 -->
      <div v-for='(item,i) in items'
           :key="i">
        <!-- 子路径判断 -->
        <template v-if='item.subs'>
          <el-submenu :index="item.index"
                      :key="item.index">

            <template class='submenu' slot="title">
              <i :class="item.icon"></i>
              <span class="font-des" slot="title">{{ item.title }}</span>
            </template>

            <div v-for='(subItem, i) in item.subs'
                 :key='i'>
              <el-menu-item :index="subItem.index">{{subItem.title}}</el-menu-item>
            </div>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index"
                        :key="item.index">
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
      items: [
        {
          icon: '',
          index: '/dashboard',
          title: '工作台',
        },
        {
          icon: '',
          index: '',
          title: '题库卷库',
          //二级菜单
          subs: [
            {
              index: '/maketestquestion',
              title: '制作试题',
            },
            {
              index: '/testpaperlibrary',
              title: '试卷库',
            },
            {
              index: '/maketestpaper',
              title: '制作试卷',
            },
          ],
        },
      ],
    }
  },
}
</script>
<style lang="scss" >
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
}

.sidebar {
  width: 200px;
  height: 1080px;
  .logo {
    height: 101px;
    background-color: #409EFF;
  }
}
.el-menu-item {
  width: 100%;
  height: 50px;
}

// ::v-deep .el-submenu__title {
//   height:50px
// }

// .submenu{
//   display: block;
//   height:50px
// }
.el-submenu__title {
  height:50px
 }
 .font-des {
   font-size: 16px;
 }
 
</style>

