<template>
  <div class="re-editpage-container">
    <div class="chooseType">
      <span class="leftTitleText">选择类型 :</span>
      <el-radio-group v-model="textRadio" @change="changeRadioMt">
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
      <span class="leftTitleText">选择题型 :</span>
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
        <div class="leftTitleText">题目内容 :</div>
        <div class="subjectContentItem">
          <el-form-item>
            <el-input
              @input="changeInput"
              type="textarea"
              placeholder="请输入题目内容"
              class="stretchNone"
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
              accept="image/png,image/jpeg"
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

      <!-- 单多选选项组件 -->
      <div class="topic-theme-container">
        <!-- 单多选选项组件 -->
        <div
          class="option-components-box"
          v-if="radioDefault === '单项选择题' || radioDefault === '多项选择题'"
        >
          <div
            class="leftTitle"
            v-if="
              radioDefault === '单项选择题' || radioDefault === '多项选择题'
            "
          >
            选 项 :
          </div>
          <div class="option-components-container">
            <div class="rightBox">
              <div
                class="rightBoxItem"
                v-for="(item, i) in singleChoiceList"
                :key="i"
              >
                <div class="rightBox-header">
                  <span
                    v-if="
                      radioDefault === '单项选择题' ||
                        radioDefault === '多项选择题'
                    "
                    >{{ optionsList[i].options }}.</span
                  >
                  <span v-else>{{ optionsList[i].options1 }}.</span>
                  <el-input
                    class="elInput"
                    type="text"
                    placeholder="请输入题目内容"
                    v-model="item.op_text"
                  />
                  <i class="el-icon-delete" @click="removeAnswer(i)"></i>
                </div>
                <div class="rightBox-body">
                  <el-button
                    v-if="textRadio === '音乐'"
                    type="primary"
                    @click="elButtonClick(item, i)"
                    >图片/音频</el-button
                  >
                  <el-button
                    v-else
                    type="primary"
                    @click="elButtonClick(item, i)"
                    >上传图片</el-button
                  >
                  <el-radio-group
                    v-model="changeradio"
                    @change="singleSelectionChange"
                    v-if="
                      radioDefault !== '连线题' && radioDefault !== '多项选择题'
                    "
                  >
                    <el-radio :label="i" :key="item.content">{{
                      item.checked
                    }}</el-radio>
                  </el-radio-group>
                  <!-- 111   item.content-->
                  <el-checkbox-group
                    v-model="multipleRadio"
                    v-if="radioDefault == '多项选择题'"
                    @change="multipleSelectionChanges"
                  >
                    <el-checkbox :label="i" :key="item.content">{{
                      item.checked
                    }}</el-checkbox>
                  </el-checkbox-group>
                </div>

                <div class="rightBox-footer">
                  <audio-part
                    v-if="
                      item.audioState === 'mp3' || item.audioState === 'wav'
                    "
                    :id="'transferAudio' + i"
                    :audioUrl="item.op_file"
                  ></audio-part>
                  <div v-else class="imgShow">
                    <img :src="item.imgfile" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <input
              type="file"
              ref="file"
              hidden
              @change="fileChange($event)"
              v-if="textRadio === '音乐'"
              accept="image/png,image/jpeg,audio/mpeg,.wav"
            />
            <input
              type="file"
              ref="file"
              hidden
              @change="fileChange"
              v-else
              accept="image/png,image/jpeg"
            />
            <div class="footerBox">
              <div class="boxLeft">
                <el-button type="primary" @click="addAnswer"
                  >新增答案选项</el-button
                >
                <span class="span" v-if="radioDefault === '连线题'"
                  >最多五个选项</span
                >
              </div>
              <div class="boxRight">
                <span v-if="textRadio === '音乐'"
                  >可以点击图片/音频上传答案元素，图片尺寸不超过260*158px,图片格式支持jpg、png&nbsp;
                </span>
                <span v-else
                  >可以点击上传图片上传答案元素，图片尺寸不超过260*158px,图片格式支持jpg、png&nbsp;
                </span>
                <span class="spanItemer">查看图例</span>
              </div>
            </div>
          </div>
        </div>
        <!-- 判断选项 -->
        <!-- <judgment-options v-if="radioDefault === '判断题'"></judgment-options> -->
        <div
          class="judgment-options-container"
          v-if="radioDefault === '判断题'"
        >
          <div class="leftTitle">选 项 :</div>
          <div class="rightBox">
            <div
              class="rightBoxItem"
              v-for="(item, i) in judgmentList"
              :key="i"
            >
              <div class="rightBox-header">
                <span>{{ item.options }}.</span>
                <el-input
                  v-show="item.options === 'A'"
                  class="elInput"
                  type="text"
                  placeholder="正确"
                />
                <el-input
                  v-show="item.options === 'B'"
                  class="elInput"
                  type="text"
                  placeholder="错误"
                />
              </div>
              <div class="rightBox-body">
                <el-radio-group
                  v-model="judgmentradio"
                  @change="judgmentradioChange"
                >
                  <el-radio :label="i" :key="item.content">{{
                    item.checked
                  }}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>

        <!-- 连线题 -->

        <div
          class="connection-question-container"
          v-if="radioDefault === '连线题'"
        >
          <div class="headerBox">
            <div class="leftTitle leftTitleText">第一列 :</div>
            <option-components
              :singleChoiceList="singleChoiceList"
              class="optionBox"
              :changeRadioVal="textRadio"
              :testQuestionlists="testQuestionlists"
              :radioDefault="radioDefault"
            ></option-components>
          </div>
          <div class="footerBox leftTitleText">
            <div class="bodyTitle">第二列 :</div>
            <option-components
              :singleChoiceList="singleChoiceList1"
              class="optionBox"
              :changeRadioVal="textRadio"
              :testQuestionlists="testQuestionlists"
              :radioDefault="radioDefault"
            ></option-components>
          </div>
          <div class="footerBox leftTitleText">
            <div class="footer">答 案 :</div>
            <el-input
              v-model="testQuestionlists.correct"
              class="elInput1"
              type="text"
              placeholder="填写格式，如：1-2 , 2-2 , 3-3"
            />
          </div>
        </div>
        <!-- 图片组件 -->

        <div class="upload-image-container">
          <div class="leftTitle">{{ textRadio }}图片 :</div>
          <div class="rightBox">
            <div class="rightBoxItem">
              <avatar-uploader
                v-show="textRadio === '音乐' && !textList.imageUrl"
                class="avatar-uploader"
                id="staff"
                :text="text"
                @getImgUrl="getImgUrl"
              ></avatar-uploader>
              <!-- v-if="textList.imgText" -->
              <div
                class="textBox rightFooterBoxItem"
                v-if="textRadio === '音乐' && textList.imageUrl"
                @click="showMessageBox(text)"
              >
                <img :src="textList.imageUrl" alt="" />
                <!-- <img src="@/assets/15555.png" alt="" /> -->
              </div>
            </div>
            <div class="rightBoxItem">
              <avatar-uploader
                @getImgUrl="getImgUrl"
                class="avatar-uploader"
                id="notation"
                :text="text1"
                v-show="textRadio === '音乐' && !textList1.imageUrl"
              ></avatar-uploader>
              <!-- v-if="textList.imgText" -->
              <div
                class="textBox rightFooterBoxItem"
                v-if="textRadio === '音乐' && textList1.imageUrl"
                @click="showMessageBox(text1)"
              >
                <img :src="textList1.imageUrl" alt="" />
                <!-- <img src="@/assets/15555.png" alt="" /> -->
              </div>
            </div>
            <div class="rightBoxItem">
              <avatar-uploader
                @getImgUrl="getImgUrl"
                class="avatar-uploader"
                id="images"
                :text="text2"
                v-show="textRadio === '美术' && !textList2.imageUrl"
              ></avatar-uploader>
              <!-- v-if="textList2.imgText" -->
              <div
                class="text2Box rightFooterBoxItem"
                v-if="textRadio === '美术' && textList2.imageUrl"
                @click="showMessageBox(text2)"
              >
                <img :src="textList2.imageUrl" alt="" />
                <!-- <img src="@/assets/15555.png" alt="" /> -->
              </div>
            </div>

            <div class="rightButtonBox">
              <el-button type="primary">查看图例</el-button>
              <span class="classspan"
                >请上传简谱图片，图片限宽670px，高度根据实际题目需要</span
              >
            </div>
          </div>
          <!-- 弹出框 -->
          <message-box
            class="message-box"
            :showMessageBoxText="showMessageBoxText"
            :messageBoxStatus="messageBoxStatus"
            @closeMessage="closeMessage"
            @close="messageBoxStatus = false"
            @removeMessage="removeMessage"
          ></message-box>
        </div>

        <!-- 音乐文件 -->

        <div class="upload-music-container" v-if="textRadio === '音乐'">
          <div class="leftTitle">音乐文件 :</div>
          <div class="rightBox">
            <avatar-uploader
              v-show="!musicUrl"
              class="avatar-uploader"
              id="music"
              :text="textMusic"
              @getMusicUrl="getMusicUrl"
            ></avatar-uploader>
            <div class="audio-part-show" v-if="musicUrl">
              <audio-part
                class="audio-part"
                id="transferAudiopart"
                :audioUrl="musicUrl"
              ></audio-part>
              <i
                class="el-icon-delete"
                @click="messageBoxStatusMUsic = true"
              ></i>
            </div>
            <span>根据题目需求上传乐曲文件</span>
          </div>
          <message-box
            class="message-box"
            :showMessageBoxText="showMessageBoxTextMusic"
            :messageBoxStatus="messageBoxStatusMUsic"
            @closeMessage="closeMessageMUsic"
            @close="messageBoxStatusMUsic = false"
            @removeMessage="removeMessageMusic"
          ></message-box>
        </div>

        <!-- 知识相关 -->

        <div class="knowledge-related-container">
          <div class="leftTitle">知识相关 :</div>
          <div class="rightBoxs">
            <div class="cascader">
              <ul class="cascaderHeader">
                <li
                  class="cascaderHeaderItem"
                  :class="{ chooseCascaderHeaderItem: flag === i }"
                  v-for="(item, i) in knowledgeList"
                  :key="i"
                >
                  <span class="iconBox" @click="iconBoxClick(item, i)">
                    <i class="el-icon-check" v-if="item.state"></i>
                  </span>
                  <span
                    class="cascaderItemTxt"
                    @click="clickCascaderHeaderItem(item, i)"
                    >{{ item.name }}</span
                  >
                </li>
              </ul>
            </div>
            <div class="positionRight">
              <el-button type="primary" class="primary" @click="confirmButton"
                >确定</el-button
              >
              <el-button type="text" @click="removeFilter">重置筛选</el-button>
            </div>
            <div class="cascaderBodyBox" :style="{ height: scrollerHeight }">
              <div class="cascaderBody">
                <div class="cascaderBodyCander">
                  <ul class="cascaderBodyHeader">
                    <li
                      :class="
                        item.state === 0
                          ? 'cascaderBodyTop'
                          : 'cascaderBodyTop1'
                      "
                      v-for="(item, i) in secondKnowledgeList"
                      :key="i"
                    >
                      <span @click="secondBoxClick(item, i)">{{
                        item.name
                      }}</span>
                    </li>
                    <div class="cascaderBodyBt ">
                      <div
                        class="cascaderfooterBody"
                        v-for="(item1, index) in secondKnowledgeList"
                        :key="index"
                      >
                        <ul class="cascaderfooterBodyItem">
                          <li
                            class="cascaderfooterBodyItemList"
                            v-for="(item2, index2) in item1.child"
                            :key="index2"
                          >
                            <span
                              :class="item2.state === 0 ? '' : 'blue'"
                              @click="thirdBoxClick(item2, index2)"
                              >{{ item2.name }}</span
                            >
                            <i
                              class="el-icon-check"
                              v-if="item2.state === 1"
                            ></i>
                          </li>
                        </ul>
                        <div class="borderBox">
                          <span></span>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footerBox">
        <!-- 考点范围 -->
        <div class="testSiteRange">
          <div class="testSiteRangeTitle leftTitleText">考点范围 :</div>
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
          <div class="testSiteRangeTitle leftTitleText">题目解析 :</div>
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
          <div class="testSiteRangeTitle leftTitleText">适用年级 :</div>
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
                    <el-dropdown-menu slot="dropdown" class="dropdown1">
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
                    <el-dropdown-menu slot="dropdown" class="dropdown1">
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
                    <el-dropdown-menu slot="dropdown" class="dropdown1">
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
            <p>请选择考试适用的年级范围</p>
          </div>
          <!-- 中 -->
          <div class="applicableGradeMiddle">
            <ul class="applicableGradeMiddleUl">
              <li>
                <span> 能力层次</span>
              </li>
              <li>
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
                    <el-dropdown-menu slot="dropdown" class="dropdown1">
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
                    <el-dropdown-menu slot="dropdown" class="dropdown1">
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
            <p>请选择试题的能力层次</p>
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
                    <el-dropdown-menu slot="dropdown" class="dropdown1">
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
            <p>请选择试试卷版本</p>
          </div>
          <el-button class="submit" type="primary" @click="submitData"
            >确认提交</el-button
          >
        </div>
      </div>
    </el-form>
    <confirmSubmitPopup
      :confirmSubmitPopupStatus="confirmSubmitPopupStatustwo"
      @reEdit="reEdit"
      @ContinueUploading="ContinueUploading"
      @close="confirmSubmitPopupStatustwo = false"
      @backTopicWarehouse="backTopicWarehouse"
    ></confirmSubmitPopup>
  </div>
