const getters = {
  token: (state) => state.user.token,
  userWorkBench: (state) => state.user.userWorkBench,
  checked_cid: (state) => state.makeTestquestion.checked_cid,
  singleSelectionVal: (state) => state.makeTestquestion.singleSelectionVal,
  multipleSelectionVal: (state) => state.makeTestquestion.multipleSelectionVal,
  wx_music_pic: (state) => state.makeTestquestion.wx_music_pic,
  jp_music_pic: (state) => state.makeTestquestion.jp_music_pic,
  art_pic: (state) => state.makeTestquestion.art_pic,
  judgmentradioChangeVal: (state) =>
    state.makeTestquestion.judgmentradioChangeVal,
}

export default getters
