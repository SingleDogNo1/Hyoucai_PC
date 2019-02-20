<template>
  <div class="form">
    <div class="unLogin" v-if="!user">
      <h1>
        <span :class="{ active: loginType === 0 }" @click="loginType = 0">密码登录</span
        ><span :class="{ active: loginType === 1 }" @click="loginType = 1">短信登录</span>
      </h1>
      <div v-show="loginType === 0" class="form-pwd">
        <div class="form-item">
          <i class="iconfont icon-user"></i> <input type="tel" v-model="userName" placeholder="请输入手机号" maxlength="11" />
        </div>
        <div class="form-item"><i class="iconfont icon-password"></i> <input type="password" v-model="passWord" placeholder="请输入密码" @keydown.enter="doLogin"/></div>
        <div id="captcha_pwd"></div>
        <div class="error-msg" v-if="error_pwd">
          <span>{{ error_pwd }}</span>
        </div>
      </div>
      <div v-show="loginType === 1" class="form-sms">
        <div class="form-item">
          <i class="iconfont icon-user"></i> <input type="tel" v-model="userName" placeholder="请输入手机号" maxlength="11" />
          <span @click="popValidation">{{ countDownText }}</span>
        </div>
        <div class="form-item">
          <i class="iconfont icon-validation"></i> <input type="tel" v-model="smsCode" placeholder="请输入验证码" maxlength="6" @keydown.enter="doLogin" />
        </div>
        <div id="captcha_sms"></div>
        <div class="error-msg" v-if="error_sms">
          <span>{{ error_sms }}</span>
        </div>
      </div>
      <el-button type="primary" @click="doLogin">登录</el-button>
      <p class="agreement-tip" v-if="loginType === 0">
        <i class="iconfont" :class="{ 'icon-choose': !agree, 'icon-check': agree }" @click="agree = !agree"></i> 记住用户名
        <router-link class="link" to="/forgetPWD">忘记密码？</router-link>
      </p>
      <p class="no-account">没有汇有财账号？<router-link class="link" to="/register">立即注册</router-link></p>
    </div>
    <div class="login" v-else>
      <div class="userInfo">
        <div class="avater"><img src="./photo.png" alt="" /></div>
        <div class="info">
          <p class="welcome">欢迎回来！</p>
          <p class="userName">{{ user.realName || user.userName }}</p>
        </div>
      </div>
      <div v-if="user.userIsOpenAccount && user.userIsOpenAccount.isOpenAccount">
        <div class="account"><span class="label">账户余额(元)</span><span class="value">{{personalAccount.banlance}}</span></div>
        <div class="actions">
          <span @click="$router.push({ name: 'charge' })">充值</span> <span @click="$router.push({ name: 'tocash' })">提现</span>
        </div>
      </div>
      <div v-else class="btn-open-account"><el-button type="info" @click="$router.push({ name: 'account' })">开通存管账户</el-button></div>
      <el-button type="primary" @click="$router.push({ name: 'overview' })">进入我的账户</el-button>
    </div>
  </div>
</template>

<script>
import { userLogin, smsLogin, userLoginVcode } from '@/api/common/login'
import { mapGetters, mapMutations } from 'vuex'
import { countDownTime, captchaId } from '@/assets/js/const'
import { isMobile } from '@/assets/js/regular'
import { setLoginUsername, getLoginUsername } from '@/assets/js/cache'

