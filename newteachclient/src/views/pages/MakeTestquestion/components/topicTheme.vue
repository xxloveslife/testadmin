<template>
  <div class="topic-theme-container">
    <!-- 单选选项组件 -->
    <option-components
      v-if="radioDefault === '单项选择题'"
      :changeRadioVal="changeRadioVal"
      :testQuestionlists="testQuestionlists"
    ></option-components>
  </div>
</template>

<script>
import optionComponents from './optionComponents'
export default {
  name: 'topicTheme',
  props: {
    // 类型选择值
    changeRadioVal: {
      type: String,
    },
    // 题型选择值
    radioDefault: {
      type: String,
    },
    // 试题list
    testQuestionlists: {
      type: Object,
    },
  },
  components: {
    optionComponents,
  },
}
</script>

<style lang="scss" scoped></style>
