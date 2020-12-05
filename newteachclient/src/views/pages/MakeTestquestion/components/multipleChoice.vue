<template>
  <div class="multiple-choice-container" ref="multiple">
    <div class="chooseType">
      <span>选择类型 :</span>
      <el-radio-group v-model="textRadio" @change="changeRadio">
        <el-radio-button
          class="chooseTypeBtn"
          v-for="item in list"
          :key="item.id"
          :label="item.name"
          >{{ item.name }}类</el-radio-button
        >
      </el-radio-group>
    </div>

    <div class="multipleChoice">
      <span>选择题型 :</span>
      <el-radio-group v-model="radioDefault" @change="changeSubRadio">
        <el-radio-button
          class="chooseTypeBtn"
          v-for="(item, i) in multipleChoiceList"
          :key="i"
          :label="item.questionTypeName"
          >{{ item.questionTypeName }}</el-radio-button
        >
      </el-radio-group>
    </div>

    <el-form ref="form">
      <!-- 题目内容 -->
      <div class="subjectContent">
        <div>题目内容 :</div>
        <div class="subjectContentItem">
          <el-form-item>
            <el-input placeholder="请输入题目内容"></el-input>
            <el-button type="primary">插入图片</el-button>
            <input type="file" hidden />
            <span class="changeText">点击上传题目所需要的配图</span>
          </el-form-item>
          <el-form-item class="second-form-item">
            <el-input
              class="secondInput"
              placeholder="某某某校第五次艺术  https://huaban.com/pins/3406106587/"
            ></el-input>
            <input type="file" hidden />
            <el-button type="primary">插入图片</el-button>
            <span class="changeText">点击上传题目所需要的配图</span>
          </el-form-item>
        </div>
      </div>
      <!-- 题目主体子组件 -->
      <topic-theme
        :changeRadioVal="textRadio"
        :radioDefault="radioDefault"
        :testQuestionlists="testQuestionlists"
        :knowledgeList="knowledgeList"
      ></topic-theme>

      <div class="footerBox">
        <!-- 考点范围 -->
        <div class="testSiteRange">
          <div class="testSiteRangeTitle">考点范围 :</div>
          <div class="applicableGradeLeft">
            <el-form-item>
              <el-input placeholder="请输入该题目所评测考察的知识点"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 题目解析 : -->
        <div class="testSiteRange">
          <div class="testSiteRangeTitle">题目解析 :</div>
          <div class="applicableGradeLeft">
            <el-form-item>
              <el-input placeholder="请输入该题目的题目分析内容"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 适用年级 : -->
        <div class="applicableGrade">
          <div class="testSiteRangeTitle">适用年级 :</div>
          <!-- 左 -->
          <div class="applicableGradeLeft">
            <ul class="applicableGradeLeftUl">
              <li>
                <el-dropdown trigger="click">
                  <el-button>
                    <span>
                      全部
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
              <li>
                <el-dropdown trigger="click">
                  <el-button>
                    <span>
                      全部
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
              <li>
                <el-dropdown trigger="click">
                  <el-button>
                    <span>
                      全部
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
            </ul>
          </div>
          <!-- 中 -->
          <div class="applicableGradeMiddle">
            <ul class="applicableGradeMiddleUl">
              <li>
                <span> 能力层次</span>
              </li>
              <li>
                <el-dropdown trigger="click">
                  <el-button>
                    <span>
                      全部
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
              <li>
                <el-dropdown trigger="click">
                  <el-button>
                    <span>
                      全部
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
            </ul>
          </div>
          <!-- 右 -->
          <div class="applicableGradeRight">
            <ul class="applicableGradeRightUl">
              <li>
                <span>适用试卷</span>
              </li>
              <li>
                <el-dropdown trigger="click">
                  <el-button>
                    <span>
                      全部
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>黄金糕</el-dropdown-item>
                      <el-dropdown-item>狮子头</el-dropdown-item>
                      <el-dropdown-item>螺蛳粉</el-dropdown-item>
                      <el-dropdown-item>双皮奶</el-dropdown-item>
                      <el-dropdown-item>蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import topicTheme from './topicTheme'
