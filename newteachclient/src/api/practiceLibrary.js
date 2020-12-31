import $axios from './index'

// 练习库列表 /homeworks/getList
export function homeworksList(data) {
  // getTestLibraryCategory  by   data
  const url = '/homeworks/getList'
  return $axios.post(url, data)
}

// 布置练习弹窗确认
export function buzhi(data) {
  // getTestLibraryCategory  by   data
  const url = '/homeworks/buzhi'
  return $axios.post(url, data)
}
