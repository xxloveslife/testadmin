<template>
  <div class="practice-library-container">
    练习库
    <setup-exercises
      class="setup-exercises"
      :practice_dialogVisible="practice_dialogVisible"
      :tempItem="openItemList"
      @close="practice_dialogVisible = false"
      :openPopubItem="openPopubItem"
    ></setup-exercises>
    <!-- <setup-exercises
      class="setup-exercises"
      :practice_dialogVisible="practice_dialogVisible"
      :tempItem="tempItem"
      :currentLib="currentLib"
      :openPopubItem="openPopubItem"
      @close="practice_dialogVisible = false"
    ></setup-exercises> -->
  </div>
</template>

<script>
import setupExercises from './components/setupExercises'
export default {
  name: 'practiceLibrary',
  data() {
    return {
      openPopubItem: '成功',
      practice_dialogVisible: false,
      openItemList: {},
      homeworksList: {},
      dataList: {
        // 类别：0全部 1音乐类 2美术类
        category: 0,
        // 	年级：0不限 4一年级 5二年级 6三年级 7四年级 8五年级 9六年级 1七年级 2八年级 3九年级 10高一 11高二 12高三
        grade: 0,
        // 	添加时间 1-最近一周 2-最近一个月 3-最近6个月
        time_type: null,
        // 	练习名称
        name: '',
        // 页数
        page: 1,
      },
    }
  },
  components: { setupExercises },
  created() {
    console.log(this.$route.params.homeworks_id)
    console.log(20186)
    // 获取列表数据 布置作业弹框出现
    this.gethomeworksList(this.dataList)
    if (this.$route.params.homeworks_id) {
      // 打开布置作业弹窗
      this.practice_dialogVisible = true
    }
  },
  mounted() {},
  methods: {
    gethomeworksList(data) {
      this.$store
        .dispatch('practiceLibrary/gethomeworksList', data)
        .then((res) => {
          console.log(res)
          if (res && res.code === 0) {
            this.homeworksList = res.data.data
            console.log(this.homeworksList)
            if (this.$route.params.homeworks_id) {
              this.homeworksList.forEach((element) => {
                if (element.id == this.$route.params.homeworks_id) {
                  this.openItemList = element
                }
              })
            }
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.practice-library-container {
  position: relative;
  .setup-exercises {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
