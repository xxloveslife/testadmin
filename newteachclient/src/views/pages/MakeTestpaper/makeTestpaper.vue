<template>
  <div class="makeTestPaper">
    <!-- 试卷类型 -->
    <div class="testType wrap_flex_normal">
      <span class="span1">试题类型:</span>
      <div class="multiSelect">
        <el-checkbox-group v-model="checkItems">
          <el-checkbox-button
            v-for="item in items"
            :label="item.label"
            :key="item.type"
            @change="changeCheck"
            >{{ item.label }}</el-checkbox-button
          >
        </el-checkbox-group>
      </div>
    </div>
    <!-- 选择教材 -->
    <div class="select_item wrap_flex_normal">
      <span class="span1">选择教材:</span>
      <div class="m_radiobox no_copy">
        <el-radio-group v-model="radio" @change="changeRadio">
          <el-radio-button v-for="item in infos" :key="item.type" :label="item">
            {{ item.label }}
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
      <div class="wrap_checkdiv wrap_flex_normal" v-if="showMusicCheckbox">
        <!-- checkbox -->
        <div
          class="m_checkbox wrap_flex_normal"
          v-if="checkItems.indexOf('音乐类') != -1"
        >
          <div>
            <el-checkbox v-model="music_checked"></el-checkbox>
          </div>
          <span>小乐器考试</span>
        </div>
        <div
          class="m_checkbox wrap_flex_normal"
          v-if="checkItems.indexOf('美术类') != -1"
        >
          <div>
            <el-checkbox v-model="withMachine_checked"></el-checkbox>
          </div>
          <span>上机考试(美术)</span>
        </div>
        <div
          class="m_checkbox wrap_flex_normal"
          v-if="checkItems.indexOf('美术类') != -1"
        >
          <div>
            <el-checkbox v-model="art_checked"></el-checkbox>
          </div>
          <span>美术笔试</span>
        </div>
      </div>
    </div>

    <!-- 分割线  18px -->
    <div class="cut"></div>

    <!-- 试题类型  上机考试-->
    <div
      class="withMachine"
      v-if="
        checkItems.indexOf('音乐类') != -1 ||
        checkItems.indexOf('美术类  ') != -1 ||
        withMachine_checked
      "
    >
      <!-- 图+ 名称 -->
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">上机考试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest" v-if="checkItems.indexOf('音乐类') != -1">
        <add-questype title="音乐题型"></add-questype>
      </div>

      <div
        class="addQuest"
        v-if="checkItems.indexOf('美术类') != -1 && withMachine_checked"
      >
        <add-questype title="美术题型"></add-questype>
      </div>

      <!-- 分割线  18px -->
      <div class="cut"></div>
    </div>

    <!-- 小乐器考试 -->
    <div
      class="instrument"
      v-if="checkItems.indexOf('音乐类') != -1 && music_checked"
    >
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">小乐器考试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest">
        <add-questype title="小乐器"></add-questype>
      </div>

      <!-- 分割线  18px -->
      <div class="cut"></div>
    </div>

    <!-- 美术笔试 -->
    <div class="art" v-if="checkItems.indexOf('美术类') != -1 && art_checked">
      <div class="subHeader wrap_flex_normal">
        <i class="computer"></i>
        <span class="span1">美术笔试</span>
      </div>
      <!-- 自定义组件  m top 11px -->
      <div class="addQuest">
        <add-questype title="笔试题型"></add-questype>
      </div>

      <!-- 分割线  18px -->
      <div class="cut"></div>
    </div>

    <!-- select footer -->
    <div class="select_footer wrap_flex_center">
      <span class="fit_grade_span">适用年级:</span>
      <div class="fit_grade">
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
      <div class="fit_semester">
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
      <div class="music_unit">
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
      <div class="art_unit">
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
      <div class="difficult wrap_flex_center">
        <span class="difficult_span">难易程度</span>
        <div class="selectDifficult">
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
      <div class="test_from wrap_flex_center">
        <span class="test_from_span">题目来源</span>
        <div class="from_sys wrap_flex_center">
          <el-checkbox class="m_checkbox" v-model="sys_checked"></el-checkbox>
          <span class="from_sys_span">系统匹配</span>
        </div>
        <div class="manual wrap_flex_center">
          <el-checkbox
            class="m_checkbox"
            v-model="manual_checked"
          ></el-checkbox>
          <span class="manual_span">手动添加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import addQuestype from "./components/addQuestype";

