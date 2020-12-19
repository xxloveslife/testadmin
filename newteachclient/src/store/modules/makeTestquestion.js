import {
  getKnowledgePointData,
  makeExercisesMusicType,
  makeExercisesArtType,
  getTestQuestionsedit,
} from '../../api/getKnowledgePointData'
// 制作试题
const state = {
  KnowledgePoint: [],
  // 单选
  singleSelectionVal: null,
  // 多选
  multipleSelectionVal: [],
  checked_cid: [],
  // 五线谱地址
  wx_music_pic: null,
  // 简谱地址
  jp_music_pic: null,
  // 美术图片地址
  art_pic: null,
  // 判断
  judgmentradioChangeVal: null,
}
const mutations = {
  set_KnowledgePoint(state, val) {
    state.KnowledgePoint = val
  },
  set_singleSelectionVal(state, val) {
    state.singleSelectionVal = val
  },
  set_multipleSelectionVal(state, val) {
    state.multipleSelectionVal = val
  },
  set_checked_cid(state, val) {
    state.checked_cid = val
  },
  set_wx_music_pic(state, val) {
    state.wx_music_pic = val
  },
  set_jp_music_pic(state, val) {
    state.jp_music_pic = val
  },
  set_art_pic(state, val) {
    state.art_pic = val
  },
  set_judgmentradioChangeVal(state, val) {
    state.judgmentradioChangeVal = val
  },
}
const actions = {
  getKnowledgePoints({ commit }, data) {
    return new Promise((reslove, reject) => {
      getKnowledgePointData(data)
        .then((res) => {
          if (res || res.code == 0) {
            commit('set_KnowledgePoint', res.msg)
          }
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 音乐
  getExercisesMusicType({ commit }, data) {
    return new Promise((reslove, reject) => {
      makeExercisesMusicType(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 美术
  getExercisesArtType({ commit }, data) {
    return new Promise((reslove, reject) => {
      makeExercisesArtType(data)
        .then((res) => {
          reslove(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // 获取试题编辑页面
  makeTestQuestionsedit({ commit }, data) {
    return new Promise((reslove, reject) => {
      getTestQuestionsedit(data)
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
