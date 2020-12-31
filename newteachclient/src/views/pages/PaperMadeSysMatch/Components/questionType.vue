<template>
  <!-- 各种题型列表组件 -->
  <div class="draggbleList">
    <!-- title -->
    <div class="inner_title wrap_flex">
      <div class="inner_left wrap_flex_center">
        <span>{{ computeTitle }}</span>
        <span class="tenpx">{{
          `(每小题${m_scoreconf_item.score}分, 共${m_scoreconf_item.number}题, 共${m_scoreconf_item.total}分)`
        }}</span>
      </div>
      <div class="right_newadd" v-if="showNewAdd">
        <el-button type="primary" @click="addNew">新增一题</el-button>
      </div>
    </div>
    <!-- allcontent -->
    <div class="allcontent">
      <!-- header -->
      <div class="content_header wrap_flex_center">
        <span>序号</span>
        <span>题目</span>
        <span>操作</span>
      </div>

      <!-- contentlist -->
      <div class="contentlist">
        <!--使用draggable组件-->
        <draggable
          v-model="itemInfo"
          chosenClass="chosen"
          forceFallback="true"
          :group="onlyGroup"
          animation="500"
          @start="onStart"
          @end="onEnd"
          :delay="0.5"
        >
          <transition-group>
            <div
              class="item wrap_flex_center"
              v-for="(value, i) in itemInfo"
              :key="i"
              @click="questionItem(value, i)"
            >
              <div class="test_id">
                <span>{{ i + 1 }}</span>
              </div>

              <div class="testName wrap_flex_allcenter">
                <span>{{ value.content }}</span>
              </div>
              <div class="testOperation wrap_flex_center">
                <i
                  class="auto"
                  @click.stop="autoClick(value, i)"
                  title="自动换题"
                  v-if="autoChange && paperDetailPage !== 1"
                ></i>
                <i
                  class="manual"
                  title="手动换题"
                  @click.stop="handleManual(value, i)"
                  v-if="manualChange && paperDetailPage !== 1"
                ></i>
                <i
                  class="fav"
                  title="收藏"
                  v-if="value.is_favorite === 0"
                  @click.stop="isfavorite(value, i)"
                ></i>
                <i
                  class="collected"
                  title="取消收藏"
                  v-else
                  @click.stop="isfavorite(value, i)"
                ></i>
                <i
                  class="del"
                  title="删除"
                  @click.stop="deleteButton(i)"
                  v-if="paperDetailPage !== 1"
                ></i>
              </div>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>

    <!-- 手动换题dialog -->
    <div class="manual_dialog">
      <el-dialog title="手动换题" :visible.sync="dialogVisible" width="56.67%">
        <!-- 手动换题内容 -->
        <div>
          <manual-change
            :currentLib="currentLib"
            :categoryType="m_type"
            :testType="this.m_testType"
            :aboutInstrument="forManualInstrumentObj"
          ></manual-change>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="manualConfirm">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 试题详情 -->
    <questiontype-preview
      class="questiontype-preview"
      :is_sys="is_sys"
      :questiontypeList="dialog_item"
      :question_index="question_index"
      :dialogVisible="questiontypePreviewStatus"
      :questionAnalyzeList="questionAnalyzeList"
      :libDatas="itemInfo"
      @btnClick="btnClick"
      @close="questiontypePreviewStatus = false"
      @isfavorite="isfavorite"
    ></questiontype-preview>
    <!-- <questiontype-preview
      
      @isfavorite="isfavorite"
      @isshare="open"
    ></questiontype-preview> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import questiontypePreview from "../../questiontypePreview";
