<template>
  <div>
    <div :ref="m_img">test</div>
    <input ref="m_img" type="file" @change="addImg" accept="image/*" multiple />
  </div>
</template>

<script>
// import $axios from "../../../api/index";
export default {
  data() {
    return {};
  },
  methods: {
    addImg() {
      const formData = new window.FormData();

      formData.append("file_name", this.$refs.m_img.files[0]);
      console.log("data", formData.get("file"));
      this.$http.post("/makeExercises/uploadFile", formData).then((res) => {
        console.log("res", res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>