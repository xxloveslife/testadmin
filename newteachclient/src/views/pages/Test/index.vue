<template>
  <div class="mainBox">
    <div class="headerBox">
      <div class="headerBox-text">
        <div class="headerBox-text-hd">APP DOWNLOAD</div>
        <div class="headerBox-line"></div>
        <div class="headerBox-text-ft">艺声行APP</div>
      </div>
    </div>
    <div class="bodyBox"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
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
    height: 951px;
    background-image: url('./images/body.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
