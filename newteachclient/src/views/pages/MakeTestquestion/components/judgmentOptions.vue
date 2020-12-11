<template>
  <div class="judgment-options-container">
    <div class="leftTitle">选 项 :</div>
    <div class="rightBox">
      <div class="rightBoxItem" v-for="(item, i) in judgmentList" :key="i">
        <div class="rightBox-header">
          <span>{{ item.options }}.</span>
          <el-input
            v-show="item.options === 'A'"
            class="elInput"
            type="text"
            placeholder="正确"
            :disabled="true"
          />
          <el-input
            v-show="item.options === 'B'"
            class="elInput"
            type="text"
            placeholder="错误"
            :disabled="true"
          />
        </div>
        <div class="rightBox-body">
          <el-radio-group v-model="judgmentradio" @change="judgmentradioChange">
            <el-radio :label="i" :key="item.content">{{
              item.checked
            }}</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'judgmentOptions',
  data() {
    return {
      judgmentradio: 0,
      // 判断list
      judgmentList: [
        {
          // 选项
          options: 'A',
          checked: '设置为正确答案',
          content: '',
        },
        {
          // 选项
          options: 'B',
          checked: '设置为正确答案',
          content: '',
        },
      ],
    }
  },
  methods: {
    judgmentradioChange(val) {
      this.$store.commit('makeTestquestion/set_judgmentradioChangeVal', val)
    },
  },
}
</script>

<style lang="scss" scoped>
.judgment-options-container {
  position: relative;
  .leftTitle {
    position: absolute;
    left: 0;
    top: 13px;
  }
  .rightBox {
    margin-left: 63px;
    display: flex;

    .rightBoxItem {
      margin-right: 39px;
      .rightBox-header {
        display: flex;
        span {
          width: 11px;
          height: 10px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #409eff;
          line-height: 41px;
          margin-right: 12px;
        }
        .el-input.is-disabled {
          .el-input__inner {
            background-color: #fff;
            border-color: #fff;
            color: #c0c4cc;
          }
        }
        .elInput {
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
      .rightBox-body {
        margin-top: 20px;
        margin-left: 210px;
      }
    }
  }
}
</style>
