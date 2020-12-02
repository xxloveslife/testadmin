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
        component: () =>
          import(
            /* webpackChunkName: "maketestpaper" */ '@/views/pages/MakeTestpaper/index.vue'
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
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