import onlyStr from "../../../../api/utils/onlyString";
import manualChange from "./manualChange";
import $axios from "../../../../api/index";
import { mapGetters } from "vuex";
export default {
  props: {
    currentLib: {
      type: String,
    },
    // 等于1时从试卷库点过来
    paperDetailPage: {
      type: Number,
    },
    type: {
      type: String,
    },
    allInfos: {
      type: Object,
    },
    subType: {
      type: Number,
    },
    scoreConf: {
      default: [],
    },
    // 试卷id
    paperid: {
      type: String,
    },
    // 总的id list
    qids: {
      default: [],
    },

    // 总的小乐器id
    instrumentids: {
      default: [],
    },

    // 表现提conf
    biaoxianconf: {
      default: [],
    },
  },
  data() {
    return {
      dialog_item: {},
      question_index: 0,
      questionAnalyzeList: {},
      is_sys: 0,
      questiontypePreviewStatus: false,
      // 唯一group
      onlyGroup: "",
      myArray: [
        { name: "1", id: 1 },
        { name: "2", id: 2 },
        { name: "3", id: 3 },
        { name: "4", id: 4 },
        { name: "5", id: 5 },
      ],

      // 这个就是题型的question_type   ,根据当前的type判断音乐美术,  小乐器的subtype 是xyq(同时小乐器的id也会出现在音乐类的id里面)
      m_subType: "",

      dialogVisible: false,

      detailDialogVisible: false,

      // 新增一题button
      showNewAdd: false,

      // 自动换题
      autoChange: true,

      // 手动换题
      manualChange: true,

      // 收藏
      isFav: true,

      // 父组件传进来总的值
      itemInfo: [],
      // 值得长度
      itemInfoslength: "",

      // 数据类型
      compareData: [],

      // 分数配置
      m_scoreconf: this.scoreConf,
      // 当前分数配置对象
      m_scoreconf_item: {},
      // 试卷id
      paperID: this.paperid,
      // 当前题型
      testType: "",
      // allqids: this.qids,

      // (手动换题子组件需要)点击手动换题,得到当前是什么类型的题目,赋值给m_type
      m_type: "",

      // (手动换题子组件需要)点击当前题型
      m_testType: "",

      // 传手动换题子组件的instrument对象信息
      forManualInstrumentObj: {},

      // 当前索引
      currentIndex: "",

      // 当前题型  ,小乐器 为3
      currentTestType: "",
    };
  },
  components: {
    draggable,
    manualChange,
    questiontypePreview,
  },
  computed: {
    ...mapGetters([
      "manualSelectedId",
      "manualSelectdObj",
      "music_qid",
      "art_qid",
      "instrument_music_qid",
      "instrument_music_type",
    ]),
    // 计算题型label
    computeTitle: function () {
      let m_label = "小乐器";

      // 默认为3是小乐器,后面新增一题作为data数据,传参
      // this.currentTestType = 3;
      this.compareData.forEach((item) => {
        if (item.mark == this.m_subType) {
          m_label = item.label;
          // this.currentTestType = item.mark;
          // console.log("m_label", m_label);
        }
      });

      return m_label;
    },

    // itemInfo2: function () {
    //   return this.itemInfo;
    // },
  },
  methods: {
    onEnd() {
      // console.log(this.myArray);
    },

    // 自动换题
    autoClick(val, i) {
      // console.log("点击");
      // console.log("当前val", val);
      // 参数1
      const m_data =
        this.paperID + "-" + val.id + "-" + i + "-" + this.testType;
      // 参数2
      let m_is_instrument_type = 0;
      // 参数3
      let m_instrument_type_data = 0;
      // 接口 is_instrument_type  参数
      if (this.computeTitle == "演唱题") {
        m_is_instrument_type = 1;
      } else if (this.computeTitle == "小乐器") {
        m_is_instrument_type = 2;
        m_instrument_type_data = val.insType;
      }

      // test
      let infos = {
        data: m_data,
        is_instrument_type: m_is_instrument_type,
        instrument_type_data: m_instrument_type_data,
        qid: this.qids,
      };
      console.log("当前题型", this.computeTitle);
      console.log("提交数据", infos);

      // 请求接口对象存入store,后面手动换题要用
      // this.$store.commit("manualSelectInfos/setManualRequestInfos", {
      //   data: m_data,
      //   is_instrument_type: m_is_instrument_type,
      //   instrument_type_data: m_instrument_type_data,
      //   qid: this.qids,
      // });
      $axios
        .post("/examinationPaper/sysAuto", {
          data: m_data,
          is_instrument_type: m_is_instrument_type,
          instrument_type_data: m_instrument_type_data,
          qid: this.qids,
        })
        .then((res) => {
          console.log("zidonghuanti", res);
          if (res.code == 0) {
            console.log("自动换题数据", res.data);
            // success
            // 更新allqids
            // arr.splice(arr.findIndex(item => item.id === data.id), 1)
            //删除旧的
            this.qids.splice(
              this.qids.findIndex((item) => item == res.data.oqid),
              1
            );
            // 增加新的
            this.qids.push(res.data.nqid);

            // 通知父组件
            this.$emit("update:qids", this.qids);

            // 更新store里面的内容
            this.updateSaveObj(res);

            // 更换页面题目

            // this.itemInfo[i] = res.data.tmpl;
            this.$set(this.itemInfo, i, res.data.tmpl);
          }
        });
    },

    // 手动换题
    handleManual(val, i) {
      // console.log("val", val);
      this.m_type = val.stype;
      this.m_testType = val.question_type;
      this.dialogVisible = true;

      // 保存当前索引,给弹窗使用
      this.currentIndex = i;

      // 参数1
      const m_data =
        this.paperID + "-" + val.id + "-" + i + "-" + this.testType;

      //判断当前的 is_instrument_type  instrument_type_data   instrument_qid   整合成对象,传到子组件,手动换题组件里面
      let m_is_instrument_type = 0;
      // 参数3
      let m_instrument_type_data = 0;
      // 接口 is_instrument_type  参数
      if (this.computeTitle == "演唱题") {
        m_is_instrument_type = 1;
      } else if (this.computeTitle == "小乐器") {
        m_is_instrument_type = 2;
        // 乐器种类,竖笛,口琴等
        m_instrument_type_data = val.insType;
      }

      // 请求接口对象存入store,后面手动换题确认接口要用要用
      this.$store.commit("manualSelectInfos/setManualRequestInfos", {
        data: m_data,
        is_instrument_type: m_is_instrument_type,
        instrument_type_data: m_instrument_type_data,
        qid: this.qids,
      });

      // console.log("myOBJ", {
      //   data: m_data,
      //   is_instrument_type: m_is_instrument_type,
      //   instrument_type_data: m_instrument_type_data,
      //   qid: this.qids,
      // });

      this.forManualInstrumentObj = {
        is_instrument_type: m_is_instrument_type,
        instrument_type_data: m_instrument_type_data,
        instrument_qid: this.instrumentids,
      };
    },

    pshowDeatail() {
      this.detailDialogVisible = true;
    },

    // 手动换题点击确定
    manualConfirm() {
      // console.log("确定传参", {
      //   ...this.manualSelectdObj,
      //   id: this.manualSelectedId,
      // });

      // 从store拿值
      $axios
        .post("/examinationPaper/favoriteChange", {
          ...this.manualSelectdObj,
          id: this.manualSelectedId,
        })
        .then((res) => {
          if (res.code == 0) {
            //删除旧的
            this.qids.splice(
              this.qids.findIndex((item) => item == res.data.oqid),
              1
            );
            // 增加新的
            this.qids.push(res.data.nqid);
            // 通知父组件
            this.$emit("update:qids", this.qids);

            // 更新store里面的内容
            this.updateSaveObj(res);

            // 更换页面题目

            // this.itemInfo[i] = res.data.tmpl;
            this.$set(this.itemInfo, this.currentIndex, res.data.tmpl);
          }
        });
      // this.manualSelectedId

      this.dialogVisible = false;
    },

    // 点击删除
    deleteButton(index) {
      this.itemInfo.splice(index, 1);
      // console.log(this.itemInfo);
    },

    // 新增一题
    addNew() {
      // 接口参数
      console.log("addnew", this.currentTestType);
      const m_data =
        this.paperID + "-" + this.currentTestType + "-" + this.testType;

      let { data, ...otherObj } = this.manualSelectdObj;
      let newAddRequest = { data: m_data, ...otherObj };
      // console.log("增一题", newAddRequest);
      console.log("新增一题接口", newAddRequest);
      // 请求接口
      $axios
        .post("/examinationPaper/addQuesion/", newAddRequest)
        .then((res) => {
          console.log("res", res);
          if (res.code == 0) {
            //删除旧的
            this.qids.splice(
              this.qids.findIndex((item) => item == res.data.oqid),
              1
            );
            // 增加新的
            this.qids.push(res.data.nqid);
            // 通知父组件
            this.$emit("update:qids", this.qids);

            // 更换页面题目

            // this.itemInfo[i] = res.data.tmpl;
            // this.$set(this.itemInfo, this.currentIndex, res.data.tmpl);
            // console.log("res", res.data.tmpl);

            this.itemInfo.push(res.data.tmpl);
            console.log("新增一题", this.itemInfo);
          }
        });
    },

    // 更新store里面的保存试卷参数,音乐总id,美术总id ,小乐器总id,小乐器总类型list
    updateSaveObj(res) {
      // 更新store里面的音乐类总id ,美术类总id,小乐器id,小乐器类型(类型好像目前不用更换)
      if (this.type == "音乐类" && this.m_subType == "xyq") {
        // 当前为小乐器 ,更新音乐类id,更新小乐器id
        this.music_qid.splice(
          this.music_qid.findIndex((item) => item == res.data.oqid),
          1
        );
        // 增加新的
        this.music_qid.push(res.data.nqid);

        // 更新vuex
        this.$store.commit("manualSelectInfos/setMusicQid", this.music_qid);

        // 更新音乐类id
        this.instrument_music_qid.splice(
          this.music_qid.findIndex((item) => item == res.data.oqid),
          1
        );

        // 增加新的

        this.instrument_music_qid.push(res.data.nqid);

        // 更新vuex
        this.$store.commit(
          "manualSelectInfos/setInstrumentMusicId",
          this.instrument_music_qid
        );

        // console.log("小乐器id", this.instrument_music_qid);
      } else if (this.type == "音乐类" && this.m_subType != "xyq") {
        // 音乐类普通题型
        this.music_qid.splice(
          this.music_qid.findIndex((item) => item == res.data.oqid),
          1
        );
        // 增加新的
        this.music_qid.push(res.data.nqid);

        // 更新vuex
        this.$store.commit("manualSelectInfos/setMusicQid", this.music_qid);
      } else if (this.type == "美术类" && this.m_subType != "xyq") {
        // 美术类普通题型
        this.art_qid.splice(
          this.art_qid.findIndex((item) => item == res.data.oqid),
          1
        );
        // 增加新的
        this.art_qid.push(res.data.nqid);

        // 更新vuex
        this.$store.commit("manualSelectInfos/setArtQid", this.art_qid);
      }
    },
    // 点击弹出试题详情弹窗
    questionItem(val, i) {
      console.log(val, i);
      this.$store
        .dispatch("testlibrary/getQuestionAnalyzeList", {
          question_id: val.id,
        })
        .then((res) => {
          if (res.code === 0) {
            this.questionAnalyzeList = res.data;
            // 当前选择试题 item
            this.dialog_item = val;
            //  显示dialog
            this.questiontypePreviewStatus = true;
            // console.log(i)
            this.question_index = i;
            // console.log(this.libDatas)
            console.log(this.dialog_item);
            console.log(this.questionAnalyzeList);
            // console.log(res.data.cate_name)
          }
        });
    },
    // 收藏
    isfavorite(val, i) {
      // console.log('fav', val, i)
      if (!val.is_favorite) {
        console.log(1);
        $axios
          .post("/exercises/favorite", {
            question_id: val.id,
            action: "add_favorite",
          })
          .then((res) => {
            // console.log("收藏", res);
            if (res && res.code === 0) {
              val.is_favorite = 1;
            } else {
              this.$message.error("收藏失败，请稍后重试");
            }
            console.log(res);
          });
      } else {
        console.log(2);
        $axios
          .post("/exercises/favorite", {
            question_id: val.id,
            action: "del_favorite",
          })
          .then((res) => {
            if (res && res.code === 0) {
              val.is_favorite = 0;
            } else {
              this.$message.error("取消收藏失败，请稍后重试");
            }
          });
      }
    },
    // 上一题下一题
    btnClick(val) {
      // console.log(val)
      console.log(111);
      this.$store
        .dispatch("testlibrary/getQuestionAnalyzeList", {
          question_id: this.itemInfo[val].id,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 0) {
            this.question_index = val;
            this.dialog_item = this.itemInfo[val];
            this.questionAnalyzeList = res.data;

            // console.log(res.data.cate_name)
            // console.log(res.data.cate_name.length)
          }
        });
    },
  },
  watch: {
    itemInfo: function (newV, oldV) {
      // 监听数组长度
      console.log("m_length", this.itemInfo.length);
      if (newV.length < this.m_scoreconf_item.number) {
        this.showNewAdd = true;
      } else {
        this.showNewAdd = false;
      }
    },
    immediate: true,
  },
  mounted() {
    // console.log("qidsqidsqidsqidsqidsqids", this.qids);
  },
  created() {
    // console.log("question小乐器有没有值", this.instrumentids);
    this.onlyGroup = onlyStr();

    // 赋值  ,去除length属性,再转数组
    // let { length, ...iteminfos } = this.allInfos;
    console.log("ALLINFOS+type", this.allInfos, this.subType);

    // 手动匹配试卷,传过来的是空对象,这里是null
    this.itemInfo = Array.from(this.allInfos);

    // 保存itemInfo的数组长度,后面用来比较 显示新增一题
    this.itemInfoslength = this.itemInfo.length;
    console.log("length", this.itemInfoslength);

    // console.log("itemInfo", this.itemInfo);
    this.m_subType = this.subType;

    // itemInfo   ,判断,key值,根据传入的type得到是什么题型

    // this.compareData  = this.type=='音乐类' &&
    if (this.type == "音乐类") {
      this.testType = "1";
      this.compareData = [
        { mark: "1", label: "单项选择题", confMark: "0" },
        { mark: "2", label: "多项选择题", confMark: "1" },
        { mark: "3", label: "演唱题", confMark: "2" },
        { mark: "8", label: "节奏题", confMark: "3" },
        { mark: "10", label: "判断题", confMark: "4" },
        { mark: "11", label: "连线题", confMark: "5" },
      ];
    } else if (this.type == "美术类") {
      this.testType = "2";
      this.compareData = [
        { mark: "1", label: "单项选择题", confMark: "0" },
        { mark: "2", label: "多项选择题", confMark: "1" },
        { mark: "3", label: "判断题", confMark: "2" },
        { mark: "4", label: "连线题", confMark: "3" },
        { mark: "5", label: "表现题", confMark: "" },
        { mark: "6", label: "排序题", confMark: "4" },
        { mark: "7", label: "拼图题", confMark: "5" },
        { mark: "8", label: "点线题", confMark: "6" },
        { mark: "9", label: "填色题", confMark: "7" },
        { mark: "10", label: "配色题", confMark: "8" },
        { mark: "11", label: "填空题", confMark: "9" },
      ];
    }
    // 找到当前分数score配置对象   ,排除小乐器 ,小乐器是单独的对象,数据结构不同  ,也要排除表现题目
    if (this.type == "美术类" && this.m_subType == "5") {
      // console.log("是表现题", this.biaoxianconf);
      // console.log("表现提conf", this.biaoxianconf.score);
      this.m_scoreconf_item = this.biaoxianconf[0];

      //  this.m_scoreconf_item
    } else if (this.m_subType != "xyq") {
      this.m_scoreconf.forEach((item, index) => {
        if (item.question_type == this.m_subType) {
          this.m_scoreconf_item = item;
        }
      });
    } else {
      this.m_scoreconf_item = this.m_scoreconf;
    }

    // 判断当前questiontype
    this.currentTestType = 3;

    this.compareData.forEach((item) => {
      if (item.mark == this.m_subType) {
        this.currentTestType = item.mark;
      }
    });
  },
};
</script>
<style lang="scss">
.draggbleList {
  margin-top: 1.1875rem;
  .questiontype-preview {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .item {
    width: 100%;
    height: 2.875rem;
    justify-content: space-between;

    .test_id > span {
      margin-left: 2.5rem;
    }
    .testOperation {
      //   width: 10.9375rem;
      padding-right: 1.375rem;
      justify-content: flex-end;
      i {
        width: 1.5rem;
        height: 1.5rem;
        margin-left: 1.1875rem;
      }
      .auto {
        background-image: url("../../../../assets/imgs/paperSysMatch/auto.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/autohover.png");
        }
      }
      .manual {
        background-image: url("../../../../assets/imgs/paperSysMatch/manual.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/manualhover.png");
        }
      }
      .fav {
        width: 1.125rem;
        height: 1.125rem;
        background-image: url("../../../../assets/imgs/testquestlibrary/stardefault.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/testquestlibrary/starhover.png");
        }
      }
      .collected {
        width: 1.125rem;
        height: 1.125rem;
        background-image: url("../../../../assets/imgs/testquestlibrary/starsc.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/testquestlibrary/starhover.png");
        }
      }
      .del {
        background-image: url("../../../../assets/imgs/paperSysMatch/delete.png");
        background-repeat: no-repeat;
        background-size: cover;
        &:hover {
          background-image: url("../../../../assets/imgs/paperSysMatch/deletehover.png");
        }
      }
    }
  }
  .inner_left > span:nth-child(1) {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  .inner_left > span:nth-child(2) {
    // align-self: flex-end;
    font-family: Microsoft YaHei;
    font-weight: 400;

    color: #303133;
  }

  .right_newadd {
    border: none;
    .el-button {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      width: 6.25rem;
      height: 2rem;
      line-height: 0;
      border-radius: 0.375rem;
      background-color: #409eff;
    }
  }

  .allcontent {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 0.5rem;
    margin-top: 1.125rem;
    .content_header {
      height: 3.75rem;
      border-bottom: 1px solid #dcdfe6;
      span:nth-child(1) {
        margin-left: 1.75rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      span:nth-child(2) {
        margin-left: 48.375rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      span:nth-child(3) {
        margin-left: 44rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
    }
  }
  // dialog
  .manual_dialog {
    .el-dialog {
      border-radius: 0.5rem;
    }
    .el-dialog__header {
      display: flex;
      padding: 0;
      height: 3.75rem;
      border-bottom: 1px solid #dcdfe6;
      .el-dialog__title {
        line-height: 3.75rem;
        margin-left: 1.625rem;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }

      .el-dialog__headerbtn {
        top: 0.4375rem;
        right: 0.4375rem;
        i {
          width: 1.5rem;
          height: 1.5rem;
          background-image: url("../../../../assets/imgs/paperSysMatch/close.png");
          background-repeat: no-repeat;
          background-size: cover;
          &::before {
            content: "";
          }
        }
      }
    }

    .el-dialog__body {
      padding: 0;
    }

    .el-dialog__footer {
      display: flex;
      height: 3.125rem;
      padding: 0;
      .dialog-footer {
        display: flex;
        border-top: 1px solid #dcdfe6;
        .el-button--primary {
          background-color: transparent;
          border: none;
          border-right: 1px solid #dcdfe6;
          //   flex: 1;
          width: 34rem;
          border-radius: 0;

          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #409eff;
        }
        .el-button--default {
          background-color: transparent;
          border: none;

          width: 34rem;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
        }
      }
    }
  }
}
.inner_title {
  height: 2rem;
}
</style>
