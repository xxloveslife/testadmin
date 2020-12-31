<template>
  <div>
    <my-iframe :my_src="m_src"></my-iframe>
  </div>
</template>

<script>
import MyIframe from "../../../components/common/MyIframe.vue";
export default {
  components: { MyIframe },
  data() {
    return {
      m_src: "http://test.laoshi.yishenhang.com/admin/studentList/",
    };
  },
};
</script>
<style lang="scss" scoped>
</style>