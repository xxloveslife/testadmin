const state = {
    musicInfos: [],
    artInfos: [],
    // 手动换题确认接口参数对象
    manualRequest: {},

    // 手动换题选择的item id
    manualItemId: '',

    // 保存试卷接口使用
    music_qid: [],
    art_qid: [],
    instrument_music_qid: [],
    instrument_music_type: [],
}

const mutations = {
    SET_MUSICINFOS(state, val) {
        state.musicInfos = val
    },

    SET_ARTINFOS(state, val) {
        state.artInfos = val
    },
    setManualRequestInfos(state, val) {
        state.manualRequest = val
    },

    setSelectedItemId(state, val) {
        state.manualItemId = val
    },

    setMusicQid(state, val) {
        state.music_qid = val;
    },

    setArtQid(state, val) {
        state.art_qid = val
    },

    setInstrumentMusicId(state, val) {
        state.instrument_music_qid = val
    },

    setInstrumentMusicType(state, val) {
        state.instrument_music_type = val
    },


    // 音乐类总id
    // 美术类总id
    // 小乐器类总id
    // 小乐器类总type
}


export default {
    namespaced: true,
    state,
    mutations,

}