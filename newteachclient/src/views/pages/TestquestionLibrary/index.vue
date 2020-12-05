<template>
  <div class="testquestionlibrary">
    <m-cascader
      :radio="infos[0].title"
      :infos="infos"
      @getItemfromCondition="getItems"
      @changeOperationStyle="changeOpstyle"
      @resetSelect="resetAllSelect"
      :pageSize="pagesize"
      :totalNum="allNum"
      :currentPage="currentP"
    >
      <!-- 插槽 显示列表内容 -->
      <div class="listItems">
        <div class="header_title">
          <span class="span1">序号</span>
          <span class="span2">试题ID</span>
          <span class="span3">试题内容</span>
          <span class="span4">操作</span>
        </div>

        <div
          class="wrap_flex_center itemhover"
          v-for="(item, i) in (libDatas && libDatas) || []"
          :key="i"
        >
          <div class="listItem" @click="itemGetClick(item)">
            <div class="showNum wrap_flex_allcenter">
              <span class="span1">{{ i + 1 }}</span>
            </div>
            <div class="showID wrap_flex_allcenter">
              <span class="span2">{{ item.id }}</span>
            </div>

            <span class="span3">{{ item.content }}</span>
          </div>

          <div class="itemoperation">
            <i
              v-if="showFav"
              class="star"
              @click="isfavorite(item, i)"
              :class="changeStar == item.is_favorite ? 'changeStar' : ''"
            ></i>
            <i
              v-if="showShared"
              class="shared"
              @click="isShared(i)"
              :class="changeShare == isshare ? 'changeShare' : ''"
              :isshare="isshare"
            ></i>
          </div>
        </div>

        <el-dialog
          :title="dialog_id"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <!-- dialog 显示内容 -->
        </el-dialog>
      </div>
    </m-cascader>
  </div>
</template>

<script>
import mCascader from '../../../components/common/Mcascader'
import $axios from '../../../api/index'
export default {
  data() {
    return {
      // item ID
      dialog_id: '',
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
            { label: '节奏提 ', mark: 4 },
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
      listItems: [1, 2, 3, 4, 5, 6],

      //   动态改变star背景图
      //   changes: true,
      isfav: 0, // 后台传的收藏
      changeStar: 1,
      //  分享判断
      isshare: 0,
      changeShare: 1,

      // 收藏和分享的条件判断
      showFav: true,
      showShared: false,

      requestObj: { _from: '', category: '', paper_range: '' },
      templibDatas: {},

      // 分页
      pagesize: 20,
    }
  },
  components: { mCascader },

  methods: {
    getItems(val) {
      this.requestObj.page = val.currentPage && val.currentPage

      this.requestObj = {
        ...this.requestObj,
        ...this.reformVal(val, this.infos),
      }

      console.log('qingqiu ', this.requestObj)

      // 如果_from的值是空字符串 ,传系统题库接口
      if (!this.requestObj._from) {
        // console.log("传系统接口");
        this.$store
          .dispatch('testlibrary/getSysTestLibraryResult', this.requestObj)
          .then((res) => {
            this.templibDatas = res.data && res.data
          })
      } else {
        // console.log("传我的题库和校本题库接口");
        this.$store
          .dispatch('testlibrary/getTestLibraryResult', this.requestObj)
          .then((res) => {
            this.templibDatas = res.data && res.data
          })
      }

      console.log('requestObj', this.requestObj)
    },
    itemGetClick(item) {
      //  显示dialog
      this.dialogVisible = true
      // 当前选择试题id
      this.dialog_id = item
      //请求网络判断
    },

    isfavorite(item, i) {
      //    点击传进来  item.题目id   ,  找到这条数据,修改,并且,发送请求,收藏  ,所以isfav要放个计算属性

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

    isShared(item, i) {},

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
    changeOpstyle(val) {
      // this.showShared = val == "校本题库" && val == "校本题库";

      if (val == '校本题库') {
        this.showShared = true
        this.showFav = false
      } else if (val == '我的题库') {
        this.showShared = true
        this.showFav = true
      } else {
        this.showShared = false
        this.showFav = true
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
    // dialog
    handleClose() {},
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
    this.requestObj = { category: '' }
    //请求网络
    this.$store
      .dispatch('testlibrary/getSysTestLibraryResult', this.requestObj)
      .then((res) => {
        this.templibDatas = res.data && res.data
        console.log('templibdata', this.templibDatas)
      })
  },
}
</script>
<style lang="scss" scoped>
@import '../../../style/variable.scss';

.testquestionlibrary {
  .listItems {
    border-radius: 0.5rem;
    width: 105.25rem;
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
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #303133;
      }
      .span1 {
        margin-left: 1.625rem;
      }
      .span2 {
        margin-left: 9.125rem;
      }
      .span3 {
        margin-left: 35.6875rem;
      }
      .span4 {
        // margin-right: 1.5625rem;
        margin-left: 47.5625rem;
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
      }
      // 收藏
      .star {
        // z-index: 1;
        // position: relative;
        width: 1.125rem;
        height: 1.125rem;

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
          background-image: url('../../../assets/imgs/testquestlibrary/starsc.png');
        }
      }

      // 分享
      .shared {
        width: 1.125rem;
        height: 1.125rem;
        background-image: url('../../../assets/imgs/testquestlibrary/sharedefault.png');
        background-size: 1.125rem;
        background-repeat: no-repeat;
        margin-left: 1.4375rem;
      }
      .shared:hover {
        background-image: url('../../../assets/imgs/testquestlibrary/sharedhover.png');
      }

      .changeShared {
        background-image: url('../../../assets/imgs/testquestlibrary/cancleShareddefault.png');
        &:hover {
          background-image: url('../../../assets/imgs/testquestlibrary/cancleSharedhover.png');
        }
      }
    }
  }
}
</style>
