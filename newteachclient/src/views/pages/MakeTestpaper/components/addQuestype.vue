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
        <div class="second_row">
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
        </div>
        <!-- 添加按钮 -->
        <div></div>
      </div>
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
  date() {
    return {
      options: [{ value: 1, label: "one" }],
      // allQuestTypes : [{type:1,label:'音乐题型'},{type:2,label:'美术题型'},{}]
      allExams: [{}],
    };
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
    height: 8.875rem;
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
  }
}

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
  }

  .el-input {
    width: 18.75rem;
    height: 2rem;
  }
  .el-select__caret {
    line-height: 2rem;
  }
  .el-select-dropdown {
    margin-top: 0.4375rem !important;
  }
  .popper__arrow {
    display: none;
  }
}
</style>