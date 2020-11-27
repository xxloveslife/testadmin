<template>
  <div>
    <el-radio-group v-model="radio1" @change="changeVal">
      <el-radio-button v-for="(item, i) in infos" :key="i" :label="item">{{
        item
      }}</el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "one",
      infos: ["one", "two", "three", "four"],
    };
  },
  methods: {
    changeVal(val) {
      console.log("val", val);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>