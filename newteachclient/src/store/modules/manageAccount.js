import {
  getUserInfo,
  changePassword,
  getSystemInformation,
  updateSystemMsgStatus,
  getlogAction,
  sendMessageCode,
  unbindPhone,
} from '../../api/accountManagement'
const state = {}
const mutations = {}
const actions = {
  // 个人资料
  makeUserInfo({ commit }) {
    return new Promise((reslove, reject) => {
      getUserInfo()
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 修改密码
  resetPwd({ commit }, data) {
    return new Promise((reslove, reject) => {
      changePassword(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 消息中心
  makeSystemInformation({ commit }, data) {
    return new Promise((reslove, reject) => {
      getSystemInformation(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 消息状态变更
  makeUpdateSystemMsgStatus({ commit }, data) {
    return new Promise((reslove, reject) => {
      updateSystemMsgStatus(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 操作日志 getlogAction
  makelogAction({ commit }, data) {
    return new Promise((reslove, reject) => {
      getlogAction(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 发送验证码 sendMessageCode
  getMessageCode({ commit }, data) {
    return new Promise((reslove, reject) => {
      sendMessageCode(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 解绑手机号 unbindPhone
  unbindPhoneNumber({ commit }, data) {
    return new Promise((reslove, reject) => {
      unbindPhone(data)
        .then((res) => {
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
