<template>
  <div></div>
</template>

<script>
export default {
  layout: 'blank',
  async middleware() {
    const { status, data } = await this.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      location.href = '/'
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
