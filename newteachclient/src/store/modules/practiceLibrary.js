import { homeworksList, buzhi } from '../../api/practiceLibrary'
const state = {}

const mutations = {}

const actions = {
  // 练习库列表 /homeworks/getList
  gethomeworksList({ commit }, data) {
    return new Promise((reslove, reject) => {
      homeworksList(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 布置练习确认弹窗buzhi
  getbuzhi({ commit }, data) {
    return new Promise((reslove, reject) => {
      buzhi(data)
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
