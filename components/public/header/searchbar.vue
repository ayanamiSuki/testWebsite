<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
          alt=""
        />
      </el-col>
      <el-col class="center" :span="15">
        <div class="wrapper">
          <el-input
            v-model="search"
            class=""
            placeholder="搜索商家或地点"
            @focus="isFocus = true"
            @blur="blur"
            @input="searchChange"
          ></el-input>
          <button class="el-button el-button--primary">
            <i class="el-icon-search"></i>
          </button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>

            <dd v-for="(item, index) in $store.state.geo.hotPlace" :key="index">
              {{ index + item.name }}
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">
              {{ index + item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a
            href="#"
            v-for="(item, index) in $store.state.geo.hotPlace"
            :key="index"
          >
            {{ item.name }}
          </a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="takeout">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="takeout">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="takeout">
              民俗公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="takeout">
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意面单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  data() {
    return {
      search: "",
      isFocus: false,
      hotList: ["火锅", "火锅", "火锅", "火锅"],
      searchList: ["搜索", "搜索", "搜索", "搜索", "搜索"]
    };
  },
  components: {},
  mounted() {},
  methods: {
    blur() {
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    searchChange: _.debounce(async function() {
      let self = this;
      let city = self.$store.state.geo.position.city.replace("市", "");
      if (city == "") {
        city = "天津";
      }
      self.searchList = [];
      let {
        status,
        data: { top }
      } = await self.$axios.get("/search/top", {
        params: {
          input: self.search,
          city
        }
      });
      console.log(top);
      self.searchList = top.slice(0, 10);
    }, 300)
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search;
    },
    isSearchList() {
      return this.isFocus && this.search;
    }
  }
};
</script>
<style lang="scss"></style>
