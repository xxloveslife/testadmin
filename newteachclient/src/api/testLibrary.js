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
