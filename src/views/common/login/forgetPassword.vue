<template>
  <div class="app-container">
    <div class="main">
      <div class="form-container">
        <h1>找回密码</h1>
        <div class="form-item"><i class="iconfont icon-phone"></i> <input type="tel" v-model="form.mobile" placeholder="请输入手机号" /></div>
        <div class="error-msg" v-if="errorMsg.mobile">
          <span>{{ errorMsg.mobile }}</span>
        </div>
        <div class="form-item sms">
          <i class="iconfont icon-validation"></i> <input type="tel" v-model="form.verifyCode" placeholder="请输入验证码" maxlength="6" />
          <span @click="popValidation">{{ countDownText }}</span>
        </div>
        <div class="error-msg" v-if="errorMsg.verifyCode">
          <span>{{ errorMsg.verifyCode }}</span>
        </div>
        <div class="form-item pwd">
          <i class="iconfont icon-password"></i> <input type="password" v-model="form.newPassword" placeholder="输入8位以上字母和数字组合" />
          <password-strength class="passwordStrength" :pwd="form.newPassword"></password-strength>
        </div>
        <div class="error-msg" v-if="errorMsg.newPassword">
          <span>{{ errorMsg.newPassword }}</span>
        </div>
        <div class="form-item">
          <i class="iconfont icon-password"></i> <input type="password" v-model="form.confirmPassword" placeholder="输入8位以上字母和数字组合" />
        </div>
        <div class="error-msg" v-if="errorMsg.confirmPassword">
          <span>{{ errorMsg.confirmPassword }}</span>
        </div>
        <div id="captcha"></div>
        <el-button type="primary" class="nextStep" @click="nextStep">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordStrength from '@/components/passwordStrength'
import { forgetPwdSendVerCode, forgetPwdConfirmCode, forgetPwdResetCode } from '@/api/common/login'
import { countDownTime, captchaId } from '@/assets/js/const'
import { isMobile, isMobCode, isPassword } from '@/assets/js/regular'

export default {
  name: 'form',
  components: {
    PasswordStrength
  },
  data() {
    return {
      form: {
        mobile: '', // 手机号
        verifyCode: '', // 验证码
        newPassword: '', // 新密码
        confirmPassword: '' // 确认密码
      },
      errorMsg: {
        mobile: '', // 手机号
        verifyCode: '', // 验证码
        newPassword: '', // 新密码
        confirmPassword: '' // 确认密码
      },
      captchaIns: null, // 滑块验证码实例
      validate: '', // 滑块验证码二次验证信息
      countDownText: '获取验证码',
      hasCountDown: false
    }
  },
  methods: {
    setErrorMsg(key, value) {
      this.errorMsg = {
        mobile: '',
        verifyCode: '',
        newPassword: '',
        confirmPassword: ''
      }
      if (key) this.errorMsg[key] = value
    },
    popValidation() {
      if (this.countDownText === '获取验证码') {
        if (this.form.mobile.trim() === '') {
          this.setErrorMsg('mobile', '请输入手机号')
          return false
        }
        if (!isMobile(this.form.mobile)) {
          this.setErrorMsg('mobile', '请输入正确的手机号')
          return false
        } else {
          this.setErrorMsg('mobile', '')
        }
        // 弹出滑块验证码
        this.captchaIns && this.captchaIns.popUp()
      }
    },
    getSmsCode() {
      forgetPwdSendVerCode({ mobile: this.form.mobile, captchaId, validate: this.validate }).then(() => {
        this.countDown()
      })
    },
    countDown() {
      this.hasCountDown = true
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
    nextStep() {
      if (this.form.mobile.trim() === '') {
        this.setErrorMsg('mobile', '请输入手机号')
        return false
      }
      if (!isMobile(this.form.mobile)) {
        this.setErrorMsg('mobile', '手机号格式不正确')
        return false
      }
      if (this.form.verifyCode.trim() === '') {
        this.setErrorMsg('verifyCode', '请输入验证码')
        return false
      }
      if (!isMobCode(this.form.verifyCode)) {
        this.setErrorMsg('verifyCode', '请输入正确的验证码')
        return false
      }
      if (this.form.newPassword.trim() == '') {
        this.setErrorMsg('newPassword', '请输入密码')
        return false
      }
      if (!isPassword(this.form.newPassword)) {
        this.setErrorMsg('newPassword', '请输入8-20位字母和数字组合')
        return false
      }
      if (this.form.confirmPassword.trim() == '') {
        this.setErrorMsg('confirmPassword', '请再次输入密码')
        return false
      }
      if (this.form.newPassword !== this.form.confirmPassword) {
        this.setErrorMsg('confirmPassword', '两次输入密码不一致')
        return false
      }
      this.setErrorMsg('')
      forgetPwdConfirmCode({ mobile: this.form.mobile, verifyCode: this.form.verifyCode })
        .then(res => {
          if (res.data.resultCode === '1') {
            return forgetPwdResetCode({ mobile: this.form.mobile, newPassword: this.form.newPassword })
          } else {
            this.setErrorMsg('verifyCode', res.data.resultMsg)
            throw new Error()
          }
        })
        .then(res => {
          if (res.data.resultCode === '1') {
            this.$router.push({ name: 'resetResult' })
          } else {
            this.setErrorMsg('confirmPassword', res.data.resultMsg)
          }
        })
    }
  },
  created() {
    window.initNECaptcha(
      {
        // config对象，参数配置
        captchaId: captchaId,
        width: '320px',
        element: '#captcha',
        mode: 'popup',
        onVerify: (err, data) => {
          this.validate = data.validate
          this.getSmsCode()
        },
        onClose: () => {
          this.captchaIns.refresh()
        }
      },
      instance => {
        this.captchaIns = instance
      }
    )
  }
}
</script>

<style scoped lang="scss">
.app-container {
  min-height: 528px;
  background: rgba(239, 239, 239, 1);
  padding: 30px 0 28px;
  .main {
    width: 1140px;
    margin: 0 auto;
    min-height: 470px;
    background: #fff;
    border: 1px solid rgba(227, 227, 227, 1);
    border-top: 3px solid #f7be39;
    .form-container {
      width: 287px;
      margin: 0 auto;
      text-align: center;
      padding-top: 30px;
      color: rgba(74, 74, 74, 1);
      h1 {
        font-size: 18px;
        font-weight: 400;
        margin-bottom: 40px;
      }
      p {
        color: #9b9b9b;
        margin-top: 20px;
        font-size: 12px;
        text-align: left;
        margin-bottom: 30px;
        line-height: 20px;
      }
      .form-item {
        width: 284px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        position: relative;
        margin: 16px 0;
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
      .error-msg {
        margin: 16px auto;
        width: 284px;
        padding: 10px;
        border: 1px solid #e84518;
        background: #ffe5e5;
        color: #e84518;
        border-radius: 5px;
        font-size: 12px;
        text-align: left;
      }
      .sms {
        input {
          padding-right: 95px;
        }
        span {
          font-size: 14px;
          cursor: pointer;
          color: #fb891f;
          box-sizing: border-box;
          position: absolute;
          width: 95px;
          right: 0px;
          top: 10px;
          border-left: 1px solid;
          border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
        }
      }
      .pwd {
        position: relative;
        .passwordStrength {
          position: absolute;
          top: 5px;
          right: -140px;
        }
      }
      .nextStep {
        width: 284px;
        font-size: 18px;
      }
      .link {
        color: #fb9d1f;
        font-size: 14px;
        margin-top: 20px;
        display: inline-block;
      }
    }
  }
}
</style>