export default {
  name: 'index',
  data() {
    return {
      agree: true,
      userName: getLoginUsername(),
      passWord: '',
      smsCode: '',
      loginType: 0, // 0密码登录 1短信登录
      error_pwd: '',
      error_sms: '',
      captchaIns_pwd: null, // 滑块验证码实例
      validate_pwd: '', // 滑块验证码二次验证信息
      captchaIns_sms: null, // 滑块验证码实例
      validate_sms: '', // 滑块验证码二次验证信息
      countDownText: '获取验证码'
    }
  },
  computed: {
    ...mapGetters(['user', 'errorNum', 'personalAccount'])
  },
  methods: {
    getSmsCode() {
      smsLogin({ mobile: this.userName, captchaId, validate: this.validate_sms }).then(res => {
        this.countDown()
        if (res.data.resultCode !== '1') {
          this.error_sms = '验证码发送失败'
        }
      })
    },
    countDown() {
      let time = countDownTime
      let t = window.setInterval(() => {
        if (time > 0) {
          time--
          this.countDownText = `${time}秒`
        } else {
          this.countDownText = '获取验证码'
          window.clearInterval(t)
        }
      }, 1000)
    },
    popValidation() {
      if (this.countDownText === '获取验证码') {
        if (this.userName.trim() === '') {
          this.error_sms = '请输入手机号'
          return false
        }
        if (!isMobile(this.userName)) {
          this.error_sms = '请输入正确的手机号'
          return false
        } else {
          this.error_sms = ''
        }
        // 弹出滑块验证码
        this.captchaIns_sms && this.captchaIns_sms.popUp()
      }
    },
    initPWDCaptcha() {
      window.initNECaptcha(
        {
          captchaId: captchaId,
          width: '320px',
          element: '#captcha_pwd',
          onVerify: (err, data) => {
            this.validate_pwd = data.validate
          },
          onClose: () => {
            this.captchaIns_pwd.refresh()
          }
        },
        instance => {
          this.captchaIns_pwd = instance
        }
      )
    },
    initSMSCaptcha() {
      window.initNECaptcha(
        {
          captchaId: captchaId,
          width: '320px',
          element: '#captcha_sms',
          mode: 'popup',
          onVerify: (err, data) => {
            this.validate_sms = data.validate
            this.getSmsCode()
          },
          onClose: () => {
            this.captchaIns_sms.refresh()
          }
        },
        instance => {
          this.captchaIns_sms = instance
        }
      )
    },
    doLogin() {
      if (this.loginType === 0) {
        // 密码登录
        this.doPWDLogin()
      } else {
        // 短信登录
        this.doSMSLogin()
      }
    },
    doJumpSystem() {
      switch (this.user.platformFlag) {
        case '1':
          window.location.href = '/djs/#/mine/overview'
          break
        case '2':
          window.location.href = '/hyc/#/mine/overview'
          break
        default:
          this.$router.push({ name: 'overview' })
      }
    },
    doPWDLogin() {
      if (this.errorNum >= 3 && !this.captchaIns_pwd) {
        this.initPWDCaptcha()
        return false
      }
      let postData = {
        userName: this.userName,
        passWord: btoa(this.passWord)
      }
      if (this.errorNum >= 3 && this.validate_pwd === '') {
        this.error_pwd = '请将滑块验证码划到正确的位置'
        return false
      }
      userLogin(postData).then(res => {
        if (res.data.resultCode === '1') {
          let user = res.data.data
          this.setUser(user)
          setLoginUsername(this.userName)
          this.setErrorNum(0)
          this.doJumpSystem()
        } else {
          this.error_pwd = res.data.resultMsg
          this.setErrorNum(this.errorNum + 1)
        }
      })
    },
    doSMSLogin() {
      let postData = {
        userName: this.userName,
        smsCode: this.smsCode
      }
      userLoginVcode(postData).then(res => {
        if (res.data.resultCode === '1') {
          let user = res.data.data
          this.setUser(user)
          setLoginUsername(this.userName)
          this.setErrorNum(0)
          this.doJumpSystem()
        } else {
          this.error_sms = res.data.resultMsg
        }
      })
    },
    ...mapMutations({
      setUser: 'SET_USER',
      setErrorNum: 'SET_ERROR_NUM'
    })
  },
  created() {
    this.initSMSCaptcha()
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/theme.scss';
.form {
  font-weight: 400;
  position: relative;
  font-size: $font-size-small-s;
  width: 380px;
  height: 430px;
  border-radius: 6px;
  margin: 0 0 0 auto;
  background: #fff;
  padding: 21px 29px 0 31px;
  text-align: center;
  .unLogin {
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
    .error-msg {
      margin: 10px auto;
      width: 320px;
      padding: 10px;
      border: 1px solid #e84518;
      background: #ffe5e5;
      color: #e84518;
      border-radius: 5px;
      font-size: 12px;
      text-align: left;
    }
    button {
      margin-top: 10px;
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
  .login {
    .userInfo {
      margin: 24px auto 0;
      display: flex;
      justify-content: center;
      align-items: center;
      .avater {
        width: 86px;
        height: 86px;
        margin-right: 21px;
      }
      .info {
        text-align: left;
        .welcome {
          font-size: 20px;
          color: rgba(155, 155, 155, 1);
        }
        .userName {
          margin-top: 8px;
          font-size: 24px;
          color: rgba(74, 74, 74, 1);
        }
      }
    }
    .account {
      margin-top: 54px;
      display: flex;
      justify-content: center;
      align-items: center;
      .label {
        font-size: 18px;
        color: rgba(155, 155, 155, 1);
        margin-right: 10px;
      }
      .value {
        font-size: 20px;
        color: rgba(74, 74, 74, 1);
      }
    }
    .actions {
      margin: 42px auto 70px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 0 50px;
        font-size: 18px;
        color: rgba(250, 96, 12, 1);
        cursor: pointer;
      }
    }
    .btn-open-account {
      margin: 122px auto 40px;
    }
    button {
      width: 280px;
    }
  }
}
</style>
