<template>
  <div>
    <div>test</div>
    <input
      ref="m_img"
      type="file"
      @change="addImg"
      multiple
      accept="image/png,image/jpeg,audio/mpeg"
    />
    <div>
      <AudioPart id="transferAudio" :audioUrl="url"></AudioPart>
    </div>
  </div>
</template>

<script>
import AudioPart from './components/AudioPart'
// import $axios from "../../../api/index";
export default {
  data() {
    return {
      url: '',
    }
  },
  components: {
    AudioPart,
  },
  methods: {
    addImg() {
      const formData = new window.FormData()

      formData.append('file_name', this.$refs.m_img.files[0])
      console.log('data', formData.get('file'))
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        console.log('res', res)
        this.url = res.data.file_path
        console.log(this.url)
      })
    },
  },
}
</script>
<style lang="scss" scoped></style>
