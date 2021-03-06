import $axios from './index'

// 个人资料
export function getUserInfo(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/userInfo'
  return $axios.post(url)
}

// 修改密码
export function changePassword(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/resetPwd'
  return $axios.post(url, data)
}

// 消息中心
export function getSystemInformation(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/msgCenter'
  return $axios.post(url, data)
}
// 消息状态变更
export function updateSystemMsgStatus(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/updateSystemMsgStatus'
  return $axios.post(url, data)
}

// 操作日志
export function getlogAction(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/logAction'
  return $axios.post(url, data)
}

// /accountManage/sendMessageCode/ 发送验证码
export function sendMessageCode(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/sendMessageCode'
  return $axios.post(url, data)
}

// 解绑手机 /accountManage/unbindPhone
export function unbindPhone(data) {
  // getTestLibraryCategory  by   data
  const url = '/accountManage/unbindPhone'
  return $axios.post(url, data)
}
