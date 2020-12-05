import $axios from './index'

export function getBenchInfos() {
    // getTestLibraryCategory  by   data
    const url = '/workbench/getWorkbenchData'
    return $axios.post(url)
}