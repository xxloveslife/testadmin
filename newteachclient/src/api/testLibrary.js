import $axios from './index'

export function getTestLibraryCategory(data) {
  // getTestLibraryCategory  by   data
  const url = '/exercises/getExercisesData'
  return $axios.post(url, data)
}
// 点击选项时发起请求获取不同题型里面的数据
// export function getTestLibraryMultipleChoice(data) {
//   // getTestLibraryCategory  by   data
//   const url = '/getTestLibraryCategory'
//   return $axios.post(url, data)
// }

export function getSysTestLibraryCategory(data) {
  // getTestLibraryCategory  by   data
  const url = '/exercises/getSysExercisesData'
  return $axios.post(url, data)
}

// 我的卷库 + 校本卷库
export function getTestPaperLib(data) {
  const url = '/examinationPaper/getExaminationPaperData'
  return $axios.post(url, data)
}

// 系统卷库
export function getSysTestPaperLib(data) {
  const url = '/examinationPaper/getSysExaminationPaperData'
  return $axios.post(url, data)
}

// 获取试题解析数据
export function getQuestionAnalyze(data) {
  const url = '/exercises/questionAnalyze'
  return $axios.post(url, data)
}

// 纠错
export function submitQuestionError(data) {
  const url = '/exercises/submitQuestionError'
  return $axios.post(url, data)
}

// 根据年级获取班级列表
export function getRoomlistByYear(data) {
  const url = '/examinationPaper/getRoomlistByYear'
  return $axios.post(url, data)
}

// 布置练习 /examinationPaper/addPaperHomeworks
export function addPaperHomeworks(data) {
  const url = '/examinationPaper/addPaperHomeworks'
  return $axios.post(url, data)
}

// 检测开始考试的相关前提条件 /examination/checkExamStart
export function checkExamStart(data) {
  const url = '/examination/checkExamStart'
  return $axios.post(url, data)
}

// /examination/startExam 开始考试
export function startExam(data) {
  const url = '/examination/startExam'
  return $axios.post(url, data)
}

// 将试题从我的题库中删除 /exercises/delQuestion
export function delQuestion(data) {
  const url = '/exercises/delQuestion'
  return $axios.post(url, data)
}

//布置练习 - 制作试卷 将试卷加入练习库 /examinationPaper/addPaperHomeworksByMake
export function addPaperHomeworksByMake(data) {
  const url = '/examinationPaper/addPaperHomeworksByMake'
  return $axios.post(url, data)
}
