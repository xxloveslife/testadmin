import {
  getTestLibraryCategory,
  getSysTestLibraryCategory,
  getTestPaperLib,
  getSysTestPaperLib,
} from '../../api/testLibrary'
const state = {
  library_result: {},
  test_paper_lib: {},
}

const mutations = {
  SET_LIBRARY_RESULT(state, val) {
    state.library_result = val
  },
  SET_TEST_PAPER_LIB(state, val) {
    state.test_paper_lib = val
  },
}

const actions = {
  // 试题库
  getTestLibraryResult({ commit }, quesCondition) {
    return new Promise((reslove, reject) => {
      getTestLibraryCategory(quesCondition).then((res) => {
        // 修改状态码
        if (res.code === 0) {
          commit('SET_LIBRARY_RESULT', res.data)
        }
        reslove(res)
      })
    })
  },

  // 系统题库
  getSysTestLibraryResult({ commit }, quesCondition) {
    return new Promise((reslove, reject) => {
      getSysTestLibraryCategory(quesCondition)
        .then((res) => {
          // 修改状态码
          if (res.code === 0) {
            commit('SET_LIBRARY_RESULT', res.data)
          }
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 试卷库
  getTestPaperLibResult({ commit }, quesCondition) {
    return new Promise((reslove, reject) => {
      getTestPaperLib(quesCondition)
        .then((res) => {
          // 修改状态码
          if (res.code === 0) {
            commit('SET_TEST_PAPER_LIB', res.data)
          }
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 系统卷库
  getSysTestPaperLibResult({ commit }, quesCondition) {
    return new Promise((reslove, reject) => {
      getSysTestPaperLib(quesCondition)
        .then((res) => {
          // 修改状态码
          if (res.code === 0) {
            commit('SET_TEST_PAPER_LIB', res.data)
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
