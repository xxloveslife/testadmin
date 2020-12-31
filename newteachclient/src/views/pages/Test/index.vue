<template>
  <div>
    <div class="mainBox" v-if="false">
      <div class="headerBox">
        <div class="headerBox-text">
          <div class="headerBox-text-hd">APP DOWNLOAD</div>
          <div class="headerBox-line"></div>
          <div class="headerBox-text-ft">艺声行APP</div>
        </div>
      </div>
      <div class="bodyBox">
        <div class="box"></div>
      </div>
      <div ref="testp"><p>我是P标签</p></div>
      <button @click="loginclick">登录</button>
      <!-- <div class="bigBox"></div> -->
    </div>

    <!-- test iframe -->
    <div v-else>
      <div ref="testp" @click="showhref"><p>我是P标签</p></div>
      <iframe
        ref="m_iframe"
        :src="m_src"
        frameborder="no"
        width="100%"
        height="800px"
        marginheight="0"
        marginwidth="0"
        sandbox="allow-scripts allow-top-navigation allow-same-origin allow-forms"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      m_src:
        'http://test.laoshi.yishenhang.com/teach/edit/?sid=33f36325d0795e847ff24c7d6a9337fc',
      // m_src: "http://www.baidu.com",
    }
  },
  methods: {
    loginclick() {
      console.log(111)
      this.$store
        .dispatch('user/getLoginInfo', {
          username: 'cscscs',
          password: 'cscscs',
        })
        .then((res) => {
          // console.log(res);
        })
    },
    showhref() {
      // let tempurl = this.$refs.m_iframe.contentWindow.location.href;
      // let tempurl = this.$refs.m_iframe;
      // console.log("tempurl", tempurl.contentWindow);
      // tempurl.contentWindow;
    },

    // 定时器
    // addOne(val) {
    //   this.val = val ++
    // }

    // let time = setInterval("addOne()", 1000);

    // clearInterval(time);
  },
  mounted() {
    // this.$refs.testp.onclick = function () {
    //   console.log("点击P标签");
    // };
  },
}
</script>
<style lang="scss" scoped>
.mainBox {
  .headerBox {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    height: 345px;
    background-image: url('./images/header.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .headerBox-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .headerBox-text-hd {
        font-size: 56px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
      .headerBox-line {
        width: 110px;
        height: 7px;
        background: #f6f6f6;
      }
      .headerBox-text-ft {
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }
  .bodyBox {
    position: relative;
    height: 951px;
    background-image: url('./images/body.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-29%, 54%);
      height: 164px;
      width: 164px;
      background-color: red;
    }
  }
}
</style>
