<template>
  <div class="geo">
    <i class="el-icon-location"></i>
    {{$store.state.geo.position.province}}
    <nuxt-link class="location-change" to="/changeCity">切换城市</nuxt-link>
    <span>[香河，昂阿峰，天津]</span>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
</style>