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
          <!-- 礼拜一修改 -->
          <div class="m_dropdown">
            <el-select
              v-model="item.currentLabel"
              :popper-append-to-body="false"
              placeholder="请选择题型"
              @change="changeVal(item.currentLabel, item, i)"
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
              v-model="item.number"
              :disabled="title == '笔试题型' || title == '小乐器'"
              :placeholder="computedNum"
              @change="changeAmount(item.number, item)"
            ></el-input>
          </div>

          <!-- 分值 -->
          <div class="score">
            <el-input
              v-model="item.score"
              :placeholder="computedScore"
              :disabled="title == '小乐器'"
              @change="changeScore(item.score, item)"
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
              ((title == "小乐器" || title == "音乐题型") && "音乐总分:") ||
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
import { mapGetters } from "vuex";
export default {
  props: {
    title: {
      type: String,
    },
    testConf: {},
  },
  data() {
    return {
      // 数据类型分小乐器和其他    空对象为false
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
        this.paperTypes.push({
          question_type: "",
          number: "",
          score: "",
          total: "",
        });
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
      console.log("options", this.options);
      // this.paperTypes[i].question_type = item.mark;
      console.log("val", val, item, i);
      //  当前选择值的mark值
      let valMark = "";
      this.options.forEach((item, i) => {
        if (item.label == val) {
          valMark = item.mark;

          return;
        }
      });

      // 如果题型重复
      let repeatVal = this.paperTypes.some((item, i) => {
        return item.question_type == valMark;
      });
      // console.log("repeat", repeatVal);
      if (repeatVal) {
        // 跳弹窗
        this.typeRepeat_dialogVisible = true;
        // console.log("题型重复了");
        // 清空
        item.currentVal = "";
        item.question_type = "";
      } else {
        this.typeRepeat_dialogVisible = false;
        // console.log("题型不重复");
        // console.log("item.currentV:", item, "VAL", val);
        // console.log("总的list", this.paperTypes);
        item.currentVal = val;
        // console.log("过来了");
        this.paperTypes[i].question_type = valMark;
      }

      console.log("currentpapertypes", this.paperTypes);
      this.emitParent();
    },

    // 改变数量
    changeAmount(amount, item) {
      console.log("amountanditem", amount, item);

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
      // console.log("score", this.paperTypes);
      this.emitParent();
    },

    // 通知父组件
    emitParent() {
      this.$emit("changeForm", this.paperTypes, this.title);
      // console.log("tijiaotypes", this.paperTypes);
    },

    // 兼容编辑试卷显示
    // selectedItem(item) {
    //   if (this.editPaperConf) {
    //     let label = "";
    //     this.options.forEach((m_item) => {
    //       if (m_item.mark == item.question_type) {
    //         label = m_item.label;
    //         console.log("wojinlail", label);
    //       }
    //     });

    //     return label;
    //   } else {
    //     return item.currentVal;
    //   }
    // },
  },
  computed: {
    ...mapGetters(["yanchangtiScore", "editPaperConf"]),
    computedNum: function () {
      if (this.title == "笔试题型") {
        return "1";
      } else if (this.title == "小乐器") {
        // 拿到当前音乐题型里的演唱题的分值 ,如果没有,默认显示空字符串

        return this.yanchangtiScore.number;
      } else {
        return "请输入题型数量";
      }
    },
    computedScore: function () {
      if (this.title == "小乐器") {
        return this.yanchangtiScore.score;
      } else {
        return "请输入题型分值";
      }
    },
    computedTotal: function () {
      // @change="changeAmount(item.number, item)"
      return function (item) {
        // console.log("input框的计算总分属性");
        if (this.title == "笔试题型" && item.total) {
          // item.total = item.scoreVal;
          return item.total;
        }
        if (item.number && item.score) {
          // console.log("jinlai l ", item.scoreVal * item.amount);
          item.total = item.number * item.score;
          return item.number * item.score;
        }
        if (this.title == "小乐器") {
          return this.yanchangtiScore.total;
        }
        return "正在合计分数值";
      };
    },

    // 计算总分
    computedAllScore: function () {
      if (this.title == "小乐器") {
        return this.yanchangtiScore.total;
      } else {
        // console.log("小乐器计算总分计算属性");
        let total = 0;
        // console.log("zongfen", this.paperTypes);

        this.paperTypes.forEach((item) => {
          // 判断演唱题

          //判断演唱题的总分值
          if (this.title == "音乐题型" && item.question_type == 3) {
            // console.log("item", item);
            const yanchangtiTotal = item.total;
            const yangchangtiNumber = item.number;
            const yangchangtiScore = item.score;

            // 传入store
            this.$store.commit("makeTestPaper/setYanchangtiScore", {
              total: yanchangtiTotal,
              number: yangchangtiNumber,
              score: yangchangtiScore,
            });
          }
          total += parseInt(item.total);
        });

        return (total && total) || "";
      }
    },

    selectedItem: {
      get() {
        return function (item) {
          let label = "";
          if (this.editPaperConf) {
            this.options.forEach((m_item) => {
              if (m_item.mark == item.question_type) {
                label = m_item.label;
              }
            });

            return label;
          } else {
            return label;
          }
        };
      },
      set(val) {
        this.label = val;
      },
    },
  },
  created() {
    // 判断options
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

    // 兼容编辑试卷,判断store里面的paperConf 是不是为空 Object.keys(this.editPaperConf)
    console.log("storeinfos", this.editPaperConf);

    if (Object.keys(this.editPaperConf).length != 0) {
      // 区别于制作试卷,点击开始考试的时候,store里面置空
      // 不是空的

      if (this.title == "音乐题型") {
        console.log("走音乐题型");
        // 设置v-model的label值

        this.editPaperConf.music_conf.forEach((m_item) => {
          this.options.forEach((sub_item) => {
            if (m_item.question_type == sub_item.mark) {
              m_item.currentLabel = sub_item.label;
            }
          });
        });
        this.paperTypes = this.editPaperConf.music_conf;
        // console.log("音乐题型", this.editPaperConf);
        // console.log("音乐题型", this.paperTypes);
        // console.log("yinyuelei", this.paperTypes);

        // console.log("yinyuetixing ", this.editPaperConf.music_conf);
      } else if (this.title == "美术题型") {
        // 设置v-model的label值
        console.log("走美术题型");
        this.editPaperConf.art_conf.forEach((m_item) => {
          this.options.forEach((sub_item) => {
            if (m_item.question_type == sub_item.mark) {
              m_item.currentLabel = sub_item.label;
            }
          });
        });
        this.paperTypes = this.editPaperConf.art_conf;

        // console.log("美术题型", this.editPaperConf);
        // console.log("美术题型", this.paperTypes);
      } else if (this.title == "小乐器") {
        console.log("走小乐器");
        // 看下小乐器的结构
        let tempList = this.editPaperConf.instrumentconf;
        let temPaperType = [];
        tempList.forEach((m_item) => {
          temPaperType.push({
            question_type: m_item,
            number: "",
            score: "",
            total: "",
          });
        });
        // 设置v-model的label值
        temPaperType.forEach((m_item) => {
          this.options.forEach((sub_item) => {
            if (m_item.question_type == sub_item.mark) {
              m_item.currentLabel = sub_item.label;
            }
          });
        });

        this.paperTypes = temPaperType;
      } else if (this.title == "笔试题型") {
        console.log("走笔试题型");
        // 设置v-model的label值
        this.editPaperConf.paper_question_conf.forEach((m_item) => {
          this.options.forEach((sub_item) => {
            if (m_item.question_type == sub_item.mark) {
              m_item.currentLabel = sub_item.label;
            }
          });
        });
        this.paperTypes = this.editPaperConf.paper_question_conf;
      }
    }
    console.log("storelidezhi", this.editPaperConf.music_conf);
    console.log("this.paperType", this.title, this.paperTypes);
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