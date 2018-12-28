<template>
  <div class="form">
    <h1><span :class="{active: loginType === 0}" @click="loginType = 0">密码登录</span><span :class="{active: loginType === 1}" @click="loginType = 1">短信登录</span></h1>
    <div v-if="loginType === 0" class="form-pwd">
      <div class="form-item">
        <i class="iconfont icon-user"></i>
        <input type="tel" v-model="userName" placeholder="请输入手机号" maxlength="11">
      </div>
      <div class="form-item">
        <i class="iconfont icon-password"></i>
        <input type="password" v-model="passWord" placeholder="请输入密码">
      </div>
    </div>
    <div v-if="loginType === 1" class="form-sms">
      <div class="form-item">
        <i class="iconfont icon-user"></i>
        <input type="tel" v-model="mobile" placeholder="请输入手机号" maxlength="11">
        <span>获取验证码</span>
      </div>
      <div class="form-item">
        <i class="iconfont icon-validation"></i>
        <input type="tel" v-model="mobile" placeholder="请输入验证码">
      </div>
    </div>
    <el-button type="primary" @click="doLogin">登录</el-button>
    <p class="agreement-tip" v-if="loginType === 0">
      <i class="iconfont" :class="{'icon-choose': !agree, 'icon-check': agree }" @click="agree = !agree"></i>
      记住用户名
      <router-link class="link" to="/forgetPWD">忘记密码？</router-link>
    </p>
    <p class="no-account">没有汇有财账号？<router-link class="link" to="/register">立即注册</router-link></p>
  </div>
</template>

<script>
import { userLogin } from '@/api/common/login'
import { setUser } from '@/assets/js/cache'
export default {
  name: 'index',
  data() {
    return {
      agree: true,
      userName: '',
      passWord: '',
      loginType: 0 // 0密码登录 1短信登录
    }
  },
  methods: {
    doLogin() {
      let postData = {
        userName: this.userName,
        passWord: btoa(this.passWord)
      }
      userLogin(postData).then(res => {
        setUser(res.data.data)
        this.$router.push({ name: 'overview' })
      })
      //this.$router.push({ name: 'registerForm' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/theme.scss';
.form {
  position: relative;
  font-size: $font-size-small-s;
  width: 380px;
  height: 430px;
  border-radius: 6px;
  margin: 0 0 0 auto;
  background: #fff;
  padding: 21px 29px 0 31px;
  text-align: center;
  h1 {
    height: 20px;
    line-height: 20px;
    padding: 6px 0;
    margin-bottom: 30px;
    span {
      font-size: 18px;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      margin: 0 21.5px;
      color: #9b9b9b;
      cursor: pointer;
      &.active {
        cursor: default;
        color: #4a4a4a;
        font-size: 20px;
        border-bottom: 2px solid #fb9d1f;
      }
    }
  }
  .form-item {
    width: 320px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    position: relative;
    margin-bottom: 20px;
    i {
      display: inline-block;
      position: absolute;
      top: 5px;
      width: 40px;
      border-right: 1px solid;
      border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
      font-size: 20px;
      color: #cecece;
      line-height: 30px;
    }
    input {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      padding: 4px 0 4px 52px;
      border: 1px solid rgba(227, 227, 227, 1);
      border-radius: 2px;
      &:focus {
        border-color: #fb7b1f;
      }
    }
  }
  .form-sms .form-item {
    input {
      padding-right: 95px;
    }
    span {
      cursor: pointer;
      color: #9b9b9b;
      box-sizing: border-box;
      position: absolute;
      width: 95px;
      right: 0px;
      top: 10px;
      border-left: 1px solid;
      border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
    }
  }
  button {
    margin-top: 20px;
    width: 320px;
    height: 40px;
    border-radius: 2px;
    color: #fff;
    font-size: 18px;
    font-weight: 400;
  }
  p.agreement-tip {
    text-align: left;
    margin-top: 20px;
    height: 16px;
    i {
      cursor: pointer;
      &.icon-choose {
        color: #cdcdcd;
      }
      &.icon-check {
        color: #099ef5;
      }
    }
    .link {
      color: $color-link;
      float: right;
    }
  }
  p.no-account {
    position: absolute;
    bottom: 24px;
    left: 105px;
    .link {
      color: #fb891f;
    }
  }
}
</style>
