const state = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',   //token
}

const mutations = {
    //save token
    SET_TOKEN(state, val) {
        state.token = val
        localStorage.setItem('token', val)
    },
    //del token
    DEL_TOKEN(state) {
        state.token = ''
        localStorage.removeItem('token')
    },
}

const actions = {


}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}