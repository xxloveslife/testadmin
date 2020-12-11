<template>
  <div class="avatar-uploader-container">
    <div class="boxBox" @click="$refs.uploadFile.click()">
      <div class="imageBox">
        <img class="avatar-uploader-icon" src="@/assets/imgs/jiahao.png" />
        <span class="iconText">{{ text }}</span>
      </div>
    </div>
    <input
      v-if="text === '上传文件'"
      type="file"
      ref="uploadFile"
      hidden
      accept="audio/mpeg"
      @change="uploadFileChangeAudio"
    />
    <input
      v-else
      type="file"
      ref="uploadFile"
      hidden
      accept="image/png,image/jpeg"
      @change="uploadFileChange"
    />
  </div>
</template>

<script>
export default {
  name: 'avatarUploader',
  data() {
    return {
      imageUrl: '',
      // 图片回显地址
      pictureEchoAddress: '1',
      audioUrl: '',
    }
  },
  props: {
    text: {
      type: String,
    },
  },
  methods: {
    uploadFileChange() {
      const localFile = this.$refs.uploadFile.files[0]
      console.log(localFile)
      const reader = new FileReader() // 创建读取文件对象
      reader.readAsDataURL(localFile) // 发起异步请求，读取文件
      const that = this
      reader.onload = function() {
        // console.log(this.result)
        that.pictureEchoAddress = this.result
        // console.log(that.pictureEchoAddress)
      }

      const formData = new window.FormData()
      formData.append('file_name', localFile)
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        if (res || res.code == 0) {
          // console.log(res.data.file_path)
          this.imageUrl = res.data.file_path
          // console.log(this.imageUrl)
          // console.log(this.pictureEchoAddress)
          // 给父组件
          this.passToFather()
        }
      })
    },
    // 给父组件
    passToFather() {
      // console.log(this.pictureEchoAddress)
      // console.log(this.imageUrl)
      // console.log(this.text)
      this.$emit('getImgUrl', {
        imageUrl: this.imageUrl,
        pictureEchoAddress: this.pictureEchoAddress,
        imgText: this.text,
      })
    },
    uploadFileChangeAudio() {
      const localFile = this.$refs.uploadFile.files[0]
      console.log(localFile)
      const formData = new window.FormData()
      formData.append('file_name', localFile)
      this.$http.post('/makeExercises/uploadFile', formData).then((res) => {
        if (res || res.code == 0) {
          // console.log(res.data.file_path)
          this.audioUrl = res.data.file_path
          console.log(this.audioUrl)
          // 给父组件
          this.$emit('getMusicUrl', this.audioUrl)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.avatar-uploader-container {
  display: inline-block;
  .boxBox {
    width: 78px;
    height: 78px;
    background: #ebeef5;
    border-radius: 4px;
    .imageBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 26px;
        height: 26px;
        margin-top: 16px;
        margin-bottom: 5px;
      }
    }
    .iconText {
      width: 62px;
      height: 14px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #909399;
    }
    .avatar {
      width: 78px;
      height: 78px;
      display: block;
    }
  }
}
</style>
