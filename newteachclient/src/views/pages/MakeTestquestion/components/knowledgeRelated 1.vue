<template>
  <div class="knowledge-related-container">
    <div class="leftTitle">知识相关 :</div>
    <div class="rightBoxs">
      <div class="cascader">
        <el-cascader-panel
          v-model="value"
          :options="knowledgeList"
          :props="prop"
          @change="handleChange"
          collapse-tags
        ></el-cascader-panel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'knowledgeRelated',
  data() {
    return {
      value: [],
      prop: {
        expandTrigger: 'click',
        multiple: true,
        emitPath: false,
        value: 'parents',
        label: 'parents',
        children: 'children',
      },
    }
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
    knowledgeList: {
      type: Array,
    },
  },
  methods: {
    handleChange() {},
  },
  mounted() {},
}
</script>

<style lang="scss">
.knowledge-related-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 6px;
  }

  .cascader {
    position: relative;
    width: 1368px;
    height: 32px;
    background: #ffffff;
    border-radius: 6px;
    margin-left: 62px;
    margin-top: 15px;
    .el-scrollbar:nth-child(1) {
      width: 1368px;
      height: 32px;
      ul {
        display: flex;
        li {
          flex: 1;
        }
      }
    }
    .el-scrollbar:nth-child(2) {
      position: absolute;
      top: 43px;
      left: 0;
      height: 35px;
      width: 1368px;
      background-color: #fff;
      ul {
        display: flex;
        li {
          flex: 1;
        }
      }
    }
    .el-scrollbar:nth-child(3) {
    }
  }
  .cascaderHeader {
    height: 100%;
    width: 100%;
    display: flex;

    .cascaderHeaderItem {
      height: 100%;
      line-height: 32px;
      text-align: center;
      flex: 1;
      border: 1px solid #ccc;
    }
  }
}
</style>
