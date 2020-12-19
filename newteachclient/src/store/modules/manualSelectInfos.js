const state = {
    musicInfos: [],
    artInfos: []

}

const mutations = {
    SET_MUSICINFOS(state, val) {
        state.musicInfos = val
    },

    SET_ARTINFOS(state, val) {
        state.artInfos = val
    }
}


export default {
    namespaced: true,
    state,
    mutations,

}