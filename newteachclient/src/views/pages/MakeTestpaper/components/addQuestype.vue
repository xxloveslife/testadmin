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
              v-model="item.currentVal"
              :popper-append-to-body="false"
              placeholder="请选择题型"
              @change="changeVal(item.currentVal, item, i)"
            >
              <el-option
                v-for="item in options"
                :key="item.mark"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>

          <!-- 数量 -->
          <div class="amount">
            <el-input
              v-model="item.amount"
              :disabled="title == '笔试题型' || title == '小乐器'"
              :placeholder="computedNum"
              @change="changeAmount(item.amount, item)"
            ></el-input>
          </div>

          <!-- 分值 -->
          <div class="score">
            <el-input
              v-model="item.scoreVal"
              :placeholder="computedScore"
              :disabled="title == '小乐器'"
              @change="changeScore(item.scoreVal, item)"
            ></el-input>
          </div>
          <!-- 总共 -->
          <div class="total">
            <el-input
              :disabled="true"
              :placeholder="computedTotal(item)"
            ></el-input>
          </div>
          <span class="deleteItem" @click="deleteTest(item, i)"></span>
        </div>
        <!-- 添加按钮 -->

        <div class="wrap_flex_center last_row">
          <div
            class="addButton wrap_flex_allcenter"
            @click="addTest"
            :class="title == '笔试题型' && 'changeAddbutton'"
          >
            <span>{{ (title == "小乐器" && "添加乐器") || "添加题型" }}</span>
          </div>
          <!-- 计算总分 -->
          <span
            >{{
              title == "小乐器" ||
              (title == "音乐题型" && "音乐总分:") ||
              "美术总分:"
            }}{{ computedAllScore }}</span
          >
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

    <!-- 重复弹窗 -->
    <div class="atleast">
      <el-dialog
        title="提示"
        :visible.sync="typeRepeat_dialogVisible"
        width="20%"
      >
        <span>题型重复</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="typeRepeat_dialogVisible = false"
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
      // 数据类型分小乐器和其他
      paperTypes: [{ question_type: "", number: "", score: "", total: "" }],
      // paperTypes: [],
      options: [],

      // 至少保留一项
      atleast_dialogVisible: false,

      // 题型重复
      typeRepeat_dialogVisible: false,
      value: "",
      // amount: "",
    };
  },
  methods: {
    // 添加题型
    addTest() {
      if (this.title == "小乐器") {
        this.paperTypes.push("");
      } else {
        this.paperTypes.push({
          question_type: "",
          number: "",
          score: "",
          total: "",
        });
      }
    },
    deleteTest(item, i) {
      if (this.paperTypes.length == 1) {
        // 弹窗提示
        this.atleast_dialogVisible = true;
      } else {
        this.paperTypes.splice(i, 1);
        // 传给父组件
        this.emitParent();
      }
    },

    // 改变单选选择
    changeVal(val, item, i) {
      // this.paperTypes[i].question_type = item.mark;
      let valMark = "";
      this.options.forEach((item, i) => {
        if (item.label == val) {
          valMark = item.mark;
          return;
        }
      });
      // console.log("valMark", valMark);
      // 如果题型重复
      let repeatVal = this.paperTypes.some((item) => {
        return item.question_type == valMark;
      });
      // console.log("repeat", repeatVal);
      if (repeatVal) {
        // 跳弹窗
        this.typeRepeat_dialogVisible = true;

        // 清空
        item.currentVal = "";
      } else {
        this.typeRepeat_dialogVisible = false;
        item.currentVal = val;
        this.paperTypes[i].question_type = valMark;
      }

      console.log("currentpapertypes", this.paperTypes);
      this.emitParent();
    },

    // 改变数量
    changeAmount(amount, item) {
      // console.log("amountanditem", amount, item);

      item.number = amount;
      // 重新计算下单个item总分
      item.total = item.score * item.number;
      this.emitParent();
    },

    // 改变分值
    changeScore(scoreVal, item) {
      if (this.title == "笔试题型") {
        // console.log("jinlail");
        item.number = 1;
      }

      item.score = scoreVal;
      // 重新计算下单个item总分
      item.total = item.score * item.number;
      // this.$set(item, score, scoreVal);
      console.log("score", this.paperTypes);
      this.emitParent();
    },

    // 通知父组件
    emitParent() {
      this.$emit("changeForm", this.paperTypes, this.title);
      // console.log("tijiaotypes", this.paperTypes);
    },
  },
  computed: {
    computedNum: function () {
      if (this.title == "笔试题型") {
        return "1";
      } else if (this.title == "小乐器") {
        // 拿到当前音乐题型里的演唱题的分值 ,如果没有,默认显示空字符串

        return "与演唱题一致";
      } else {
        return "请输入题型数量";
      }
    },
    computedScore: function () {
      if (this.title == "小乐器") {
        return "与演唱题一致";
      } else {
        return "请输入题型分值";
      }
    },
    computedTotal: function () {
      return function (item) {
        if (this.title == "笔试题型" && item.scoreVal) {
          item.total = item.scoreVal;
          return item.scoreVal;
        }
        if (item.amount && item.scoreVal) {
          // console.log("jinlai l ", item.scoreVal * item.amount);
          item.total = item.scoreVal * item.amount;
          return item.amount * item.scoreVal;
        }
        return "正在合计分数值";
      };
    },

    // 计算总分
    computedAllScore: function () {
      let total = 0;
      // console.log("zongfen", this.paperTypes);

      this.paperTypes.forEach((item) => {
        total += item.total;
      });

      return (total && total) || "";
    },
  },
  created() {
    if (this.title && this.title == "音乐题型") {
      this.options = [
        { mark: "1", label: "单项选择题", currentVal: "" },
        { mark: "2", label: "多项选择题", currentVal: "" },
        { mark: "3", label: "演唱题", currentVal: "" },
        { mark: "8", label: "节奏题", currentVal: "" },
        { mark: "10", label: "判断题", currentVal: "" },
        { mark: "11", label: "连线题", currentVal: "" },
      ];
    } else if (this.title && this.title == "美术题型") {
      this.options = [
        { mark: "1", label: "单项选择题", currentVal: "" },
        { mark: "2", label: "多项选择题", currentVal: "" },
        { mark: "3", label: "判断题", currentVal: "" },
        { mark: "4", label: "连线题", currentVal: "" },
        { mark: "6", label: "排序题", currentVal: "" },
        { mark: "7", label: "拼图题", currentVal: "" },
        { mark: "8", label: "点线题", currentVal: "" },
        { mark: "9", label: "填色题", currentVal: "" },
        { mark: "10", label: "配色题", currentVal: "" },
        { mark: "11", label: "填空题", currentVal: "" },
      ];
    } else if (this.title && this.title == "小乐器") {
      this.options = [
        { mark: "2", label: "口琴", currentVal: "" },
        { mark: "3", label: "竖笛", currentVal: "" },
        { mark: "4", label: "陶笛", currentVal: "" },
        { mark: "5", label: "葫芦丝", currentVal: "" },
        { mark: "6", label: "口风琴", currentVal: "" },
      ];
    } else if (this.title && this.title == "笔试题型") {
      this.options = [{ mark: "5", label: " 表现题", currentVal: "" }];
    }

    // 组件生成就新建为空的对象
    this.$emit("changeForm", this.paperTypes, this.title);
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
        // .el-select-dropdown__item.hover,
        // .el-select-dropdown__item:hover {
        //   background-color: #ffffff;
        // }

        .el-select-dropdown__list {
          background-color: #ffffff;
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
    // visibility: hidden;
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
  .changeAddbutton {
    visibility: hidden;
  }
  .el-input__inner {
    height: 32px;
  }

  .last_row {
    justify-content: space-between;
    & > span {
      margin-right: 60px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #409eff;
    }
  }
}
</style>