export default {
  data() {
    return {
      // testCates: [
      //   { checked: true, lable: "小乐器考试" },
      //   { checked: false, lable: "上机考试(美术)" },
      //   { checked: false, lable: "美术笔试" },
      // ],
      music_checked: false,
      withMachine_checked: false,
      art_checked: false,

      checked: false,
      radio: "苏少版",

      checkItems: ["音乐类"],
      items: [
        { type: 0, label: "音乐类" },
        { type: 1, label: "美术类" },
      ],
      infos: [
        { type: 1, label: "苏少版" },
        { type: 2, label: "人教版" },
        { type: 3, label: "人音版" },
        { type: 4, label: "湘艺版" },
        { type: 5, label: "鲁教版" },
        { type: 6, label: "上教版" },
      ],

      // 多选的数组  [0,1]
      checkItemTypes: [],

      //提交内容
      paper_selection: {},

      // 记录checkbox
      showMusicCheckbox: true,
      showArtCheckbox: true,
    };
  },
  components: {
    addQuestype,
  },
  methods: {
    changeCheck() {
      // console.log("val", this.checkItems);
      this.checkItemTypes = this.checkItems.map((item, i) => {
        return item;
      });
      // console.log(this.checkItemTypes);
      if (this.checkItemTypes.length > 1) {
        // 音乐和美术
        this.infos = [
          { type: 1, label: "苏少版" },
          { type: 2, label: "人教版" },
          { type: 5, label: "鲁教版" },
        ];
      } else if (this.checkItemTypes.length == 1) {
        if (this.checkItemTypes[0] == "音乐类") {
          //音乐
          this.infos = [
            { type: 1, label: "苏少版" },
            { type: 2, label: "人教版" },
            { type: 3, label: "人音版" },
            { type: 4, label: "湘艺版" },
            { type: 5, label: "鲁教版" },
            { type: 6, label: "上教版" },
          ];
        } else {
          // 美术
          this.infos = [
            { type: 1, label: "苏少版" },
            { type: 2, label: "人教版" },
            { type: 3, label: "人美版" },
            { type: 4, label: "岭南版" },
            { type: 5, label: "鲁教版" },
            { type: 6, label: "湘美版" },
            { type: 7, label: "上教版" },
          ];
        }
      } else {
        // 空
      }
    },

    changeRadio(val) {
      console.log("val", val);
    },
  },
  computed: {
    showWithMachine: function () {
      return this.checkItems.indexOf("音乐类") != -1;
    },
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

    .addQuest {
      // border: 1px solid gray;
      margin-top: 0.6875rem;
    }
  }

  // 小乐器
  .instrument {
    margin-top: 1.0625rem;
    .computer {
      // display: block;
      width: 1.1875rem;
      height: 1.25rem;
      background-image: url("../../../assets/imgs/makeTestPaper/music.png");
      background-size: 1.1875rem 1.25rem;
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
    .addQuest {
      // border: 1px solid gray;
      margin-top: 0.6875rem;
    }
  }

  // 美术笔试
  .art {
    margin-top: 1.0625rem;
    .computer {
      // display: block;
      width: 1.3125rem;
      height: 1.3125rem;
      background-image: url("../../../assets/imgs/makeTestPaper/art.png");
      background-size: 1.3125rem;
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

    .addQuest {
      // border: 1px solid gray;
      margin-top: 0.6875rem;
    }
  }

  .select_footer {
    margin-top: 1.125rem;
    height: 2rem;
    .el-checkbox__inner {
      width: 1rem;
      height: 1rem;
    }
    .el-popper {
      margin-top: 0;
      height: 2rem;
      .popper__arrow {
        display: none;
      }
      p {
        padding-top: 0.25rem;
      }
    }
    .el-select-dropdown {
      box-shadow: none;
    }
    .fit_grade_span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .fit_grade {
      width: 8.375rem;
      height: 2rem;
      margin-left: 0.5rem;
    }
    .fit_semester {
      width: 8.375rem;
      height: 2rem;
      margin-left: 2.25rem;
    }
    .music_unit {
      width: 8.375rem;
      height: 2rem;
      margin-left: 2.1875rem;
    }
    .art_unit {
      width: 8.375rem;
      height: 2rem;
      margin-left: 2.1875rem;
    }
    .difficult {
      margin-left: 2.3125rem;
      .difficult_span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      .selectDifficult {
        margin-left: 0.4375rem;
      }
    }
    .test_from {
      margin-left: 2.1875rem;
      .test_from_span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      .from_sys {
        margin-left: 0.875rem;
        .from_sys_span {
          margin-left: 0.3125rem;

          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
      }
      .manual {
        margin-left: 1.25rem;
        .manual_span {
          margin-left: 0.3125rem;

          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
      }
    }

    // select box
    .el-input__inner {
      height: 2rem;
      border: none;
    }
    .el-input__icon {
      line-height: 2rem;
    }
  }
}
.makeTestPaper .el-checkbox-group .is-checked {
  span {
    background-image: url("../../../assets/imgs/makeTestPaper/checkback.png");
    background-size: 6.25rem 2rem;
    background-repeat: no-repeat;

    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
  }
}

// .makeTestPaper .el-checkbox-group .el-checkbox-button {
//   span {
//     font-size: 12px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: #303133;
//   }
// }

// .makeTestPaper .el-checkbox-group .el-checkbox-button {
//   span:hover {
//     font-size: 12px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     color: #409eff;
//   }
// }
</style>
