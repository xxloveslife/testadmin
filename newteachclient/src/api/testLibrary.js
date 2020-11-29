import $axios from './index'

export function getTestLibraryCategory(data) {
    // getTestLibraryCategory  by   data
    const url = '/getTestLibraryCategory'
    return $axios.post(url, data)
}