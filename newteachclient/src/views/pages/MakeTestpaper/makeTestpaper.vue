<template>
  <div class="makeTestPaper">
    <!-- 试卷类型 -->
    <div class="testType wrap_flex_normal">
      <span class="span1">试题类型:</span>
      <div class="multiSelect">
        <el-checkbox-group v-model="checkItems">
          <el-checkbox-button
            v-for="item in items"
            :label="item.label"
            :key="item.type"
            @change="changeCheck"
            >{{ item.label }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </div>
    <!-- 选择教材 -->
    <div class="select_item wrap_flex_normal">
      <span class="span1">选择教材:</span>
      <div class="m_radiobox no_copy">
        <el-radio-group v-model="radio" @change="changeRadio">
          <el-radio-button
            v-for="item in infos"
            :key="item.type"
            :label="item.label"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <!-- 试卷名称 -->
    <div class="paper_name wrap_flex_normal">
      <span class="span1"> 试卷名称: </span>
      <div class="m_input">
        <el-input
          v-model="paperName"
          placeholder="请输入题目内容"
          @change="nameChange"
        ></el-input>
      </div>
      <div class="wrap_checkdiv wrap_flex_normal" v-if="showMusicCheckbox">
        <!-- checkbox -->
        <div
          class="m_checkbox wrap_flex_normal"
          v-if="checkItems.indexOf('音乐类') != -1"
        >
          <div>
            <el-checkbox v-model="music_checked"></el-checkbox>
          </div>
          <span>小乐器考试</span>
        </div>
        <div
          class="m_checkbox wrap_flex_normal"
          v-if="checkItems.indexOf('美术类') != -1"
        >
          <div>
            <el-checkbox v-model="withMachine_checked"></el-checkbox>
          </div>
          <span>上机考试(美术)</span>
        </div>
        <div
          class="m_checkbox wrap_flex_normal"
          v-if="checkItems.indexOf('美术类') != -1"
        >
          <div>
            <el-checkbox v-model="art_checked"></el-checkbox>
          </div>
          <span>美术笔试</span>
        </div>
      </div>
    </div>

    <!-- 分割线  18px -->
    <div class="cut"></div>

    <!-- 试题类型  上机考试-->
    <div
      class="withMachine"
      v-if="
        checkItems.indexOf('音乐类') != -1 ||
        checkItems.indexOf('美术类  ') != -1 ||
        withMachine_checked
      "
    >
      <!-- 图+ 名称 -->
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">上机考试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest" v-if="checkItems.indexOf('音乐类') != -1">
        <add-questype @changeForm="getAddTypes" title="音乐题型"></add-questype>
      </div>

      <div
        class="addQuest"
        v-if="checkItems.indexOf('美术类') != -1 && withMachine_checked"
      >
        <add-questype @changeForm="getAddTypes" title="美术题型"></add-questype>
      </div>

      <!-- 分割线  18px -->
      <div class="cut"></div>
    </div>

    <!-- 小乐器考试 -->
    <div
      class="instrument"
      v-if="checkItems.indexOf('音乐类') != -1 && music_checked"
    >
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">小乐器考试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest">
        <add-questype @changeForm="getAddTypes" title="小乐器"></add-questype>
      </div>

      <!-- 分割线  18px -->
      <div class="cut"></div>
    </div>

    <!-- 美术笔试 -->
    <div class="art" v-if="checkItems.indexOf('美术类') != -1 && art_checked">
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">美术笔试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest">
        <add-questype @changeForm="getAddTypes" title="笔试题型"></add-questype>
      </div>

      <!-- 分割线  18px -->
      <div class="cut"></div>
    </div>

    <!-- select footer -->
    <div class="select_footer wrap_flex_center">
      <span class="fit_grade_span">适用年级:</span>
      <div class="fit_grade">
        <el-select
          v-model="fitGradeValue"
          :popper-append-to-body="false"
          placeholder="请选择适用年级"
          @change="changeFitGrade"
        >
          <el-option
            v-for="item in allGradeOptions"
            :key="item.mark"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="fit_semester">
        <el-select
          v-model="fitSemesterValue"
          :popper-append-to-body="false"
          placeholder="请选择适用学年"
          @change="changeFitSemester"
        >
          <el-option
            v-for="item in allSemesterOptions"
            :key="item.mark"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="music_unit" v-if="showMusicUnit">
        <el-select
          v-model="musicUnit"
          :popper-append-to-body="false"
          placeholder="请选择音乐单元"
          @change="changeMusicUnit"
        >
          <el-option
            v-for="item in allMusicUnitOptions"
            :key="item.mark"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="art_unit" v-if="showArtUnit">
        <el-select
          v-model="artUnit"
          :popper-append-to-body="false"
          placeholder="请选择美术单元"
          @change="changeArtUnit"
        >
          <el-option
            v-for="item in allArtUnitOptions"
            :key="item.mark"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </div>
      <div class="difficult wrap_flex_center">
        <span class="difficult_span">难易程度</span>
        <div class="selectDifficult">
          <el-select
            v-model="difficultVal"
            :popper-append-to-body="false"
            placeholder="不限难易"
            @change="changeDifficult"
          >
            <el-option
              v-for="item in allDifficultOptions"
              :key="item.mark"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="test_from wrap_flex_center">
        <span class="test_from_span">题目来源</span>
        <div class="from_sys wrap_flex_center">
          <el-checkbox class="m_checkbox" v-model="sys_checked"></el-checkbox>
          <span class="from_sys_span">系统匹配</span>
        </div>
        <div class="manual wrap_flex_center">
          <el-checkbox
            class="m_checkbox"
            v-model="manual_checked"
          ></el-checkbox>
          <span class="manual_span">手动添加</span>
        </div>
      </div>
    </div>

    <!-- next button -->
    <div class="nextButton">
      <el-button @click="nextButton">下一步</el-button>
    </div>

    <!-- dialog -->
    <div class="notEmptyDialog">
      <el-dialog title="提示" :visible.sync="name_dialogVisible" width="20%">
        <span>{{ whatEmpty }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="name_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="name_dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- type3 dialog  type3_dialogVisible-->
    <div class="type3Dialog">
      <el-dialog title="提示" :visible.sync="type3_dialogVisible" width="20%">
        <span>{{ whatEmpty }}不能为空</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="type3_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="type3_dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import addQuestype from "./components/addQuestype";
import $axios from "../../../api/index";
export default {
  props: {
    m_checkItems: {
      type: [String],
      default: "音乐类",
    },
    m_radio: {
      type: String,
      default: "苏少版",
    },
    m_paperName: {
      type: String,
    },

    // 单选框
    m_music_checked: {
      type: Boolean,
    },
    m_withMachine_checked: {
      type: Boolean,
    },
    m_art_checked: {
      type: Boolean,
    },
    // 年级
    m_grade: {
      type: String,
      default: "",
    },
    // 学期
    m_semester: {
      type: String,
      default: "",
    },
    // 音乐单元
    m_musicUnit: {
      type: String,
      default: "",
    },
    // 美术单元
    m_artUnit: {
      type: String,
      default: "",
    },

    // 难度
    m_difficult: {
      type: String,
      default: "",
    },

    // 编辑页进来的试卷id
    m_paperid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // testCates: [
      //   { checked: true, lable: "小乐器考试" },
      //   { checked: false, lable: "上机考试(美术)" },
      //   { checked: false, lable: "美术笔试" },
      // ],
      music_checked: this.m_music_checked,
      withMachine_checked: this.m_withMachine_checked,
      art_checked: this.m_art_checked,

      checked: false,
      // radio: "苏少版",

      // 多选,单选 ,试卷名
      checkItems: this.m_checkItems,
      radio: this.m_radio,
      paperName: this.m_paperName,

      items: [
        { type: 0, label: "音乐类" },
        { type: 1, label: "美术类" },
      ],
      infos: [
        { type: 1, label: "苏少版" },
        { type: 2, label: "人教版" },
        { type: 3, label: "人音版" },
        { type: 4, label: "湘艺版" },
        { type: 5, label: "鲁教版" },
        { type: 6, label: "上教版" },
      ],

      // 多选的数组  [0,1]
      checkItemTypes: ["音乐类"],

      //提交内容
      paper_selection: {},

      // 记录checkbox
      showMusicCheckbox: true,
      showArtCheckbox: true,
      // 提交父组件的请求信息
      requestInfos: { music_conf: [], art_conf: [], art_offline_conf: [] },
      // 单独的小乐器题信息   (演唱题可以单独存在,小乐器必须有演唱题存在)  提交的时候判断当有小乐器存在的时候,有没有音乐题型的questionType = 3的存在,有就添加小乐器,没有添加弹窗提示
      instrumentInfos: [],

      // 适用年级
      fitGradeValue: this.m_grade,
      allGradeOptions: [
        { mark: -1, label: "所有年级" },
        { mark: 4, label: "一年级" },
        { mark: 5, label: "二年级" },
        { mark: 6, label: "三年级" },
        { mark: 7, label: "四年级" },
        { mark: 8, label: "五年级" },
        { mark: 9, label: "六年级" },
        { mark: 1, label: "七年级" },
        { mark: 2, label: "八年级" },
        { mark: 3, label: "九年级" },
        { mark: 10, label: "高一" },
        { mark: 11, label: "高二" },
        { mark: 12, label: "高三" },
      ],

      // 适用学年
      fitSemesterValue: this.m_semester,
      allSemesterOptions: [
        { mark: -1, label: "全部" },
        { mark: 1, label: "上学期" },
        { mark: 2, label: "下学期" },
      ],

      // 音乐单元
      musicUnit: this.m_musicUnit,
      allMusicUnitOptions: [
        { mark: 1, label: "1单元" },
        { mark: 2, label: "2单元" },
        { mark: 3, label: "3单元" },
        { mark: 4, label: "4单元" },
        { mark: 5, label: "5单元" },
        { mark: 6, label: "6单元" },
        { mark: 7, label: "7单元" },
        { mark: 8, label: "8单元" },
        { mark: 9, label: "9单元" },
        { mark: 10, label: "10单元" },
        { mark: 11, label: "11单元" },
        { mark: 12, label: "12单元" },
        { mark: 13, label: "13单元" },
        { mark: 14, label: "14单元" },
        { mark: 15, label: "15单元" },
        { mark: 16, label: "16单元" },
        { mark: 17, label: "17单元" },
        { mark: 18, label: "18单元" },
        { mark: 19, label: "19单元" },
        { mark: 20, label: "20单元" },
        { mark: 21, label: "21单元" },
        { mark: 22, label: "22单元" },
        { mark: 23, label: "23单元" },
        { mark: 24, label: "24单元" },
        { mark: 25, label: "25单元" },
      ],
      // 美术单元
      artUnit: this.m_artUnit,
      allArtUnitOptions: [
        { mark: 1, label: "1单元" },
        { mark: 2, label: "2单元" },
        { mark: 3, label: "3单元" },
        { mark: 4, label: "4单元" },
        { mark: 5, label: "5单元" },
        { mark: 6, label: "6单元" },
        { mark: 7, label: "7单元" },
        { mark: 8, label: "8单元" },
        { mark: 9, label: "9单元" },
        { mark: 10, label: "10单元" },
        { mark: 11, label: "11单元" },
        { mark: 12, label: "12单元" },
        { mark: 13, label: "13单元" },
        { mark: 14, label: "14单元" },
        { mark: 15, label: "15单元" },
        { mark: 16, label: "16单元" },
        { mark: 17, label: "17单元" },
        { mark: 18, label: "18单元" },
        { mark: 19, label: "19单元" },
        { mark: 20, label: "20单元" },
        { mark: 21, label: "21单元" },
        { mark: 22, label: "22单元" },
        { mark: 23, label: "23单元" },
        { mark: 24, label: "24单元" },
        { mark: 25, label: "25单元" },
      ],

      // 难易度
      difficultVal: this.m_difficult,
      allDifficultOptions: [
        { mark: 0, label: "全部" },
        { mark: 1, label: "易" },
        { mark: 2, label: "中" },
        { mark: 3, label: "难" },
      ],

      // all 请求信息    默认音乐类  苏少版 系统匹配
      allRequestInfos: {
        stype: 1,
        paper_range: 1,
        source: 1,
        name: this.m_paperName,
        paper_conf: {},
        // grade: this.findMark(this.allGradeOptions, this.m_grade),
        // semester: this.findMark(this.allSemesterOptions, this.m_semester),
        // unit: this.findMark(this.allMusicUnitOptions, this.m_musicUnit),
        // art_unit: this.findMark(this.allArtUnitOptions, this.m_artUnit),
        // difficult: this.findMark(this.allDifficultOptions, this.m_difficult),
      },

      // 系统匹配
      sys_checked: true,

      // 手动添加
      manual_checked: false,

      // dialog
      name_dialogVisible: false,
      type3_dialogVisible: false,

      // 是否存在演唱题
      gotType3: true,
      // question_type 为空
      nullQuestionType: true,
      // number为空
      nullNumber: true,
      // 小乐器为空
      nullInstrument: true,
      // score为空
      nullScore: true,
      // grade为空
      nullGrade: true,
      // semester为空
      nullSemester: true,

      //试题类型为空
      nullCheckItems: true,

      // 显示音乐单元选择
      showMusicUnit: true,
      // 显示美术单元选择
      showArtUnit: false,
    };
  },
  components: {
    addQuestype,
  },
  methods: {
    changeCheck() {
      console.log("this.allItems", this.checkItems);
      this.checkItemTypes = this.checkItems.map((item, i) => {
        return item;
      });

      // init
      if (this.checkItemTypes.length == 0) {
        this.allRequestInfos.stype = "";
      }
      // console.log("val", this.checkItems);

      if (this.checkItemTypes.length > 1) {
        // 音乐和美术
        this.infos = [
          { type: 1, label: "苏少版" },
          { type: 2, label: "人教版" },
          { type: 5, label: "鲁教版" },
        ];
        this.allRequestInfos.stype = 3;
      } else if (this.checkItemTypes.length == 1) {
        if (this.checkItemTypes[0] == "音乐类") {
          //音乐
          this.infos = [
            { type: 1, label: "苏少版" },
            { type: 2, label: "人教版" },
            { type: 3, label: "人音版" },
            { type: 4, label: "湘艺版" },
            { type: 5, label: "鲁教版" },
            { type: 6, label: "上教版" },
          ];
          this.allRequestInfos.stype = 1;
        } else {
          // 美术
          this.infos = [
            { type: 1, label: "苏少版" },
            { type: 2, label: "人教版" },
            { type: 3, label: "人美版" },
            { type: 4, label: "岭南版" },
            { type: 5, label: "鲁教版" },
            { type: 6, label: "湘美版" },
            { type: 7, label: "上教版" },
          ];
          this.allRequestInfos.stype = 2;
        }
      }

      console.log("changeinfos", this.allRequestInfos.stype);
    },

    changeRadio(val) {
      const temRangeList = [
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
      const paperRange = temRangeList.indexOf(val);
      // console.log("range", paperRange);
      this.allRequestInfos.paper_range = paperRange;
    },

    nameChange() {
      this.allRequestInfos.name = this.paperName;
      // console.log(this.paperName);
    },

    // 得到add-questType组件里面的传值   msg1是个list
    getAddTypes(msg1, msg2) {
      let m_list = [];
      if (msg2 == "小乐器") {
        msg1.forEach((item) => {
          let { question_type, ...other } = item;
          m_list.push(question_type);
        });

        // console.log("小乐器,type列表", m_list);
      } else {
        msg1.forEach((item) => {
          let { amount, currentVal, scoreVal, ...conf } = item;
          m_list.push(conf);
        });
      }

      // console.log("msg", msg1[0], msg2);
      if (msg2 == "音乐题型") {
        this.requestInfos.music_conf = m_list;
      } else if (msg2 == "美术题型") {
        this.requestInfos.art_conf = m_list;
      } else if (msg2 == "小乐器") {
        // 小乐器的不同
        this.instrumentInfos = m_list;
      } else if (msg2 == "笔试题型") {
        // 笔试题的number要单独设置
        this.requestInfos.art_offline_conf = m_list;
      }

      // console.log(this.requestInfos);
    },

    // 选择年级
    changeFitGrade(val) {
      // console.log("grade", val);
      this.allGradeOptions.forEach((item, i) => {
        if (item.label == val) {
          this.allRequestInfos.grade = item.mark;
          // if (item.mark == -1) {
          //   // 隐藏两个单元
          //   this.showMusicUnit = false;
          //   this.showArtUnit = false;
          // } else {
          //   console.log("当前多选项", this.checkItemTypes);
          //   // 根据当前多选项判断
          //   if (this.checkItemTypes.indexOf("音乐类") !== -1) {
          //     this.showMusicUnit = true;
          //   }
          //   if (this.checkItemTypes.indexOf("美术类") !== -1) {
          //     this.showArtUnit = true;
          //   }
          // }
          return;
        }
      });
    },

    // 选择学年
    changeFitSemester(val) {
      this.allSemesterOptions.forEach((item, i) => {
        if (item.label == val) {
          this.allRequestInfos.semester = item.mark;
          // if (item.mark == -1) {
          //   // 隐藏两个单元
          //   this.showMusicUnit = false;
          //   this.showArtUnit = false;
          // } else {
          //   console.log("当前多选项", this.checkItemTypes);
          //   // 根据当前多选项判断
          //   if (this.checkItemTypes.indexOf("音乐类") !== -1) {
          //     this.showMusicUnit = true;
          //   }
          //   if (this.checkItemTypes.indexOf("美术类") !== -1) {
          //     this.showArtUnit = true;
          //   }
          // }
          return;
        }
      });
    },

    // 选择音乐单元
    changeMusicUnit(val) {
      this.allMusicUnitOptions.forEach((item, i) => {
        if (item.label == val) {
          this.allRequestInfos.unit = item.mark;

          return;
        }
      });
    },
    // 选择美术单元
    changeArtUnit(val) {
      this.allArtUnitOptions.forEach((item, i) => {
        if (item.label == val) {
          this.allRequestInfos.art_unit = item.mark;

          return;
        }
      });
    },

    // 难易程度
    changeDifficult(val) {
      this.allDifficultOptions.forEach((item, i) => {
        if (item.label == val) {
          this.allRequestInfos.difficult = item.mark;
          return;
        }
      });
    },

    // 下一步
    nextButton() {
      // 判断小乐器是否有值,在判断是否有演唱题,如果没有提示添加演唱题
      // 判断必填项是否有空值,有空值提示不能为空
      // console.log("all", this.allRequestInfos);

      // 判断是否选择试题类型
      console.log("nextinfos", this.allRequestInfos);

      if (this.allRequestInfos.stype == "") {
        this.nullCheckItems = false;

        this.name_dialogVisible = true;
      } else {
        this.nullCheckItems = true;
      }

      if (this.allRequestInfos.name == "") {
        this.name_dialogVisible = true;
      }

      // 判断music_conf
      if (this.requestInfos.music_conf.length > 0) {
        this.requestInfos.music_conf.forEach((item) => {
          // 判断小乐器有没有空
          if (item.instrumentInfos && item.instrumentInfos.length < 1) {
            this.nullInstrument = false;

            this.name_dialogVisible = true;
          } else {
            this.nullInstrument = true;
          }
          // 其他三项
          if (item.question_type == "") {
            this.nullQuestionType = false;
            this.name_dialogVisible = true;
          } else {
            this.nullQuestionType = true;
          }

          if (item.number == "") {
            this.nullNumber = false;
            this.name_dialogVisible = true;
          } else {
            this.nullNumber = true;
          }

          if (item.score == "") {
            this.nullScore = false;
            this.name_dialogVisible = true;
          } else {
            this.nullScore = true;
          }
        });
      }

      // 判断art_conf
      if (this.requestInfos.art_conf.length > 0) {
        this.requestInfos.art_conf.forEach((item) => {
          // 判断小乐器有没有空

          if (item.question_type == "") {
            this.nullQuestionType = false;
            this.name_dialogVisible = true;
          } else {
            this.nullQuestionType = true;
          }

          if (item.number == "") {
            this.nullNumber = false;
            this.name_dialogVisible = true;
          } else {
            this.nullNumber = true;
          }

          if (item.score == "") {
            this.nullScore = false;
            this.name_dialogVisible = true;
          } else {
            this.nullScore = true;
          }
        });
      }
      // 判断art_offline_conf
      if (this.requestInfos.art_offline_conf.length > 0) {
        this.requestInfos.art_offline_conf.forEach((item) => {
          // 判断小乐器有没有空

          if (item.question_type == "") {
            this.nullQuestionType = false;
            this.name_dialogVisible = true;
          } else {
            this.nullQuestionType = true;
          }

          if (item.number == "") {
            this.nullNumber = false;
            this.name_dialogVisible = true;
          } else {
            this.nullNumber = true;
          }

          if (item.score == "") {
            this.nullScore = false;

            this.name_dialogVisible = true;
          } else {
            this.nullScore = true;
          }
        });
      }

      // 如果小乐器有
      if (this.instrumentInfos.length > 0) {
        this.gotType3 = this.requestInfos.music_conf.some((item) => {
          return item.question_type == 3;
        });

        if (!this.gotType3) {
          // show  请选择演唱题

          this.name_dialogVisible = true;
        } else {
          // 添加进requestInfos,里面的question_type = 3 的演唱题对象里面,  key值为instrument_type
          // this.requestInfos.music_conf.push(this.instrumentInfos);
          this.requestInfos.music_conf.forEach((item) => {
            if (item.question_type == 3) {
              item.instrument_type = this.instrumentInfos;
            }
          });
        }
      }

      // 判断适用年级
      if (!this.allRequestInfos.grade || this.allRequestInfos.grade == "") {
        this.nullGrade = false;

        this.name_dialogVisible = true;
      } else {
        this.nullGrade = true;
      }
      // 判断适用学年
      if (
        !this.allRequestInfos.semester ||
        this.allRequestInfos.semester == ""
      ) {
        this.nullSemester = false;

        this.name_dialogVisible = true;
      } else {
        this.nullSemester = true;
      }

      // 避免多次请求网络
      // 弹出窗 就 过
      if (this.name_dialogVisible) {
        return;
      }
      this.allRequestInfos.paper_id = this.m_paperid;
      console.log("paperid", this.allRequestInfos.paper_id);
      // ,再把requestInfos添加进paper_conf  JSON.stringify(this.requestInfos)
      this.allRequestInfos.paper_conf = JSON.stringify(this.requestInfos);

      // 判断当前是系统匹配还是手动添加

      // 系统匹配,请求网络带参跳转
      if (this.sys_checked) {
        //发送请求
        console.log("提交试卷信息", this.allRequestInfos);
        $axios
          .post("/examinationPaper/editPaper", this.allRequestInfos)
          .then((res) => {
            console.log("resresres", res);
            if (res.code == 0) {
              const m_eid = res.data.eid;

              return new Promise((resolve, reject) => {
                resolve(m_eid);
              });
            }
          })
          .then((res) => {
            console.log("eid", res);
            $axios
              .post("/examinationPaper/preview", { eid: res })
              .then((res) => {
                // console.log("thisres", res);
                console.log("回显预览查看题目id", res);
                if (res.code == 0) {
                  // 跳转系统匹配页;
                  this.$router.push({
                    name: "paperMadeSysMatch",
                    params: { paperInfos: res.data },
                  });
                }
              });
          });
      } else {
        $axios
          .post("/examinationPaper/editPaper", this.allRequestInfos)
          .then((res) => {
            if (res.code == 0) {
              const m_eid = res.data.eid;

              return new Promise((resolve, reject) => {
                resolve(m_eid);
              });
            }
          })
          .then((res) => {
            console.log("eid", res);
            $axios
              .post("/examinationPaper/preview", { eid: res })
              .then((res) => {
                console.log("回显预览查看题目id", res);
                if (res.code == 0) {
                  // 跳转手动匹配页;
                  this.$router.push({
                    name: "paperMadeManualMatch",
                    params: { paperInfos: res.data },
                  });
                }
              });
          });
        // // 手动匹配,带参跳转,试卷编辑页面
        // this.$router.push({
        //   name: "paperMadeManualMatch",
        //   params: { paperInfos: this.allRequestInfos },
        // });
      }
    },

    // 匹配传参mark
    findMark(allVals, val) {
      let tempMark = "";
      allVals.forEach((m_item) => {
        if (m_item.label == val) {
          console.log("myhmark", m_item.mark);
          tempMark = m_item.mark;
        }
      });
      return tempMark;
    },
  },
  computed: {
    showWithMachine: function () {
      return this.checkItems.indexOf("音乐类") != -1;
    },

    // dialog
    whatEmpty: function () {
      if (!this.nullCheckItems) {
        return "请选择试题类型";
      } else if (this.paperName == "") {
        return "试卷名称不能为空";
      } else if (!this.gotType3) {
        return "需要添加演唱题";
      } else if (!this.nullInstrument) {
        return "请选择乐器";
      } else if (!this.nullQuestionType) {
        return "请选择题型";
      } else if (!this.nullNumber) {
        return "请选择数量";
      } else if (!this.nullScore) {
        return "请选择分数";
      } else if (!this.nullGrade) {
        return "请选择年级";
      } else if (!this.nullSemester) {
        return "请选择学年";
      }
      return "";
    },
  },
  watch: {
    // 监听设置requestInfos的值
    checkItemTypes(newV, oldV) {
      if (newV.indexOf("音乐类") == -1) {
        this.requestInfos.music_conf = [];
      } else if (newV.indexOf("美术类") == -1) {
        this.requestInfos.art_conf = [];
        this.requestInfos.art_offline_conf = [];
      }
      // console.log("watchInfos", this.requestInfos);

      //如果当前多选都没选清空初始设置的stype值
      if (newV.length < 1) {
        this.allRequestInfos.stype = "";
      }

      // 是否显示单元
      if (newV.includes("音乐类")) {
        this.showMusicUnit = true;
      } else {
        this.showMusicUnit = false;
      }
      // 是否显示单元
      if (newV.includes("美术类")) {
        this.showArtUnit = true;
      } else {
        this.showArtUnit = false;
      }
    },
    // 监听单选框
    // 小乐器
    music_checked(newV, oldV) {
      if (!newV) {
        this.instrumentInfos = [];
      }
      // console.log("watchInfos", this.requestInfos);
    },

    // 上机考试美术
    withMachine_checked(newV, oldV) {
      if (!newV) {
        this.requestInfos.art_conf = [];
      }
      // console.log("watchInfos", this.requestInfos);
    },

    //美术笔试
    art_checked(newV, oldV) {
      if (!newV) {
        this.requestInfos.art_offline_conf = [];
      }
      // console.log("!new", this.requestInfos);
    },

    // 监听手动添加
    manual_checked(newV, oldV) {
      if (newV) {
        this.sys_checked = false;
        this.allRequestInfos.source = 2;
      } else {
        this.sys_checked = true;
      }
    },

    // 监听系统匹配
    sys_checked(newV, oldV) {
      if (newV) {
        this.manual_checked = false;
        this.allRequestInfos.source = 1;
      } else {
        this.manual_checked = true;
      }
    },

    // 监听音乐单元选择
    showMusicUnit(newV, oldV) {
      if (newV == false) {
        this.allRequestInfos.unit = "";
      }
    },
    // 监听美术单元选择
    showArtUnit(newV, oldV) {
      if (newV == false) {
        this.allRequestInfos.art_unit = "";
      }
    },

    // 监听年级和学年
    fitGradeValue(newV, oldV) {
      if (newV == "所有年级" || this.fitSemesterValue == "全部") {
        this.showMusicUnit = false;
        this.showArtUnit = false;
      } else {
        // console.log("zouxiamian ");
        // console.log("xiamian11", this.checkItemTypes);
        // console.log("xiamian", this.checkItemTypes.indexOf("音乐类"));
        // 根据当前多选项判断
        if (this.checkItemTypes.indexOf("音乐类") !== -1) {
          this.showMusicUnit = true;
        }
        if (this.checkItemTypes.indexOf("美术类") !== -1) {
          this.showArtUnit = true;
        }
      }
    },

    fitSemesterValue(newV, oldV) {
      if (newV == "全部" || this.fitGradeValue == "所有年级") {
        this.showMusicUnit = false;
        this.showArtUnit = false;
      } else {
        // 根据当前多选项判断
        if (this.checkItemTypes.indexOf("音乐类") !== -1) {
          this.showMusicUnit = true;
        }
        if (this.checkItemTypes.indexOf("美术类") !== -1) {
          this.showArtUnit = true;
        }
      }
    },
  },
  created() {
    if (this.m_artUnit != "") {
      this.showArtUnit = true;
    }

    this.allRequestInfos = {
      ...this.allRequestInfos,
      grade: this.findMark(this.allGradeOptions, this.m_grade),
      semester: this.findMark(this.allSemesterOptions, this.m_semester),
      unit: this.findMark(this.allMusicUnitOptions, this.m_musicUnit),
      art_unit: this.findMark(this.allArtUnitOptions, this.m_artUnit),
      difficult: this.findMark(this.allDifficultOptions, this.m_difficult),
    };
    // console.log("createdinfos", this.allRequestInfos);
    console.log("grade", this.m_grade);
  },
  mounted() {
    // console.log("makepaper_conf", this.m_paperConf);
  },

  // beforeRouteLeave(to, from, next) {
  //   if (to.name === "paperMadeManualMatch") {
  //     console.log("jinlail ");
  //     to.meta.keepAlive = true;
  //   }
  //   next();
  // },
};
</script>
<style lang="scss">
.makeTestPaper {
  .testType {
    height: 2rem;
    align-items: center;
    & > .span1 {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }

  .multiSelect {
    .el-checkbox-button {
      margin-right: 1.0625rem;
    }

    .el-checkbox-button__inner {
      width: 6.25rem;
      height: 2rem;
      line-height: 0.375rem;
      font-size: 12px;
      transition: none;
      border: none;
      border-radius: 0.375rem;
    }
  }
  .el-checkbox-button__inner {
    // height: 2rem;
    // border-radius: 0.375rem;
    // margin-right: 1rem;
    // font-size: 12px;
    // font-family: Microsoft YaHei;
    // font-weight: 400;
    // color: #409eff;
    // padding-top: 0.5625rem;
  }

  // checked
  // .el-checkbox-group {
  //   .is-checked {
  //     font-size: 12px;
  //     font-family: Microsoft YaHei;
  //     font-weight: 400;
  //     color: #ffffff;
  //   }
  // }

  .el-checkbox-button {
    // height: 2rem;
    // span {
    //   width: 6.25rem;
    //   height: 2rem;
    //   border-radius: 0.375rem;
    //   border: 0; // 去除未选中状态边框
    //   outline: none; // 去除选中状态边框
    // }
  }
  .multiSelect {
    margin-left: 0.5rem;
  }
  // .el-checkbox-button:first-child .el-checkbox-button__inner {
  //   border-left: 0;
  //   border-radius: 0.375rem;
  // }
  // .el-checkbox-button:last-child .el-checkbox-button__inner {
  //   border-radius: 0.375rem;
  // }

  // 单选
  .select_item {
    align-items: center;
    margin-top: 1.1875rem;
    .span1 {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .m_radiobox {
      margin-left: 0.5rem;

      .el-radio-button__inner {
        height: 2rem;
        padding-top: 0.6875rem;
        margin-right: 1rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        border-radius: 0.375rem;
        color: #303133;
        border: 0; // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        &:hover {
          color: #409eff;
        }
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #409eff;

        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  // 试卷名称
  .paper_name {
    margin-top: 1.1875rem;
    align-items: center;
    .span1 {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .m_input {
      margin-left: 0.6875rem;
      input {
        width: 40rem;
        height: 2rem;
        // padding-top: 0.6875rem;
        padding-left: 1.3125rem;

        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
    .m_checkbox {
      margin-right: 1.4375rem;
      align-items: flex-end;
      height: 2rem;

      .el-checkbox__inner {
        width: 0.9375rem;
        height: 0.9375rem;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
      }

      span {
        margin-left: 0.5625rem;
      }
    }
    .wrap_checkdiv {
      margin-left: 1.625rem;
      .el-checkbox__input {
        margin-left: 0;
      }
    }
  }

  .cut {
    // width: 1656px;
    height: 1px;
    background: #eaeef9;
    border: 1px solid #eaeef9;
    margin-top: 1.125rem;
  }

  .withMachine {
    margin-top: 1.25rem;
    .computer {
      // display: block;
      width: 1.25rem;
      height: 1.125rem;
      background-image: url("../../../assets/imgs/computer.png");
    }
    .span1 {
      margin-left: 0.875rem;
      height: 100%;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
      vertical-align: top;
    }

    .addQuest {
      // border: 1px solid gray;
      margin-top: 0.6875rem;
    }
  }

  // 小乐器
  .instrument {
    margin-top: 1.0625rem;
    .computer {
      // display: block;
      width: 1.1875rem;
      height: 1.25rem;
      background-image: url("../../../assets/imgs/makeTestPaper/music.png");
      background-size: 1.1875rem 1.25rem;
    }
    .span1 {
      margin-left: 0.875rem;
      height: 100%;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
      vertical-align: top;
    }
    .addQuest {
      // border: 1px solid gray;
      margin-top: 0.6875rem;
    }
  }

  // 美术笔试
  .art {
    margin-top: 1.0625rem;
    .computer {
      // display: block;
      width: 1.3125rem;
      height: 1.3125rem;
      background-image: url("../../../assets/imgs/makeTestPaper/art.png");
      background-size: 1.3125rem;
    }
    .span1 {
      margin-left: 0.875rem;
      height: 100%;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
      vertical-align: top;
    }

    .addQuest {
      // border: 1px solid gray;
      margin-top: 0.6875rem;
    }
  }

  .select_footer {
    margin-top: 1.125rem;
    height: 2rem;
    .el-select-dropdown__list {
      padding: 0;
      background-color: #ffffff;
    }
    .el-select-dropdown__item {
      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
    .el-input__inner {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
    .el-checkbox__inner {
      width: 1rem;
      height: 1rem;
    }
    .el-popper {
      margin-top: 0;
      height: 2rem;
      .popper__arrow {
        display: none;
      }
      p {
        padding-top: 0.25rem;
      }
    }
    .el-select-dropdown {
      box-shadow: none;
    }
    .fit_grade_span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .fit_grade {
      width: 8.375rem;
      height: 2rem;
      margin-left: 0.5rem;
    }
    .fit_semester {
      width: 8.375rem;
      height: 2rem;
      margin-left: 2.25rem;
    }
    .music_unit {
      width: 8.375rem;
      height: 2rem;
      margin-left: 2.1875rem;
    }
    .art_unit {
      width: 8.375rem;
      height: 2rem;
      margin-left: 2.1875rem;
    }
    .difficult {
      margin-left: 2.3125rem;
      .difficult_span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      .selectDifficult {
        width: 8.375rem;
        margin-left: 0.4375rem;
      }
    }
    .test_from {
      margin-left: 2.1875rem;
      .test_from_span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      .from_sys {
        margin-left: 0.875rem;
        .from_sys_span {
          margin-left: 0.3125rem;

          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
      }
      .manual {
        margin-left: 1.25rem;
        .manual_span {
          margin-left: 0.3125rem;

          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
      }
    }

    // select box
    .el-input__inner {
      height: 2rem;
      border: none;
    }
    .el-input__icon {
      line-height: 2rem;
    }
  }

  .nextButton {
    margin-top: 1.1875rem;
    margin-left: 3.625rem;
    .el-button {
      width: 5.8125rem;
      height: 2rem;
      background-color: #409eff;
      line-height: 0;
      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .el-checkbox-button__inner {
    color: #303133;
    &:hover {
      color: #409eff;
    }
  }
}
.makeTestPaper .el-checkbox-group .is-checked {
  span {
    background-image: url("../../../assets/imgs/makeTestPaper/checkback.png");
    background-size: cover;
    background-repeat: no-repeat;

    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
  }
}

// .makeTestPaper .el-checkbox-group .el-checkbox-button {
//   span {
//     font-size: 12px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: #303133;
//   }
// }

// .makeTestPaper .el-checkbox-group .el-checkbox-button {
//   span:hover {
//     font-size: 12px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: #409eff;
//   }
// }
</style>
