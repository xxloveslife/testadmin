<template>
  <div>
    <iframe
      ref="m_iframe"
      :src="m_src"
      frameborder="no"
      width="100%"
      height="800px"
      marginheight="0"
      marginwidth="0"
      sandbox="allow-scripts allow-top-navigation allow-same-origin allow-forms allow-load"
      style="background-color: #409eff"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    my_src: {
      type: String,
    },
  },
  data() {
    return {
      m_src: this.my_src,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>