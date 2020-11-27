
<template>
  <div>
    <m-cascader :radio="infos[0].title" :infos="infos"></m-cascader>
  </div>
</template>

<script>
import mCascader from "../../../components/common/Mcascader2";
export default {
  data() {
    return {
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
    };
  },
  components: { mCascader },
};
</script>
<style lang="scss" scoped>
</style>