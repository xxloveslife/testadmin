<template>
  <div class="testquestionlibrary">
    <m-cascader
      :radio="infos[0].title"
      :infos="infos"
      @getItemfromCondition="getItems"
      @changeOperationStyle="changeOpstyle"
      @resetSelect="resetAllSelect"
      :pageSize="pagesize"
      :totalNum="parseInt(allNum)"
      :currentPage="currentP"
    >
      <!-- 插槽 显示列表内容 -->
      <div class="listItems">
        <div class="header_title">
          <span class="span1">序号</span>
          <span class="span2">{{ `试题ID` }}</span>
          <span class="span3">试题内容</span>
          <span class="span4">操作</span>
        </div>

        <div
          class="wrap_flex_center itemhover"
          v-for="(item, i) in (libDatas && libDatas) || []"
          :key="item.id"
        >
          <div class="listItem" @click="itemGetClick(item, i)">
            <div class="showNum wrap_flex_allcenter">
              <span class="span1">{{ i + 1 }}</span>
            </div>
            <div class="showID wrap_flex_allcenter">
              <span class="span2">{{ item.id }}</span>
            </div>

            <span class="span3">{{ item.content }}</span>
          </div>

          <div class="itemoperation">
            <!-- 收藏 -->
            <i
              v-if="
                (is_sys === 1 && item.is_mine !== '1') ||
                  (is_sys === 2 && item.is_share !== 1) ||
                  is_sys === 0
              "
              class="star"
              @click="isfavorite(item, i)"
              :class="changeStar == item.is_favorite ? 'changeStar' : ''"
              :title="(item.is_favorite == 1 && '已收藏') || '点击收藏'"
            ></i>
            <!-- 编辑 -->
            <i
              v-if="is_sys === 1 && item.is_mine === '1'"
              class="practice"
              @click="editTestQuestions(item, i)"
              title="编辑"
            ></i>

            <i
              v-if="is_sys === 1 && item.is_share !== 2"
              class="shared_wrap"
              :class="changeShare == item.is_share ? 'changeShared' : ''"
              :title="(item.is_share == 1 && '已分享') || '点击分享'"
            >
              <el-button type="text" @click="open(item, i)"
                ><i class="shared"></i
              ></el-button>
            </i>
            <i v-else v-show="is_sys === 1">
              <span class="span"></span>
            </i>

            <!-- 删除 -->
            <i
              v-if="is_sys === 1 && item.is_mine === '1'"
              class="el-icon-delete"
              title="删除"
              @click="deleteQuestions(item)"
            ></i>
            <i v-else v-show="is_sys === 1">
              <span class="span"></span>
            </i>
            <i
              class="cancleshared"
              v-if="is_sys === 2 && item.is_share === 1"
              :title="item.is_share == 1 && '点击取消分享'"
              :class="
                changeCancleShare == item.is_share ? 'changeCancleShared' : ''
              "
              @click="open(item, i)"
            >
              <el-button type="text">
                <i class="cancleshared"></i>
              </el-button>
            </i>
          </div>
        </div>

        <questiontype-preview
          class="questiontype-preview"
          :questiontypeList="dialog_item"
          :dialogVisible="dialogVisible"
          :currentLib="currentLib"
          :incomingAddress="incomingAddress"
          :questionAnalyzeList="questionAnalyzeList"
          :libDatas="libDatas"
          :question_index="question_index"
          @close="dialogVisible = false"
          @btnClick="btnClick"
          :is_sys="is_sys"
          @isfavorite="isfavorite"
          @isshare="open"
        ></questiontype-preview>
      </div>
    </m-cascader>
  </div>
</template>

