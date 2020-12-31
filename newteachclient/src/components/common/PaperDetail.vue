<template>
  <div class="paperDetail">
    <div class="returnSave wrap_flex_center">
      <!-- 返回 -->
      <div class="returnLogo" @click="returnLastPage">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
      <!-- 保存 -->
      <div class="saveButton">
        <span class="tips"
          >注：点击单个题目空白区域可以在此题型中进行拖动排序</span
        >

        <button @click="savePaper">保存</button>
      </div>
    </div>
    <!-- 试卷描述 -->
    <div class="paperName testPaperDescription" v-if="paperDetailPage === 1">
      <ul class="wrap_flex_center">
        <li>
          <span>试卷ID：</span>
          <span>{{ paperInfos.exam_conf.id }}</span>
        </li>
        <li>
          <span>总分：</span>
          <span>{{ itemList.score_total }}分</span>
        </li>
        <li>
          <span>题数：</span>
          <span>{{ itemList.question_total }}题</span>
        </li>
        <li>
          <span>类型：</span>
          <span>{{ itemList.stype }}</span>
        </li>
        <li>
          <span>教材：</span>
          <span>{{ paperInfos.exam_conf.paper_range }}</span>
        </li>
        <li>
          <span>年级：</span>
          <span>{{ itemList.grade }}</span>
        </li>
        <li>
          <span>学期：</span>
          <span>{{
            (itemList.semester == -1 && "通用") || itemList.semester
          }}</span>
        </li>
        <li>
          <span>难度：</span>
          <span>{{
            (itemList.difficult == 0 && "不限") ||
            (itemList.difficult == 1 && "易") ||
            (itemList.difficult == 2 && "中") ||
            (itemList.difficult == 3 && "难")
          }}</span>
        </li>
        <li>
          <span>出卷时间：</span>
          <span>{{ paperInfos.exam_conf.create_time }}</span>
        </li>
      </ul>
    </div>
    <!-- 音乐类试卷 -->
    <div class="forMusicType" v-if="existMusic">
      <!--  试卷名称 音乐类试卷-->
      <div class="paperName wrap_flex_center">
        <div class="paper_name_left wrap_flex_center">
          <span>{{ paperName }}</span>
        </div>
        <div
          class="right_operation wrap_flex_center"
          v-if="paperDetailPage !== 1"
        >
          <!-- 考试 -->
          <i title="开始考试" @click="startExam()"></i>
          <!-- 布置 -->
          <i title="布置练习" @click="setUpExercises"></i>
        </div>
        <div v-else class="right_operation wrap_flex_center">
          <!-- v-if="showAdd" -->
          <i
            class="add"
            @click="showAddDialog()"
            title="添加试卷"
            v-if="showAdd && currentLib !== '我的卷库'"
          ></i>
          <!-- v-if="showPractice && !item.paper_question_conf.length" -->
          <i
            class="practicie"
            @click="showPracticeDialog()"
            title="布置练习"
            v-if="showPractice && !paperconfigs"
          ></i>
          <!--  v-if="showExam" -->
          <i class="examination" @click="showExamination()" title="考试"></i>
        </div>
      </div>
      <div class="paperName wrap_flex_center">
        <div class="paper_name_center wrap_flex_center">
          <span class="tenpx">音乐类试卷 </span>
          <span class="tenpx">{{ paper_range }}</span>
        </div>
      </div>

      <!-- 多种题型    allMusicTest   1: '',2:'',3:'',8:''-->
      <div v-for="(item, m_key) in allMusicTest2" :key="m_key + 'a'">
        <m-questionType
          :currentLib="currentLib"
          type="音乐类"
          :paperDetailPage="paperDetailPage"
          :allInfos="item"
          :subType="m_key"
          :scoreConf="musicConf"
          :paperid="paperId"
          :qids.sync="qids"
          :instrumentids.sync="m_instrumentids"
        ></m-questionType>
      </div>
      <!-- 小乐器 -->
      <div v-if="existInstrument">
        <m-questionType
          :currentLib="currentLib"
          :paperDetailPage="paperDetailPage"
          type="音乐类"
          :allInfos="instrumentItem"
          subType="xyq"
          :scoreConf="instrumentConf"
          :paperid="paperId"
        ></m-questionType>
      </div>
    </div>

    <!-- 美术类试卷 -->
    <div class="forArtType" v-if="existArt">
      <div class="paperName wrap_flex_center" v-if="!existMusic">
        <div class="paper_name_left wrap_flex_center">
          <span>{{ paperName }}</span>
        </div>
        <div
          class="right_operation wrap_flex_center"
          v-if="paperDetailPage !== 1"
        >
          <!-- 考试 -->
          <i title="开始考试" @click="startExam"></i>
          <!-- 布置 -->
          <i title="布置练习" @click="setUpExercises"></i>
        </div>
        <div v-else class="right_operation wrap_flex_center">
          <!-- v-if="showAdd&&" -->
          <i
            class="add"
            v-if="showAdd && currentLib !== '我的卷库'"
            @click="showAddDialog()"
            title="添加试卷"
          ></i>
          <!-- v-if="showPractice && !item.paper_question_conf.length" -->
          <i
            class="practicie"
            @click="showPracticeDialog()"
            title="布置练习"
          ></i>
          <!--  v-if="showExam" -->
          <i class="examination" @click="showExamination()" title="考试"></i>
        </div>
      </div>
      <!--  试卷名称 美术类试卷-->
      <div class="paperName wrap_flex_center">
        <div class="paper_name_center wrap_flex_center">
          <span class="tenpx">美术类试卷 </span>
          <span class="tenpx">{{ paper_range }}</span>
        </div>
      </div>

      <!-- 多种题型 -->
      <div v-for="(item, m_key) in allArtTest2" :key="m_key + 'a'">
        <m-questionType
          :paperDetailPage="paperDetailPage"
          :currentLib="currentLib"
          type="美术类"
          :allInfos="item"
          :subType="m_key"
          :scoreConf="artConf"
          :paperid="paperId"
          :biaoxianconf="biaoxianConf"
        ></m-questionType>
      </div>
    </div>
    <!-- 开始考试 -->
    <!-- <start-exam
      class="setup-exercises"
      v-if="
        currentLib === '我的卷库' || currentLib === '校本卷库' || openTig === 1
      "
      @close="close"
      :tempItem="tempItem"
      :startExamText="startExamText"
      :exam_dialogVisible="exam_dialogVisible"
    ></start-exam> -->
    <!-- 布置练习第一个弹窗，加入练习库并跳转 -->
    <setup-exercises
      class="setup-exercises"
      :setupexercisesLIst="paperInfos.exam_conf"
      :setupExercisesStatus="setupExercisesStatus"
      @close="setupExercisesStatus = false"
      @openPopub="openPopub"
      @JumpItem="JumpItem"
    ></setup-exercises>
    <!-- 布置练习第二个弹窗 -->
    <!-- :currentLib="currentLib" -->
    <setup-exercise
      class="setup-exercises"
      :practice_dialogVisible="practice_dialogVisible"
      :tempItem="tempItem"
      @close="closeexercise"
      :openPopubItem="openPopubItem"
    ></setup-exercise>
    <!-- dialog of add -->
    <div class="add_dialog">
      <el-dialog title="提示" :visible.sync="add_dialogVisible" width="20%">
        <span>加入我的试卷，你可以重命名该试卷</span>
        <div>
          <span>名称:</span
          ><el-input
            v-model="new_paper_name"
            :placeholder="paper_name"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="add_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add2mine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- dialog 考试功能  将系统试卷保存到我的试卷中 -->
    <textpaper-tomine
      v-if="
        (openTig !== 1 && currentLib === '') ||
        (openTig !== 1 && currentLib === '全部')
      "
      class="setup-exercises"
      :exam_dialogVisible="exam_dialogVisible"
      :tempItem="tempItem"
      @close="exam_dialogVisible = false"
      @openItem="openItem"
    ></textpaper-tomine>

    <!-- 开始考试 -->
    <start-exam
      class="setup-exercises"
      v-if="
        currentLib === '我的卷库' || currentLib === '校本卷库' || openTig === 1
      "
      @close="close"
      :tempItem="tempItem"
      :startExamText="startExamText"
      :exam_dialogVisible="exam_dialogVisible"
    ></start-exam>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import textpaperTomine from "@/views/pages/TestpaperLibrary/components/textpaperTomine";
