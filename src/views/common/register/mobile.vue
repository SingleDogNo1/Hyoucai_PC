<template>
    <div class="app-container">
      <div class="form-container">
        <div class="form">
          <h1><span>新用户注册</span></h1>
          <div class="from-item">
            <!--<div class="icon"><i class="iconfont icon-user"></i></div>
            <div class="text"><input type="text" placeholder="请输入手机号"></div>-->
            <i class="iconfont icon-user"></i>
            <input type="tel" v-model="mobile">
          </div>
          <el-button type="primary" @click="nextStep">下一步</el-button>
          <p class="agreement-tip">
            <i class="iconfont" :class="{'icon-choose': !agree, 'icon-check': agree }" @click="agree = !agree"></i>
            同意
            <router-link class="link" to="/register/agreement">《汇有财注册协议》</router-link>
          </p>
          <p class="have-account">已有汇有财账号？<router-link class="link" to="/login">立即登录</router-link></p>
        </div>
      </div>
    </div>
</template>

<script>
import { isExistUser } from '@/api/common/register'
export default {
  name: 'mobile',
  data() {
    return {
      agree: true,
      mobile: ''
    }
  },
  methods: {
    nextStep() {
      isExistUser(this.mobile)
      //this.$router.push({ name: 'registerForm' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/theme.scss';
.app-container {
  min-width: 1140px;
  width: 100%;
  height: 500px;
  background: url('./mobile_bg.png') center center;
  .form-container {
    width: 1140px;
    height: 100%;
    margin: 0 auto;
    padding: 35px 0;
    .form {
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
        font-size: 20px;
        padding: 6px 0;
        margin-bottom: 58px;
        span {
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          border-bottom: 2px solid #fb9d1f;
        }
      }
      .from-item {
        width: 320px;
        height: 40px;
        background: rgba(255, 255, 255, 1);
        position: relative;
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
      button {
        margin-top: 30px;
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
        }
      }
      p.have-account {
        margin-top: 133px;
      }
    }
  }
}
</style>
