<template>
  <div class="wrap_flex">
    <!-- 左边 -->
    <div>
      <span>1</span>
      <span>2</span>
      <span>3</span>
    </div>
    <!-- 右边 -->
    <div>
      <span>A</span>
      <span>B</span>
      <span>C</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.wrap_flex {
  display: flex;
  span {
    display: block;
    width: 100px;
    height: 100px;
  }
}
</style>