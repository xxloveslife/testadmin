const getters = {
  token: (state) => state.user.token,
  is_admin: (state) => state.user.is_admin,
  userWorkBench: (state) => state.user.userWorkBench,
  checked_cid: (state) => state.makeTestquestion.checked_cid,
  singleSelectionVal: (state) => state.makeTestquestion.singleSelectionVal,
  multipleSelectionVal: (state) => state.makeTestquestion.multipleSelectionVal,
  wx_music_pic: (state) => state.makeTestquestion.wx_music_pic,
  jp_music_pic: (state) => state.makeTestquestion.jp_music_pic,
  art_pic: (state) => state.makeTestquestion.art_pic,
  judgmentradioChangeVal: (state) =>
    state.makeTestquestion.judgmentradioChangeVal,

  //手动选择题
  artInfos: (state) => state.manualSelectInfos.artInfos,
  musicInfos: (state) => state.manualSelectInfos.musicInfos,

  // 小乐器id集合
  instrumentids: state => state.user.instrumentIds,

  // 手动选择确定传参
  manualSelectdObj: state => state.manualSelectInfos.manualRequest,

  // 手动选择换题里面的item id
  manualSelectedId: state => state.manualSelectInfos.manualItemId,

  // 保存试卷接口的getters
  music_qid: state => state.manualSelectInfos.music_qid,
  art_qid: state => state.manualSelectInfos.art_qid,
  instrument_music_qid: state => state.manualSelectInfos.instrument_music_qid,
  instrument_music_type: state => state.manualSelectInfos.instrument_music_type,


  // 演唱题总分
  yanchangtiScore: state => state.makeTestPaper.yanchangtiScore,

  // 编辑试卷的paperConf
  editPaperConf: state => state.editTestPaper.paperConf,

  // 侧边栏类目
  sidebarItems: state => state.user.sidebarItem,
}

export default getters
