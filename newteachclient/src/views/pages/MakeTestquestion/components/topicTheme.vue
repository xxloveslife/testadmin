<template>
  <div class="topic-theme-container">
    <!-- 单多选选项组件 -->
    <div class="option-components-box">
      <div
        class="leftTitle"
        v-if="radioDefault === '单项选择题' || radioDefault === '多项选择题'"
      >
        选 项 :
      </div>
      <option-components
        v-if="radioDefault === '单项选择题' || radioDefault === '多项选择题'"
        :singleChoiceList="singleChoiceList"
        :changeRadioVal="changeRadioVal"
        :testQuestionlists="testQuestionlists"
        :radioDefault="radioDefault"
      ></option-components>
    </div>
    <!-- 判断选项 -->
    <judgment-options v-if="radioDefault === '判断题'"></judgment-options>
    <!-- 连线题 -->
    <connection-question
      v-if="radioDefault === '连线题'"
      :changeRadioVal="changeRadioVal"
      :testQuestionlists="testQuestionlists"
      :radioDefault="radioDefault"
      :singleChoiceList="singleChoiceList"
      :singleChoiceList1="singleChoiceList1"
    ></connection-question>
    <!-- 图片组件 -->
    <upload-image
      :radioDefault="radioDefault"
      :changeRadioVal="changeRadioVal"
      :testQuestionlists="testQuestionlists"
    ></upload-image>
    <!-- 音乐文件 -->
    <upload-music
      v-if="changeRadioVal === '音乐'"
      :testQuestionlists="testQuestionlists"
    ></upload-music>
    <!-- 知识相关 -->
    <knowledge-related
      :changeRadioVal="changeRadioVal"
      :testQuestionlists="testQuestionlists"
      :radioDefault="radioDefault"
      :knowledgeList="knowledgeList"
    ></knowledge-related>
  </div>
</template>

<script>
import optionComponents from './optionComponents'
import uploadImage from './uploadImage'
import uploadMusic from './uploadMusic'
import judgmentOptions from './judgmentOptions'
import connectionQuestion from './connectionQuestion'
import knowledgeRelated from './knowledgeRelated'

export default {
  name: 'topicTheme',
  data() {
    return {}
  },
  props: {
    singleChoiceList: {
      type: Array,
    },
    singleChoiceList1: {
      type: Array,
    },
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 题型选择值
    radioDefault: {
      type: String,
    },
    // 试题list,给后台
    testQuestionlists: {
      type: Object,
    },
    knowledgeList: {
      type: Array,
    },
  },
  components: {
    optionComponents,
    uploadImage,
    uploadMusic,
    judgmentOptions,
    connectionQuestion,
    knowledgeRelated,
  },
  mounted() {
    console.log(this.changeRadioVal)
  },
}
</script>

<style lang="scss" scoped>
.option-components-box {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 10px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
}
</style>
