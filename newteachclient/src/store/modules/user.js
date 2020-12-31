import { getBenchInfos } from '../../api/getBenchInfos'
import { loginInfo } from '../../api/login'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', //token
  userWorkBench: {},
  //手动换题的小乐器ids,
  instrumentIds: [],

  is_admin: 0,
  // 当前用户唯一ID
  uid: null,
  tel: null,

  // 设置侧边栏类目
  sidebarItem: [
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
          index: '/testquestionlibrary',
          title: '试题库',
        },
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
    // 课堂教学
    {
      icon: '',
      index: '',
      title: '课堂教学',
      subs: [
        { index: '/courselist', title: '课程列表' },
        {
          index: '/newcourse',
          title: '新建课件',
        },
      ],
    },
    // 考试中心
    {
      icon: '',
      index: '',
      title: '考试中心',
      subs: [
        { index: '/examRecorder', title: '考试记录' },
        {
          index: '/studentdata',
          title: '学生数据',
        },
      ],
    },
    // 教务管理
    {
      icon: '',
      index: '',
      title: '教务管理',
      subs: [
        // { index: "/teachermanage", title: "老师管理" },
        // {
        //   index: "/studentmanage",
        //   title: "学生管理",
        // },
        {
          index: '/classmanage',
          title: '班级管理',
        },
        {
          index: '/studentturnout',
          title: '学生出勤',
        },
      ],
    },
    // 课外练习
    {
      icon: '',
      index: '',
      title: '课外练习',
      subs: [
        { index: '/practicelib', title: '练习库' },
        {
          index: '/practicerecord',
          title: '练习记录',
        },
      ],
    },
    // 过程性评价
    {
      icon: '',
      index: '',
      title: '过程性评价',
      subs: [
        {
          index: '/processgrade',
          title: '过程性评价评分',
        },
        // {
        //   index: "/datapreview",
        //   title: "数据总览",
        // },
        {
          index: '/activity',
          title: '艺术活动',
        },
      ],
    },
    // 账号管理
    {
      icon: '',
      index: '',
      title: '账号管理',
      //二级菜单
      subs: [
        {
          index: '/personalInformation',
          title: '个人资料',
        },
        {
          index: '/operationLog',
          title: '操作日志',
        },
        {
          index: '/messageCenter',
          title: '消息中心',
        },
      ],
    },
    // test
    // {
    //   icon: "",
    //   index: "/test",
    //   title: "test",
    // },
  ],
}

