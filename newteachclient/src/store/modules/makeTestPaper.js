const state = {
    yanchangtiScore: {},

}

const mutations = {
    setYanchangtiScore(state, val) {
        state.yanchangtiScore = val;
    }
}



export default {
    namespaced: true,
    state,
    mutations,

}