</template>

<script>
import confirmSubmitPopup from './confirmSubmitPopup'
import audioPart from './audioPart'
import messageBox from './messageBox'
import avatarUploader from './avatarUploader'
import optionComponents from './optionComponents'
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: '音乐',
          questionType: [
            { question_type: 1, questionTypeName: '单项选择题' },
            { question_type: 2, questionTypeName: '多项选择题' },
            { question_type: 10, questionTypeName: '判断题' },
            { question_type: 11, questionTypeName: '连线题' },
          ],
        },
        {
          id: 2,
          name: '美术',
          questionType: [
            { question_type: 1, questionTypeName: '单项选择题' },
            { question_type: 2, questionTypeName: '多项选择题' },
            { question_type: 3, questionTypeName: '判断题' },
            { question_type: 4, questionTypeName: '连线题' },
            { question_type: 5, questionTypeName: '表现题' },
          ],
        },
      ],

      // 回显列表
      // backShowList: '',
      question_id: null,
      confirmSubmitPopupStatustwo: false,
      // 单选
      changeradio: 0,
      // 多选
      heightLength: 0,
      // 单选list
      singleChoiceList: [
        {
          // 选项
          checked: '设置为正确答案',
          content: 0,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 1,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 2,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 3,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 4,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
      ],
      singleChoiceList1: [
        {
          // 选项
          checked: '设置为正确答案',
          content: 0,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 1,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 2,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 3,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
        {
          // 选项

          checked: '设置为正确答案',
          content: 4,
          op_text: '',
          op_file: '',
          audioState: '',
          imgfile: '',
        },
      ],
      index: 0,
      textRadio: '',
      // 选择类型选择值
      changeRadioVal: '',
      // 选择题型选择值
      changeMultipleChoice: '',
      radioDefault: '',
      // 选择题型数据
      multipleChoiceList: [],
      knowledgeList: [],
      testQuestionlists: {
        // 上传时去掉 \n
        content: '',
        question_type: 1,
        // 考点范围
        answer_range: '',
        // 题目解析
        answer_parse: '',
        correct: null,
        grade: -1,
        paper_range: 1,
        semester: -1,
        unit: 1,
        request: 1,
        difficult: 1,
      },
      music_question_type_list: {
        1: '单项选择题',
        2: '多项选择题',
        10: '判断题',
        11: '连线题',
      },
      art_question_type_list: {
        1: '单项选择题',
        2: '多项选择题',
        3: '判断题',
        4: '连线题',
        5: '表现题',
      },
      // 下拉框list
      dropdownList: {
        // 年级
        gande: [
          {
            titleName: '全部',
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
            titleName: '全学年',
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
            titleName: '1单元',
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
            titleName: '识记',
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
            titleName: '易',
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
                titleName: '苏少版',
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
                titleName: '苏少版',
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
      chooseindex: null,
      radio: 0,
      multipleRadio: [0],
      optionsList: [
        { options: 'A', options1: '1' },
        { options: 'B', options1: '2' },
        { options: 'C', options1: '3' },
        { options: 'D', options1: '4' },
        { options: 'E', options1: '5' },
      ],
      // 判断
      judgmentradio: 0,
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
      ],
      // 图片组件
      showMessageBoxText: '',
      messageBoxStatus: false,
      text: '上传五线谱',
      textList: {},
      text1: '上传简谱',
      textList1: {},
      text2: '上传图片',
      textList2: {},
      // 音乐
      showMessageBoxTextMusic: '文件',
      messageBoxStatusMUsic: false,
      textMusic: '上传文件',
      musicUrl: null,
      answer: {},
      // 第一级全选
      chooseCascaderHeaderItem: 'chooseCascaderHeaderItem',
      flag: null,
      cascaderHeaderRadio: false,
      value: [],
      // 二级数据
      secondKnowledgeList: [],
      // 选择数据数组
      checked_cid: [],
      cid: [],
    }
  },
  computed: {
    marginBottomHeight() {
      return (this.index == 0 ? 20 : 10 + Number(this.index) * 30) + 'px'
    },
    lineHeight() {
      return 32 + Number(this.index) * 30 + 'px'
    },
    scrollerHeight() {
      const num = this.heightLength ? 1 : 0
      return `${num ? 30 * this.heightLength + 90 : 0}` + 'px'
    },
  },
  props: {},
  watch: {
    checked_cid() {
      console.log(this.checked_cid)
    },
    textRadio: function(newV, oldV) {
      this.removeFilter()
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
    audioPart,
    optionComponents,
    messageBox,
    avatarUploader,
    confirmSubmitPopup,
  },
  created() {
    if (this.$route.params.id && this.$route.params.id !== undefined) {
      sessionStorage.setItem('question_id', this.$route.params.id)

      // 如果是修改试题
      this.$store
        .dispatch('makeTestquestion/makeTestQuestionsedit', {
          question_id: this.$route.params.id,
        })
        .then((res) => {
          console.log(res.data)
          var arr = []
          if (res.data.checked_music_category.length) {
            this.checked_cid = res.data.checked_music_category.split(',')
            console.log(this.checked_cid)
            arr = res.data.checked_music_category.split(',')
            console.log(arr)
          }

          this.dropdownList.unit[0].unitList.forEach((ele) => {
            if (ele.command == res.data.question.unit) {
              this.testQuestionlists.unit = ele.command
              this.dropdownList.unit[0].titleName = ele.name
            }
          })

          this.dropdownList.request[0].requestList.forEach((ele) => {
            if (ele.command == res.data.question.request) {
              this.testQuestionlists.request = ele.command
              this.dropdownList.request[0].titleName = ele.name
            }
          })
          this.dropdownList.difficult[0].difficultList.forEach((ele) => {
            if (ele.command == res.data.question.difficult) {
              this.testQuestionlists.difficult = ele.command
              this.dropdownList.difficult[0].titleName = ele.name
            }
          })
          this.dropdownList.semester[0].semesterList.forEach((ele) => {
            if (ele.command == res.data.question.semester) {
              console.log(ele)
              this.testQuestionlists.semester = ele.command
              this.dropdownList.semester[0].titleName = ele.name
            }
          })
          this.dropdownList.gande[0].gradeList.forEach((ele) => {
            if (ele.command == res.data.question.grade) {
              this.testQuestionlists.grade = ele.command
              this.dropdownList.gande[0].titleName = ele.name
            }
          })

          this.testQuestionlists = res.data.question
          var num = res.data.question.question_type
          if (res.data.question.question_type === '1') {
            console.log(res.data)
            // console.log(res.data.question.answer.options.length)
            this.multipleRadio = []
            res.data.question.answer.correct.forEach((e) => {
              this.multipleRadio.push(e - 0)
            })

            // console.log(this.multipleRadio)
            this.singleChoiceList.splice(
              res.data.question.answer.options.length
            )
            this.singleChoiceList1.splice(
              res.data.question.answer.options.length
            )
            // console.log(this.singleChoiceList)
            var textArr = []

            res.data.question.answer.options.forEach((ele, i) => {
              // console.log(this.singleChoiceList[i].op_text)
              // console.log(ele.text)
              textArr.push(ele.text)
            })
            // console.log(textArr)
            for (
              var i = 0;
              i <= res.data.question.answer.options.length - 1;
              i++
            ) {
              this.singleChoiceList[i].op_text = textArr[i]
              this.singleChoiceList1[i].op_text = textArr[i]
            }
            // console.log(res.data.question.answer.correct)
            this.changeradio = Number(res.data.question.answer.correct[0])
            // console.log(Number(res.data.question.answer.correct[0]))
          } else if (res.data.question.question_type === '2') {
            console.log(res.data)
            // console.log(res.data.question.answer.options.length)
            this.multipleRadio = []
            res.data.question.answer.correct.forEach((e) => {
              this.multipleRadio.push(e - 0)
            })

            // console.log(this.multipleRadio)
            this.singleChoiceList.splice(
              res.data.question.answer.options.length
            )
            this.singleChoiceList1.splice(
              res.data.question.answer.options.length
            )
            // console.log(this.singleChoiceList)
            var textArr1 = []

            res.data.question.answer.options.forEach((ele, i) => {
              // console.log(this.singleChoiceList[i].op_text)
              // console.log(ele.text)
              textArr1.push(ele.text)
            })
            // console.log(textArr)
            for (
              var a = 0;
              a <= res.data.question.answer.options.length - 1;
              a++
            ) {
              this.singleChoiceList[a].op_text = textArr1[a]
              this.singleChoiceList1[a].op_text = textArr1[a]
            }
          } else if (
            res.data.question.question_type === '10' ||
            res.data.question.question_type === '3'
          ) {
            this.judgmentradio = Number(res.data.question.answer.correct[0])
            this.singleChoiceList.splice(4)
            this.singleChoiceList1.splice(4)
          } else if (
            res.data.question.question_type === '11' ||
            res.data.question.question_type === '4'
          ) {
            this.testQuestionlists.correct = res.data.question.answer.correct.join(
              ','
            )
            var arr1 = res.data.question.answer.options[0]
            var num1 = arr1.length
            this.singleChoiceList.splice(arr1.length)
            this.singleChoiceList1.splice(arr1.length)
            var arr2 = res.data.question.answer.options[1]
            for (var s = 0; s <= arr1.length - 1; s++) {
              this.singleChoiceList[s].op_text = arr1[s].text
              this.singleChoiceList1[s].op_text = arr2[s].text
            }
          } else {
            this.singleChoiceList.splice(4)
            this.singleChoiceList1.splice(4)
          }

          if (res.data.first_music_cate[0].cate_type === 'music') {
            this.textRadio = '音乐'
            console.log(res.data.question.paper_range)
            this.dropdownList.paperRangeList[0].paperRange[0].paperRangeList.forEach(
              (ele) => {
                if (ele.command == res.data.question.paper_range) {
                  console.log(ele)
                  this.testQuestionlists.paperRange = ele.command
                  this.dropdownList.paperRangeList[0].paperRange[0].titleName =
                    ele.name
                }
              }
            )
            this.$store
              .dispatch('makeTestquestion/getKnowledgePoints', {
                type: 'music',
              })
              .then((res) => {
                // get listItems
                res.msg.forEach((element) => {
                  element.child = Object.values(element.child)
                  // console.log(element.child)
                })
                res.msg.forEach((ele) => {
                  ele.state = 0
                  ele.child.forEach((eles) => {
                    eles.state = 0
                    eles.child.forEach((element) => {
                      element.state = 0
                    })
                  })
                })
                // console.log(res.msg)
                this.knowledgeList = res.msg
                // console.log(this.knowledgeList)
                this.knowledgeList.forEach((ele) => {
                  // console.log(ele.cid)
                  if (arr.indexOf(ele.cid) !== -1) {
                    ele.state = 1
                  }
                  ele.child.forEach((element) => {
                    if (arr.indexOf(element.cid) !== -1) {
                      element.state = 1
                    }
                    element.child.forEach((eles) => {
                      if (arr.indexOf(eles.cid) !== -1) {
                        eles.state = 1
                      }
                    })
                  })
                })
                console.log(arr)
                this.checked_cid = arr
              })
            this.getMultipleChoiceList('音乐')
            this.radioDefault = this.music_question_type_list[
              res.data.question.question_type
            ]
            console.log(res.data.question.answer)
            if (
              res.data.question.answer &&
              res.data.question.answer.wx_music_pic
            ) {
              this.textList.imageUrl = res.data.question.answer.wx_music_pic
            }
            if (
              res.data.question.answer &&
              res.data.question.answer.jp_music_pic
            ) {
              this.textList1.imageUrl = res.data.question.answer.jp_music_pic
            }
            if (
              res.data.question.answer &&
              res.data.question.answer.background_file
            ) {
              this.musicUrl = res.data.question.answer.background_file
            }
          } else {
            this.textRadio = '美术'
            console.log(res.data.question.paper_range)
            this.dropdownList.paperRangeList[1].paperRange[0].paperRangeList.forEach(
              (ele) => {
                if (ele.command == res.data.question.paper_range) {
                  console.log(ele)
                  this.testQuestionlists.paperRange = ele.command
                  this.dropdownList.paperRangeList[1].paperRange[0].titleName =
                    ele.name
                }
              }
            )
            this.getMultipleChoiceList('美术')
            this.$store
              .dispatch('makeTestquestion/getKnowledgePoints', { type: 'art' })
              .then((res) => {
                // get listItems
                res.msg.forEach((element) => {
                  element.child = Object.values(element.child)
                  // console.log(element.child)
                })
                res.msg.forEach((ele) => {
                  ele.state = 0
                  ele.child.forEach((eles) => {
                    eles.state = 0
                    eles.child.forEach((element) => {
                      element.state = 0
                    })
                  })
                })
                // console.log(res.msg)
                this.knowledgeList = res.msg
                // console.log(this.knowledgeList)
                this.knowledgeList.forEach((ele) => {
                  // console.log(ele.cid)
                  if (arr.indexOf(ele.cid) !== -1) {
                    ele.state = 1
                  }
                  ele.child.forEach((element) => {
                    if (arr.indexOf(element.cid) !== -1) {
                      element.state = 1
                    }
                    element.child.forEach((eles) => {
                      if (arr.indexOf(eles.cid) !== -1) {
                        eles.state = 1
                      }
                    })
                  })
                })
                console.log(arr)
                this.checked_cid = arr
              })

            this.radioDefault = this.art_question_type_list[
              res.data.question.question_type
            ]
            this.textList2.imageUrl = res.data.question.answer.art_pic
          }
        })
    } else {
      this.textRadio = '音乐'
      this.radioDefault = '单项选择题'
      this.getknowledgeList('音乐')
      this.singleChoiceList.splice(4)
      this.singleChoiceList1.splice(4)
    }
  },
  methods: {
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
          res.msg.forEach((element) => {
            element.child = Object.values(element.child)
            // console.log(element.child)
          })
          res.msg.forEach((ele) => {
            ele.state = 0
            ele.child.forEach((eles) => {
              eles.state = 0
              eles.child.forEach((element) => {
                element.state = 0
              })
            })
          })
          // console.log(res.msg)
          this.knowledgeList = res.msg
          console.log(this.knowledgeList)
        })
    },
    changeRadioMt(val) {
      console.log(val)
      this.getknowledgeList(val)
      this.textRadio = val
      this.radioDefault = '单项选择题'
      this.musicUrl = ''
      this.textList = this.textList1 = this.textList2 = {}
      this.singleChoiceList.forEach((element) => {
        element.op_text = ''
        element.op_file = ''
        element.audioState = ''
        element.imgfile = ''
      })
      this.singleChoiceList1.forEach((element) => {
        element.op_text = ''
        element.op_file = ''
        element.audioState = ''
        element.imgfile = ''
      })
      this.testQuestionlists = {
        // 上传时去掉 \n
        content: '',
        question_type: 1,
        // 考点范围
        answer_range: '',
        // 题目解析
        answer_parse: '',
        correct: null,
        grade: -1,
        paper_range: 1,
        semester: -1,
        unit: 1,
        request: 1,
        difficult: 1,
      }

      this.dropdownList = {
        // 年级
        gande: [
          {
            titleName: '全部',
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
            titleName: '全学年',
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
            titleName: '1单元',
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
            titleName: '识记',
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
            titleName: '易',
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
                titleName: '苏少版',
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
                titleName: '苏少版',
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
      }
    },
    changeInput() {
      this.index = this.testQuestionlists.content.split('\n').length - 1
    },
    // 上传文件获取文件地址
    subjectContentFileChange() {
      // console.log(this.testQuestionlists.content)
      const localFile = this.$refs.subjectContentFile.files[0]

      // console.log(localFile)
      const formData = new window.FormData()
      formData.append('file_name', localFile)
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        if (res || res.code == 0) {
          // console.log(res.data)

          this.testQuestionlists.content =
            this.testQuestionlists.content +
            '\n' +
            `<img>${res.data.file_path}</img>`
          this.index = this.testQuestionlists.content.split('\n').length - 1
          console.log(this.testQuestionlists.content.split('\n').length - 1)
        }
      })
    },
    // multipleChoiceList默认值
    getMultipleChoiceList(val) {
      if (this.list) {
        this.list.forEach((item, i) => {
          if (item.name === val) {
            this.multipleChoiceList = this.list[i].questionType
          }
        })
      }
    },
    changeSubRadio() {},
    // 单选
    singleSelectionChange(val) {
      console.log(val)
      this.singleSelectionVal = val
    },
    // 多选
    multipleSelectionChanges(val) {
      console.log(val)
      console.log(this.multipleRadio)
    },
    // 上传文件变化时
    fileChange() {
      const localFile = this.$refs.file.files[0]
      var paths = this.$refs.file.value //源文件路径
      // console.log(paths)
      console.log(localFile)

      const reader = new FileReader() // 创建读取文件对象
      reader.readAsDataURL(localFile) // 发起异步请求，读取文件
      const that = this
      reader.onload = function() {
        // 文件读取完成后
        // 读取完成后，将结果赋值给img的src
        // console.log(this.result)

        that.singleChoiceList[that.chooseindex].imgfile = this.result
      }
      // var reader = new FileReader()
      // reader.readAsDataURL(localFile)
      // var url = ''
      // reader.onload = function() {
      //   console.log(reader.result) //获取到base64格式图片
      //   url = reader.result
      // }
      // this.singleChoiceList[this.chooseindex].imgfile = paths

      const formData = new window.FormData()
      formData.append('file_name', localFile)
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        if (res || res.code == 0) {
          // console.log(res.data.file_path)
          this.singleChoiceList[this.chooseindex].op_file = res.data.file_path
          var stringlength = res.data.file_path.length
          var newstring = res.data.file_path.substring(
            stringlength - 3,
            stringlength
          )
          this.singleChoiceList[this.chooseindex].audioState = newstring
        }
      })
    },
    addAnswer() {
      let num = this.singleChoiceList.length
      console.log(num)
      let num1 = this.singleChoiceList[num - 1].content
      let obj = {
        // 选项
        checked: '设置为正确答案',
        content: num1 + 1,
        op_text: '',
        op_file: '',
        audioState: '',
        imgfile: '',
      }
      if (num >= 5) {
        this.$message.error('最多添加5个选项')
      } else {
        console.log(obj)
        this.singleChoiceList.push(obj)
      }
    },
    elButtonClick(item, i) {
      this.$refs.file.click()
      console.log(item, i)
      this.chooseindex = i
    },
    judgmentradioChange(val) {
      console.log(val)
    },
    getImgUrl(val) {
      console.log(val)
      if (val.imgText === this.text) {
        this.textList = val
        this.$store.commit('makeTestquestion/set_wx_music_pic', val.imageUrl)
      } else if (val.imgText === this.text1) {
        this.textList1 = val
        this.$store.commit('makeTestquestion/set_jp_music_pic', val.imageUrl)
      } else {
        this.textList2 = val
        this.$store.commit('makeTestquestion/set_art_pic', val.imageUrl)
      }
    },
    closeMessage(val) {
      console.log(val)
      if (val === '五线谱图片') {
        this.textList = {}
        this.$store.commit('makeTestquestion/set_wx_music_pic', null)
      } else if (val === '简谱图片') {
        this.textList1 = {}
        this.$store.commit('makeTestquestion/set_jp_music_pic', null)
      } else {
        this.textList2 = {}
        this.$store.commit('makeTestquestion/set_art_pic', null)
      }
      this.messageBoxStatus = false

      // document
      //   .querySelector('.avatar-uploader')
      //   .querySelector('.boxBox')
      //   .click()
    },
    removeMessage(val) {
      console.log(val)
      if (val === '五线谱图片') {
        document
          .getElementById('staff')
          .querySelector('.boxBox')
          .click()

        this.textList = {}
      } else if (val === '简谱图片') {
        this.textList1 = {}

        document
          .getElementById('notation')
          .querySelector('.boxBox')
          .click()
      } else {
        this.textList2 = {}

        document
          .getElementById('images')
          .querySelector('.boxBox')
          .click()
      }
      this.messageBoxStatus = false
    },
    showMessageBox(val) {
      this.messageBoxStatus = true
      if (val === this.text) {
        this.showMessageBoxText = '五线谱图片'
      } else if (val === this.text1) {
        this.showMessageBoxText = '简谱图片'
      } else {
        this.showMessageBoxText = '图片'
      }
    },
    getMusicUrl(val) {
      console.log(val)
      this.musicUrl = val
      this.testQuestionlists.background_file_url = val
    },
    closeMessageMUsic() {
      this.musicUrl = null
      this.testQuestionlists.background_file_url = null
      this.messageBoxStatusMUsic = false
    },
    removeMessageMusic() {
      this.musicUrl = null
      this.testQuestionlists.background_file_url = null
      document
        .getElementById('music')
        .querySelector('.boxBox')
        .click()
      this.messageBoxStatusMUsic = false
    },
    clickCascaderHeaderItem(item, i) {
      console.log(item.child)
      this.secondKnowledgeList = item.child
      this.flag = i
      var arrHeight = []
      item.child.forEach((ele) => {
        arrHeight.push(ele.child.length)
      })
      arrHeight.sort(function(a, b) {
        return a - b
      })
      this.heightLength = arrHeight[arrHeight.length - 1]
    },
    iconBoxClick(item, i) {
      // console.log(item)
      // 点击全选添加数据
      if (item.state) {
        item.state = 0
        // 删除checked_cid数组中多个元素
        var arr = []
        arr.push(item.cid)
        item.child.forEach((element) => {
          element.state = 0
          arr.push(element.cid)
          element.child.forEach((ele) => {
            ele.state = 0
            arr.push(ele.cid)
          })
        })
        // this.newArr(arr)
        // console.log(arr.join(','))
        this.removeArrayElements(this.checked_cid, arr.join(','))
        // console.log(this.checked_cid)
      } else {
        item.state = 1
        this.checked_cid.push(item.cid)
        item.child.forEach((element) => {
          element.state = 1
          this.checked_cid.push(element.cid)
          element.child.forEach((ele) => {
            ele.state = 1
            this.checked_cid.push(ele.cid)
          })
        })
        this.newArr(this.checked_cid)
        console.log(this.checked_cid)
      }
    },
    secondBoxClick(item, i) {
      // console.log(item, i)
      if (item.state) {
        item.state = 0
        var arr = []
        arr.push(item.cid)
        item.child.forEach((element) => {
          // console.log(element.name)
          element.state = 0
          arr.push(element.cid)
        })
        // this.newArr(arr)
        // console.log(arr.join(','))
        this.removeArrayElements(this.checked_cid, arr.join(','))
        // console.log(this.checked_cid)
      } else {
        item.state = 1
        this.checked_cid.push(item.cid)
        item.child.forEach((element) => {
          // console.log(element.name)
          element.state = 1
          this.checked_cid.push(element.cid)
        })
        this.newArr(this.checked_cid)
        console.log(this.checked_cid)
      }
      this.invertedSelectionMethod(item.cid)
    },
    thirdBoxClick(item, i) {
      // console.log(item, i)
      if (item.state) {
        // console.log(item.name)
        item.state = 0
        this.removeArrayElements(this.checked_cid, item.name)
        // console.log(this.checked_cid)
      } else {
        item.state = 1
        this.checked_cid.push(item.cid)
        this.newArr(this.checked_cid)
        // console.log(this.checked_cid)
      }

      this.invertedSelectionMethod(item.cid)
    },
    // 反选方法
    invertedSelectionMethod(value) {
      // console.log(value)
      this.knowledgeList.forEach((element, i, arr) => {
        // console.log(arr, i)
        // console.log(element, 1, i)
        var flag = true
        if (element.state === 1) {
          // console.log(element)
          element.child.forEach((ele, idx) => {
            // console.log(ele)
            if (ele.state === 0) {
              return (flag = false)
            }
            ele.child.forEach((ele1, index) => {
              if (ele1.state === 0) {
                return (flag = false)
              }
            })
          })
          // console.log(flag)
          if (!flag) {
            element.state = 0
            flag = true
          } else {
            element.state = 1
            flag = false
          }
        } else {
          // console.log(element, i, 13333)
          // console.log(value)
          // console.log(element, '11111sss')
          var nameArr = []

          element.child.forEach((ele, idx, arr) => {
            // console.log(ele)
            if (ele.cid === value) {
              // console.log(ele)
              // console.log(arr)
              nameArr = arr
            } else {
              // console.log(ele)
              ele.child.forEach((element1, index1, arr1) => {
                // console.log(element1)
                if (element1.cid === value) {
                  nameArr = arr1
                }
              })
              var secendFlog = false
              if (nameArr !== [] && ele.child === nameArr) {
                // console.log(ele)
                nameArr = ele
                ele.child.forEach((ele2) => {
                  // console.log(ele2.name)
                  if (ele2.state === 1) {
                    secendFlog = true
                  }
                })
                // console.log(secendFlog)
                if (!secendFlog) {
                  ele.state = 0
                  secendFlog = true
                } else {
                  ele.state = 1
                  secendFlog = false
                }
              }
              // console.log(nameArr)
              if (nameArr !== [] && ele.name === nameArr.name) {
                // console.log(element)
                nameArr = element
              }
            }
          })
          // console.log(nameArr)
          if (
            (nameArr !== [] && element.child === nameArr) ||
            nameArr.name === element.name
          ) {
            // console.log(element)
            var flag1 = true
            element.child.forEach((ele3, idx) => {
              // console.log(ele.state)
              if (ele3.state === 0) {
                flag1 = false
              }
              // console.log(ele3)
              ele3.child.forEach((ele7) => {
                // console.log(ele7.state)
                if (ele7.state === 0) {
                  flag1 = false
                }
              })
            })
            // console.log(flag1)
            if (!flag1) {
              element.state = 0
              flag1 = true
            } else {
              element.state = 1
              flag1 = false
            }
          }
        }
      })
    },

    // 去重
    newArr(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i] == arr[j]) {
            //如果第一个等于第二个，splice方法删除第二个
            arr.splice(j, 1)
            j--
          }
        }
      }
      return arr
    },
    // 删除数组中的多个元素
    removeArrayElements(originalArr, elements) {
      if (Object.prototype.toString.call(originalArr) != '[object Array]') {
        throw 'originalArr is not Array'
      }
      var ele
      var excludeElementsArr = elements ? elements.split(',') : []
      for (var i = originalArr.length - 1; i >= 0; i--) {
        ele = originalArr[i] + ''
        if (excludeElementsArr.indexOf(ele) > -1) {
          originalArr.splice(i, 1)
        }
      }
      return originalArr
    },
    // 点击确定将选择的数组存入对象中
    confirmButton() {
      console.log(this.checked_cid)
      this.$store.commit('makeTestquestion/set_checked_cid', this.checked_cid)
    },
    removeFilter() {
      // 清空数组
      this.checked_cid = []
      this.secondKnowledgeList = []
      this.flag = null
      this.heightLength = 0
      // 遍历一级数组，所有的勾选为0
      this.knowledgeList.forEach((element) => {
        element.state = 0
        element.child.forEach((ele) => {
          ele.state = 0
          ele.child.forEach((ele1) => {
            ele1.state = 0
          })
        })
      })
      // 若已经点了确定，清空对象里这个数组
      this.$store.commit('makeTestquestion/set_checked_cid', [])
    },
    // 第一个下拉框
    handleCommand1(command) {
      console.log(command)
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
    submitData() {
      console.log(this.testQuestionlists)
      var data = {
        checked_cid: this.checked_cid.join(','),
        content: this.testQuestionlists.content.replace('\n', ''),
        question_id: sessionStorage.getItem('question_id'),
        answer_parse: this.testQuestionlists.answer_parse,
        answer_range: this.testQuestionlists.answer_range,
        grade: this.testQuestionlists.grade,
        paper_range: this.testQuestionlists.paper_range,
        semester: this.testQuestionlists.semester,
        unit: this.testQuestionlists.unit,
        request: this.testQuestionlists.request,
        difficult: this.testQuestionlists.difficult,
        background_file_url: this.musicUrl,
      }
      if (data.content === '') {
        this.$message.error('题目内容不能为空')
      } else {
        if (data.checked_cid === '') {
          this.$message.error('知识相关必须选择')
        } else {
          if (data.answer_parse === '' || data.answer_range === '') {
            this.$message.error('题目解析和考点范围不能为空')
          } else {
            if (this.textRadio === '音乐') {
              let obj1 = {
                jp_music_pic: this.textList1.imageUrl,
                wx_music_pic: this.textList.imageUrl,
              }
              data.answer = obj1
              console.log(data)

              if (this.radioDefault === '单项选择题') {
                data.correct = this.changeradio
                data.op_text = []
                data.op_file = []
                this.singleChoiceList.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.question_type = 1
                console.log(data)
              } else if (this.radioDefault === '多项选择题') {
                data.correct = this.multipleRadio
                data.op_text = []
                data.op_file = []
                this.singleChoiceList.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.question_type = 2
                console.log(data)
              } else if (this.radioDefault === '判断题') {
                data.op_text = ['正确', '错误']
                data.correct = this.judgmentradio
                data.question_type = 10
                console.log(data)
              } else {
                data.op_text = []
                data.op_file = []
                this.singleChoiceList.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.op_text = []
                data.op_file = []
                this.singleChoiceList1.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.question_type = 11
                data.correct = this.testQuestionlists.correct
                console.log(data)
              }

              this.$store
                .dispatch('makeTestquestion/getExercisesMusicType', data)
                .then((res) => {
                  console.log(res)
                  if (res && res.code === 0) {
                    console.log(res)
                    // this.question_id = res.data.question_id
                    this.confirmSubmitPopupStatus = true
                  } else if (res.code === 400) {
                    this.$message.error('选项格式有错误')
                  }
                })
            } else {
              let obj1 = {
                art_pic: this.textList2.imageUrl,
              }
              data.answer = obj1
              console.log(data)
              if (this.radioDefault === '单项选择题') {
                data.correct = this.changeradio
                data.op_text = []
                data.op_file = []
                this.singleChoiceList.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.question_type = 1
                console.log(data)
              } else if (this.radioDefault === '多项选择题') {
                data.correct = this.multipleRadio
                data.op_text = []
                data.op_file = []
                this.singleChoiceList.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.question_type = 2
                console.log(data)
              } else if (this.radioDefault === '判断题') {
                data.op_text = ['正确', '错误']
                data.correct = this.judgmentradio
                data.question_type = 3
                console.log(data)
              } else if (this.radioDefault === '连线题') {
                data.op_text = []
                data.op_file = []
                this.singleChoiceList.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.op_text = []
                data.op_file = []
                this.singleChoiceList1.forEach((ele) => {
                  data.op_text.push(ele.op_text)
                  data.op_file.push(ele.op_file)
                })
                data.question_type = 4
                data.correct = this.testQuestionlists.correct
                console.log(data)
              } else {
                data.question_type = 5
              }
              this.$store
                .dispatch('makeTestquestion/getExercisesArtType', data)
                .then((res) => {
                  console.log(res)
                  if (res && res.code === 0) {
                    console.log(res)
                    // this.question_id = res.data.question_id
                    this.confirmSubmitPopupStatus = true
                  } else if (res.code === 400) {
                    this.$message.error('选项格式有错误')
                  }
                })
            }
            this.confirmSubmitPopupStatustwo = true
          }
        }
      }
    },
    ContinueUploading() {
      this.$router.push('/maketestquestion')
      this.confirmSubmitPopupStatustwo = false
      sessionStorage.removeItem('question_id')
    },
    reEdit() {
      console.log('重新编辑')
      // 重新编辑页面 传入question_id
      // this.$router.push({
      //   name: 'reEditpage',
      //   params: { id: sessionStorage.getItem('question_id') },
      // })
      this.confirmSubmitPopupStatustwo = false
    },
    backTopicWarehouse() {
      console.log('返回题库')
      this.$router.push('/testquestionlibrary')
      sessionStorage.removeItem('question_id')
      this.confirmSubmitPopupStatustwo = false
    },
  },
}
</script>

