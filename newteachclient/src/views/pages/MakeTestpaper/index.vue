<template>
  <div class="makeTestPaper">
    <!-- 试卷类型 -->
    <div class="testType wrap_flex_normal">
      <span class="span1">试题类型:</span>
      <div class="multiSelect">
        <el-checkbox-group v-model="checkItems">
          <el-checkbox-button v-for="item in items" :label="item" :key="item">{{
            item
          }}</el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 选择教材 -->
    <div class="select_item wrap_flex_normal">
      <span class="span1">选择教材:</span>
      <div class="m_radiobox no_copy">
        <el-radio-group v-model="radio">
          <el-radio-button v-for="item in infos" :key="item" :label="item">
            {{ item }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <!-- 试卷名称 -->
    <div class="paper_name wrap_flex_normal">
      <span class="span1"> 试卷名称: </span>
      <div class="m_input">
        <el-input v-model="input" placeholder="请输入题目内容"></el-input>
      </div>
      <div class="wrap_checkdiv wrap_flex_normal">
        <div
          class="m_checkbox wrap_flex_normal"
          v-for="item in testCates"
          :key="item.lable"
        >
          <div><el-checkbox v-model="item.checked"></el-checkbox></div>
          <span>{{ item.lable }}</span>
        </div>
      </div>
    </div>

    <!-- 分割线  18px -->
    <div class="cut"></div>

    <!-- 试题类型 -->
    <div class="withMachine">
      <!-- 图+ 名称 -->
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">上机考试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest">
        <add-questype></add-questype>
      </div>
    </div>
  </div>
</template>

<script>
import addQuestype from "./components/addQuestype";

export default {
  data() {
    return {
      testCates: [
        { checked: false, lable: "小乐器考试" },
        { checked: false, lable: "上机考试(美术)" },
        { checked: false, lable: "美术笔试" },
      ],
      checked: false,
      radio: "苏少版",
      checkItems: [],
      items: ["音乐类", "美术类"],
      infos: ["苏少版", "人教版", "人音版", "湘艺版", "鲁教版", "上教版"],
    };
  },
  components: {
    addQuestype,
  },
};
</script>
<style lang="scss" >
.makeTestPaper {
  .testType {
    height: 2rem;
    align-items: center;
    .span1 {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }
  .el-checkbox-button__inner {
    // height: 2rem;
    border-radius: 0.375rem;
    margin-right: 1rem;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #409eff;
    padding-top: 0.5625rem;
  }

  // checked
  .el-checkbox-group {
    .is-checked {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }

  .el-checkbox-button {
    height: 2rem;
    span {
      width: 6.25rem;
      height: 2rem;
      border-radius: 0.375rem;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
    }
  }
  .multiSelect {
    margin-left: 0.5rem;
  }
  .el-checkbox-button:first-child .el-checkbox-button__inner {
    border-left: 0;
    border-radius: 0.375rem;
  }
  .el-checkbox-button:last-child .el-checkbox-button__inner {
    border-radius: 0.375rem;
  }

  // 单选
  .select_item {
    align-items: center;
    margin-top: 1.1875rem;
    .span1 {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .m_radiobox {
      margin-left: 0.5rem;

      .el-radio-button__inner {
        height: 2rem;
        padding-top: 0.6875rem;
        margin-right: 1rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        border-radius: 0.375rem;
        color: #409eff;
        border: 0; // 去除未选中状态边框
        outline: none; // 去除选中状态边框
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background-color: #409eff;

        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  // 试卷名称
  .paper_name {
    margin-top: 1.1875rem;
    align-items: center;
    .span1 {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .m_input {
      margin-left: 0.6875rem;
      input {
        width: 40rem;
        height: 2rem;
        // padding-top: 0.6875rem;
        padding-left: 1.3125rem;

        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
      }
    }
    .m_checkbox {
      margin-right: 1.4375rem;
      align-items: flex-end;
      height: 2rem;

      .el-checkbox__inner {
        width: 0.9375rem;
        height: 0.9375rem;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
      }

      span {
        margin-left: 0.5625rem;
      }
    }
    .wrap_checkdiv {
      margin-left: 1.625rem;
      .el-checkbox__input {
        margin-left: 0;
      }
    }
  }
}
.cut {
  width: 1656px;
  height: 1px;
  background: #eaeef9;
  border: 1px solid #eaeef9;
  margin-top: 1.125rem;
}

.withMachine {
  margin-top: 1.25rem;
  .computer {
    // display: block;
    width: 1.25rem;
    height: 1.125rem;
    background-image: url("../../../assets/imgs/computer.png");
  }
  .span1 {
    margin-left: 0.875rem;
    height: 100%;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
    vertical-align: top;
  }
  .subHeader {
  }
  .addQuest {
    border: 1px solid gray;
    margin-top: 0.6875rem;
  }
}
</style>