// import { getTestLibraryMultipleChoice } from '@/api/testLibrary'
export default {
  name: 'multipleChoice',
  data() {
    return {
      textRadio: this.radio,
      // 选择类型选择值
      changeRadioVal: '',
      // 选择题型选择值
      changeMultipleChoice: '',
      radioDefault: '单项选择题',
      // 选择题型数据
      multipleChoiceList: [],
      knowledgeList: [
        {
          a: 0,
          parents: '演唱演奏创编',
          children: [
            {
              a: 0,
              parents: '歌曲演唱',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识2',
                },
                {
                  a: 0,
                  parents: '歌唱知识3',
                },
              ],
            },
            {
              a: 0,
              parents: '乐器演奏',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '音乐创编',
              children: [
                {
                  a: 0,
                  parents: '1',
                },
                {
                  a: 0,
                  parents: '2',
                },
                {
                  a: 0,
                  parents: '3',
                },
                {
                  a: 0,
                  parents: '4',
                },
              ],
            },
            {
              a: 0,
              parents: '五线谱',
              children: [
                {
                  a: 0,
                  parents: '5',
                },
                {
                  a: 0,
                  parents: '6',
                },
                {
                  a: 0,
                  parents: '7',
                },
                { a: 0, parents: '8' },
              ],
            },
            {
              a: 0,
              parents: '简谱',
              children: [
                { a: 0, parents: '9' },
                { a: 0, parents: '0' },
                { a: 0, parents: '11' },
                { a: 0, parents: '111' },
              ],
            },
            {
              a: 0,
              parents: '简谱',
              children: [
                { a: 0, parents: '111' },
                { a: 0, parents: '1111' },
                { a: 0, parents: '11111' },
                { a: 0, parents: '22' },
              ],
            },
          ],
        },
        {
          a: 0,
          parents: '乐谱视唱练耳',
          children: [
            {
              a: 0,
              parents: '歌曲演唱1',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '乐器演奏1',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '音乐创编',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '五线谱',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '简谱',
              children: [
                {
                  a: 0,
                  parents: '歌唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知识1',
                },
              ],
            },
          ],
        },
        {
          a: 0,
          parents: '音乐聆听欣赏',
          children: [
            {
              a: 0,
              parents: '乐器演奏2',
              children: [
                {
                  a: 0,
                  parents: '222',
                },
                {
                  a: 0,
                  parents: '歌3唱1',
                },
                {
                  a: 0,
                  parents: '歌33唱1',
                },
                {
                  a: 0,
                  parents: '歌唱23知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '音乐创编',
              children: [
                {
                  a: 0,
                  parents: '歌唱12知识',
                },
                {
                  a: 0,
                  parents: '13334',
                },
                {
                  a: 0,
                  parents: '213',
                },
                {
                  a: 0,
                  parents: '歌234唱1',
                },
              ],
            },
            {
              a: 0,
              parents: '五线谱',
              children: [
                {
                  a: 0,
                  parents: '歌唱54知识',
                },
                {
                  a: 0,
                  parents: '歌唱知76识1',
                },
                {
                  a: 0,
                  parents: '歌453唱1',
                },
                {
                  a: 0,
                  parents: '歌346唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '简谱',
              children: [
                {
                  a: 0,
                  parents: '歌45唱知识',
                },
                {
                  a: 0,
                  parents: '歌1',
                },
                {
                  a: 0,
                  parents: '歌唱908知识1',
                },
                {
                  a: 0,
                  parents: '歌唱77知识1',
                },
              ],
            },
          ],
        },
        {
          a: 0,
          parents: '音乐表现要素',
          children: [
            {
              a: 0,
              parents: '1',
              children: [
                {
                  a: 0,
                  parents: '歌唱56知识',
                },
                {
                  a: 0,
                  parents: '歌唱5知8识1',
                },
                {
                  a: 0,
                  parents: '歌唱567知识1',
                },
                {
                  a: 0,
                  parents: '歌5知657识1',
                },
              ],
            },
            {
              a: 0,
              parents: '乐器演奏',
              children: [
                {
                  a: 0,
                  parents: '歌唱567知识',
                },
                {
                  a: 0,
                  parents: '歌唱知ert识1',
                },
                {
                  a: 0,
                  parents: '歌sd唱知识1',
                },
                {
                  a: 0,
                  parents: '歌f唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '音乐创编',
              children: [
                {
                  a: 0,
                  parents: '歌唱知asd识',
                },
                {
                  a: 0,
                  parents: '歌唱zx知识1',
                },
                {
                  a: 0,
                  parents: '歌sa唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知zzs识1',
                },
              ],
            },
            {
              a: 0,
              parents: '五线谱',
              children: [
                {
                  a: 0,
                  parents: '歌qws唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知z识1',
                },
                {
                  a: 0,
                  parents: '歌唱z知识1',
                },
                {
                  a: 0,
                  parents: '歌z唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '简谱',
              children: [
                {
                  a: 0,
                  parents: '歌we唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱we识1',
                },
                {
                  a: 0,
                  parents: '歌唱知qsed识1',
                },
                {
                  a: 0,
                  parents: '歌asd唱知识1',
                },
              ],
            },
          ],
        },
        {
          a: 0,
          parents: '音乐表现要素',
          children: [
            {
              a: 0,
              parents: '1',
              children: [
                {
                  a: 0,
                  parents: '歌唱56知识',
                },
                {
                  a: 0,
                  parents: '歌唱5知8识1',
                },
                {
                  a: 0,
                  parents: '歌唱567知识1',
                },
                {
                  a: 0,
                  parents: '歌5知657识1',
                },
              ],
            },
            {
              a: 0,
              parents: '乐器演奏',
              children: [
                {
                  a: 0,
                  parents: '歌唱567知识',
                },
                {
                  a: 0,
                  parents: '歌唱知ert识1',
                },
                {
                  a: 0,
                  parents: '歌sd唱知识1',
                },
                {
                  a: 0,
                  parents: '歌f唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '音乐创编',
              children: [
                {
                  a: 0,
                  parents: '歌唱知asd识',
                },
                {
                  a: 0,
                  parents: '歌唱zx知识1',
                },
                {
                  a: 0,
                  parents: '歌sa唱知识1',
                },
                {
                  a: 0,
                  parents: '歌唱知zzs识1',
                },
              ],
            },
            {
              a: 0,
              parents: '五线谱',
              children: [
                {
                  a: 0,
                  parents: '歌qws唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱知z识1',
                },
                {
                  a: 0,
                  parents: '歌唱z知识1',
                },
                {
                  a: 0,
                  parents: '歌z唱知识1',
                },
              ],
            },
            {
              a: 0,
              parents: '简谱',
              children: [
                {
                  a: 0,
                  parents: '歌we唱知识',
                },
                {
                  a: 0,
                  parents: '歌唱we识1',
                },
                {
                  a: 0,
                  parents: '歌唱知qsed识1',
                },
                {
                  a: 0,
                  parents: '歌asd唱知识1',
                },
              ],
            },
          ],
        },
      ],

      // 试题list,给后台
      testQuestionlists: {},
    }
  },
  mounted() {
    this.getMultipleChoiceList(this.radio)
    this.testQuestionlists.changeRadioVal = this.radio
    this.testQuestionlists.changeMultipleChoice = this.radioDefault
  },
  props: {
    list: {
      type: Array,
    },
    radio: {
      type: String,
    },
  },
  methods: {
    changeRadio(val) {
      this.changeRadioVal = val
      this.testQuestionlists.changeRadioVal = val
    },
    changeSubRadio(val) {
      this.changeMultipleChoice = val
      this.testQuestionlists.changeMultipleChoice = val

      // console.log(this.testQuestionlists)
      // 发起请求获取不同数据
    },

    // multipleChoiceList默认值
    getMultipleChoiceList(radio) {
      if (this.list) {
        this.list.forEach((item, i) => {
          if (item.name === radio) {
            this.multipleChoiceList = this.list[i].questionType
          }
        })
      }
    },
  },
  watch: {
    changeRadioVal: function(newV, oldV) {
      this.list.forEach((item, i) => {
        if (this.list) {
          if (item.name == newV) {
            this.multipleChoiceList = this.list[i].questionType
          }
        }
      })
    },
  },
  components: {
    topicTheme,
  },
}
</script>

<style lang="scss">
@import '@/style/variable.scss';
.multiple-choice-container {
  padding: 0 44px;
  font-size: 12px;
  color: #303133;
  .chooseType {
    padding-bottom: 19px;
  }

  .multipleChoice {
    padding-bottom: 19px;
  }

  .changeText {
    width: 143px;
    height: 12px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    line-height: 41px;
  }
  .subjectContent {
    position: relative;
    margin-bottom: 88px;
    div {
      font-size: 12px;
      height: 40px;
      line-height: 40px;
    }
    .el-input {
      width: 640px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #409eff;
      border-radius: 6px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      margin-right: 15px;
    }

    .subjectContentItem {
      position: absolute;
      top: 0;
      left: 62px;
      display: flex;
      flex-direction: column;
      button {
        margin-right: 17px;
      }
    }
  }
  .testSiteRange {
    display: flex;
    .el-form-item {
      .el-input {
        width: 1360px;
      }
    }
  }
  .footerBox {
    .testSiteRange {
      position: relative;
      .testSiteRangeTitle {
        position: absolute;
        top: 10px;

        // padding-top: 10px;
        // margin-right: 5px;
      }
    }
    .applicableGrade {
      position: relative;
      .testSiteRangeTitle {
        position: absolute;
        top: 10px;

        // padding-top: 10px;
        // margin-right: 5px;
      }
      .el-dropdown {
        width: 93px;
        height: 32px;
        background: #ffffff;
        border-radius: 6px;
        .el-button {
          padding: 0 19px;
          width: 93px;
          height: 32px;
          background: #ffffff;
          border-radius: 6px;
          border: none;
          span {
            float: left;
            font-size: 12px;
            line-height: 32px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909399;
          }
          img {
            float: right;
            margin-top: 15px;
            position: relative;
            left: 25px;
          }
        }
      }
    }

    .applicableGradeLeft {
      margin-left: 60px;
      .applicableGradeLeftUl {
        li {
          float: left;
          margin-right: 10px;
        }
      }
    }
    .applicableGradeMiddle {
      .applicableGradeMiddleUl {
        li {
          float: left;
          margin-right: 10px;
          line-height: 30px;
          span {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #303133;
          }
        }
        li:first-child {
          margin-left: 70px;
        }
      }
    }
    .applicableGradeRight {
      .applicableGradeRightUl {
        li {
          float: left;
          margin-right: 10px;
          line-height: 30px;
          span {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #303133;
          }
        }
        li:first-child {
          margin-left: 70px;
        }
      }
    }
  }
}

.el-dropdown-menu {
  box-shadow: none;
  margin: 0;
  width: 93px;
  background: #ffffff;
  .el-dropdown-item:hover {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    background: #409eff !important;
  }
}
.el-dropdown-menu:hover {
  border: 1px solid #409eff;
}
.el-popper[x-placement^='bottom'] {
  .popper__arrow {
    border: none !important;
  }
}
</style>
