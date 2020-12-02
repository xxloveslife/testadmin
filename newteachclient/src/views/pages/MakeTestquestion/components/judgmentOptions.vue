<template>
  <div class="judgment-options-container">
    <div class="leftTitle">选 项 :</div>
    <div class="rightBox">
      <div class="rightBoxItem" v-for="(item, i) in judgmentList" :key="i">
        <div class="rightBox-header">
          <span>{{ item.options }}.</span>
          <el-input class="elInput" type="text" placeholder="请输入选项内容" />
        </div>
        <div class="rightBox-body">
          <el-checkbox-group v-model="item.content">
            <el-checkbox :label="item.content" :key="item.content">{{
              item.checked
            }}</el-checkbox>
          </el-checkbox-group>
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
        {
          // 选项
          options: 'C',
          checked: '设置为正确答案',
          content: '',
        },
        {
          // 选项
          options: 'D',
          checked: '设置为正确答案',
          content: '',
        },
      ],
    }
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
    align-items: center;
    justify-content: center;
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
