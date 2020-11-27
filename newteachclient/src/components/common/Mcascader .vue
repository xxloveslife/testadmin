<template>
  <div class="m_cascader">
    <!-- top_row -->
    <div class="wrap_flex top_row">
      <div class="search wrap_flex">
        <input type="text" v-model="input" placeholder="请输入关键词和ID" />

        <button>搜索</button>
      </div>
      <!-- cascader_result & reset button -->
      <div class="wrap_flex top_row_rt">
        <span class="span1">默认选择全部/已选择我的</span>
        <span class="span2">重置筛选</span>
      </div>
    </div>
    <!-- second_row -->
    <div class="wrap_flex_normal second_row">
      <div
        v-for="(item, i) in infos"
        :key="i"
        class="wrap_flex_normal category"
        tabindex="0"
        @click="getCurrentItem(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
    <!-- third_row -->
    <div class="third_row wrap_flex_normal">
      <div class="wrap_flex_center" tabindex="0" autofocus="autofocus">
        <span>全部</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    infos: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    getCurrentItem(item) {
      console.log("click", item);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../style/variable.scss";
.top_row {
  width: 100%;
  height: 2rem;
  .search {
    width: 23.375rem;
    input {
      width: 16.25rem;
      text-indent: 1.6875rem;
      border-radius: 0.25rem;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框

      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #c0c4cc;
    }
    button {
      width: 6.25rem;
      //   background-color: $sky-blue;
      background-color: #409eff;
      border-radius: 0.1875rem;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.top_row_rt {
  margin-right: 1.0625rem;
  .span1 {
    font-size: 0.875rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #909399;
    margin-right: 1rem;
  }
  .span2 {
    font-size: 0.875rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #409eff;
  }
}

.second_row {
  width: 100%;
  height: 2.8125rem;
  border-radius: 0.25rem;
  margin-top: 1.125rem;
  background-color: $white;

  .category:focus {
    background-color: $sky-blue;
    outline: none;
    border-radius: 0.25rem;
  }
  div {
    flex: 1;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    // background-color: blue;
    span {
      font-size: 0.875rem;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #303133;
    }
  }
}

.third_row {
  margin-top: 1.125rem;
  height: 2rem;

  & > div {
    width: 6.25rem;
    border-radius: 0.25rem;
    background-color: $white;
  }
  & > div:focus {
    @extend %div-focus-one;
  }
}
</style>