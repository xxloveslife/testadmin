<template>
  <div class="knowledge-related-container">
    <div class="leftTitle">知识相关 :</div>
    <div class="rightBoxs">
      <div class="cascader">
        <ul class="cascaderHeader">
          <li
            class="cascaderHeaderItem"
            v-for="(item, i) in knowledgeList"
            :key="i"
          >
            <span class="iconBox">
              <i class="el-icon-check"></i>
            </span>
            <span @click="clickCascaderHeaderItem(item, i)">{{
              item.parents
            }}</span>
          </li>
        </ul>
      </div>
      <div class="cascaderBody">
        <div>
          <ul class="cascaderBodyHeader">
            <li
              class="cascaderBodyTop"
              v-for="(item, i) in secondKnowledgeList"
              :key="i"
            >
              {{ item.parents }}
            </li>
            <div class="cascaderBodyBt">
              <div
                class="cascaderBody1"
                v-for="(item1, index) in secondKnowledgeList"
                :key="index"
              >
                <ul>
                  <li v-for="(item2, index2) in item1.children" :key="index2">
                    {{ item2.parents }}
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'knowledgeRelated',
  data() {
    return {
      cascaderHeaderRadio: false,
      value: [],
      // 二级数据
      secondKnowledgeList: [],
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
    // 一级数据
    knowledgeList: {
      type: Array,
    },
  },
  methods: {
    clickCascaderHeaderItem(item, i) {
      console.log(item, i)
      this.secondKnowledgeList = item.children
      console.log(this.secondKnowledgeList)
    },
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
  }
  .cascaderHeader {
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
    .cascaderHeaderItem {
      height: 100%;
      line-height: 32px;
      text-align: center;
      flex: 1;
      border-radius: 6px;
      .iconBox {
        position: relative;
        top: 8px;
        display: inline-block;
        margin-right: 7px;
        width: 16px;
        height: 16px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        i {
          position: relative;
          top: -8px;
        }
      }
    }
    .chooseCascaderHeaderItem {
      background: #409eff;
      color: #ffffff;
    }
  }
  .cascaderBody {
    position: relative;
    margin-left: 62px;
    margin-top: 11px;
    width: 1368px;
    height: 331px;
    background: #ffffff;
    border-radius: 6px;
    .cascaderBodyHeader {
      height: 35px;
      width: 100%;
      display: flex;
      text-align: center;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      .cascaderBodyTop {
        height: 35px;
        border-bottom: 1px solid #eaeef9;
        line-height: 35px;
        height: 100%;
        flex: 1;
        font-size: 14px;
      }
    }
    .cascaderBodyBt {
      width: 1368px;
      position: absolute;
      margin-top: 36px;
      height: 294px;
      display: flex;
      .cascaderBody1 {
        flex: 1;
      }
    }
  }
}
</style>