import startExam from "@/views/pages/TestpaperLibrary/components/startExam";
import mQuestionType from "../../views/pages/PaperMadeSysMatch/Components/questionType";
import $axios from "../../api/index";
import setupExercises from "./setupExercises";
import setupExercise from "@/views/pages/TestpaperLibrary/components/setupExercises";
export default {
  props: {
    itemList: {
      type: Object,
    },
    paperInfos: { type: Object },
    // 等于1时从试卷库点过来
    paperDetailPage: {
      type: Number,
    },
    paperconfigs: {
      type: Number,
    },
    // 判断是从哪个题库过来的 全部 我的卷库 校本卷库
    currentLib: {
      type: String,
    },
  },
  data() {
    return {
      exam_dialogVisible: false,
      openTig: 0,
      startExamText: "成功",
      // 新试卷名  +  试卷名
      paper_name: "",
      new_paper_name: "",
      add_dialogVisible: false,
      showAdd: true,
      showPractice: true,
      showExam: true,
      tempItem: {},
      openPopubItem: "",
      practice_dialogVisible: false,
      setupExercisesStatus: false,
      m_paperInfos: this.paperInfos,

      // 存在音乐类试题
      existMusic: false,
      // 存在美术类试题
      existArt: false,

      // 教材 paper_range
      paper_range: "",

      // 试卷名称
      paperName: "",

      // 所有音乐试题
      allMusicTest: {},

      // 所有美术试题
      allArtTest: {},

      // 音乐试题的分数配置
      musicConf: [],
      // 美术试题的分数配置
      artConf: [],

      // 小乐器信息
      existInstrument: false,
      instrumentItem: [],
      instrumentConf: {},

      // 试卷id
      paperId: "",

      // 试卷所有qids
      qids: [],

      // 小乐器ID
      m_instrumentids: [],

      // 表现题的配置
      biaoxianConf: [],
    };
  },
  components: {
    mQuestionType,
    setupExercises,
    setupExercise,
    textpaperTomine,
    startExam,
  },
  methods: {
    returnLastPage() {
      this.$router.go(-1);
    },

    // test
    showDETAILS(item, key) {
      // console.log("........", item, key);
    },

    // 保存试卷接口信息获取
    forSavePaper() {
      // 保存试卷接口用
      // music_qid  art_qid  instrument_music_qid  instrument_music_type

      // 音乐总id
      let music_qid = [];
      if (this.m_paperInfos.list["1"]) {
        Object.keys(this.m_paperInfos.list["1"]).forEach((key) => {
          Object.keys(this.m_paperInfos.list["1"][key]).forEach((sub_key) => {
            music_qid.push(this.m_paperInfos.list["1"][key][sub_key].id);
          });
        });
      }

      music_qid = music_qid.filter((item) => item);

      this.$store.commit("manualSelectInfos/setMusicQid", music_qid);
      // console.log("music_qid", music_qid);

      // 美术总id
      let art_qid = [];
      if (this.m_paperInfos.list["2"]) {
        Object.keys(this.m_paperInfos.list["2"]).forEach((key) => {
          Object.keys(this.m_paperInfos.list["2"][key]).forEach((sub_key) => {
            art_qid.push(this.m_paperInfos.list["2"][key][sub_key].id);
          });
        });
      }

      art_qid = art_qid.filter((item) => item);

      this.$store.commit("manualSelectInfos/setArtQid", art_qid);
      // console.log("art_qid", art_qid);

      // 小乐器总id
      let instrument_music_qid =
        this.m_paperInfos.instrument_question_ids &&
        this.m_paperInfos.instrument_question_ids;

      this.$store.commit(
        "manualSelectInfos/setInstrumentMusicId",
        instrument_music_qid
      );

      // 小乐器题目类型总
      let instrument_music_type;
      if (this.m_paperInfos.instrument_conf.length == 0) {
        // 为空
        instrument_music_type = [];
      } else {
        instrument_music_type = this.m_paperInfos.instrument_conf
          .instrument_type;
      }

      this.$store.commit(
        "manualSelectInfos/setInstrumentMusicType",
        instrument_music_type
      );

      console.log("instrument_music_type", instrument_music_type);
    },

    // 保存试卷
    savePaper() {
      let m_data = [];
      m_data[0] = { music_qid: this.music_qid };
      m_data[1] = { art_qid: this.art_qid };
      m_data[2] = { instrument_music_qid: this.instrument_music_qid };
      m_data[3] = { instrument_music_type: this.instrument_music_type };
      console.log("题目id", m_data[0]);
      console.log("m_data", {
        paper_id: this.paperId,
        data: m_data,
      });

      $axios
        .post("/examinationPaper/save/", {
          paper_id: this.paperId,
          data: m_data,
        })
        .then((res) => {
          console.log("保存试卷", res);
        });
    },
    // 开始考试
    startExam() {},
    // 布置练习
    setUpExercises() {
      console.log("布置练习");
      this.setupExercisesStatus = true;
      this.tempItem = this.paperInfos.exam_conf;
      // console.log(this.paperInfos)
    },
    // 有错误时布置作业第一个弹窗关闭，第二个弹窗打开
    openPopub(val) {
      console.log(val);
      this.openPopubItem = val;
      this.setupExercisesStatus = false;
      this.practice_dialogVisible = true;
    },
    // 不报错跳转到练习库并打开第二个弹窗
    JumpItem(val) {
      this.setupExercisesStatus = false;
      console.log(val, 111);
      this.$router.push({
        name: "practicelibrary",
        params: { homeworks_id: val },
      });
    },
    // 添加试卷
    showAddDialog() {
      this.tempItem = this.paperInfos.exam_conf;
      this.paper_name = this.tempItem.name;
      this.add_dialogVisible = true;

      // console.log("item", this.tempItem);
    },
    // 添加到我的卷库
    add2mine() {
      let w_shared = 0;
      if (this.currentLib == "校本卷库") {
        w_shared = 1;
      }
      console.log("currentShared", w_shared);

      // 添加接口
      $axios
        .post("/examinationPaper/addPaperToSystem", {
          name: this.new_paper_name,
          paper_id: this.tempItem.id,
          is_share: w_shared,
        })
        .then((res) => {
          console.log("addres", res);
        });
      this.add_dialogVisible = false;
    },
    showPracticeDialog() {
      console.log(this.paperInfos.exam_conf);
      console.log(this.itemList);
      this.tempItem = this.paperInfos.exam_conf;
      this.practice_dialogVisible = true;
      this.openPopubItem = "成功";
    },
    closeexercise() {
      this.openPopubItem = "";
      this.practice_dialogVisible = false;
    },
    // 考试

    showExamination() {
      this.tempItem = this.paperInfos.exam_conf;
      // 判断是否是我的卷库和系统卷库页面
      if (this.currentLib === "我的卷库" || this.currentLib === "校本卷库") {
        // console.log(111)
        console.log(this.tempItem.id);
        // 先发请求判断
        // 先验证是否符合条件
        this.$store
          .dispatch("testlibrary/getCheckExamStart", {
            paper_id: this.tempItem.id,
          })
          .then((res) => {
            if (res.code === 0) {
              console.log(res);
              this.startExamText = "成功";
            } else {
              this.startExamText = res.msg;
              // console.log(title)
            }
            this.exam_dialogVisible = true;
          });
      } else {
        this.exam_dialogVisible = true;
      }
    },
    openItem(val) {
      console.log(111, val);
      this.startExamText = val;
      this.openTig = 1;
      console.log(this.startExamText);
    },
    close() {
      this.exam_dialogVisible = false;
      this.openTig = 0;
      this.startExamText = "成功";
    },
  },

  created() {
    // this.existMusic = Object.prototype.hasOwnProperty.call(
    //   this.m_paperInfos.list && this.m_paperInfos.list,
    //   "1"
    // );
    console.log("查看总数据", this.m_paperInfos);
    this.existMusic =
      this.m_paperInfos.exam_conf.question_conf.music_conf.length > 0;

    // this.existMusic = this
    // console.log("音乐类", this.m_paperInfos);
    // this.existArt = Object.prototype.hasOwnProperty.call(
    //   this.m_paperInfos.list && this.m_paperInfos.list,
    //   "2"
    // );

    this.existArt =
      this.m_paperInfos.exam_conf.question_conf.art_conf.length > 0;
    const paper_range = [
      "",
      "苏少版",
      "人教版",
      "人音版",
      "人美版",
      "岭南版",
      "湘艺版",
      "苏科版",
      "鲁教版",
      "湘美版",
      "上教版",
    ];

    this.paper_range = paper_range[this.m_paperInfos.exam_conf.paper_range];

    this.paperName = this.m_paperInfos.exam_conf.name;
    // this.existMusic = this.m_paperInfos.list.hasOwnProperty("1");
    // this.existArt = this.m_paperInfos.list.hasOwnProperty("2");

    // 音乐类题型

    this.allMusicTest =
      this.m_paperInfos.list["1"] && this.m_paperInfos.list["1"];

    // 美术类题型
    this.allArtTest =
      this.m_paperInfos.list["2"] && this.m_paperInfos.list["2"];
    // console.log("detail", this.allArtTest);

    // 音乐题conf
    this.musicConf = this.m_paperInfos.exam_conf.question_conf.music_conf;
    // console.log("musicconf", this.musicConf);
    // 美术题conf
    this.artConf = this.m_paperInfos.exam_conf.question_conf.art_conf;
    // 表现提 conf
    this.biaoxianConf =
      this.m_paperInfos.exam_conf.paper_question_conf &&
      this.m_paperInfos.exam_conf.paper_question_conf;
    console.log("总配置", this.m_paperInfos);

    // console.log("meishu ", this.allArtTest);

    // 小乐器信息
    //  instrument_conf  返回值,有小乐器的时候,他是个对象,里面的instrument_type是个数组,没有小乐器的时候,是个数组
    // 为数组的时候是没有小乐器,判断instrument_conf有没有length属性,有length就返回false,没有length属性就返回true
    // length不好判断,可以判断instrument_conf当前是不是数组
    if (Array.isArray(this.m_paperInfos.instrument_conf)) {
      // 是数组就是没有值,表示前面没选小乐器
      this.existInstrument = false;
    } else {
      // 有传小乐器
      this.existInstrument = true;
      if (
        !this.m_paperInfos.instrument_question &&
        this.m_paperInfos.instrument_conf.instrument_type.length > 0
      ) {
        console.log("手动匹配");
        // 手动匹配,传空对象
        this.instrumentItem = {};
      } else {
        console.log("系统匹配");
        this.instrumentItem = this.m_paperInfos.instrument_question;
      }
    }
    // this.existInstrument =
    //   (Array.isArray(this.m_paperInfos.instrument_conf) && false) || true;
    // this.m_paperInfos.instrument_conf.instrument_type.length > 0;
    // console.log("infos", this.m_paperInfos);
    // console.log("exist", this.existInstrument);

    //判断手动匹配   ,手动匹配的instrument_question 为null
    // 如果没有小乐器题目,这里this.m_paperInfos.instrument_conf 是个数组,会报错
    // if (
    //   !this.m_paperInfos.instrument_question &&
    //   this.m_paperInfos.instrument_conf.instrument_type.length > 0
    // ) {
    //   console.log("手动匹配");
    //   // 手动匹配,传空对象
    //   this.instrumentItem = {};
    // } else {
    //   console.log("系统匹配");
    //   this.instrumentItem = this.m_paperInfos.instrument_question;
    // }

    console.log("sysfrom", this.instrumentItem);
    this.instrumentConf = this.m_paperInfos.instrument_conf;

    // 小乐器type数组    把type数组遍历加入到 instrumentItem
    const instrumentType = this.m_paperInfos.instrument_conf.instrument_type;
    // 数组有东西再遍历
    if (this.instrumentItem && Array.isArray(this.instrumentItem)) {
      this.instrumentItem.forEach((item, i) => {
        item.insType = instrumentType[i];
      });
    }

    // 试卷ID
    this.paperId = this.m_paperInfos.exam_conf.id;
    // console.log("allinfos", this.m_paperInfos);

    // 试卷所有qids
    // 音乐
    // console.log("musicaaaa", this.allMusicTest);

    let temList = [];
    Object.keys(this.m_paperInfos.list).forEach((key) => {
      Object.keys(this.m_paperInfos.list[key]).forEach((sub_key) => {
        Object.keys(this.m_paperInfos.list[key][sub_key]).forEach((th_key) => {
          temList.push(this.m_paperInfos.list[key][sub_key][th_key].id);
        });
      });
    });

    // console.log("temList", temList);
    // 加上小乐器的id
    const instrumentids =
      this.m_paperInfos.instrument_question_ids &&
      this.m_paperInfos.instrument_question_ids;
    if (instrumentids && instrumentids.length > 0) {
      this.qids = [...temList, ...instrumentids];

      // this.m_instrumentids = instrumentids;
      // 用store传 m_instrumentids

      // this.$store.commit("user/setInstrumentids", instrumentids);

      // console.log("小乐器ids", this.m_instrumentids);
    } else {
      this.qids = temList;
    }

    this.m_instrumentids = instrumentids;
    this.$store.commit("user/setInstrumentids", instrumentids);
    // 删除undefined
    this.qids = this.qids.filter((item) => item);

    // 保存试卷接口
    this.forSavePaper();
  },

  computed: {
    ...mapGetters([
      "music_qid",
      "art_qid",
      "instrument_music_qid",
      "instrument_music_type",
    ]),

    allMusicTest2: function () {
      // console.log("allMusicTest2", this.allMusicTest);
      // 兼容制作试卷手动匹配
      if (
        !this.allMusicTest &&
        this.m_paperInfos.exam_conf.question_conf.music_conf.length > 0
      ) {
        console.log(
          "musicconf",
          this.m_paperInfos.exam_conf.question_conf.music_conf
        );
        let temList = [];
        const m_musicconf = this.m_paperInfos.exam_conf.question_conf
          .music_conf;
        m_musicconf.forEach((item) => {
          let m_key = item.question_type;

          temList.push({ [m_key]: {} });
        });

        // 数组转对象
        let obj = Object.assign({}, ...temList);

        // 转化成{m_key:item}   = > {1:{},2:{}}

        return obj;
      }

      // console.log("normalInfos", this.allMusicTest);

      return this.allMusicTest;
    },
    allArtTest2: function () {
      // 兼容制作试卷手动匹配
      if (
        !this.allArtTest &&
        this.m_paperInfos.exam_conf.question_conf.art_conf.length > 0
      ) {
        // console.log(
        //   "musicconf",
        //   this.m_paperInfos.exam_conf.question_conf.music_conf
        // );
        let temList = [];
        const m_artconf = this.m_paperInfos.exam_conf.question_conf.art_conf;
        m_artconf.forEach((item) => {
          let m_key = item.question_type;

          temList.push({ [m_key]: {} });
        });

        // 数组转对象
        let obj = Object.assign({}, ...temList);

        // 转化成{m_key:item}   = > {1:{},2:{}}

        return obj;
      }

      return this.allArtTest;
    },
  },
};
</script>
<style lang="scss" scoped>
.paperDetail {
  .setup-exercises {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .testPaperDescription {
    .wrap_flex_center {
      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      line-height: 2.8125rem;
      li {
        margin-left: 95px;
        text-align: center;
      }
      li:first-child {
        margin-left: 20px;
      }
    }
  }
  .returnSave {
    width: 100%;
    height: 2rem;
    justify-content: space-between;
    .saveButton {
      span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #f56c6c;
      }
      button {
        width: 6.25rem;
        height: 2rem;
        background-color: #409eff;
        margin-left: 0.875rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        &:focus {
          outline: 0;
        }
      }
    }
    .returnLogo {
      cursor: pointer;
      i {
        margin-right: 1rem;
      }
    }
  }

  // 试卷名称
  .paperName {
    width: 100%;
    height: 2.8125rem;
    justify-content: space-between;
    background-color: #ffffff;
    margin-top: 1.1875rem;
    border-radius: 0.5rem;
    .paper_name_center {
      width: 100%;
      justify-content: center;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
      span {
        font-size: 14px !important;
      }
    }
    .paper_name_left {
      span:nth-child(1) {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
        margin-left: 0.9375rem;
      }
      span:nth-child(2) {
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #c0c4cc;
        margin-left: 0.5625rem;
      }
      span:nth-child(3) {
        font-size: 12px;
        transform: scale(0.83, 0.83);
        *font-size: 10px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #c0c4cc;
      }
    }

    .right_operation {
      i {
        margin-right: 1.375rem;
      }
      & :first-child {
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../assets/imgs/paperSysMatch/exam.png");
        background-repeat: no-repeat;
        background-size: cover;

        // &:hover {
        //   background-image: url("../../assets/imgs/paperSysMatch/examhover.png");
        // }
      }

      & :last-child {
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../assets/imgs/paperSysMatch/prac.png");
        background-repeat: no-repeat;
        background-size: cover;

        // &:hover {
        //   background-image: url("../../assets/imgs/paperSysMatch/prachover.png");
        // }
      }
      // 添加
      .add {
        width: 1.25rem;
        height: 1.25rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("../../assets/imgs/testpaperlib/add.png");

        // margin-left: 2.0625rem;
        &:hover {
          width: 1.5rem;
          height: 1.5rem;
          background-image: url("../../assets/imgs/testpaperlib/addhover.png");
        }
      }
      .practicie {
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../assets/imgs/testpaperlib/practice.png");
        background-repeat: no-repeat;
        background-size: cover;
      }
      .practicie:hover {
        background-image: url("../../assets/imgs/testpaperlib/practicehover.png");
      }
      // 考试
      .examination {
        width: 1.5rem;
        height: 1.5rem;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("../../assets/imgs/testpaperlib/exam.png");
      }
      .examination:hover {
        background-image: url("../../assets/imgs/testpaperlib/examhover.png");
      }
    }
  }

  .forMusicType {
    margin-bottom: 2.25rem;
  }
  .forArtType {
    margin-bottom: 6.25rem;
  }
}
</style>
