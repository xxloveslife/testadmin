<template>
  <div class="manualChangeContent">
    <el-container>
      <el-header>
        <div class="header wrap_flex_center">
          <span class="point"> 选择知识点 </span>
          <!-- select -->
          <div class="selectItem wrap_flex_center">
            <div class="first_select">
              <el-select
                v-model="librarySelected"
                placeholder=""
                :popper-append-to-body="false"
                @change="libChange"
              >
                <el-option
                  v-for="item in fromOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>
            <!--教材选择  -->
            <div class="paperrange_select">
              <el-select
                v-model="paperrangeSelected"
                placeholder="请选择"
                :popper-append-to-body="false"
                @change="paperRangeChange"
              >
                <el-option
                  v-for="item in paperRangeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <!-- 年级选择 -->
            <div class="grade_select">
              <el-select
                v-model="gradeSelected"
                placeholder="请选择"
                :popper-append-to-body="false"
                @change="gradeChange"
              >
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <!-- 学期选择 -->
            <div class="semester_select">
              <el-select
                v-model="semesterSelected"
                placeholder="请选择"
                :popper-append-to-body="false"
                @change="semesterChange"
              >
                <el-option
                  v-for="item in semesterOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <!-- 单元选择 -->
            <div class="unit_select">
              <el-select
                v-model="unitSelected"
                multiple
                :placeholder="m_unit"
                :popper-append-to-body="false"
                @change="unitChange"
                ref="multiUnit"
              >
                <el-option
                  v-for="item in unitOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <div class="keyword_input wrap_flex_center">
              <el-input
                v-model="input"
                placeholder="请输入内容"
                @change="keywordChange"
              ></el-input>
              <el-button type="primary" @click="clickAll">全部</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <!-- 分类 -->
          <div class="manual_category">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :unique-opened="true"
              active-text-color="#409EFF"
            >
              <el-submenu
                :index="item.name"
                v-for="item in categoryInfos"
                :key="item.id"
              >
                <template slot="title">
                  <span>{{ item.name }}</span>
                </template>

                <el-submenu
                  :index="value.name"
                  v-for="value in item.child"
                  :key="value.id"
                >
                  <template slot="title">{{ value.name }}</template>
                  <el-menu-item
                    :index="subVal.name"
                    v-for="subVal in value.child"
                    :key="subVal.id"
                    @click="getCid(subVal)"
                    >{{ subVal.name }}</el-menu-item
                  >
                </el-submenu>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="main_content">
            <!-- 标题 -->
            <div class="content_title">
              <span class="choose">选择</span>
              <span class="testId">题目ID</span>
              <span class="testName">题目</span>
            </div>
            <!-- 内容 -->
            <div class="content">
              <div
                class="contentSelect wrap_flex_center"
                v-for="(item, i) in mainContent"
                :key="item.id"
              >
                <div class="radiobox">
                  <input
                    type="radio"
                    name="item"
                    @change="changeItem(item)"
                    :checked="i == 0 && 'checked'"
                  />
                </div>
                <div
                  class="contentId wrap_flex_center"
                  @click="testDetail(item, i)"
                >
                  <span>{{ item.id }}</span>
                  <span class="span2">{{ item.content }}</span>
                </div>
              </div>
            </div>

            <!-- 分页 -->
            <div class="wrap_flex_allcenter">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="totalNum"
              >
              </el-pagination>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

    <!-- 显示试题详情 -->
    <!-- <div>
      <el-dialog
        title="试题详情"
        :visible.sync="detailDialogVisible"
        width="56.67%"
        :append-to-body="true"
      > -->
    <!-- 手动换题内容 -->
    <!-- <div> -->
    <!-- <manual-change></manual-change> -->
    <!-- <span>helloworld</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="detailDialogVisible = false"
            >确 定</el-button
          >
          <el-button @click="detailDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div> -->
    <questiontype-preview
      class="questiontype-preview"
      :questiontypeList="dialog_item"
      :dialogVisible="detailDialogVisible"
      :currentLib="currentLib"
      :questionAnalyzeList="questionAnalyzeList"
      :libDatas="mainContent"
      :question_index="question_index"
      @close="detailDialogVisible = false"
      @btnClick="btnClick"
      @isfavorite="isfavorite"
      @isshare="open"
    ></questiontype-preview>
  </div>
</template>

