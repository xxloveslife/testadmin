<template>
  <div class="testpaper-library-container">
    <m-cascader
      :radio="infos[0].title"
      :infos="infos"
      @getItemfromCondition="getItems"
      @changeOperationStyle="changeOpstyle"
      :pageSize="pagesize"
      :totalNum="parseInt(allNum)"
      :currentPage="currentP"
    >
      <!-- 插槽 显示列表内容 -->
      <div class="listItems">
        <div class="header_title">
          <span class="span1">序号</span>
          <span class="span2">{{ `试卷ID` }}</span>
          <span class="span3">试卷名称</span>
          <span class="span4">试卷类型</span>
          <span class="span5">难度</span>
          <span class="span6">教材</span>
          <span class="span7">年级</span>
          <span class="span8">学期</span>
          <span class="span9">{{
            (currentLib == '我的卷库' && '来源') ||
              (currentLib == '校本卷库' && '来源') ||
              '总分/题数'
          }}</span>
          <span class="span10">操作</span>
        </div>
        <div
          class="wrap_flex_center itemhover"
          v-for="(item, i) in (libDatas && libDatas) || []"
          :key="i"
        >
          <div class="listItem wrap_flex_center" @click="itemGetClick(item)">
            <div class="showNum wrap_flex_allcenter">
              <span class="span1">{{ i + 1 }}</span>
            </div>
            <div class="showID wrap_flex_allcenter">
              <span class="span2">{{ item.id }}</span>
            </div>

            <div class="showPapertitle">
              <span class="span3">{{ item.name }}</span>
            </div>
            <div class="showType">
              <span> {{ item.stype }}</span>
              <div class="showType_tig" v-if="item.paper_question_conf.length">
                <span>|</span>
                <span class="text">含笔试</span>
              </div>
            </div>
            <div class="showDiff">
              <span>
                {{
                  (item.difficult == 0 && '不限') ||
                    (item.difficult == 1 && '易') ||
                    (item.difficult == 2 && '中') ||
                    (item.difficult == 3 && '难')
                }}</span
              >
            </div>
            <div class="showMaterial wrap_flex_allcenter">
              <span>
                {{
                  (item.pager_range == null && '全部') ||
                    (item.pager_range && item.pager_range)
                }}</span
              >
            </div>
            <div class="showGrade">
              <span> {{ item.grade }}</span>
            </div>
            <div class="showSemester wrap_flex_allcenter">
              <span>
                {{ (item.semester == -1 && '通用') || item.semester }}</span
              >
            </div>
            <div class="showScore">
              <span>{{ allScoreAndfrom(item) }}</span>
            </div>
          </div>

          <div class="paperOp wrap_flex_center">
            <i
              v-if="showAdd"
              class="add"
              @click="showAddDialog(item, i)"
              title="添加试卷"
            ></i>
            <i
              v-if="showPractice && !item.paper_question_conf.length"
              class="practice"
              @click="showPracticeDialog(item, i)"
              title="布置练习"
            ></i>
            <i v-else class="zhanwei"></i>
            <i
              v-if="windowStatus !== undefined"
              class="examination"
              @click="showExamination(item, i)"
              title="考试"
            ></i>
            <!-- 分享 -->
            <div
              v-if="showShared"
              class="shared"
              @click="showPaperShared(item, i)"
              :class="item.is_share == 1 && 'change_paper_share'"
              :title="(item.is_share == 1 && '已分享') || '点击分享'"
            >
              <span></span>
            </div>
            <!-- 编辑 -->
            <i
              v-if="showEdit"
              class="edit"
              title="编辑"
              @click="
                $router.push({
                  name: 'editPaper',
                  params: { item: item },
                })
              "
            ></i>
            <div
              v-if="item.admin_id == mineId"
              class="delete"
              title="删除"
              @click="deletePaper(item, i)"
            ></div>
            <div class="deleteelse" v-else v-show="currentLib !== '全部'"></div>
            <div
              v-if="showCancleShared"
              class="cancleShared"
              :class="item.is_share == 1 && 'canclePaperShared'"
              :title="item.is_share == 1 && '取消分享'"
              @click="showPaperShared(item, i)"
            >
              <span></span>
            </div>
          </div>
        </div>

        <el-dialog :title="dialog_id" :visible.sync="dialogVisible" width="30%">
          <!-- dialog 显示内容 -->
        </el-dialog>
      </div>
    </m-cascader>
    <!-- dialog of add -->
    <div class="add_dialog">
      <el-dialog title="提示" :visible.sync="add_dialogVisible" width="20%">
        <span>加入我的试卷，你可以重命名该试卷</span>
        <div>
          <span>名称:</span
          ><el-input
            v-model="new_paper_name"
            :placeholder="paper_name"
          ></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="add_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add2mine">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- dialog 布置练习 -->
    <setup-exercises
      class="setup-exercises"
      :practice_dialogVisible="practice_dialogVisible"
      :tempItem="tempItem"
      :currentLib="currentLib"
      :openPopubItem="openPopubItem"
      @close="practice_dialogVisible = false"
    ></setup-exercises>
    <!-- dialog 考试功能  将系统试卷保存到我的试卷中 -->
    <textpaper-tomine
      v-if="
        (openTig !== 1 && currentLib === '') ||
          (openTig !== 1 && currentLib === '全部')
      "
      class="setup-exercises"
      :exam_dialogVisible="exam_dialogVisible"
      :tempItem="tempItem"
      @close="exam_dialogVisible = false"
      @openItem="openItem"
    ></textpaper-tomine>

    <!-- 开始考试 -->
    <start-exam
      class="setup-exercises"
      v-if="
        currentLib === '我的卷库' || currentLib === '校本卷库' || openTig === 1
      "
      @close="close"
      :tempItem="tempItem"
      :startExamText="startExamText"
      :exam_dialogVisible="exam_dialogVisible"
    ></start-exam>

    <!-- dialog 分享 -->
    <div class="paper_share">
      <el-dialog
        title="试卷分享"
        :visible.sync="share_dialogVisible"
        width="20%"
      >
        <span>{{ (this.tempItem.is_share == 1 && '取消') || '' }}分享试卷</span>

        <span slot="footer" class="dialog-footer">
          <el-button @click="share_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="paperShare">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- dialog 删除 -->
    <div class="deletePaper">
      <el-dialog
        title="试卷删除"
        :visible.sync="delPaper_dialogVisible"
        width="20%"
      >
        <!-- <span>{{ (this.tempItem.is_share == 1 && "取消") || "" }}分享试卷</span> -->
        <span>删除试卷</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delPaper_dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="paperDel">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mCascader from '../../../components/common/Mcascader'
