<template>
  <div class="questType">
    <div class="wrap_flex_normal">
      <div class="title_style wrap_flex_allcenter">
        <span>{{ title }}:</span>
      </div>

      <div class="addOne">
        <!-- title -->
        <div class="c_title wrap_flex_normal">
          <span class="span11">题型</span>
          <span>数量</span>
          <span>分值</span>
          <span>合计</span>
          <span class="span5">操作</span>
        </div>
        <!-- 选择框 第一个下拉-->
        <div
          class="second_row wrap_flex_center"
          v-for="(item, i) in paperTypes"
          :key="i + 'A'"
        >
          <div class="m_dropdown">
            <el-select
              v-model="value"
              :popper-append-to-body="false"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 数量 -->
          <div class="amount">
            <el-input v-model="amount" placeholder="请输入内容"></el-input>
          </div>

          <!-- 分值 -->
          <div class="score">
            <el-input v-model="score" placeholder="请输入内容"></el-input>
          </div>
          <!-- 总共 -->
          <div class="total">
            <el-input v-model="total" placeholder="请输入内容"></el-input>
          </div>
          <span class="deleteItem" @click="deleteTest(item, i)"></span>
        </div>
        <!-- 添加按钮 -->
        <div class="addButton wrap_flex_allcenter" @click="addTest">
          <span>添加题型</span>
        </div>
      </div>
    </div>

    <!-- 弹窗提示 -->
    <div class="atleast">
      <el-dialog title="提示" :visible.sync="atleast_dialogVisible" width="20%">
        <span>至少保留一项</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="atleast_dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      options: [{ value: 1, label: "one" }],
      // allQuestTypes : [{type:1,label:'音乐题型'},{type:2,label:'美术题型'},{}]
      // allExams: [{}],
      paperTypes: [{ papertype: "", number: "", score: "", total: "" }],

      // 至少保留一项
      atleast_dialogVisible: false,
    };
  },
  methods: {
    // 添加题型
    addTest() {
      this.paperTypes.push({});
    },
    deleteTest(item, i) {
      if (this.paperTypes.length == 1) {
        // 弹窗提示
        this.atleast_dialogVisible = true;
      } else {
        this.paperTypes.splice(i, 1);
      }
    },
  },
};
</script>
<style lang="scss" >
.questType {
  .title_style {
    width: 3.25rem;
    span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }
  .addOne {
    width: 97.5rem;
    // height: 8.875rem;
    background-color: #ffffff;
    margin-left: 0.6875rem;

    .c_title {
      align-items: center;
      border-bottom: 1px solid #eaeef9;
      height: 2.0625rem;
      span {
        margin-left: 20.5625rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .span11 {
        margin-left: 12.5625rem;
        // vertical-align: baseline;
      }
      .span5 {
        margin-left: 11.8125rem;
      }
    }
  }
  .second_row {
    margin-top: 1rem;
    .m_dropdown {
      width: 18.75rem;
      height: 2rem;
      border-radius: 0.375rem;
      // border: 1px solid #dcdfe6;
      margin-left: 3.9375rem;
      .el-dropdown {
        width: 18.75rem;
        height: 2rem;
        display: flex;
        align-items: center;
        span {
          margin-left: 0.75rem;

          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
        i {
          margin-left: 13rem;
        }
      }

      .el-icon-arrow-down:before {
        color: gray;
      }

      .el-popper {
        margin-top: -0.125rem !important;
        height: 2rem;
        // box-shadow: none;
        .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
          background-color: #ffffff;
        }
        .el-select-dropdown__list {
          padding: 0;
        }
      }

      .el-input {
        width: 18.75rem;
        height: 2rem;
      }
      .el-select__caret {
        line-height: 2rem;
      }
      .el-select-dropdown {
        margin-top: 0 !important;
      }
      .popper__arrow {
        display: none;
      }
    }

    .amount {
      width: 18.75rem;
      height: 2rem;
      margin-left: 3.3125rem;
    }
    .score {
      width: 18.75rem;
      height: 2rem;
      margin-left: 3.3125rem;
    }
    .total {
      width: 18.75rem;
      height: 2rem;
      margin-left: 3.3125rem;
    }
    .deleteItem {
      width: 1rem;
      height: 1rem;
      background-image: url("../../../../assets/imgs/makeTestPaper/trashcan.png");
      background-repeat: no-repeat;
      background-size: 1rem 1rem;
      margin-left: 3.5625rem;
    }
  }

  .addButton {
    width: 6.25rem;
    height: 2rem;
    background-color: #409eff;
    margin-top: 1.0625rem;
    margin-left: 4rem;
    margin-bottom: 0.6875rem;
    border-radius: 0.375rem;
    cursor: pointer;
    span {
      // width: 6.25rem;
      // height: 2rem;
      // background-color: #409eff;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
  .el-input__inner {
    height: 32px;
  }
}
</style>