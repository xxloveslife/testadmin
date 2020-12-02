<template>
  <div class="connection-question-container">
    <div class="headerBox">
      <div class="leftTitle">第一列 :</div>
      <option-components
        class="optionBox"
        :changeRadioVal="changeRadioVal"
        :testQuestionlists="testQuestionlists"
        :radioDefault="radioDefault"
      ></option-components>
    </div>
    <div class="footerBox">
      <div class="bodyTitle">第二列 :</div>
      <option-components
        class="optionBox"
        :changeRadioVal="changeRadioVal"
        :testQuestionlists="testQuestionlists"
        :radioDefault="radioDefault"
      ></option-components>
    </div>
    <div class="footerBox">
      <div class="footer">答 案 :</div>
      <el-input
        class="elInput"
        type="text"
        placeholder="填写格式，如：1-2 , 2-2 , 3-3"
      />
    </div>
  </div>
</template>
<script>
import optionComponents from './optionComponents'
export default {
  name: 'connectionQuestion',
  components: {
    optionComponents,
  },
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
}
</script>

<style lang="scss" scoped>
.connection-question-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }
  .bodyTitle {
    float: left;
    margin-top: 10px;
  }
  .footerBox {
    position: relative;
    margin-top: 31px;
  }
  .optionBox {
    margin-left: 10px;
  }
  .elInput {
    position: absolute;
    top: -10px;
    left: 55px;
    width: 316px;
    background: #ffffff;
    border-radius: 6px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    line-height: 41px;
    margin-right: 5px;
  }
}
</style>
