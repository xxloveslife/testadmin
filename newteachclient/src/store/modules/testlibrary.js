import {
  getTestLibraryCategory,
  getSysTestLibraryCategory,
  getTestPaperLib,
  getSysTestPaperLib,
  getQuestionAnalyze,
  submitQuestionError,
  getRoomlistByYear,
  addPaperHomeworks,
  checkExamStart,
  startExam,
  delQuestion,
  addPaperHomeworksByMake,
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
  // 试题库1
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
  // 获取试题解析数据 getQuestionAnalyze
  getQuestionAnalyzeList({ commit }, data) {
    return new Promise((reslove, reject) => {
      getQuestionAnalyze(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // submitQuestionError 纠错
  getSubmitQuestionError({ commit }, data) {
    return new Promise((reslove, reject) => {
      submitQuestionError(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // getRoomlistByYear 根据年级获取班级列表
  getClassListByYear({ commit }, data) {
    return new Promise((reslove, reject) => {
      getRoomlistByYear(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // addPaperHomeworks 布置练习
  setUpExercises({ commit }, data) {
    return new Promise((reslove, reject) => {
      addPaperHomeworks(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // checkExamStart 检测开始考试的相关前提条件
  getCheckExamStart({ commit }, data) {
    return new Promise((reslove, reject) => {
      checkExamStart(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // startExam 开始考试
  getStartExam({ commit }, data) {
    return new Promise((reslove, reject) => {
      startExam(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // 将试题从我的题库中删除 /exercises/delQuestion
  deleteQuestion({ commit }, data) {
    return new Promise((reslove, reject) => {
      delQuestion(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //布置练习 - 制作试卷 将试卷加入练习库 /examinationPaper/addPaperHomeworksByMake
  getaddPaperHomeworksByMake({ commit }, data) {
    return new Promise((reslove, reject) => {
      addPaperHomeworksByMake(data)
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
