<template>
  <div class="m-menu">
    <div @mouseleave="mouseleave">
      <dl class="nav">
        <dt>全部分类</dt>
        <dd
          v-for="(item,index) in $store.state.home.menu"
          :key="index"
          @mouseenter="mouseenter(item)"
        >
          <i :class="item.type"></i>
          {{item.name}}
          <span class="arrow"></span>
        </dd>
      </dl>
      <div class="detail" v-if="kind">
        <template v-for="(item,index) in currentDetail.child">
          <h4 :key="index+'s'">{{item.title}}</h4>
          <span v-for="(item2,index2) in item.child" :key="index2+'a'+index+'s'">{{item2}}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              child: ['代金券', '甜点食品', '火锅', '自助餐']
            }
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              child: ['美团外卖', '甜点食品', '火锅', '自助餐']
            }
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店',
              child: ['酒店', '酒店', '酒店', '酒店']
            }
          ]
        }
      ]
    }
  },
  components: {},
  mounted() {},
  methods: {
    mouseleave() {
      setTimeout(() => {
        this.kind = ''
      }, 200)
    },
    mouseenter(item) {
      this.kind = item.type
    }
  },
  computed: {
    currentDetail() {
      return this.$store.state.home.menu.filter(
        item => item.type == this.kind
      )[0]
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
