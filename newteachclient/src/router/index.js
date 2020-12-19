import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: { title: '' },
    children: [
      //工作台
      {
        path: '/dashboard',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ '@/views/pages/Dashboard/Dashboard.vue'
          ),
      },
      // 试题库
      {
        path: '/testquestionlibrary',
        component: () =>
          import(
            /* webpackChunkName: "testquestionlibrary" */ '@/views/pages/TestquestionLibrary/index.vue'
          ),
      },
      //试卷库
      {
        path: '/testpaperlibrary',
        component: () =>
          import(
            /* webpackChunkName: "testlibrary" */ '@/views/pages/TestpaperLibrary/index.vue'
          ),
      },
      //制作试题
      {
        path: '/maketestquestion',
        component: () =>
          import(
            /* webpackChunkName: "maketestquestion" */ '@/views/pages/MakeTestquestion/index.vue'
          ),
      },
      //制作试卷
      {
        path: '/maketestpaper',
        name: 'maketestpaper',
        component: () =>
          import(
            /* webpackChunkName: "maketestpaper" */ '@/views/pages/MakeTestpaper/index.vue'
          ),
        meta: {
          keepAlive: true,
        },
      },
      // 课程列表
      {
        path: '/courselist',
        component: () =>
          import(
            /* webpackChunkName: "courselist" */ '@/views/pages/CourseList/index.vue'
          ),
      },
      // 新建课表
      {
        path: '/newcourse',
        component: () =>
          import(
            /* webpackChunkName: "newcourse" */ '@/views/pages/NewCourse/index.vue'
          ),
      },
      // 个人资料
      {
        path: '/personalInformation',
        component: () =>
          import(
            /* webpackChunkName: "maketestpaper" */ '@/views/pages/PersonalInformation/index.vue'
          ),
      },
      // 操作日志
      {
        path: '/operationLog',
        component: () =>
          import(
            /* webpackChunkName: "maketestpaper" */ '@/views/pages/OperationLog/index.vue'
          ),
      },
      // 消息中心
      {
        path: '/messageCenter',
        component: () =>
          import(
            /* webpackChunkName: "maketestpaper" */ '@/views/pages/MessageCenter/index.vue'
          ),
      },
      // test
      {
        path: '/test',
        component: () =>
          import(/* webpackChunkName: "test" */ '@/views/pages/Test/index.vue'),
      },
      // edit paper
      {
        path: '/editPaper',
        component: () =>
          import(
            /* webpackChunkName: "editpaper" */ '@/views/pages/EditTestPaper/index.vue'
          ),
      },

      // 课件预览页
      {
        path: '/coursePreview',
        name: 'coursePreviewLink',
        component: () =>
          import(
            /* webpackChunkName: "coursepreview" */ '@/views/pages/CoursePreviewPage/index.vue'
          ),
      },

      // 课件编辑页
      {
        path: '/courseEditPage',
        name: 'courseEditLink',
        component: () =>
          import(
            /* webpackChunkName: "courseditpage" */ '@/views/pages/CourseEditPage/index.vue'
          ),
      },
      {
        path: '/reEditpage',
        name: 'reEditpage',
        component: () =>
          import(
            /* webpackChunkName: "courseditpage" */ '@/views/pages/MakeTestquestion/components/reEditpage.vue'
          ),
      },
      // 制作试卷系统匹配页
      {
        path: '/paperMadeSysMatch',
        name: 'paperMadeSysMatch',
        component: () =>
          import(
            /* webpackChunkName: "paperMadeSysMatch" */ '@/views/pages/PaperMadeSysMatch/index.vue'
          ),
      },
      // 制作试卷手动匹配页
      {
        path: '/paperMadeManualMatch',
        name: 'paperMadeManualMatch',

        component: () =>
          import(
            /* webpackChunkName: "paperMadeManualMatch" */ '@/views/pages/PaperMadeManualMatch/index.vue'
          ),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
