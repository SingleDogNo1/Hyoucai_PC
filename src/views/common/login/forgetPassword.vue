<template>
  <div class="app-container">
    <div class="main">
      <div class="form-container">
        <h1>找回密码</h1>
        <p>我们已发送短信验证码至132****6398,请在输入框内填写验证码,若未收到请耐心等待或联系客服</p>
        <div class="form-item">
          <i class="iconfont icon-phone"></i>
          <input type="tel" v-model="mobile" placeholder="请输入手机号">
        </div>
        <div class="form-item sms">
          <i class="iconfont icon-validation"></i>
          <input type="tel" v-model="mobile" placeholder="请输入验证码">
          <span>获取验证码</span>
        </div>
        <div class="form-item pwd">
          <i class="iconfont icon-password"></i>
          <input type="tel" v-model="password" placeholder="输入8位以上字母和数字组合">
          <password-strength class="passwordStrength" :pwd="password"></password-strength>
        </div>
        <div class="form-item">
          <i class="iconfont icon-password"></i>
          <input type="tel" v-model="mobile" placeholder="输入8位以上字母和数字组合">
        </div>
        <div class="form-item">
          <i class="iconfont icon-code"></i>
          <input type="tel" v-model="mobile" placeholder="输入推荐码(选填)">
        </div>
        <el-button type="primary" class="nextStep" @click="nextStep">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordStrength from '@/components/passwordStrength'
export default {
  name: 'form',
  components: {
    PasswordStrength
  },
  data() {
    return {
      password: ''
    }
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
