<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>

    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJs from "crypto-js";
export default {
  layout: "blank",
  data() {
    return {
      error: "",
      ruleForm: {
        name: "",
        pwd: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    //登录
    login() {
      const self = this;
      this.$refs["ruleForm"].validate(val => {
        //规则通过
        if (val) {
          self.$axios
            .post("/users/signin", {
              password: CryptoJs.MD5(self.ruleForm.pwd).toString(),
              username: encodeURIComponent(self.ruleForm.name)
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = "/";
                } else {
                  self.error = data.msg;
                }
              } else {
                self.error = `服务器出错，错误码${status}`;
              }
              setTimeout(() => {
                self.error = "";
              }, 1500);
            });
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