const mutations = {
  //save token
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  SET_UID(state, val) {
    state.uid = val
  },
  SET_TEL(state, val) {
    state.tel = val
  },
  //del token
  DEL_TOKEN(state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  SET_USERWORKBENCH(state, val) {
    console.log('cun benchwork');
    state.userWorkBench = val
  },

  setInstrumentids(state, val) {
    state.instrumentIds = val
  },
  SET_IS_ADMIN(state, val) {
    state.is_admin = val
  },

  // 设置sidebar权限
  setSidebarItems(state, val) {
    state.sidebarItem = val
  },
}

const actions = {
  getWorkBench({ commit }) {
    return new Promise((reslove, reject) => {
      getBenchInfos()
        .then((res) => {
          if (res && res.code == 0) {
            let sidebarItem = []
            commit('SET_USERWORKBENCH', res.data)
            commit('SET_IS_ADMIN', res.data.is_admin)
            // 动态设置sidebar的内容
            if (res.data.is_admin && res.data.is_admin == 0) {
              // 非超管
              sidebarItem = [
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
                      index: '/testquestionlibrary',
                      title: '试题库',
                    },
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
                // 课堂教学
                {
                  icon: '',
                  index: '',
                  title: '课堂教学',
                  subs: [
                    { index: '/courselist', title: '课程列表' },
                    {
                      index: '/newcourse',
                      title: '新建课件',
                    },
                  ],
                },
                // 考试中心
                {
                  icon: '',
                  index: '',
                  title: '考试中心',
                  subs: [
                    { index: '/examRecorder', title: '考试记录' },
                    {
                      index: '/studentdata',
                      title: '学生数据',
                    },
                  ],
                },
                // 教务管理
                {
                  icon: '',
                  index: '',
                  title: '教务管理',
                  subs: [
                    // { index: "/teachermanage", title: "老师管理" },
                    // {
                    //   index: "/studentmanage",
                    //   title: "学生管理",
                    // },
                    {
                      index: '/classmanage',
                      title: '班级管理',
                    },
                    {
                      index: '/studentturnout',
                      title: '学生出勤',
                    },
                  ],
                },
                // 课外练习
                {
                  icon: '',
                  index: '',
                  title: '课外练习',
                  subs: [
                    { index: '/practicelib', title: '练习库' },
                    {
                      index: '/practicerecord',
                      title: '练习记录',
                    },
                  ],
                },
                // 过程性评价
                {
                  icon: '',
                  index: '',
                  title: '过程性评价',
                  subs: [
                    {
                      index: '/processgrade',
                      title: '过程性评价评分',
                    },
                    // {
                    //   index: "/datapreview",
                    //   title: "数据总览",
                    // },
                    {
                      index: '/activity',
                      title: '艺术活动',
                    },
                  ],
                },
                // 账号管理
                {
                  icon: '',
                  index: '',
                  title: '账号管理',
                  //二级菜单
                  subs: [
                    {
                      index: '/personalInformation',
                      title: '个人资料',
                    },
                    {
                      index: '/operationLog',
                      title: '操作日志',
                    },
                    {
                      index: '/messageCenter',
                      title: '消息中心',
                    },
                  ],
                },
                // {
                //   icon: "",
                //   index: "/test",
                //   title: "test",
                // },
              ]
            } else if (res.data.is_admin && res.data.is_admin == 1) {
              sidebarItem = [
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
                      index: '/testquestionlibrary',
                      title: '试题库',
                    },
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
                // 课堂教学
                {
                  icon: '',
                  index: '',
                  title: '课堂教学',
                  subs: [
                    { index: '/courselist', title: '课程列表' },
                    {
                      index: '/newcourse',
                      title: '新建课件',
                    },
                  ],
                },
                // 考试中心
                {
                  icon: '',
                  index: '',
                  title: '考试中心',
                  subs: [
                    { index: '/examRecorder', title: '考试记录' },
                    {
                      index: '/studentdata',
                      title: '学生数据',
                    },
                  ],
                },
                // 教务管理
                {
                  icon: '',
                  index: '',
                  title: '教务管理',
                  subs: [
                    { index: '/teachermanage', title: '老师管理' },
                    {
                      index: '/studentmanage',
                      title: '学生管理',
                    },
                    {
                      index: '/classmanage',
                      title: '班级管理',
                    },
                    {
                      index: '/studentturnout',
                      title: '学生出勤',
                    },
                  ],
                },
                // 课外练习
                {
                  icon: '',
                  index: '',
                  title: '课外练习',
                  subs: [
                    { index: '/practicelib', title: '练习库' },
                    {
                      index: '/practicerecord',
                      title: '练习记录',
                    },
                  ],
                },
                // 过程性评价
                {
                  icon: '',
                  index: '',
                  title: '过程性评价',
                  subs: [
                    {
                      index: '/processgrade',
                      title: '过程性评价评分',
                    },
                    {
                      index: '/datapreview',
                      title: '数据总览',
                    },
                    {
                      index: '/activity',
                      title: '艺术活动',
                    },
                  ],
                },
                // 账号管理
                {
                  icon: '',
                  index: '',
                  title: '账号管理',
                  //二级菜单
                  subs: [
                    {
                      index: '/personalInformation',
                      title: '个人资料',
                    },
                    {
                      index: '/operationLog',
                      title: '操作日志',
                    },
                    {
                      index: '/messageCenter',
                      title: '消息中心',
                    },
                  ],
                },
                // {
                //   icon: "",
                //   index: "/test",
                //   title: "test",
                // },
              ]
            }
            commit('setSidebarItems', sidebarItem)
          }
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // loginInfo 登录
  getLoginInfo({ commit }, data) {
    return new Promise((reslove, reject) => {
      loginInfo(data)
        .then((res) => {
          if (res.code == 0) {
            commit('SET_TOKEN', res.data.sid)

            commit('SET_UID', res.data.uid)
            commit('SET_TEL', res.data.tel)
          }
          console.log('MYRES', res)
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
