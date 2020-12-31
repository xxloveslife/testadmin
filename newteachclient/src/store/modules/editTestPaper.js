const state = {
    paperConf: {},

}

const mutations = {
    setEditPaperConf(state, val) {
        state.paperConf = val;
    }
}



export default {
    namespaced: true,
    state,
    mutations,

}
