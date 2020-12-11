import { getBenchInfos } from '../../api/getBenchInfos'

const state = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : '', //token
  userWorkBench: {},
}

const mutations = {
  //save token
  SET_TOKEN(state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  //del token
  DEL_TOKEN(state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  SET_USERWORKBENCH(state, val) {
    state.userWorkBench = val
  },
}

const actions = {
  getWorkBench({ commit }) {
    return new Promise((reslove, reject) => {
      getBenchInfos()
        .then((res) => {
          if (res || res.code == 0) {
            commit('SET_USERWORKBENCH', res.data)
          }
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
