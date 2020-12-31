<template>
  <div>
    <paper-detail
      :paperInfos="infos"
      :paperDetailPage="paperDetailPage"
      :currentLib="currentLib"
      :paperconfigs="paperconfigs"
      :itemList="itemList"
    ></paper-detail>
  </div>
</template>

<script>
import paperDetail from '../../../components/common/PaperDetail'

export default {
  data() {
    return {
      infos: {},
      // 从试卷库点进
      paperDetailPage: 1,
    }
  },
  components: {
    paperDetail,
  },
  created() {
    this.infos = this.$route.params.paperInfos
    this.currentLib = this.$route.params.currentLib
    this.paperconfigs = this.$route.params.paperconfigs
    this.itemList = this.$route.params.itemList
    console.log('infos', this.infos)
  },
}
</script>
<style lang="scss" scoped></style>
