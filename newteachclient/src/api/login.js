import $axios from './index'

export function loginInfo(data) {
  // getTestLibraryCategory  by   data
  const url = '/login/entry'
  return $axios.post(url, data)
}
