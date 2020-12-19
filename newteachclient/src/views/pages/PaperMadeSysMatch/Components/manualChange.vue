<template>
  <div class="manualChangeContent">
    <el-container>
      <el-header>
        <div class="header wrap_flex_center">
          <span class="point"> 选择知识点 </span>
          <!-- select -->
          <div class="selectItem wrap_flex_center">
            <div class="first_select">
              <el-select
                v-model="librarySelected"
                placeholder=""
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in fromOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>
            <!--教材选择  -->
            <div class="paperrange_select">
              <el-select
                v-model="paperrangeSelected"
                placeholder="请选择"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in paperRangeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <!-- 年级选择 -->
            <div class="grade_select">
              <el-select
                v-model="gradeSelected"
                placeholder="请选择"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in gradeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <!-- 学期选择 -->
            <div class="semester_select">
              <el-select
                v-model="semesterSelected"
                placeholder="请选择"
                :popper-append-to-body="false"
              >
                <el-option
                  v-for="item in semesterOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <!-- 单元选择 -->
            <div class="unit_select">
              <el-select
                v-model="unitSelected"
                multiple
                :placeholder="m_unit"
                :popper-append-to-body="false"
                @change="unitChange"
                ref="multiUnit"
              >
                <el-option
                  v-for="item in unitOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </div>

            <div class="keyword_input wrap_flex_center">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
              <el-button type="primary">全部</el-button>
            </div>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="150px">
          <!-- 分类 -->
          <div class="manual_category">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              :unique-opened="true"
              active-text-color="#409EFF"
            >
              <el-submenu
                :index="item.name"
                v-for="item in categoryInfos"
                :key="item.id"
              >
                <template slot="title">
                  <span>{{ item.name }}</span>
                </template>

                <el-submenu
                  :index="value.name"
                  v-for="value in item.child"
                  :key="value.id"
                >
                  <template slot="title">{{ value.name }}</template>
                  <el-menu-item
                    :index="subVal.name"
                    v-for="subVal in value.child"
                    :key="subVal.id"
                    >{{ subVal.name }}</el-menu-item
                  >
                </el-submenu>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <div class="main_content">
            <!-- 标题 -->
            <div class="content_title">
              <span class="choose">选择</span>
              <span class="testId">题目ID</span>
              <span class="testName">题目</span>
            </div>
            <!-- 内容 -->
            <div class="content">
              <el-radio-group v-model="radio2">
                <div class="contentSelect wrap_flex_center">
                  <el-radio :label="3">
                    <div class="contentId">
                      <span>12345</span>
                    </div>
                    <div class="contentName">
                      <span>我是题目内容</span>
                    </div>
                  </el-radio>
                </div>
              </el-radio-group>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    categoryType: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      radio2: 3,

      fromOptions: [
        { label: "系统题库", mark: 1 },
        { label: "我的题库", mark: 2 },
      ],
      paperRangeOptions: [
        { label: "全部", mark: "" },
        { label: "苏少版", mark: 1 },
        { label: "人教版", mark: 2 },
        { label: "人音版", mark: 3 },
        { label: "人美版", mark: 4 },
        { label: "岭南版", mark: 5 },
        { label: "湘艺版", mark: 6 },
        { label: "苏科版", mark: 7 },
        { label: "鲁教版", mark: 8 },
        { label: "湘美版", mark: 9 },
        { label: "上教版", mark: 10 },
      ],
      gradeOptions: [
        { mark: -1, label: "年级" },
        { mark: 4, label: "一年级" },
        { mark: 5, label: "二年级" },
        { mark: 6, label: "三年级" },
        { mark: 7, label: "四年级" },
        { mark: 8, label: "五年级" },
        { mark: 9, label: "六年级" },
        { mark: 1, label: "七年级" },
        { mark: 2, label: "八年级" },
        { mark: 3, label: "九年级" },
        { mark: 10, label: "高一" },
        { mark: 11, label: "高二" },
        { mark: 12, label: "高三" },
      ],

      semesterOptions: [
        { mark: -1, label: "全部" },
        { mark: 1, label: "上学期" },
        { mark: 2, label: "下学期" },
      ],

      unitOptions: [
        { mark: 1, label: "1单元" },
        { mark: 2, label: "2单元" },
        { mark: 3, label: "3单元" },
        { mark: 4, label: "4单元" },
        { mark: 5, label: "5单元" },
        { mark: 6, label: "6单元" },
        { mark: 7, label: "7单元" },
        { mark: 8, label: "8单元" },
        { mark: 9, label: "9单元" },
        { mark: 10, label: "10单元" },
        { mark: 11, label: "11单元" },
        { mark: 12, label: "12单元" },
        { mark: 13, label: "13单元" },
        { mark: 14, label: "14单元" },
        { mark: 15, label: "15单元" },
        { mark: 16, label: "16单元" },
        { mark: 17, label: "17单元" },
        { mark: 18, label: "18单元" },
        { mark: 19, label: "19单元" },
        { mark: 20, label: "20单元" },
        { mark: 21, label: "21单元" },
        { mark: 22, label: "22单元" },
        { mark: 23, label: "23单元" },
        { mark: 24, label: "24单元" },
        { mark: 25, label: "25单元" },
      ],

      // 题库
      librarySelected: "系统题库",

      // 教材
      paperrangeSelected: "教材",

      // 年级
      gradeSelected: "年级",

      // 学期
      semesterSelected: "学期",

      // 单元
      unitSelected: [],
      m_unit: "单元",
      // 侧边类别
      categoryInfos: {},
    };
  },
  created() {
    // 判断当前类型
    if (this.categoryType && this.categoryType == 1) {
      // 音乐类
      this.categoryInfos = this.musicInfos;
    } else if (this.categoryType && this.categoryType == 2) {
      // 美术类
      this.categoryInfos = this.artInfos;
    }

    console.log("category", this.categoryInfos);
  },
  methods: {
    unitChange(item) {
      // 动态修改样式

      if (item.length > 0) {
        document.getElementsByClassName("el-input__inner")[4].placeholder =
          "单元";
      }
    },
  },
  computed: {
    ...mapGetters(["artInfos", "musicInfos"]),
  },
};
</script>
<style lang="scss" >
@import "../../../../style/variable.scss";
.manualChangeContent {
  // overflow: hidden;
  padding-left: 1.5rem;
  padding-bottom: 0.875rem;
  padding-right: 1.5rem;
  height: 32.625rem;

  .el-header {
    height: 3.25rem !important;
  }

  .el-container {
    height: 28.4375rem;
    .el-header {
      padding: 0;
      .header {
        height: 3.75rem;
        justify-content: space-between;
        padding: 0;
        background-color: #ffffff;

        .selectItem {
          display: flex;
          align-items: center;
          width: 55rem;
          //   background-color: turquoise;

          // .el-select {
          //   width: 7.375rem;
          //   height: 2rem;
          //   .el-input__inner {
          //     height: 2rem;
          //     line-height: 2rem;
          //   }
          // }
          // .el-select .el-input .el-select__caret {
          //   line-height: 2rem;
          // }

          // .el-popper {
          //   margin-top: 0;
          //   .popper__arrow {
          //     display: none;
          //   }
          //   .poper_arrow::after {
          //     display: none;
          //   }
          // }

          // .el-select-dropdown__list {
          //   padding: 0;
          // }

          .first_select {
            @include for_el_select(7.375rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .paperrange_select {
            @include for_el_select(5.8125rem, 2rem);
            margin-left: 0.75rem;
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .grade_select {
            margin-left: 0.75rem;
            @include for_el_select(5.8125rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .semester_select {
            margin-left: 0.75rem;
            @include for_el_select(5.8125rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
          }

          .unit_select {
            margin-left: 0.75rem;
            @include for_el_select(5.8125rem, 2rem);
            .el-input__inner {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
            .el-input__inner::placeholder {
              font-size: 12px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #909399;
            }
            .el-select__tags > span {
              display: none;
            }
            .el-input__inner {
              height: 2rem !important;
              // line-height: 2rem;
            }
          }

          .keyword_input {
            margin-left: 1.375rem;
            .el-input__inner {
              width: 12.9375rem;
              height: 2rem;
              line-height: 2rem;
            }

            .el-button {
              width: 6.25rem;
              height: 2rem;
              line-height: 0;
              span {
                line-height: 0;

                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }

  .point {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #303133;
    margin-top: 0;
  }

  // 分类
  .manual_category {
    height: 28.4375rem;
    background-color: #f5f8ff;

    .el-menu {
      background-color: #f5f8ff;
    }
    & > ul > li > .el-submenu__title {
      height: 2rem;
      line-height: 2rem;
      padding-left: 0.75rem !important;
      // background-color: transparent;
      span {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 600;
        color: #303133;
      }
    }

    & > ul > li > ul > li > .el-submenu__title {
      height: 2rem;
      line-height: 2rem;
      padding-left: 1.5625rem !important;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
      // background-color: transparent;
      span {
      }
    }

    .el-submenu .el-menu-item {
      height: 1.5rem;
      line-height: 1.5rem;
      padding-left: 2.1875rem !important;
      background-color: transparent;
      min-width: 6.25rem;

      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }

    .el-menu-item is-active {
      background-color: #409eff;
    }
  }

  // main-content
  .content_title {
    height: 2.625rem;
    display: flex;
    align-items: center;
    span {
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #303133;
    }
    .choose {
      margin-left: 1.9375rem;
    }
    .testId {
      margin-left: 7.5rem;
    }
    .testName {
      margin-left: 12.5625rem;
    }
  }

  .main_content {
    .contentSelect {
      margin-left: 2.375rem;
      .el-radio {
        height: 1.875rem;
        display: flex;
        align-items: center;
      }
      .el-radio__label {
        display: flex;
        padding-left: 0;
        span {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
        }
      }
      .el-radio__inner {
        border-radius: 0;
      }

      .el-radio,
      .el-radio__input {
        line-height: 0;
      }
    }
    .contentId {
      // background-color: violet;
      margin-left: 8.125rem;
    }
    .contentName {
      margin-left: 10.5rem;
    }
  }

  //

  .el-aside {
    padding-right: 0.625rem;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .el-main {
    padding: 0;
    background-color: #f5f8ff;
  }
}
</style>
