import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName:"login"*/ '../views/pages/Login'),
  },
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
        name: 'editPaper',
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
      // 试卷详情页
      {
        path: '/paperDetailPage',
        name: 'paperDetailPage',

        component: () =>
          import(
            /* webpackChunkName: "paperDetailPage" */ '@/views/pages/PaperDetailPage/index.vue'
          ),
      },
      // practicelibrary练习库
      {
        path: '/practicelibrary',
        name: 'practicelibrary',

        component: () =>
          import(
            /* webpackChunkName: "paperDetailPage" */ '@/views/pages/practicelibrary/index.vue'
          ),
      },
      // practicerecord练习记录
      // 考试记录
      {
        path: '/examRecorder',
        name: 'examRecorder',

        component: () =>
          import(
            /* webpackChunkName: "examRecorder" */ '@/views/pages/ExamRecorder/index.vue'
          ),
      },
      // 学生数据
      {
        path: '/studentdata',
        name: 'studentdata',

        component: () =>
          import(
            /* webpackChunkName: "studentdata" */ '@/views/pages/StudentData/index.vue'
          ),
      },
      // 老师管理
      {
        path: '/teachermanage',
        name: 'teachermanage',

        component: () =>
          import(
            /* webpackChunkName: "teachermanage" */ '@/views/pages/TeacherManage/index.vue'
          ),
      },
      // 学生管理
      {
        path: '/studentmanage',
        name: 'studentmanage',

        component: () =>
          import(
            /* webpackChunkName: "studentmanage" */ '@/views/pages/Studentmanage/index.vue'
          ),
      },
      // 班级管理
      {
        path: '/classmanage',
        name: 'classmanage',

        component: () =>
          import(
            /* webpackChunkName: "classmanage" */ '@/views/pages/Classmanage/index.vue'
          ),
      },
      // 学生出勤
      {
        path: '/studentturnout',
        name: 'studentturnout',

        component: () =>
          import(
            /* webpackChunkName: "studentturnout" */ '@/views/pages/Studentturnout/index.vue'
          ),
      },
      // 练习库
      {
        path: '/practicelib',
        name: 'practicelib',

        component: () =>
          import(
            /* webpackChunkName: "practicelib" */ '@/views/pages/Practicelib/index.vue'
          ),
      },
      // 练习记录
      // {
      //   path: '/practicerecord',
      //   name: 'practicerecord',

      //   component: () =>
      //     import(
      //       /* webpackChunkName: "practicerecord" */ '@/views/pages/Practicerecord/index.vue'
      //     ),
      // },
      // 过程性评价
      {
        path: '/processgrade',
        name: 'processgrade',

        component: () =>
          import(
            /* webpackChunkName: "processgrade" */ '@/views/pages/Processgrade/index.vue'
          ),
      },
      // 数据总览
      {
        path: '/datapreview',
        name: 'datapreview',

        component: () =>
          import(
            /* webpackChunkName: "datapreview" */ '@/views/pages/Datapreview/index.vue'
          ),
      },
      // 艺术活动
      {
        path: '/activity',
        name: 'activity',

        component: () =>
          import(
            /* webpackChunkName: "activity" */ '@/views/pages/Activity/index.vue'
          ),
      },
    ],
  },
  // 404
  {
    path: '*',
    component: () => import(/* webpackChunkName:"error"*/  '../views/pages/Error/index.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes,
})

export default router
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})
