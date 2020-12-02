import $axios from './index'

export function getBenchInfos() {
    // getTestLibraryCategory  by   data
    const url = '/api/workbench/getWorkbenchData?sid=33f36325d0795e847ff24c7d6a9337fc'
    return $axios.post(url)
}