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

    <el-form ref="testQuestionlistsForm" :model="testQuestionlists">
      <!-- 题目内容 -->
      <div class="subjectContent" :style="{ marginBottom: marginBottomHeight }">
        <div>题目内容 :</div>
        <div class="subjectContentItem">
          <el-form-item>
            <el-input
              type="textarea"
              placeholder="请输入题目内容"
              v-model="testQuestionlists.content"
              :style="{ height: lineHeight }"
            >
            </el-input>

            <input
              type="file"
              hidden
              ref="subjectContentFile"
              @change="subjectContentFileChange($event)"
              id="uploadFile"
            />
          </el-form-item>
        </div>
        <div class="el-button-right">
          <el-button type="primary" @click="$refs.subjectContentFile.click()"
            >插入图片</el-button
          >
          <span class="changeText">点击上传题目所需要的配图</span>
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
              <el-input
                placeholder="请输入该题目所评测考察的知识点"
                v-model="testQuestionlists.answer_range"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 题目解析 : -->
        <div class="testSiteRange">
          <div class="testSiteRangeTitle">题目解析 :</div>
          <div class="applicableGradeLeft">
            <el-form-item>
              <el-input
                placeholder="请输入该题目的题目分析内容"
                v-model="testQuestionlists.answer_parse"
              ></el-input>
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
                <el-dropdown
                  trigger="click"
                  @command="handleCommand1"
                  class="select-option"
                >
                  <el-button>
                    <span>
                      {{ dropdownList.gande[0].titleName }}
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(grade, i) in dropdownList.gande[0].gradeList"
                        :key="i"
                        :command="grade"
                        >{{ grade.name }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
              <li>
                <el-dropdown
                  trigger="click"
                  @command="handleCommand2"
                  class="select-option"
                >
                  <el-button>
                    <span>
                      {{ dropdownList.semester[0].titleName }}
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(semester, i) in dropdownList.semester[0]
                          .semesterList"
                        :key="i"
                        :command="semester"
                        >{{ semester.name }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
              <li>
                <!-- unit -->
                <el-dropdown
                  trigger="click"
                  @command="handleCommand3"
                  class="select-option"
                >
                  <el-button>
                    <span>
                      {{ dropdownList.unit[0].titleName }}
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(unit, i) in dropdownList.unit[0].unitList"
                        :key="i"
                        :command="unit"
                        >{{ unit.name }}</el-dropdown-item
                      >
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
                <!-- request -->
                <el-dropdown
                  trigger="click"
                  @command="handleCommand4"
                  class="select-option"
                >
                  <el-button>
                    <span>
                      {{ dropdownList.request[0].titleName }}
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(request, i) in dropdownList.request[0]
                          .requestList"
                        :key="i"
                        :command="request"
                        >{{ request.name }}</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </div>
                </el-dropdown>
              </li>
              <li>
                <!-- difficult -->
                <el-dropdown
                  trigger="click"
                  @command="handleCommand5"
                  class="select-option"
                >
                  <el-button>
                    <span>
                      {{ dropdownList.difficult[0].titleName }}
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(difficult, i) in dropdownList.difficult[0]
                          .difficultList"
                        :key="i"
                        :command="difficult"
                        >{{ difficult.name }}</el-dropdown-item
                      >
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
              <li v-for="(item, i) in dropdownList.paperRangeList" :key="i">
                <el-dropdown
                  trigger="click"
                  v-if="item.type === textRadio"
                  @command="handleCommand6"
                  class="select-option"
                >
                  <el-button>
                    <span>
                      {{ item.paperRange[0].titleName }}
                    </span>
                    <img
                      src="@/assets/imgs/multipleChoice/sanjiaoxing.png"
                      alt=""
                    />
                  </el-button>
                  <div class="dropdown">
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(paperRange, index) in item.paperRange[0]
                          .paperRangeList"
                        :key="index"
                        :command="paperRange"
                        >{{ paperRange.name }}</el-dropdown-item
                      >
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
      index: 0,
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
      testQuestionlists: {
        // 上传时去掉 \n
        content: '1212',
        question_type: 1,
        // 考点范围
        answer_range: '',
        // 题目解析
        answer_parse: '',
      },

      // 下拉框list
      dropdownList: {
        // 年级
        gande: [
          {
            titleName: '年级',
            gradeList: [
              { name: '全部', command: -1 },
              { name: '一年级', command: 4 },
              { name: '二年级', command: 5 },
              { name: '三年级', command: 6 },
              { name: '四年级', command: 7 },
              { name: '五年级', command: 8 },
              { name: '六年级', command: 9 },
              { name: '七年级', command: 1 },
              { name: '八年级', command: 2 },
              { name: '九年级', command: 3 },
              { name: '高一', command: 10 },
              { name: '高二', command: 11 },
              { name: '高三', command: 12 },
            ],
          },
        ],
        // 学期
        semester: [
          {
            titleName: '学期',
            semesterList: [
              { name: '全学年', command: -1 },
              { name: '上学期', command: 1 },
              { name: '下学期', command: 2 },
            ],
          },
        ],

        // 单元
        unit: [
          {
            titleName: '单元',
            unitList: [
              { name: '1单元', command: 1 },
              { name: '2单元', command: 2 },
              { name: '3单元', command: 3 },
              { name: '4单元', command: 4 },
              { name: '5单元', command: 5 },
              { name: '6单元', command: 6 },
              { name: '7单元', command: 7 },
              { name: '8单元', command: 8 },
              { name: '9单元', command: 9 },
              { name: '10单元', command: 10 },
              { name: '11单元', command: 11 },
              { name: '12单元', command: 12 },
              { name: '13单元', command: 13 },
              { name: '14单元', command: 14 },
              { name: '15单元', command: 15 },
              { name: '16单元', command: 16 },
              { name: '17单元', command: 17 },
              { name: '18单元', command: 18 },
              { name: '19单元', command: 19 },
              { name: '20单元', command: 20 },
              { name: '21单元', command: 21 },
              { name: '22单元', command: 22 },
              { name: '23单元', command: 23 },
              { name: '24单元', command: 24 },
              { name: '25单元', command: 25 },
            ],
          },
        ],

        // request 识记
        request: [
          {
            titleName: '层次',
            requestList: [
              { name: '识记', command: 1 },
              { name: '理解', command: 2 },
              { name: '掌握', command: 3 },
              { name: '运用', command: 4 },
            ],
          },
        ],

        // 难度
        difficult: [
          {
            titleName: '难度',
            difficultList: [
              { name: '易 ', command: 1 },
              { name: '中', command: 2 },
              { name: '难', command: 3 },
            ],
          },
        ],

        //版本
        paperRangeList: [
          // 1苏少版 2人教版 3人音版 6湘艺版 8鲁教版 10上教版
          {
            type: '音乐',
            paperRange: [
              {
                titleName: '版本',
                paperRangeList: [
                  { name: '苏少版 ', command: 1 },
                  { name: '人教版 ', command: 2 },
                  { name: '人音版 ', command: 3 },
                  { name: '湘艺版 ', command: 6 },
                  { name: '鲁教版 ', command: 8 },
                  { name: '上教版 ', command: 10 },
                ],
              },
            ],
          },
          // 1苏少版 2人教版 4人美版 5岭南版 8鲁教版 9湘美版 10上教版
          {
            type: '美术',
            paperRange: [
              {
                titleName: '版本',
                paperRangeList: [
                  { name: '苏少版 ', command: 1 },
                  { name: '人教版 ', command: 2 },
                  { name: '人美版 ', command: 4 },
                  { name: '岭南版 ', command: 5 },
                  { name: '鲁教版 ', command: 8 },
                  { name: '湘美版 ', command: 9 },
                  { name: '上教版 ', command: 10 },
                ],
              },
            ],
          },
        ],
      },
    }
  },
  created() {
    this.getknowledgeList('音乐')
  },
  mounted() {
    this.getMultipleChoiceList(this.radio)
    this.testQuestionlists.changeRadioVal = this.radio
    console.log(this.testQuestionlists)
  },
  props: {
    list: {
      type: Array,
    },
    radio: {
      type: String,
    },
  },
  computed: {
    marginBottomHeight() {
      console.log(this.index)
      return (this.index == 0 ? 20 : 10 + Number(this.index) * 30) + 'px'
    },
    lineHeight() {
      console.log(this.index)
      return 32 + Number(this.index) * 30 + 'px'
    },
  },
  methods: {
    changeRadio(val) {
      this.changeRadioVal = val
      this.radioDefault = '单项选择题'
      this.testQuestionlists.question_type = 1
      this.testQuestionlists.changeRadioVal = val
      this.dropdownList.paperRangeList.forEach((ele) => {
        // console.log(ele)
        return (ele.paperRange[0].titleName = '版本')
      })

      this.getknowledgeList(val)
    },
    //
    getknowledgeList(val) {
      var type = null
      if (val === '音乐') {
        type = 'music'
      } else {
        type = 'art'
      }
      const data = { type: type }
      // 发起请求获取不同数据
      this.$store
        .dispatch('makeTestquestion/getKnowledgePoints', data)
        .then((res) => {
          // get listItems
          console.log(res.msg)
        })
    },
    changeSubRadio(val) {
      var i = 1
      this.changeMultipleChoice = val
      this.list.forEach((ele) => {
        if (ele.name === this.textRadio) {
          ele.questionType.forEach((element) => {
            if (element.questionTypeName === val) {
              i = element.question_type
            }
          })
        }
      })
      this.testQuestionlists.question_type = i
      console.log(this.testQuestionlists)
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
    // 第一个下拉框
    handleCommand1(command) {
      // console.log(command)
      this.testQuestionlists.grade = command.command
      // console.log(this.testQuestionlists)
      this.dropdownList.gande[0].titleName = command.name
    },
    // semester 第二个下拉框
    handleCommand2(command) {
      // console.log(command)
      this.testQuestionlists.semester = command.command
      // console.log(this.testQuestionlists)
      this.dropdownList.semester[0].titleName = command.name
    },
    // unit 第三个下拉框
    handleCommand3(command) {
      // console.log(command)
      this.testQuestionlists.unit = command.command
      // console.log(this.testQuestionlists)
      this.dropdownList.unit[0].titleName = command.name
    },
    // request 第四个下拉框
    handleCommand4(command) {
      console.log(command)
      this.testQuestionlists.request = command.command
      console.log(this.testQuestionlists)
      this.dropdownList.request[0].titleName = command.name
    },
    // difficult 第五个下拉框
    handleCommand5(command) {
      console.log(command)
      this.testQuestionlists.difficult = command.command
      console.log(this.testQuestionlists)
      this.dropdownList.difficult[0].titleName = command.name
    },
    // paperRange  第六个下拉框
    handleCommand6(command) {
      this.testQuestionlists.paper_range = command.command
      this.dropdownList.paperRangeList.forEach((ele) => {
        return (ele.paperRange[0].titleName = command.name)
      })
    },
    // 上传文件获取文件地址
    subjectContentFileChange() {
      this.index++
      // console.log(this.testQuestionlists.content)
      const localFile = this.$refs.subjectContentFile.files[0]

      // console.log(localFile)
      const formData = new window.FormData()
      formData.append('file_name', localFile)
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        if (res || res.code == 0) {
          console.log(res.data)
          console.log(this.testQuestionlists.content)
          this.testQuestionlists.content =
            this.testQuestionlists.content + '\n' + res.data.file_path
        }
      })
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
.multiple-choice-container {
  padding: 0 44px;
  font-size: 12px;
  color: #303133;
  .chooseType {
    padding-bottom: 19px;
    .el-radio-group {
      margin-left: 8px;
      .el-radio-button {
        width: 100px;
        height: 32px;
        background: #409eff;
        border-radius: 6px;
        margin-right: 16px;
        .el-radio-button__inner {
          width: 100px;
          height: 32px;
          border-radius: 6px;
          line-height: 20px;
          padding: 5px 0;
        }
      }
    }
  }

  .multipleChoice {
    padding-bottom: 19px;
    .el-radio-group {
      margin-left: 8px;
      .el-radio-button {
        width: 100px;
        height: 32px;
        background: #409eff;
        border-radius: 6px;
        margin-right: 16px;
        text-align: center;
        .el-radio-button__inner {
          width: 100px;
          height: 32px;
          border-radius: 6px;
          line-height: 20px;
          padding: 5px 0;
        }
      }
    }
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
    // margin-bottom: 20px;
    div {
      font-size: 12px;
      line-height: 40px;
    }
    .el-textarea {
      width: 640px;
      // height: 32px;
      background: #ffffff;
      border: 1px solid #409eff;
      border-radius: 6px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      margin-right: 15px;
      .el-textarea__inner {
        height: 100%;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 25px;
        color: #909399;
      }
      // .el-button {
      //   position: absolute;
      //   left: 761px;
      // }
    }
    .el-button-right {
      position: absolute;
      top: 10px;
      left: 718px;

      .el-button {
        position: relative;
        top: -4px;
        margin-right: 17px;
        width: 83px;
        height: 33px;
        padding: 7px 0;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
      .changeText {
        position: relative;
        top: -4px;
      }
    }
    .subjectContentItem {
      position: absolute;
      top: 0;
      left: 62px;
      display: flex;
      flex-direction: column;
      .el-form-item {
        margin-bottom: 14px;
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
        .el-input__inner {
          width: 640px;
          height: 32px;
          position: relative;
          top: -4px;
        }
      }
      .el-button {
        position: relative;
        top: -4px;
        margin-right: 17px;
        width: 83px;
        height: 33px;
        padding: 7px 0;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }
      .changeText {
        position: relative;
        top: -4px;
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
            width: 8px;
            height: 4px;
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
.el-dropdown__menu,
.el-dropdown-menu__item:not(.is-disabled) {
  box-shadow: none;
  font-size: 12px;
  margin: 0;
  width: 53px;
  background: #ffffff;
  text-align: center;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  background: #409eff !important;
  text-align: center;
}
// &::v-deep.el-select-dropdown {
//   max-height: 500px !important;
//   overflow: auto !important;
// }
.el-dropdown-menu:hover {
  border: 1px solid #409eff;
}
.el-popper .popper__arrow,
.el-popper .popper__arrow::after {
  display: none;
}
</style>
