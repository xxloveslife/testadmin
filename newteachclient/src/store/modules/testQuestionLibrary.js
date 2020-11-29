import { getTestLibraryCategory } from '../../api/testLibrary'
const state = {
    library_result: {}
}

const mutations = {
    SET_LIBRARY_RESULT(state, val) {
        state.library_result = val;
    }
}

const actions = {
    getTestLibraryResult({ commit }, quesCondition) {
        return new Promise((reslove, reject) => {
            getTestLibraryCategory(quesCondition).then(res => {
                // 修改状态码    
                if (res.code === 0) {
                    commit('SET_LIBRARY_RESULT', res)
                }
                reslove(res)

            }).catch(error => {
                reject(error)
            })

        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}