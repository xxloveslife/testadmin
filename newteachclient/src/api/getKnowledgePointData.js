import $axios from './index'

export function getKnowledgePointData(data) {
  // getTestLibraryCategory  by   data
  const url = '/makeExercises/getKnowledgeCategory'
  return $axios.post(url, data)
}
// 音乐
export function makeExercisesMusicType(data) {
  // getTestLibraryCategory  by   data
  const url = '/makeExercises/makeExercisesMusicType'
  return $axios.post(url, data)
}
// 美术
export function makeExercisesArtType(data) {
  // getTestLibraryCategory  by   data
  const url = '/makeExercises/makeExercisesArtType'
  return $axios.post(url, data)
}

// 获取试题编辑页面
export function getTestQuestionsedit(data) {
  // getTestLibraryCategory  by   data
  const url = '/exercises/edit'
  return $axios.post(url, data)
}
