<template>
  <div>
    <div class="login_box_card">
      <div class="login_box_card_title">
        一起推推广管理平台
      </div>
      <div class="login_box_card_content">
        <div class="login_logo">
          <img class="logoi" src="@/images/logo.png" alt />
        </div>
        <div class="login-form">
          <div class="login_form_title">
            <span class="login_form_title_content">账号登录</span>
          </div>
          <el-form :rules="rules" ref="loginForm" :model="loginForm">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.userName" placeholder="请输入用户名">
                <i slot="prefix" class="login_icon iconfont iconzhanghu"> </i>
              </el-input>
            </el-form-item>
            <el-form-item prop="passWord">
              <el-input
                v-model="loginForm.passWord"
                type="passWord"
                placeholder="请输入密码"
              >
                <i slot="prefix" class="login_icon iconfont iconmima"> </i>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button
                class="sbmit-btn1"
                type="primary"
                size="medium "
                :loading="isLogining"
                @click="login"
              >
                登录</el-button
              >
            </el-form-item>
          </el-form>
          <div class="agent">
            <el-button type="text" class="agent_btn" @click="agentLogin"
              >代理商登录</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { setCookie } from "@/utils/auth";
export default {
  data() {
    let validate = (rule, value, callback) => {
      if (/^[0-9A-Za-z]{1,20}$/.test(value)) {
        // 修改验证规则至最低标准，正式使用时，可能需要更改
        callback();
      } else {
        callback(
          new Error((rule.field == "userName" ? "用户名" : "密码") + "格式有误")
        );
      }
    };
    return {
      loginForm: {
        userName: "",
        passWord: ""
      },
      isLogining: false,
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validate, trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validate, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.$store.dispatch("user/checkToken");
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.isLogining = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(res => {
              if (res) {
                this.$router.push("/notice");
              }
            })
            .catch(rej => {
              this.isLogining = false;
            });
        } else {
          return false;
        }
      });
    },
    agentLogin() {
      this.$store.dispatch("user/getAuthor");
    },
    enterUserSystem() {
      window.location = window.location.origin;
    }
  }
};
</script>
<style lang="scss">
.login_box_card {
  width: 616px;
  height: 387px;
  position: absolute;
  padding: 0;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background: #fff;
  border-radius: 4px;
  .login_box_card_title {
    padding: 0 24px;
    height: 72px;
    line-height: 72px;
    font-size: 24px;
    color: #0f0f0f;
    border-bottom: 1px solid #ececec;
  }
  .login_box_card_content {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    img {
      width: 175px;
      margin-top: 58px;
    }
  }
  .el-card__body {
    padding: 0;
  }
  .login-form {
    width: 320px;
    margin: 32px 0;
    overflow: hidden;
    .login_form_title {
      font-size: 18px;
      color: #0f0f0f;
      text-align: center;
      position: relative;
      padding-bottom: 28px;

      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background: #989898;
        left: 0;
        top: 10px;
      }
      .login_form_title_content {
        background: #fff;
        padding: 0 12px;
        z-index: 10;
        position: relative;
      }
    }
    .login_icon {
      width: 14px;
      height: 14px;
      color: rgba(51, 51, 51, 1);
      opacity: 0.5;
      margin: 0 10px;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 40px;
      box-shadow: inset 0 0 0 1000px #f7f7f7 !important;
      &:focus {
        box-shadow: inset 0 0 0 1000px #fff !important;
      }
    }
    input:-internal-autofill-selected {
      box-shadow: inset 0 0 0 1000px #f7f7f7 !important;
    }
    .forget-passWord {
      float: right;
      text-decoration: underline;
    }
    .sbmit-btn1 {
      width: 100%;
      font-size: 16px;
      background-color: #06367c;
      color: #fff;
      height: 38px;
      border-color: #06367c;
      &:focus {
        background-color: #06367c;
        border-color: #06367c;
      }
      &:hover {
        background-color: #3b5284;
        border-color: #3b5284;
      }
      &:active {
        background-color: #3b5284;
        border-color: #3b5284;
      }
    }
    .agent {
      padding-top: 10px;
    }
    .agent_btn {
      color: #404040;
      &:hover {
        color: #06367c;
        text-decoration: underline;
      }
    }
    .el-form-item:last-child {
      margin-bottom: 0;
    }
    .agent {
      text-align: center;
    }
  }
}
</style>
