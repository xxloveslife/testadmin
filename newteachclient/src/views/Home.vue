<template>
  <div class='home'>
    <m-Sidebar></m-Sidebar>
    <m-Header></m-Header>
    <div class='displaypart'>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
// @ is an alias to /src
import mSidebar from '@/components/common/Sidebar.vue'
import mHeader from '@/components/common/Header.vue'
export default {
  name: 'Home',
  components: {
    mSidebar,
    mHeader,
  },
}
</script>
<style lang="scss" >
  .home{
    position:relative;
    width: 120rem;
    height:67.5rem;
  }
  .displaypart{
    
    position: absolute;
    width: 107.5rem;
    height: 100%;
    border: solid 1px blue;
    top:7.5rem;
    left:12.5rem;
    
  }
</style>
