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
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input
            v-model="ruleForm.code"
            maxlength="4"
            placeholder="验证码"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="ruleForm.pwd"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input
            v-model="ruleForm.cpwd"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register"
            >同意以下协议并注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <div class="term">
            <a
              class="f1"
              href="https://rules-center.meituan.com/rules-detail/4"
              target="_blank"
              >《美团点评用户服务协议》</a
            >
            <a
              class="f1"
              href="https://rules-center.meituan.com/rules-detail/2"
              target="_blank"
              >《美团点评隐私政策》</a
            >
          </div>
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
      statusMsg: "",
      error: "",
      ruleForm: {
        name: "",
        email: "",
        code: "",
        pwd: "",
        cpwd: ""
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
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输密码",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "请确认密码",
            trigger: "blur"
          },
          {
            validator: (rule, value, cb) => {
              if (value === "") {
                cb(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                cb(new Error("两次输入的密码不一致"));
              } else {
                cb();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  mounted() {},
  methods: {
    sendMsg() {
      const s = this;
      let namePass, emailPass;
      if (s.timerid) {
        return false;
      }
      this.$refs["ruleForm"].validateField("name", val => {
        namePass = val;
      });
      s.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["ruleForm"].validateField("email", val => {
        emailPass = val;
      });
      if (!namePass && !emailPass) {
        s.$axios
          .post("/users/verify", {
            username: encodeURIComponent(s.ruleForm.name),
            email: s.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              s.statusMsg = `验证码已经发送，剩余${count--}秒`;
              s.timerid = setInterval(() => {
                s.statusMsg = `验证码已经发送，剩余${count--}秒`;
                if (count === 0) {
                  clearInterval(s.timerid);
                }
              }, 1000);
            } else {
              s.statusMsg = data.msg;
            }
          });
      }
    },
    //注册
    register() {
      const self = this;
      this.$refs["ruleForm"].validate(val => {
        //规则通过
        if (val) {
          self.$axios
            .post("/users/signup", {
              //username, password, email, code
              username: encodeURIComponent(self.ruleForm.name),
              password: CryptoJs.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = "/login";
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