<style lang="less">
.re-editpage-container {
  font-size: 12px;
  color: #303133;
  .leftTitleText {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  /deep/.stretchNone {
    .el-textarea__inner {
      resize: none;
    }
  }
  .chooseType {
    padding-bottom: 19px;
    .el-radio-group {
      margin-left: 8px;
      .el-radio-button {
        width: 100px;
        height: 32px;

        border-radius: 6px;
        margin-right: 16px;
        .el-radio-button__inner {
          width: 100px;
          height: 32px;
          border-radius: 6px;
          line-height: 20px;
          padding: 5px 0;
          border: none;
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

        border-radius: 6px;
        margin-right: 16px;
        text-align: center;
        .el-radio-button__inner {
          width: 100px;
          height: 32px;
          border-radius: 6px;
          line-height: 20px;
          padding: 5px 0;
          border: none;
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
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
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
        width: 1368px;
        height: 32px;
        background: #ffffff;
        // border: 1px solid #dcdfe6;
        border-radius: 6px;

        .el-input__inner {
          width: 1368px;
          height: 32px;
          position: relative;
          top: -4px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
        }
      }
    }
  }
  .footerBox {
    position: relative;
    p {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
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
      height: 140px;
      overflow: hidden;
      .submit {
        position: relative;
        left: 60px;
        top: 27px;
        width: 93px;
        height: 32px;
        padding: 8px 16px;
        border-radius: 6px;
      }
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
      p {
        position: relative;
        top: 5px;
      }
      .applicableGradeLeftUl {
        overflow: hidden;
        li {
          float: left;
          margin-right: 10px;
        }
      }
    }
    .applicableGradeMiddle {
      position: absolute;
      left: 350px;
      top: 0px;
      p {
        padding-left: 130px;
      }
      .applicableGradeMiddleUl {
        overflow: hidden;
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
      position: absolute;
      left: 680px;
      top: 0px;
      p {
        padding-left: 130px;
      }
      .applicableGradeRightUl {
        overflow: hidden;
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
  .wordDescription {
    position: relative;
  }

  .option-components-box {
    position: relative;
    .leftTitle {
      position: absolute;
      left: 0;
      top: 10px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }
  .option-components-container {
    position: relative;

    .leftTitle {
      position: absolute;
      left: 0;
      top: 13px;
    }
    .rightBox {
      display: flex;
      flex-wrap: wrap;
      margin-left: 56px;
      overflow: hidden;
      .rightBoxItem {
        width: 360px;
        margin-right: 16px;
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
          .el-input {
            width: 316px;
            height: 32px;
            background: #ffffff;
            border-radius: 6px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909399;
            margin-right: 5px;
            .el-input__inner {
              width: 316px;
              height: 32px;
            }
          }

          i {
            width: 16px;
            height: 16px;
            font-size: 16px;
            color: #c0c4cc;
            margin-top: 8px;
          }
          i:hover {
            color: #f56c6c;
          }
        }
        .rightBox-body {
          position: relative;
          left: 25px;
          width: 316px;
          margin-top: 10px;
          display: flex;
          justify-content: space-between;
          .el-button {
            width: 104px;
            height: 32px;
            border-radius: 6px;
            padding: 7px 20px;
          }
        }
        .rightBox-footer {
          .audio-part-wrap {
            margin-left: 25px;
          }
          .imgShow {
            max-width: 260px;
            max-height: 158px;
            margin: 0 0 10px 24px;
            img {
              margin-top: 15px;
              max-height: 138px;
              max-width: 260px;
            }
          }
        }
      }
    }
    .footerBox {
      padding: 0 115px 0 80px;
      display: flex;
      justify-content: space-between;
      .boxLeft {
        .el-button {
          width: 104px;
          height: 32px;
          border-radius: 6px;
          padding: 7px 4px;
        }
        .span {
          margin-left: 11px;
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
      }
      .boxRight {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #909399;
        .spanItemer {
          color: #409eff;
        }
      }
    }
  }
  .judgment-options-container {
    position: relative;
    .leftTitle {
      position: absolute;
      left: 0;
      top: 13px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .rightBox {
      margin-left: 63px;
      display: flex;

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
          .el-input.is-disabled {
            .el-input__inner {
              background-color: #fff;
              border-color: #fff;
              color: #c0c4cc;
            }
          }
          .elInput {
            width: 316px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #909399;
            margin-right: 5px;
            height: 32px;
            background: #ffffff;
            border-radius: 6px;
            .el-input__inner {
              width: 316px;
              height: 32px;
              border: 1px solid #dcdfe6;
            }
          }
        }
        .rightBox-body {
          margin-top: 20px;
          margin-left: 210px;
        }
      }
    }
  }
  .connection-question-container {
    position: relative;
    .leftTitleText {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .leftTitle {
      position: absolute;
      left: 0;
      top: 13px;
    }
    .bodyTitle {
      float: left;
      margin-top: 10px;
    }
    .footerBox {
      position: relative;
      margin-top: 31px;
    }
    .optionBox {
      margin-left: 10px;
    }
    .elInput1 {
      position: absolute;
      top: -10px;
      left: 55px;
      width: 641px;
      height: 32px;
      background: #ffffff;
      border-radius: 6px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
      margin-right: 5px;
      /deep/.el-input__inner {
        width: 641px;
        height: 32px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 6px;
      }
    }
  }
  .upload-music-container {
    position: relative;
    .message-box {
      z-index: 999;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .leftTitle {
      position: absolute;
      left: 0;
      top: 13px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .rightBox {
      margin-left: 60px;
      margin-top: 10px;
      .audio-part-show {
        .audio-part {
          float: left;
          z-index: 999;
        }
        i {
          float: left;
          height: 28px;
          width: 28px;
          z-index: 555;
          text-align: center;
          line-height: 28px;
          margin-left: 10px;
          margin-right: 10px;
          position: relative;
          top: 5px;
        }
      }
    }
    .avatar-uploader {
      margin-right: 10px;
    }
    span {
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
      position: relative;
      top: 11px;
    }
  }
  .upload-image-container {
    position: relative;
    .message-box {
      z-index: 999;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .leftTitle {
      position: absolute;
      left: 0;
      top: 13px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }

    .rightBox {
      position: relative;
      margin-left: 60px;
      margin-top: 50px;

      .rightBoxItem {
        display: inline-block;
        margin-right: 15px;
        .avatar-uploader {
          float: left;
        }
        .rightFooterBoxItem:hover {
          border: 1px solid #409eff;
        }
        .rightFooterBoxItem {
          position: relative;
          height: 100px;
          width: 100px;
          float: left;
          background-color: #fff;
          img {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            max-width: 100px;
            max-height: 100px;
          }
        }
      }
      .rightButtonBox {
        position: absolute;
        bottom: 0;
        display: inline-block;

        .classspan {
          font-size: 12px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #909399;
        }
        .el-button {
          margin-right: 11px;
          width: 77px;
          height: 32px;
          padding: 8px 10px;
          border-radius: 6px;
        }
      }
    }
  }
  .knowledge-related-container {
    position: relative;
    .leftTitle {
      position: absolute;
      left: 0;
      top: 20px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }

    .cascader {
      display: inline-block;
      position: relative;
      width: 85.5rem;
      height: 32px;
      background: #ffffff;
      border-radius: 6px;
      margin-left: 61px;
      margin-top: 15px;
      margin-right: 10px;
    }
    .cascaderHeader {
      height: 100%;
      width: 100%;
      display: flex;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
      .cascaderHeaderItem {
        height: 100%;
        line-height: 32px;
        text-align: center;
        flex: 1;
        border-radius: 6px;
        .iconBox {
          margin-top: 8px;
          display: inline-block;
          margin-right: 7px;
          width: 16px;
          height: 16px;
          border: 1px solid #dcdfe6;
          border-radius: 2px;
          i {
            float: left;
            top: -8px;
            color: #409eff;
          }
        }
        .cascaderItemTxt {
          position: relative;
          top: -5px;
        }
      }
      .chooseCascaderHeaderItem {
        background: #409eff;
        color: #ffffff;
        .iconBox {
          .el-icon-check {
            color: #ffffff;
          }
        }
      }
    }
    .cascaderBodyBox {
      .cascaderBody {
        position: relative;
        margin-left: 62px;
        margin-top: 11px;
        max-width: 1368px;

        border-radius: 6px;
        .cascaderBodyCander {
          width: 1368px;
        }
        .cascaderBodyHeader {
          height: 35px;
          max-width: 85.5rem;
          display: flex;
          text-align: center;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #303133;
          .cascadermax {
            max-width: 1920px;
          }
          .cascaderBodyTop {
            background: #ffffff;
            max-width: 298px;
            height: 35px;
            border-bottom: 1px solid #eaeef9;
            line-height: 35px;
            height: 100%;
            flex: 1;
            font-size: 14px;
          }
          .cascaderBodyTop1 {
            background: #ffffff;
            max-width: 298px;
            height: 35px;
            border-bottom: 1px solid #eaeef9;
            line-height: 35px;
            height: 100%;
            flex: 1;
            font-size: 14px;
            color: #409eff;
          }
        }
        .cascaderBodyBt {
          width: 1368px;
          position: absolute;
          margin-top: 36px;
          display: flex;
          border-radius: 6px;
          .cascaderfooterBody {
            position: relative;
            flex: 1;
            padding-bottom: 30px;
            max-width: 298px;
            background: #ffffff;
            .cascaderfooterBodyItemList {
              margin-top: 12px;
              position: relative;
              i {
                position: absolute;
                right: 60px;
                font-size: 14px;
                color: #409eff;
              }
              .blue {
                color: #409eff;
              }
            }
            .borderBox {
              position: absolute;
              right: 0;
              top: 0;
              padding: 5px 0;
              height: 100%;
              span {
                display: inline-block;
                background-color: #eaeef9;
                height: 100%;
                width: 1px;
              }
            }
          }
          .cascaderfooterBody:last-child {
            .borderBox {
              span {
                width: 0;
              }
            }
          }
        }
      }
    }
    .positionRight {
      display: inline-block;
      position: relative;
      top: -5px;
      .primary {
        width: 75px;
        height: 32px;
        line-height: 7px;
        border-radius: 6px;
      }
    }
  }
}

.dropdown1,
.el-dropdown-menu__item:not(.is-disabled) {
  box-shadow: none;
  font-size: 12px;
  margin: 0;
  width: 53px;
  background: #ffffff;
  text-align: center;
}
.dropdown1 {
  width: 93px;
}
.dropdown1 {
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    background: #409eff !important;
    text-align: center;
  }
}
// &::v-deep.el-select-dropdown {
//   max-height: 500px !important;
//   overflow: auto !important;
// }
.dropdown1:hover {
  border: 1px solid #409eff;
}
.dropdown1 {
  .el-popper .popper__arrow,
  .el-popper .popper__arrow::after {
    display: none;
  }
}

.dropdown1 {
  max-height: 145px;
  overflow: auto;
}
.dropdown1::-webkit-scrollbar {
  display: none;
}
</style>
