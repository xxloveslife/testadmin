import $axios from './index'

export function getTestLibraryCategory(data) {
  // getTestLibraryCategory  by   data
  const url = '/getTestLibraryCategory'
  return $axios.post(url, data)
}
// 点击选项时发起请求获取不同题型里面的数据
export function getTestLibraryMultipleChoice(data) {
  // getTestLibraryCategory  by   data
  const url = '/getTestLibraryCategory'
  return $axios.post(url, data)
}