import setupExercises from './components/setupExercises'
import textpaperTomine from './components/textpaperTomine'
import startExam from './components/startExam'

import $axios from '../../../api/index'
export default {
  data() {
    return {
      mineId: '',
      openPopubItem: '成功',
      openTig: 0,
      startExamText: '成功',
      // item ID
      dialog_id: '',
      dialogVisible: false,
      windowStatus: window.client,
      infos: [
        {
          title: '卷库',
          attr: '_from',
          category: [
            { label: '全部', mark: '' },
            { label: '我的卷库', mark: 1 },
            { label: '校本卷库', mark: 2 },
          ],
        },
        {
          title: '类别',
          attr: 'category',
          category: [
            { label: '全部', mark: '' },
            { label: '音乐类', mark: 1 },
            { label: '美术类', mark: 2 },
          ],
        },
        {
          title: '教材',
          attr: 'paper_range',
          category: [
            { label: '全部', mark: '' },
            { label: '苏少版', mark: 1 },
            { label: '人教版', mark: 2 },
            { label: '人音版', mark: 3 },
            { label: '人美版', mark: 4 },
            { label: '岭南版', mark: 5 },
            { label: '湘艺版', mark: 6 },
            { label: '苏科版', mark: 7 },
            { label: '鲁教版', mark: 8 },
            { label: '湘美版', mark: 9 },
            { label: '上教版', mark: 10 },
          ],
        },
        {
          title: '年级',
          attr: 'grade',
          category: [
            { label: '全部', mark: '' },
            { label: '一年级', mark: 4 },
            { label: '二年级', mark: 5 },
            { label: '三年级', mark: 6 },
            { label: '四年级', mark: 7 },
            { label: '五年级', mark: 8 },
            { label: '六年级', mark: 9 },
            { label: '七年级', mark: 1 },
            { label: '八年级', mark: 2 },
            { label: '九年级', mark: 3 },
            { label: '高一', mark: 10 },
            { label: '高二', mark: 11 },
            { label: '高三', mark: 12 },
          ],
        },
        {
          title: '学期',
          attr: 'semester',
          category: [
            { label: '全部', mark: '' },
            { label: '上学期', mark: 1 },
            { label: '下学期', mark: 2 },
          ],
        },
        {
          title: '单元(课)',
          attr: 'unit',
          category: [
            { label: '全部', mark: '' },
            { label: '1单元', mark: 1 },
            { label: '2单元', mark: 2 },
            { label: '3单元', mark: 3 },
            { label: '4单元', mark: 4 },
            { label: '5单元', mark: 5 },
            { label: '6单元', mark: 6 },
            { label: '7单元', mark: 7 },
            { label: '8单元', mark: 8 },
            { label: '9单元', mark: 9 },
            { label: '10单元', mark: 10 },
            { label: '11单元', mark: 11 },
            { label: '12单元', mark: 12 },
            { label: '13单元', mark: 13 },
            { label: '14单元', mark: 14 },
            { label: '15单元', mark: 15 },
            { label: '16单元', mark: 16 },
            { label: '17单元', mark: 17 },
            { label: '18单元', mark: 18 },
            { label: '19单元', mark: 19 },
            { label: '20单元', mark: 20 },
            { label: '21单元', mark: 21 },
            { label: '22单元', mark: 22 },
            { label: '23单元', mark: 23 },
            { label: '24单元', mark: 24 },
            { label: '25单元', mark: 25 },
          ],
        },
        // {
        //   title: "音乐类别题",
        //   attr: "question_type",
        //   category: [
        //     { label: "全部", mark: "" },
        //     { label: "单项选择题 ", mark: 1 },
        //     { label: "多项选择题 ", mark: 2 },
        //     { label: "演唱题 ", mark: 3 },
        //     { label: "节奏提 ", mark: 4 },
        //     { label: "判断题 ", mark: 5 },
        //     { label: "连线题 ", mark: 6 },
        //   ],
        // },
        // {
        //   title: "美术类别题",
        //   attr: "art_question_type",
        //   category: [
        //     { label: "全部", mark: "" },
        //     { label: "单项选择题", mark: 1 },
        //     { label: "多项选择题", mark: 2 },
        //     { label: "判断题", mark: 3 },
        //     { label: "连线题", mark: 4 },
        //     { label: "表现题", mark: 5 },
        //     { label: "排序题", mark: 6 },
        //     { label: "拼图题", mark: 7 },
        //     { label: "点线题", mark: 8 },
        //     { label: "填色题", mark: 9 },
        //     { label: "配色题", mark: 10 },
        //     { label: "填空题", mark: 11 },
        //   ],
        // },
        {
          title: '难度',
          attr: 'difficult',
          category: [
            { label: '全部', mark: '' },
            { label: '易', mark: 1 },
            { label: '中', mark: 2 },
            { label: '难', mark: 3 },
          ],
        },
      ],
      // listItems: [1, 2, 3, 4, 5, 6],
      templibDatas: {},
      requestObj: { _from: '', category: '', paper_range: '' },
      pagesize: 20,
      showAdd: true,
      showPractice: true,
      showExam: true,
      showShared: false,
      showEdit: false,
      showDelete: false,
      showCancleShared: false,

      // add_dialog
      add_dialogVisible: false,
      // practice_dialog
      practice_dialogVisible: false,
      // examination_dialog
      exam_dialogVisible: false,
      // paper_share
      share_dialogVisible: false,
      // delete_dialog
      delPaper_dialogVisible: false,

      // 新试卷名  +  试卷名
      paper_name: '',
      new_paper_name: '',

      // 当前所在库
      currentLib: '全部',

      tempItem: {},
      tempI: 0,
    }
  },
  components: { mCascader, setupExercises, textpaperTomine, startExam },
  methods: {
    getItems(val) {
      this.requestObj.keyword = (val.keyword && val.keyword) || ''
      this.requestObj.page = val.currentPage && val.currentPage
      // console.log("requestObjfirst", this.requestObj);
      this.requestObj = {
        ...this.requestObj,
        ...this.reformVal(val, this.infos),
      }

      // 如果_from的值是空字符串 ,传系统题库接口
      if (!this.requestObj._from) {
        // 过滤不需要的属性
        let { is_share, _from, ...params } = this.requestObj
        // console.log("传系统接口", params);

        this.$store
          .dispatch('testlibrary/getSysTestPaperLibResult', params)
          .then((res) => {
            this.templibDatas = res.data && res.data
            // console.log("templibDatas", this.templibDatas);
          })
      } else {
        // console.log("传我的和校本接口", this.requestObj);
        let shared = this.requestObj._from - 1

        this.requestObj.is_share = shared
        this.$store
          .dispatch('testlibrary/getTestPaperLibResult', this.requestObj)
          .then((res) => {
            this.templibDatas = res.data && res.data

            console.log('templibDatas', this.templibDatas)
            this.mineId = this.templibDatas.member_uid
          })
      }
    },

    reformVal(val, infos) {
      // 三个必传字段
      let tempSave = { _from: '', category: '', paper_range: '' }
      // 根据val对象,找到对应的attr 和 传参value
      Object.keys(val).forEach((key) => {
        //题库类型  :   校本题库

        infos.forEach((itemsub, i) => {
          if (itemsub.title == key) {
            itemsub.category.forEach((item, i) => {
              if (item.label == val[key]) {
                tempSave[itemsub.attr] = item.mark
              }
            })
          }
        })
      })

      // console.log("tempSave", tempSave);
      return tempSave
    },

    itemGetClick(item) {
      console.log(item.paper_question_conf.length)
      // console.log('当前在', this.currentLib)
      // console.log(item)
      //  显示dialog
      // this.dialogVisible = true
      // 当前选择试题id
      this.dialog_id = item

      // 请求type值,当前所在lib
      let temType = 1
      if (this.currentLib == '我的卷库') {
        temType = 2
      } else if (this.currentLib == '校本卷库') {
        temType = 3
      }
      //请求网络判断
      $axios
        .post('/examinationPaper/getPaperInfo', {
          paper_id: item.id,
          type: temType,
        })
        .then((res) => {
          // console.log("返回的res", res);
          if (res.code == 0) {
            // 重构res结构
            let newData = {}
            newData = res.data.data
            newData.exam_conf = res.data.exam_conf
            // newData.list = res.data.data.list;
            // newData.exam_conf = res.data.exam_conf;
            console.log('wo de  res ', newData)
            if (res.data.data.list)
              // 点击跳转到试卷详情页
              this.$router.push({
                name: 'paperDetailPage',
                params: {
                  paperInfos: newData,
                  currentLib: this.currentLib,
                  paperconfigs: item.paper_question_conf.length,
                  itemList: item,
                },
              })
          }
        })

      // 点击跳转到试卷详情页
      // this.$router.push({
      //   name: "paperDetailPage",
      //   params: { paperInfos: item },
      // });
    },

    // 改变操作样式
    changeOpstyle(val, pval) {
      if (pval == '卷库') {
        if (val == '校本卷库' || val == '我的卷库' || val == '全部') {
          this.currentLib = val
        }
      }
      // this.currentLib = val;
      if (this.currentLib == '校本卷库') {
        this.showExam = true
        this.showPractice = true
        this.showAdd = true
        this.showCancleShared = true
        this.showShared = false
        this.showDelete = true
        this.showEdit = false
      } else if (this.currentLib == '我的卷库') {
        this.showExam = true
        this.showPractice = true
        this.showShared = true
        this.showEdit = true
        this.showDelete = true
        this.showAdd = false
        this.showCancleShared = false
      } else if (this.currentLib == '全部') {
        this.showAdd = true
        this.showPractice = true
        this.showExam = true
        this.showShared = false
        this.showEdit = false
        this.showDelete = false
        this.showCancleShared = false
      }
    },

    // 添加到我的卷库
    add2mine() {
      let w_shared = 0
      if (this.currentLib == '校本卷库') {
        w_shared = 1
      }
      console.log('currentShared', w_shared)

      // 添加接口
      $axios
        .post('/examinationPaper/addPaperToSystem', {
          name: this.new_paper_name,
          paper_id: this.tempItem.id,
          is_share: w_shared,
        })
        .then((res) => {
          console.log('addres', res)
        })
      this.add_dialogVisible = false
    },

    showAddDialog(item, i) {
      this.tempItem = item
      this.paper_name = this.tempItem.name
      this.add_dialogVisible = true

      // console.log("item", this.tempItem);
    },

    // 布置练习
    makePractice() {
      this.practice_dialogVisible = false
    },
    showPracticeDialog(item, i) {
      console.log(i)
      this.tempItem = item
      this.practice_dialogVisible = true
    },

    // 考试

    showExamination(item, i) {
      this.tempItem = item
      console.log(item)

      // 判断是否是我的卷库和系统卷库页面
      if (this.currentLib === '我的卷库' || this.currentLib === '校本卷库') {
        console.log(111)
        console.log(this.tempItem.id)
        // 先发请求判断
        // 先验证是否符合条件
        this.$store
          .dispatch('testlibrary/getCheckExamStart', {
            paper_id: this.tempItem.id,
          })
          .then((res) => {
            if (res.code === 0) {
              console.log(res)
              this.startExamText = '成功'
            } else {
              this.startExamText = res.msg
              // console.log(title)
            }
            this.exam_dialogVisible = true
          })
      } else {
        this.exam_dialogVisible = true
      }
    },

    // 试卷分享
    paperShare() {
      // 请求分享接口
      $axios
        .post('/examinationPaper/pullSchoolSharePaper', {
          paper_id: this.tempItem.id,
        })
        .then((res) => {
          // console.log("shareres", res);
          if (res.code == 0) {
            // 修改样式
            // 我的卷库的取消分享,改图标样式,  校本卷库的取消分享,删除条目

            if (this.currentLib == '校本卷库') {
              if (this.tempItem.is_share == 1) {
                // this.libDatas[i].is_share = 1;
                const m_index = this.libDatas.findIndex((m_item) => {
                  return m_item.id === this.tempItem.id
                })

                this.libDatas.splice(m_index, 1)
              }
            } else {
              this.libDatas[this.tempI].is_share =
                (this.libDatas[this.tempI].is_share == 0 && 1) || 0
            }
          }
        })
      this.share_dialogVisible = false
    },

    showPaperShared(item, i) {
      this.share_dialogVisible = true
      this.tempItem = item
      this.tempI = i
    },

    // 删除试卷
    deletePaper(item, i) {
      this.delPaper_dialogVisible = true
      this.tempItem = item
    },

    paperDel() {
      // 请求删除的接口

      let w_share =
        (this.currentLib == '我的卷库' && 0) ||
        (this.currentLib == '校本卷库' && 1)

      console.log('w_share', w_share)

      $axios
        .post('/examinationPaper/deletePaper', {
          paper_id: this.tempItem.id,
          is_share: w_share,
        })
        .then((res) => {
          console.log('res', res)
          if (res.code == 0) {
            this.delPaper_dialogVisible = false
            // 删除一条

            const m_index = this.libDatas.findIndex((m_item) => {
              return m_item.id === this.tempItem.id
            })

            this.libDatas.splice(m_index, 1)
          }
        })
    },
    openItem(val) {
      console.log(111, val)
      this.startExamText = val
      this.openTig = 1
      console.log(this.startExamText)
    },
    close() {
      this.exam_dialogVisible = false
      this.openTig = 0
      this.startExamText = '成功'
    },
  },
  created() {
    // this.requestObj = { category: "" };
    //请求网络
    console.log(window.client)
    this.$store
      .dispatch('testlibrary/getSysTestPaperLibResult', this.requestObj)
      .then((res) => {
        this.templibDatas = res.data && res.data
        console.log('templibdata', this.templibDatas)
      })
  },
  computed: {
    libDatas: function() {
      return this.templibDatas.list
    },
    allNum: function() {
      return (this.templibDatas.total && this.templibDatas.total) || 0
    },
    currentP: function() {
      return (this.templibDatas.page && this.templibDatas.page) || 0
    },
    allScoreAndfrom: function() {
      return function(item) {
        if (this.currentLib == '全部') {
          return item.score_total + '分/' + item.question_total + '题'
        } else if (item.source == 1) {
          return '系统'
        } else {
          return '手动'
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';
.testpaper-library-container {
  position: relative;
  .setup-exercises {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.listItems {
  border-radius: 0.5rem;
  // width: 105.25rem;
  background-color: $white;
  .itemhover:hover {
    background-color: #f2f6fc;
  }
  .header_title {
    width: 100%;
    height: 3.75rem;
    display: flex;
    align-items: center;
    div {
      width: 26.5625rem;
    }
    span {
      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
    .span1 {
      margin-left: 1.625rem;
    }
    .span2 {
      margin-left: 5rem;
    }
    .span3 {
      margin-left: 12.0625rem;
    }
    .span4 {
      // margin-right: 1.5625rem;
      margin-left: 10.375rem;
    }
    .span5 {
      margin-left: 6.3125rem;
    }
    .span6 {
      margin-left: 7.25rem;
    }
    .span7 {
      margin-left: 7.3125rem;
    }
    .span8 {
      margin-left: 7.3125rem;
    }
    .span9 {
      margin-left: 6.25rem;
    }
    .span10 {
      margin-left: 10.9375rem;
    }
  }
  .listItem {
    height: 2.875rem;
    width: 100%;
    // margin-right: 5rem;
    // background-color: aquamarine;
    .showNum {
      width: 0.25rem;
      margin-left: 2.375rem;
    }
    .showID {
      width: 2.5625rem;
      margin-left: 5.6875rem;
    }
    .showPapertitle {
      width: 15.4375rem;
      margin-left: 6.25rem;
    }
    .showType {
      margin-left: 4rem;
      width: 5rem;
      .showType_tig {
        display: inline;
        .text {
          color: #67c23a;
        }
      }
    }
    .showDiff {
      margin-left: 6.8125rem;
      width: 1.8125rem;
    }
    .showMaterial {
      margin-left: 6.75rem;
      width: 2.625rem;
    }
    .showGrade {
      margin-left: 6.6875rem;
      width: 2.5625rem;
    }
    .showSemester {
      margin-left: 6.4375rem;
      width: 2.625rem;
    }
    .showScore {
      margin-left: 5.875rem;
      width: 4.625rem;
    }
  }
  .listItem:hover {
    background-color: #f2f6fc;
  }

  .paperOp {
    // width: 14.4375rem;
    // margin-right: 1.75rem;
    // justify-content: space-between;

    // width: 100%;
    // 添加
    .add {
      width: 1.1875rem;
      height: 1.1875rem;
      background-image: url('../../../assets/imgs/testpaperlib/add.png');
      background-size: 1.1875rem 1.1875rem;
      margin-right: 1.75rem;
      // margin-left: 2.0625rem;
      &:hover {
        width: 1.1875rem;
        height: 1.1875rem;
        background-image: url('../../../assets/imgs/testpaperlib/addhover.png');
        background-size: 1.1875rem 1.1875rem;
      }
    }
    .zhanwei {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1.75rem;
    }
    .practice {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/practice.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
    .practice:hover {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/practicehover.png');
      background-size: 1.5rem 1.5rem;
    }

    // 考试
    .examination {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/exam.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
    .examination:hover {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/examhover.png');
      background-size: 1.5rem 1.5rem;
    }
    // 分享
    .shared {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/shared.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
    .shared:hover {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/sharedhover.png');
      background-size: 1.5rem 1.5rem;
    }

    .change_paper_share {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/sharedhover.png');
      background-size: 1.5rem 1.5rem;
    }

    .edit {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/edit.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
    .edit:hover {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/edithover.png');
      background-size: 1.5rem 1.5rem;
    }
    .delete {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/del.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
    .deleteelse {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1.75rem;
    }
    .delete:hover {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/delhover.png');
      background-size: 1.5rem 1.5rem;
    }

    // 取消分享
    .cancleShared {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/cancleShared.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
    .cancleShared:hover {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/cancleSharedhover.png');
      background-size: 1.5rem 1.5rem;
    }
    .canclePaperShared {
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('../../../assets/imgs/testpaperlib/cancleSharedhover.png');
      background-size: 1.5rem 1.5rem;
      margin-right: 1.75rem;
    }
  }
}
</style>