<script>
import questiontypePreview from '../../questiontypePreview'
import { mapGetters } from 'vuex'
import $aixos from '../../../../api/index'
export default {
  props: {
    currentLib: {
      type: String,
    },
    categoryType: {
      type: Number,
      default: 2,
    },
    testType: {
      type: Number,
    },
    // 关于小乐器的提交信息
    aboutInstrument: {
      type: Object,
    },
  },
  components: { questiontypePreview },
  data() {
    return {
      question_index: 0,
      questionAnalyzeList: {},
      dialog_item: {},
      iteminfos: [1, 2],
      radio2: 3,

      fromOptions: [
        { label: '系统题库', mark: 1 },
        { label: '我的题库', mark: 2 },
      ],
      paperRangeOptions: [
        { label: '苏少版', mark: 1 },
        { label: '人教版', mark: 2 },
        { label: '人音版', mark: 3 },
        { label: '人美版', mark: 4 },
        { label: '岭南版', mark: 5 },
        { label: '湘艺版', mark: 6 },
        { label: '苏科版', mark: 7 },
        { label: '鲁教版', mark: 8 },
        { label: '湘美版', mark: 9 },
        { label: '上教版', mark: 10 },
      ],
      gradeOptions: [
        { mark: -1, label: '年级' },
        { mark: 4, label: '一年级' },
        { mark: 5, label: '二年级' },
        { mark: 6, label: '三年级' },
        { mark: 7, label: '四年级' },
        { mark: 8, label: '五年级' },
        { mark: 9, label: '六年级' },
        { mark: 1, label: '七年级' },
        { mark: 2, label: '八年级' },
        { mark: 3, label: '九年级' },
        { mark: 10, label: '高一' },
        { mark: 11, label: '高二' },
        { mark: 12, label: '高三' },
      ],

      semesterOptions: [
        { mark: -1, label: '全部' },
        { mark: 1, label: '上学期' },
        { mark: 2, label: '下学期' },
      ],

      unitOptions: [
        { mark: 1, label: '1单元' },
        { mark: 2, label: '2单元' },
        { mark: 3, label: '3单元' },
        { mark: 4, label: '4单元' },
        { mark: 5, label: '5单元' },
        { mark: 6, label: '6单元' },
        { mark: 7, label: '7单元' },
        { mark: 8, label: '8单元' },
        { mark: 9, label: '9单元' },
        { mark: 10, label: '10单元' },
        { mark: 11, label: '11单元' },
        { mark: 12, label: '12单元' },
        { mark: 13, label: '13单元' },
        { mark: 14, label: '14单元' },
        { mark: 15, label: '15单元' },
        { mark: 16, label: '16单元' },
        { mark: 17, label: '17单元' },
        { mark: 18, label: '18单元' },
        { mark: 19, label: '19单元' },
        { mark: 20, label: '20单元' },
        { mark: 21, label: '21单元' },
        { mark: 22, label: '22单元' },
        { mark: 23, label: '23单元' },
        { mark: 24, label: '24单元' },
        { mark: 25, label: '25单元' },
      ],

      // 题库
      librarySelected: '系统题库',

      // 教材
      paperrangeSelected: '苏少版',

      // 年级
      gradeSelected: '年级',

      // 学期
      semesterSelected: '学期',

      // 单元
      unitSelected: [],
      m_unit: '单元',
      // 侧边类别
      categoryInfos: {},
      // 试题详情dialog
      detailDialogVisible: false,

      // 所有提交信息
      allRequestInfos: {},

      // main区域渲染数据
      mainContent: [],

      // content当前选择的id
      currentId: '',

      // 分页信息
      currentPage: 1,
      pageSize: 0,
      totalNum: 0,

      //
    }
  },
  created() {
    // console.log("storeinnerids", this.instrumentids);
    // 判断当前类型
    if (this.categoryType && this.categoryType == 1) {
      // 音乐类
      this.categoryInfos = this.musicInfos
    } else if (this.categoryType && this.categoryType == 2) {
      // 美术类
      this.categoryInfos = this.artInfos
    }

    // console.log("category", this.categoryInfos);

    // 初始化allRequestInfos
    this.allRequestInfos = {
      stype: this.categoryType,
      question_type: this.testType,
      source: 1,
      paper_range: 1,
      ...this.aboutInstrument,
    }

    // 从store拿值   小乐器id
    this.allRequestInfos.instrument_qid = this.instrumentids

    // 初始发送请求
    $aixos
      .post('/examinationPaper/favoriteQuesion', this.allRequestInfos)
      .then((res) => {
        // console.log("allrequest", this.allRequestInfos);
        // console.log("shoudongres", res);
        if (res.code == 0) {
          this.mainContent = res.data.data
          console.log('contentinfos', res.data)
          // 分页信息
          this.currentPage = res.data.page
          this.pageSize = res.data.pageSize
          this.totalNum = res.data.total

          // 内容区域的当前默认id为第一个

          console.log(
            'pageinfos',
            this.currentPage,
            this.pageSize,
            this.totalNum
          )
        }
      })
  },
  watch: {
    mainContent: function(newV, oldV) {
      // 切换当前contentid的值

      this.currentId = (newV[0].id && newV[0].id) || ''
      this.$store.commit('manualSelectInfos/setSelectedItemId', this.currentId)
      // console.log("maincontentChange", this.currentId);
    },
    immediate: true,
  },
  methods: {
    // 试题详情
    testDetail(item, i) {
      this.$store
        .dispatch('testlibrary/getQuestionAnalyzeList', {
          question_id: item.id,
        })
        .then((res) => {
          if (res.code === 0) {
            this.questionAnalyzeList = res.data
            // 当前选择试题 item
            this.dialog_item = item
            //  显示dialog
            this.detailDialogVisible = true
            // console.log(i)
            this.question_index = i
            // console.log(this.libDatas)
            // console.log(this.dialog_item)
            console.log(this.questionAnalyzeList)
            // console.log(res.data.cate_name)
            // console.log(res.data.cate_name.length)
          }
        })
    },

    showItem(infos) {
      console.log('infos', infos)
    },

    // 题库选择
    libChange(val) {
      const m_mark = this.findMark(this.fromOptions, val)
      this.allRequestInfos.source = m_mark
    },

    // 教材选择
    paperRangeChange(val) {
      const m_mark = this.findMark(this.paperRangeOptions, val)
      this.allRequestInfos.paper_range = m_mark
    },

    // 年级选择
    gradeChange(val) {
      const m_mark = this.findMark(this.gradeOptions, val)
      console.log('grade', m_mark)
      this.allRequestInfos.grade = m_mark
    },

    // 学期选择
    semesterChange(val) {
      const m_mark = this.findMark(this.gradeOpsemesterOptionstions, val)
      this.allRequestInfos.semester = m_mark
    },

    // 单元多选
    unitChange(item) {
      // 动态修改样式

      if (item.length > 0) {
        document.getElementsByClassName('el-input__inner')[4].placeholder =
          '单元'
      }

      // 逗号拼字符串
      let newList = item.map((item) => {
        return item.split('', 1)[0]
      })
      newList = newList.join(',')
      this.allRequestInfos.unit = newList
    },

    // 关键字搜素
    keywordChange(val) {
      this.allRequestInfos.keyword = val
    },

    // 点击全部
    clickAll() {
      console.log('checkAllrequest', this.allRequestInfos)
      $aixos
        .post('/examinationPaper/favoriteQuesion', this.allRequestInfos)
        .then((res) => {
          // console.log("allrequest", this.allRequestInfos);
          // console.log("shoudongres", res);
          if (res.code == 0) {
            this.mainContent = res.data.data
          }
        })
    },

    // 题目单选
    changeItem(item) {
      // console.log("item.id", item.id);
      // 当前选择的id

      this.currentId = item.id
      console.log('单选换了id', this.currentId)
      // 换的时候传store ,   watch里面也要传值
      this.$store.commit('manualSelectInfos/setSelectedItemId', this.currentId)
    },

    // 点击得到左侧cid
    getCid(val) {
      // console.log("cid", val);
      this.allRequestInfos.cid = val.cid
      // 发送网络请求
      $aixos
        .post('/examinationPaper/favoriteQuesion', this.allRequestInfos)
        .then((res) => {
          console.log('allrequest', this.allRequestInfos)
          console.log('shoudongres', res)
          if (res.code == 0) {
            this.mainContent = res.data.data
          }
        })
    },

    // 分页选择
    handleCurrentChange(val) {
      // 添加分页属性
      this.allRequestInfos.page = val
      $aixos
        .post('/examinationPaper/favoriteQuesion', this.allRequestInfos)
        .then((res) => {
          console.log('allrequest', this.allRequestInfos)
          console.log('shoudongres', res)
          if (res.code == 0) {
            this.mainContent = res.data.data
          }
        })
    },

    // function for find mark
    findMark(infos, val) {
      let mark
      infos.forEach((item) => {
        if (item.label == val) {
          mark = item.mark
        }
        // mark = item.label == val && item.mark;
      })

      return mark
    },
    btnClick() {},
    isfavorite() {},
    open() {},
  },
  computed: {
    ...mapGetters([
      'artInfos',
      'musicInfos',
      'instrumentids',
      'manualSelectedId',
    ]),
    // ...mapGetters(["artInfos", "musicInfos"]),
  },
}
</script>
<style lang="scss">
@import '../../../../style/variable.scss';
.manualChangeContent {
  // overflow: hidden;
  padding-left: 1.5rem;
  padding-bottom: 0.875rem;
  padding-right: 1.5rem;
  height: 32.625rem;
  .questiontype-preview {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .el-header {
    height: 3.25rem !important;
  }

  .el-container {
    height: 28.4375rem;
    .el-header {
      padding: 0;
      .header {
        height: 3.75rem;
        justify-content: space-between;
        padding: 0;
        background-color: #ffffff;

        .selectItem {
          display: flex;
          align-items: center;
          width: 55rem;
          //   background-color: turquoise;

          // .el-select {
          //   width: 7.375rem;
          //   height: 2rem;
          //   .el-input__inner {
          //     height: 2rem;
          //     line-height: 2rem;
          //   }
          // }
          // .el-select .el-input .el-select__caret {
          //   line-height: 2rem;
          // }

          // .el-popper {
          //   margin-top: 0;
          //   .popper__arrow {
          //     display: none;
          //   }
          //   .poper_arrow::after {
          //     display: none;
          //   }
          // }

          // .el-select-dropdown__list {
          //   padding: 0;
          // }

          .first_select {
            @include for_el_select(7.375rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .paperrange_select {
            @include for_el_select(5.8125rem, 2rem);
            margin-left: 0.75rem;
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .grade_select {
            margin-left: 0.75rem;
            @include for_el_select(5.8125rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .semester_select {
            margin-left: 0.75rem;
            @include for_el_select(5.8125rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .unit_select {
            margin-left: 0.75rem;
            @include for_el_select(5.8125rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
            .el-input__inner::placeholder {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
            .el-select__tags > span {
              display: none;
            }
            .el-input__inner {
              height: 2rem !important;
              // line-height: 2rem;
            }
          }

          .keyword_input {
            margin-left: 1.375rem;
            .el-input__inner {
              width: 12.9375rem;
              height: 2rem;
              line-height: 2rem;
            }

            .el-button {
              width: 6.25rem;
              height: 2rem;
              line-height: 0;
              span {
                line-height: 0;

                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }

  .point {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #303133;
    margin-top: 0;
  }

  // 分类
  .manual_category {
    height: 28.4375rem;
    background-color: #f5f8ff;

    .el-menu {
      background-color: #f5f8ff;
    }
    & > ul > li > .el-submenu__title {
      height: 2rem;
      line-height: 2rem;
      padding-left: 0.75rem !important;
      // background-color: transparent;
      span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #303133;
      }
    }

    & > ul > li > ul > li > .el-submenu__title {
      height: 2rem;
      line-height: 2rem;
      padding-left: 1.5625rem !important;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      // background-color: transparent;
      span {
      }
    }

    .el-submenu .el-menu-item {
      height: 1.5rem;
      line-height: 1.5rem;
      padding-left: 2.1875rem !important;
      background-color: transparent;
      min-width: 6.25rem;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }

    .el-menu-item is-active {
      background-color: #409eff;
    }
  }

  // main-content
  .content_title {
    height: 2.625rem;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
    .choose {
      margin-left: 1.9375rem;
    }
    .testId {
      margin-left: 7.5rem;
    }
    .testName {
      margin-left: 12.5625rem;
    }
  }

  .main_content {
    .contentSelect {
      height: 2rem;
      margin-left: 2.375rem;

      .el-radio {
        // width: 55rem;

        height: 1.875rem;
        display: flex;
        align-items: center;
        .itemContainer {
          width: 51.5rem;
        }

        // 提高勾选层级
        .el-radio__input {
          position: relative;
          z-index: 11111;
        }
      }
      .el-radio__label {
        display: flex;
        padding-left: 0;
        span {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
        }
      }
      .el-radio__inner {
        border-radius: 0;
      }

      .el-radio,
      .el-radio__input {
        line-height: 0;
      }
    }
    .contentId {
      // background-color: violet;
      margin-left: 8.125rem;
      width: 50rem;

      .span2 {
        margin-left: 10.5rem;
      }
    }
    .contentName {
      margin-left: 10.5rem;
    }
  }

  //

  .el-aside {
    padding-right: 0.625rem;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .el-main {
    padding: 0;
    background-color: #f5f8ff;
  }
}
</style>