<script>
import questiontypePreview from '../questiontypePreview'
import mCascader from '../../../components/common/Mcascader'
import $axios from '../../../api/index'
export default {
  data() {
    return {
      is_sys: 0,
      questionAnalyzeList: {},
      question_index: 0,
      incomingAddress: 0,
      // item ID
      dialog_item: {},
      dialogVisible: false,
      infos: [
        {
          title: '题库',
          attr: '_from',
          category: [
            { label: '全部', mark: '' },
            { label: '我的题库', mark: 1 },
            { label: '校本题库', mark: 2 },
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
            { label: '人美版', mark: 3 },
            { label: '岭南版', mark: 4 },
            { label: '鲁教版', mark: 5 },
            { label: '湘美版', mark: 6 },
            { label: '上教版', mark: 7 },
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
        {
          title: '音乐类别题',
          attr: 'question_type',
          category: [
            { label: '全部', mark: '' },
            { label: '单项选择题 ', mark: 1 },
            { label: '多项选择题 ', mark: 2 },
            { label: '演唱题 ', mark: 3 },
            { label: '节奏题 ', mark: 4 },
            { label: '判断题 ', mark: 5 },
            { label: '连线题 ', mark: 6 },
          ],
        },
        {
          title: '美术类别题',
          attr: 'art_question_type',
          category: [
            { label: '全部', mark: '' },
            { label: '单项选择题', mark: 1 },
            { label: '多项选择题', mark: 2 },
            { label: '判断题', mark: 3 },
            { label: '连线题', mark: 4 },
            { label: '表现题', mark: 5 },
            { label: '排序题', mark: 6 },
            { label: '拼图题', mark: 7 },
            { label: '点线题', mark: 8 },
            { label: '填色题', mark: 9 },
            { label: '配色题', mark: 10 },
            { label: '填空题', mark: 11 },
          ],
        },
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

      //   动态改变star背景图
      //   changes: true,
      isfav: 0, // 后台传的收藏,默认0
      changeStar: 1,
      //  分享判断
      isshare: 0,
      changeShare: 1,
      changeCancleShare: 1,

      // 收藏和分享的条件判断
      showFav: true,
      showShared: false,
      showCancleShared: false,

      requestObj: { _from: '', category: '', paper_range: '' },
      templibDatas: {},

      // 分页
      pagesize: 20,

      // 当前是否是校本题库
      currentLib: '全部',
    }
  },
  components: { mCascader, questiontypePreview },

  methods: {
    getItems(val) {
      this.requestObj.keyword = (val.keyword && val.keyword) || ''
      this.requestObj.page = val.currentPage && val.currentPage

      this.requestObj = {
        ...this.requestObj,
        ...this.reformVal(val, this.infos),
      }

      // 如果_from的值是空字符串 ,传系统题库接口
      if (!this.requestObj._from) {
        console.log('传系统接口')
        console.log('request', this.requestObj)
        this.$store
          .dispatch('testlibrary/getSysTestLibraryResult', this.requestObj)
          .then((res) => {
            this.templibDatas = res.data && res.data
            this.is_sys = res.data.is_sys
            console.log('系统接口', res)
          })
      } else {
        console.log('传我的题库和校本题库接口')
        console.log('request', this.requestObj)
        this.$store
          .dispatch('testlibrary/getTestLibraryResult', this.requestObj)
          .then((res) => {
            this.templibDatas = res.data && res.data
            this.is_sys = res.data.is_sys
            console.log('我的题库和校本题库', res)
            console.log('request_result', this.templibDatas)
          })
      }

      // console.log("templibDatas", this.templibDatas);
    },

    //弹窗点击
    itemGetClick(item, i) {
      // 当前所在题库    为data里面的      this.currentLib
      console.log(item.id)
      this.$store
        .dispatch('testlibrary/getQuestionAnalyzeList', {
          question_id: item.id,
        })
        .then((res) => {
          if (res.code === 0) {
            this.questionAnalyzeList = res.data
            // 当前选择试题 item
            this.dialog_item = item
            //  显示dialog
            this.dialogVisible = true
            // console.log(i)
            this.question_index = i
            // console.log(this.libDatas)
            console.log(this.dialog_item)
            // console.log(res.data.cate_name)
            // console.log(res.data.cate_name.length)
          }
        })
    },

    isfavorite(item, i) {
      //    点击传进来  item.题目id   ,  找到这条数据,修改,并且,发送请求,收藏

      // console.log("当前item", this.libDatas[i]);
      if (this.libDatas[i].is_favorite == 0) {
        this.libDatas[i].is_favorite = 1
        // 发送收藏请求
        $axios
          .post('/exercises/favorite', {
            question_id: item.id,
            action: 'add_favorite ',
          })
          .then((res) => {
            // console.log("收藏", res);
          })
      } else {
        this.libDatas[i].is_favorite = 0
        // 发送取消收藏请求
        $axios
          .post('/exercises/favorite', {
            question_id: item.id,
            action: 'del_favorite ',
          })
          .then((res) => {
            // console.log("取消收藏", res);
          })
      }

      //  点击修改
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

    // 改变操作的样式
    changeOpstyle(val, pval) {
      // console.log("vava", val, pval);
      // this.showShared = val == "校本题库" && val == "校本题库";
      if (pval == '题库') {
        if (val == '校本题库' || val == '我的题库' || val == '全部') {
          console.log('change')
          this.currentLib = val
          console.log(this.currentLib)
        }
      }

      // console.log("currentLib", this.currentLib);

      if (this.currentLib == '校本题库') {
        this.showShared = false
        this.showFav = false
        this.showCancleShared = true
      } else if (this.currentLib == '我的题库') {
        this.showShared = true
        this.showFav = true
        this.showCancleShared = false
      } else if (this.currentLib == '全部') {
        this.showShared = false
        this.showFav = true
        this.showCancleShared = false
      }
    },

    // 重置筛选
    resetAllSelect() {
      //请求网络
      this.requestObj = { _from: '', category: '', paper_range: '' }
      this.$store
        .dispatch('testlibrary/getTestLibraryResult', this.requestObj)
        .then((res) => {
          this.templibDatas = res.data && res.data
        })
    },

    // 分享
    open(item, i) {
      const isShared = item.is_share
      // console.log("isShared", isShared);
      this.$confirm(
        `确定${(isShared == 1 && '取消') || ''}分享该题至校本题库吗？`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
        }
      )
        .then(() => {
          // 请求网络
          if (isShared == 0) {
            // 添加分享
            $axios
              .post('/exercises/schoolShareQuestion', {
                question_id: item.id,
                action: 'add',
              })
              .then((res) => {
                // console.log("res", res);
                if (res.code == 0) {
                  // 修改样式
                  // console.log("res", res);
                  if (this.libDatas[i].is_share == 0) {
                    this.libDatas[i].is_share = 1
                  }
                }
                // console.log(res);
              })
          } else if (isShared == 1) {
            // 取消分享
            $axios
              .post('/exercises/schoolShareQuestion', {
                question_id: item.id,
                action: 'del',
              })
              .then((res) => {
                // console.log("cancleres", res);
                if (res.code == 0) {
                  // 修改样式
                  // console.log("res", res);
                  if (this.currentLib === '校本题库') {
                    // console.log("在校本题库");   在校本题库时修改的样式,删除一条
                    if (item.is_share == 1) {
                      // this.libDatas[i].is_share = 1;
                      const m_index = this.libDatas.findIndex((m_item) => {
                        return m_item.id === item.id
                      })

                      this.libDatas.splice(m_index, 1)
                    }
                  } else if (this.libDatas[i].is_share == 1) {
                    // console.log("不在校本题库");
                    this.libDatas[i].is_share = 0
                  }
                }
                // console.log(res);
              })
          }
        })
        .catch(() => {})
    },

    // 取消分享
    cancleShared(item) {
      if (item.is_share == 1) {
        console.log('dianji')
        $axios
          .post('/exercises/schoolShareQuestion', {
            question_id: item.id,
            action: 'del',
          })
          .then((res) => {
            // console.log("res", res);
            if (res.code == 0) {
              // 修改样式, 删除整个item
              console.log('res', res)

              if (item.is_share == 1) {
                // this.libDatas[i].is_share = 1;
                const m_index = this.libDatas.findIndex((m_item) => {
                  return m_item.id === item.id
                })
                console.log('index', m_index)

                this.libDatas.splice(m_index, 1)
                console.log('after', this.libDatas.length)
              }
            }
            // console.log(res);
          })
      }
    },
    // 上一题 下一题
    btnClick(val) {
      // console.log(val)

      this.$store
        .dispatch('testlibrary/getQuestionAnalyzeList', {
          question_id: this.libDatas[val].id,
        })
        .then((res) => {
          if (res.code === 0) {
            this.question_index = val
            this.dialog_item = this.libDatas[val]
            this.questionAnalyzeList = res.data

            // console.log(res.data.cate_name)
            // console.log(res.data.cate_name.length)
          }
        })
    },
    // 将试题从我的题库中删除
    deleteQuestions(item, i) {
      console.log(item.id)
      this.$confirm('确认删除该试题？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store
          .dispatch('testlibrary/deleteQuestion', { question_ids: item.id })
          .then((res) => {
            console.log(res)
            if (res && res.code === 0) {
              const m_index = this.libDatas.findIndex((m_item) => {
                return m_item.id === item.id
              })

              this.libDatas.splice(m_index, 1)
              this.$message.success('删除试题成功')
            } else {
              this.$message.error('删除该试题失败，请稍后重试')
            }
          })
      })
    },
    // 编辑
    editTestQuestions(val) {
      console.log(val)
      this.$router.push({
        name: 'reEditpage',
        params: { id: val.id },
      })
    },
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
  },
  created() {
    console.log('currentLib', this.currentLib)
    // this.requestObj = { category: "" };
    //请求网络
    this.$store
      .dispatch('testlibrary/getSysTestLibraryResult', this.requestObj)
      .then((res) => {
        this.templibDatas = res.data && res.data
        this.is_sys = res.data.is_sys
        console.log('templibdata', res)
        console.log(res.data)
      })
  },
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';

.testquestionlibrary {
  position: relative;
  .questiontype-preview {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .listItems {
    // border-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
    // width: 105.25rem;
    background-color: $white;
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
        width: 1.8125rem;
        margin-left: 1.625rem;
      }
      .span2 {
        width: 2.8125rem;
        margin-left: 9.125rem;
      }
      .span3 {
        width: 3.75rem;
        margin-left: 35.6875rem;
      }
      .span4 {
        width: 2rem;
        // margin-right: 1.5625rem;
        margin-left: 45.5625rem;
      }
    }
    .listItem {
      display: flex;
      height: 2.875rem;
      width: 97%;
      align-items: center;
      //   justify-content: space-between;
      .showNum {
        width: 0.25rem;
        margin-left: 2.375rem;
      }
      .showID {
        width: 2.5625rem;
        margin-left: 9.8125rem;
      }

      .span3 {
        margin-left: 24.375rem;
      }
    }
    .itemhover:hover {
      background-color: #f2f6fc;
    }
    .itemhover {
      .itemoperation {
        display: flex;
        margin-right: 1.625rem;
        .span {
          display: inline-block;
          height: 1.25rem;
          width: 1.125rem;
        }
        i {
          margin-left: 1.4375rem;
        }
      }
      // 收藏
      .star {
        // z-index: 1;
        // position: relative;
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/stardefault.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
      }
      .star:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/starhover.png');
      }

      .changeStar {
        background-image: url('../../../assets/imgs/testquestlibrary/starsc.png');
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/starhover.png');
        }
      }
      .shared_wrap {
        width: 1.125rem;
        height: 1.125rem;

        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/sharedefault.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
        margin-left: 1.4375rem;
      }
      // 删除
      .el-icon-delete {
        font-size: 1.125rem;
        color: #c0c4cc;
      }
      .el-icon-delete:hover {
        color: #409eff;
      }
      // 编辑
      .practice {
        width: 1.35rem;
        height: 1.35rem;
        background-image: url('../../../assets/imgs/testpaperlib/practice.png');
        background-size: 1.35rem 1.35rem;
      }
      .practice:hover {
        width: 1.35rem;
        height: 1.35rem;
        background-image: url('../../../assets/imgs/testpaperlib/practicehover.png');
        background-size: 1.35rem 1.35rem;
      }
      // 分享
      .shared {
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/sharedefault.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
        margin-left: 1.4375rem;
      }
      .shared:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/sharedhover.png');
      }

      .changeShared {
        background-image: url('../../../assets/imgs/testquestlibrary/cancleSharedhover.png');
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
        }
      }

      .cancleshared {
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        // background-image: url("../../../assets/imgs/testquestlibrary/cancleSharedhover.png");
        // background-size: 1.125rem;
        // background-repeat: no-repeat;
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
          background-size: 1.125rem;
          background-repeat: no-repeat;
        }
      }
      .changeCancleShared {
        width: 1.125rem;
        height: 1.125rem;
        cursor: pointer;
        background-image: url('../../../assets/imgs/testquestlibrary/cancleSharedhover.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
          background-size: 1.125rem;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
