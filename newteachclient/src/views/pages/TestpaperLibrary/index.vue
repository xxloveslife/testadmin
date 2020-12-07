
<template>
  <div>
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
          <span class="span2">试题ID</span>
          <span class="span3">试题名称</span>
          <span class="span4">试题类型</span>
          <span class="span5">难度</span>
          <span class="span6">教材</span>
          <span class="span7">年级</span>
          <span class="span8">学期</span>
          <span class="span9">总分/题数</span>
          <span class="span10">操作</span>
        </div>
        <div
          class="listItem wrap_flex_center"
          v-for="(item, i) in (libDatas && libDatas) || []"
          :key="i"
          @click="itemGetClick(item)"
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
            </div>
            <div class="showDiff">
              <span>
                {{
                  (item.difficult == 0 && "不限") ||
                  (item.difficult == 1 && "易") ||
                  (item.difficult == 2 && "中") ||
                  (item.difficult == 3 && "难")
                }}</span
              >
            </div>
            <div class="showMaterial wrap_flex_allcenter">
              <span>
                {{
                  (item.pager_range == null && "全部") ||
                  (item.pager_range && item.pager_range)
                }}</span
              >
            </div>
            <div class="showGrade">
              <span> {{ item.grade }}</span>
            </div>
            <div class="showSemester wrap_flex_allcenter">
              <span> {{ item.semester }}</span>
            </div>
            <div class="showScore">
              <span> {{ item.score_total }}分/{{ item.question_total }}题</span>
            </div>
          </div>

          <div class="paperOp"><span>操作</span></div>
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
import mCascader from "../../../components/common/Mcascader";

export default {
  data() {
    return {
      // item ID
      dialog_id: "",
      dialogVisible: false,
      infos: [
        {
          title: "题库",
          attr: "_from",
          category: [
            { label: "全部", mark: "" },
            { label: "我的卷库", mark: 1 },
            { label: "校本卷库", mark: 2 },
          ],
        },
        {
          title: "类别",
          attr: "category",
          category: [
            { label: "全部", mark: "" },
            { label: "音乐类", mark: 1 },
            { label: "美术类", mark: 2 },
          ],
        },
        {
          title: "教材",
          attr: "paper_range",
          category: [
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
        },
        {
          title: "年级",
          attr: "grade",
          category: [
            { label: "全部", mark: "" },
            { label: "一年级", mark: 4 },
            { label: "二年级", mark: 5 },
            { label: "三年级", mark: 6 },
            { label: "四年级", mark: 7 },
            { label: "五年级", mark: 8 },
            { label: "六年级", mark: 9 },
            { label: "七年级", mark: 1 },
            { label: "八年级", mark: 2 },
            { label: "九年级", mark: 3 },
            { label: "高一", mark: 10 },
            { label: "高二", mark: 11 },
            { label: "高三", mark: 12 },
          ],
        },
        {
          title: "学期",
          attr: "semester",
          category: [
            { label: "全部", mark: "" },
            { label: "上学期", mark: 1 },
            { label: "下学期", mark: 2 },
          ],
        },
        {
          title: "单元(课)",
          attr: "unit",
          category: [
            { label: "全部", mark: "" },
            { label: "1单元", mark: 1 },
            { label: "2单元", mark: 2 },
            { label: "3单元", mark: 3 },
            { label: "4单元", mark: 4 },
            { label: "5单元", mark: 5 },
            { label: "6单元", mark: 6 },
            { label: "7单元", mark: 7 },
            { label: "8单元", mark: 8 },
            { label: "9单元", mark: 9 },
            { label: "10单元", mark: 10 },
            { label: "11单元", mark: 11 },
            { label: "12单元", mark: 12 },
            { label: "13单元", mark: 13 },
            { label: "14单元", mark: 14 },
            { label: "15单元", mark: 15 },
            { label: "16单元", mark: 16 },
            { label: "17单元", mark: 17 },
            { label: "18单元", mark: 18 },
            { label: "19单元", mark: 19 },
            { label: "20单元", mark: 20 },
            { label: "21单元", mark: 21 },
            { label: "22单元", mark: 22 },
            { label: "23单元", mark: 23 },
            { label: "24单元", mark: 24 },
            { label: "25单元", mark: 25 },
          ],
        },
        {
          title: "音乐类别题",
          attr: "question_type",
          category: [
            { label: "全部", mark: "" },
            { label: "单项选择题 ", mark: 1 },
            { label: "多项选择题 ", mark: 2 },
            { label: "演唱题 ", mark: 3 },
            { label: "节奏提 ", mark: 4 },
            { label: "判断题 ", mark: 5 },
            { label: "连线题 ", mark: 6 },
          ],
        },
        {
          title: "美术类别题",
          attr: "art_question_type",
          category: [
            { label: "全部", mark: "" },
            { label: "单项选择题", mark: 1 },
            { label: "多项选择题", mark: 2 },
            { label: "判断题", mark: 3 },
            { label: "连线题", mark: 4 },
            { label: "表现题", mark: 5 },
            { label: "排序题", mark: 6 },
            { label: "拼图题", mark: 7 },
            { label: "点线题", mark: 8 },
            { label: "填色题", mark: 9 },
            { label: "配色题", mark: 10 },
            { label: "填空题", mark: 11 },
          ],
        },
        {
          title: "难度",
          attr: "difficult",
          category: [
            { label: "全部", mark: "" },
            { label: "易", mark: 1 },
            { label: "中", mark: 2 },
            { label: "难", mark: 3 },
          ],
        },
      ],
      listItems: [1, 2, 3, 4, 5, 6],
      templibDatas: {},
      requestObj: { _from: "", category: "", paper_range: "" },
    };
  },
  components: { mCascader },
  methods: {
    getItems(val) {
      //val = m_select
      console.log("val", val);
      this.$store
        .dispatch("testQuestionLibrary/getTestLibraryResult", val)
        .then((res) => {
          // get listItems
        });
    },
    itemGetClick(item) {
      //  显示dialog
      this.dialogVisible = true;
      // 当前选择试题id
      this.dialog_id = item;
      //请求网络判断
    },
  },
  created() {
    // this.requestObj = { category: "" };
    //请求网络
    this.$store
      .dispatch("testlibrary/getSysTestPaperLibResult", this.requestObj)
      .then((res) => {
        this.templibDatas = res.data && res.data;
        console.log("templibdata", this.templibDatas);
      });
  },
  computed: {
    libDatas: function () {
      return this.templibDatas.list;
    },
    allNum: function () {
      return (this.templibDatas.total && this.templibDatas.total) || 0;
    },
    currentP: function () {
      return (this.templibDatas.page && this.templibDatas.page) || 0;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../style/variable.scss";
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
      margin-left: 6rem;
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
      margin-left: 6.6875rem;
    }
    .showPapertitle {
      width: 15.4375rem;
      margin-left: 6.25rem;
    }
    .showType {
      margin-left: 4.875rem;
      width: 2.625rem;
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
    width: 11.4375rem;
  }
}
</style>