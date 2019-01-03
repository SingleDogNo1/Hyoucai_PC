<template>
    <div class="app-container">
      <div class="main">
        <div class="form-container">
          <h1>注册汇有财账号</h1>
          <p><span v-if="this.hasCountDown">我们已发送短信验证码至{{registerMobile}},请在输入框内填写验证码,若未收到请耐心等待或联系客服</span></p>
          <div class="form-item sms">
            <i class="iconfont icon-validation"></i>
            <input type="tel" v-model="form.identifyCode" placeholder="请输入短信验证码" maxlength="6">
            <span @click="popValidation">{{ countDownText }}</span>
          </div>
          <div class="form-item pwd">
            <i class="iconfont icon-password"></i>
            <input type="password" v-model="form.passWord" placeholder="输入8-20位字母和数字组合">
            <password-strength class="passwordStrength" :pwd="form.passWord"></password-strength>
          </div>
          <div class="form-item">
            <i class="iconfont icon-password"></i>
            <input type="password" v-model="form.confirmPassword" placeholder="输入8-20位字母和数字组合">
          </div>
          <div class="form-item" v-if="cpm === 'true'">
            <i class="iconfont icon-code"></i>
            <input type="text" v-model="form.inviteCode" placeholder="输入钞票码(选填)">
          </div>
          <div class="form-item" v-if="tjm === 'true'">
            <i class="iconfont icon-code"></i>
            <input type="text" v-model="form.recommendCode" placeholder="输入推荐码(选填)">
          </div>
          <div class="error-msg" v-if="errorMsg">
            <span>{{ errorMsg }}</span>
          </div>
          <div id="captcha"></div>
          <el-button type="primary" class="nextStep" @click="nextStep">下一步</el-button>
          <router-link class="link" to="/register">返回上一步</router-link>
        </div>
      </div>
    </div>
</template>

<script>
import PasswordStrength from '@/components/passwordStrength'
import { cpmOrTjm, getSmsCode, userRegister } from '@/api/common/register'
import { mapGetters } from 'vuex'
import { countDownTime, captchaId } from '@/assets/js/const'
import { isMobCode, isPassword } from '@/assets/js/regular'
export default {
  name: 'RegisterForm',
  components: {
    PasswordStrength
  },
  data() {
    return {
      form: {
        identifyCode: '',
        passWord: '',
        confirmPassword: '',
        inviteCode: '',
        recommendCode: '',
        registerFrom: 'PC',
        channelNo: '' //todo
      },
      cpm: false, // 钞票码显隐标识
      tjm: false, // 推荐码显隐标识
      captchaIns: null, // 滑块验证码实例
      validate: '', // 滑块验证码二次验证信息
      countDownText: '获取验证码',
      hasCountDown: false,
      errorMsg: ''
    }
  },
  computed: {
    ...mapGetters(['registerMobile'])
  },
  methods: {
    popValidation() {
      if (this.countDownText === '获取验证码')
        // 弹出滑块验证码
        this.captchaIns && this.captchaIns.popUp()
    },
    getSmsCode() {
      getSmsCode({ mobile: this.registerMobile, captchaId, validate: this.validate }).then(() => {
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
      if (!isMobCode(this.form.identifyCode)) {
        this.errorMsg = '请输入正确的验证码'
        return false
      }
      if (!isPassword(this.form.passWord)) {
        this.errorMsg = '请输入8-20位字母和数字组合'
        return false
      }
      if (this.form.passWord !== this.form.confirmPassword) {
        this.errorMsg = '两次输入密码不一致'
        return false
      }
      this.errorMsg = ''
      userRegister(Object.assign(this.form, { mobile: this.registerMobile })).then(res => {
        if (res.data.resultCode === '1') {
          console.log(1)
        } else {
          this.errorMsg = res.data.resultMsg
        }
      })
    }
  },
  created() {
    // 获取钞票码推荐码显隐状态
    cpmOrTjm().then(res => {
      let result = res.data.data
      this.cpm = result.cpm
      this.tjm = result.tjm
    })
    // 初始化滑块验证码
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
    .form-container {
      width: 287px;
      margin: 0 auto;
      text-align: center;
      padding-top: 30px;
      color: rgba(74, 74, 74, 1);
      h1 {
        font-size: 18px;
        font-weight: 400;
      }
      p {
        margin-top: 20px;
        font-size: 12px;
        text-align: left;
        margin-bottom: 30px;
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
        margin-bottom: 28px;
      }
    }
  }
}
</style>
