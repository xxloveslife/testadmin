<template>
  <div class="questiontyp-preview-container" v-if="dialogVisible">
    <div class="questiontyp-preview-container-header">
      <i class="el-icon-error" @click="$emit('close')"></i>
      <span class="spanText">ID:{{ questiontypeList.id }}</span>
      <!-- 收藏分享组件 -->

      <div class="icon-box">
        <favorite-sharing
          :is_sys="is_sys"
          :questiontypeList="questiontypeList"
          :currentLib="currentLib"
          :question_index="question_index"
          @isfavorite="isfavorite"
          @isshare="isshare"
        ></favorite-sharing>
        <!-- 纠错 -->
        <i class="errorCorrection" @click="errorCorrectionClc" title="纠错"></i>
      </div>
    </div>
    <span
      class="btn-left"
      v-if="question_index !== 0"
      @click="btnLeftClick"
    ></span>
    <span
      class="btn-right"
      v-if="question_index !== libDatas.length - 1"
      @click="btnRightClick"
    ></span>
    <div class="questiontyp-preview-container-auto">
      <div class="subject">
        <!-- 题目以及题目图片 -->
        <title-box :questiontypeList="questiontypeList"></title-box>
        <!-- 节奏题，演唱题 -->
        <rhythm-question
          v-if="
            questionAnalyzeList.type_name === '节奏题' ||
              questionAnalyzeList.type_name === '演唱题'
          "
          :questionAnalyzeList="questionAnalyzeList"
        ></rhythm-question>
        <!-- 单选多选判断 -->
        <music-radio
          v-if="
            questionAnalyzeList.type_name === '单项选择题' ||
              questionAnalyzeList.type_name === '多项选择题' ||
              questionAnalyzeList.type_name === '判断题'
          "
          :questiontypeList="questiontypeList"
        ></music-radio>
        <!-- 连线题 -->
        <connection-question
          v-if="questionAnalyzeList.type_name === '连线题'"
          :questionAnalyzeList="questionAnalyzeList"
        ></connection-question>
        <!-- 排序题 -->
        <sorting-questions
          v-if="questionAnalyzeList.type_name === '排序题'"
          :questionAnalyzeList="questionAnalyzeList"
          :questiontypeList="questiontypeList"
        ></sorting-questions>
        <!-- 填空题 -->
        <div
          class="fillinTheBlank"
          v-if="questionAnalyzeList.type_name === '填空题'"
        >
          <div
            v-for="(item, i) in questiontypeList.answer.options"
            :key="i"
            class="fillinTheBlank-item"
          >
            <span>{{ i + 1 }}. </span>
            <span> {{ item.text }}</span>
          </div>
        </div>
        <!-- 拼图题 -->
        <div
          v-if="questionAnalyzeList.type_name === '拼图题'"
          class="puzzle-question"
        >
          <div
            class="puzzle-question-box"
            :style="{
              backgroundImage:
                'url(' + questiontypeList.answer.pt_art_pic + ')',
            }"
          ></div>
        </div>
        <!-- 填色题 -->
        <coloring-questions
          v-if="questionAnalyzeList.type_name === '填色题'"
          :questionAnalyzeList="questionAnalyzeList"
          :questiontypeList="questiontypeList"
        ></coloring-questions>
        <!-- 配色题 -->
        <color-question
          v-if="questionAnalyzeList.type_name === '配色题'"
          :questionAnalyzeList="questionAnalyzeList"
          :questiontypeList="questiontypeList"
        ></color-question>
        <!-- 点线题 -->
        <dot-andline
          v-show="questionAnalyzeList.type_name === '点线题'"
          :questionAnalyzeList="questionAnalyzeList"
          :questiontypeList="questiontypeList"
        >
        </dot-andline>
      </div>

      <div class="questionAnalysis">
        <p class="question-analysis">试题解析</p>
        <div
          class="analysis"
          v-if="
            questiontypeList.answer.correct &&
              questionAnalyzeList.type_name !== '排序题' &&
              questionAnalyzeList.type_name !== '填空题' &&
              questionAnalyzeList.type_name !== '拼图题' &&
              questionAnalyzeList.type_name !== '填色题' &&
              questionAnalyzeList.type_name !== '配色题' &&
              questionAnalyzeList.type_name !== '点线题'
          "
        >
          <span class="analysis-title">【答案】</span>
          <p
            class="analysis-text"
            v-if="questionAnalyzeList.type_name === '连线题'"
          >
            <span v-for="(item, i) in questionAnalyzeList.answer" :key="i"
              >{{ item }},</span
            >
          </p>
          <p class="analysis-text" v-else>
            <span
              v-for="(item, i) in questiontypeList.answer.correct"
              :key="i"
              >{{ options[item] }}</span
            >
          </p>
        </div>
        <div class="analysis">
          <span class="analysis-title">【解析】</span>
          <p class="analysis-text">
            {{ questiontypeList.answer_parse }}
          </p>
        </div>
        <div class="analysis" v-if="questionAnalyzeList.cate_name.length !== 0">
          <span class="analysis-title">【知识点】</span>
          <p class="analysis-text">
            <span v-for="(item, i) in questionAnalyzeList.cate_name" :key="i"
              >{{ item }}、</span
            >
          </p>
        </div>
        <div class="analysis">
          <span class="analysis-title">【难易程度】</span>
          <p class="analysis-text">
            <span>{{ questionAnalyzeList.difficult }}</span>
          </p>
        </div>
        <div class="analysis">
          <span class="analysis-title">【能力层次】</span>
          <p class="analysis-text">
            <span>{{ questionAnalyzeList.request }}</span>
          </p>
        </div>
        <div class="analysis">
          <span class="analysis-title">【题型】</span>
          <p class="analysis-text">
            <span>{{ questionAnalyzeList.type_name }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 纠错框 -->
    <error-correction
      :questiontypeList="questiontypeList"
      class="error-correction"
      @close="errorCorrectionStatus = false"
      :errorCorrectionStatus="errorCorrectionStatus"
    ></error-correction>
  </div>
</template>

<script>
// 收藏分享
import favoriteSharing from './components/favoriteSharing'
import titleBox from './components/titleBox'
import rhythmQuestion from './components/rhythmQuestion'
import musicRadio from './components/musicRadio'
import connectionQuestion from './components/connectionQuestion'
import sortingQuestions from './components/sortingQuestions'
import coloringQuestions from './components/coloringQuestions'
import colorQuestion from './components/colorQuestion'
import dotAndline from './components/dotAndline'
// 纠错
import errorCorrection from './components/errorCorrection'

export default {
  name: 'questiontypePreview',
  data() {
    return {
      errorCorrectionStatus: false,

      options: ['A', 'B', 'C', 'D', 'E'],
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
    },
    // 列表
    questiontypeList: {
      type: Object,
    },
    // 题库类型
    currentLib: {
      type: String,
    },
    // 传入地址
    incomingAddress: {
      type: Number,
    },
    questionAnalyzeList: {
      type: Object,
    },
    question_index: {
      type: Number,
    },
    libDatas: {
      type: Array,
    },
    is_sys: {
      type: Number,
    },
  },
  components: {
    titleBox,
    musicRadio,
    rhythmQuestion,
    connectionQuestion,
    sortingQuestions,
    coloringQuestions,
    colorQuestion,
    dotAndline,
    errorCorrection,
    favoriteSharing,
  },
  methods: {
    btnLeftClick() {
      console.log(this.question_index - 1)
      this.$emit('btnClick', this.question_index - 1)
    },
    btnRightClick() {
      this.$emit('btnClick', this.question_index + 1)
    },
    // 纠错
    errorCorrectionClc() {
      console.log('纠错')
      console.log(this.questiontypeList.id)
      this.errorCorrectionStatus = true
    },
    isfavorite(val, val1) {
      console.log(val, val1)
      this.$emit('isfavorite', val, val1)
    },
    isshare(val, val1) {
      this.$emit('isshare', val, val1)
    },
  },
}
</script>

<style lang="scss" scoped>
.questiontyp-preview-container {
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  height: 40rem;
  width: 68rem;
  background-color: #fff;
  border-radius: 8px;
  padding: 4.625rem 0 2.1875rem;
  .error-correction {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .btn-left {
    z-index: 1000;
    position: absolute;
    left: 40px;
    top: 35%;
    display: inline-block;
    width: 12px;
    height: 22px;
    background-image: url('../../../assets/imgs/testquestlibrary/previous.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .btn-left:hover {
    background-image: url('../../../assets/imgs/testquestlibrary/previoushover.png');
  }
  .btn-right {
    z-index: 1000;
    position: absolute;
    right: 40px;
    top: 35%;
    display: inline-block;
    width: 12px;
    height: 22px;
    background-image: url('../../../assets/imgs/testquestlibrary/next.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .btn-right:hover {
    background-image: url('../../../assets/imgs/testquestlibrary/nexthover.png');
  }
  .questiontyp-preview-container-auto {
    height: 570px;
    overflow: auto;
  }
  .questiontyp-preview-container-header {
    z-index: 999;
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    height: 4.5625rem;
    top: 0;
    left: 0;
    padding: 2.1875rem 1.625rem 0;
    border-bottom: 1px solid #ebeef5;
    .el-icon-error {
      position: absolute;
      top: 9px;
      right: 9px;
      font-size: 20px;
      color: #c0c4cc;
    }
    .el-icon-error:hover {
      color: #f56c6c;
    }
    .spanText {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .icon-box {
      i {
        display: inline-block;
        height: 1.3125rem;
        width: 1.3125rem;
        margin-left: 0.5rem;
      }

      // 纠错
      .errorCorrection {
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/errorCorrection.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
      }
      .errorCorrection:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/errorCorrectionHover.png');
      }
    }
  }
  .subject {
    border-bottom: 1px solid #ebeef5;
    padding: 1.25rem 0 0;
  }
  .fillinTheBlank {
    font-size: 0.875rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #64666a;
    text-align: center;
    .fillinTheBlank-item {
      margin-bottom: 10px;
    }
  }
  .puzzle-question {
    position: relative;
    margin: 0 auto 20px;
    width: 32.4375rem;
    height: 16.6875rem;
    // background: red;
    border: 1px solid #ebeef5;
    .puzzle-question-box {
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  .questionAnalysis {
    padding: 20px 25px;
    .question-analysis {
      margin-bottom: 10px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
    .analysis {
      .analysis-title {
        position: relative;
        left: -8px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .analysis-text {
        margin: 10px 0;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #64666a;
      }
    }
  }
}
</style>
