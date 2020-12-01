<template>
  <div class="questType">
    <div class="wrap_flex_normal">
      <span class="title_style">音乐题型:</span>
      <div class="addOne">
        <!-- title -->
        <div class="c_title wrap_flex_normal">
          <span class="span1">题型</span>
          <span>数量</span>
          <span>分值</span>
          <span>合计</span>
          <span class="span5">操作</span>
        </div>
        <!-- 选择框 第一个下拉-->
        <div></div>
        <!-- 添加按钮 -->
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.questType {
  .title_style {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #303133;
  }
  .addOne {
    width: 97.5rem;
    height: 8.875rem;
    background-color: #ffffff;
    margin-left: 0.6875rem;

    .c_title {
      span {
        margin-left: 20.5625rem;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #303133;
      }
      .span1 {
        margin-left: 12.5625rem;
      }
      .span5 {
        margin-left: 11.8125rem;
      }
    }
  }
}
</style>