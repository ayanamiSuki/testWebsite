<template>
  <div class="page-index">
    <main-page v-if="islogin" />
    <structure v-else />
  </div>
</template>

<script>
// import Emenu from "@/components/index/menu";
import mainPage from "@/components/index/mainPage";
import structure from "@/components/temporary/structure";
export default {
  layout: "blank",
  components: {
    mainPage,
    structure
  },
  data() {
    return {
      islogin: 0
    };
  }
};
</script>

<style lang="scss">
// @import "@/assets/css/index/index.scss";
</style>
