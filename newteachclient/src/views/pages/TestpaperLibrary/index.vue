
<template>
  <div>
    <m-cascader
      :radio="infos[0].title"
      :infos="infos"
      @getItemfromCondition="getItems"
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
          class="listItem"
          v-for="(item, i) in listItems"
          :key="i"
          @click="itemGetClick(item)"
        >
          {{ item }}
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
          category: [
            "音乐类",
            "美术类",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "0",
            "11",
            "12",
            "13",
            "14",
            "15",
          ],
        },
        { title: "类别", category: ["苏教版", "人教版", "人美版"] },
        { title: "教材", category: ["1", "2", "3"] },
        { title: "年级", category: ["sdf", "sdfdsf", "ij"] },
        { title: "学期", category: ["sdf"] },
        { title: "单元(课)", category: ["oicjv"] },
        { title: "音乐类别题", category: ["sdiojf"] },
        { title: "美术类别题", category: ["soidjf"] },
        { title: "难度", category: ["sdfj"] },
      ],
      listItems: [1, 2, 3, 4, 5, 6],
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
    height: 2.875rem;
    width: 100%;
    // background-color: aquamarine;
  }
  .listItem:hover {
    background-color: #f2f6fc;
  }
}
</style>