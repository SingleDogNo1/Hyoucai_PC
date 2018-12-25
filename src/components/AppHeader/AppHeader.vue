<template>
  <header class="app-header-wrapper">
    <div class="header">
      <div class="left">
        <img src="./logo.png" class="logo" alt="">
        <div class="swiper-container slogan">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="./slogan.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="right">
          <ul class="menu">
            <router-link tag="li" to="/login">登录</router-link>
            <router-link tag="li" to="/register">快速注册</router-link>
            <router-link tag="li" to="/help_center">帮助中心</router-link>
            <router-link tag="li" to="/notice">网站公告</router-link>
            <router-link tag="li" to="/contact_us">联系我们</router-link>
            <li class="wx-qr-code">
              <i class="iconfont icon-weChat_nav" @mouseenter="showWXCode" @mouseleave="hideWXCode"></i>
              <transition name="fade">
                <div class="qr-code" v-show="WXCodeFlag"></div>
              </transition>
            </li>
            <li class="app-qr-code">
              <i class="iconfont icon-phone_nav" @mouseenter="showAppCode" @mouseleave="hideAppCode"></i>
              <transition name="fade">
                <div class="qr-code" v-show="AppCodeFlag"></div>
              </transition>
            </li>
            <li class="contact">
              <i class="iconfont icon-tell_nav"></i>
              <img src="./tel.png" alt="">
            </li>
          </ul>
        <ul class="navs">
          <router-link tag="li" to="/index">首页</router-link>
          <router-link tag="li" to="/loan">我要出借</router-link>
          <router-link tag="li" to="/borrow">我要借款</router-link>
          <router-link tag="li" to="/info_disclosure">信息披露</router-link>
          <router-link tag="li" to="/activity">主题活动</router-link>
          <router-link tag="li" to="/safety">安全措施</router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data() {
    return {
      WXCodeFlag: false,
      AppCodeFlag: false
    }
  },
  methods: {
    showWXCode() {
      this.WXCodeFlag = true
    },
    hideWXCode() {
      this.WXCodeFlag = false
    },
    showAppCode() {
      this.AppCodeFlag = true
    },
    hideAppCode() {
      this.AppCodeFlag = false
    }
  },
  mounted() {
    new Swiper('.slogan', {
      direction: 'vertical',
      autoplay: false
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins';
@import '../../assets/css/theme';

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.app-header-wrapper {
  @include cube(100%, 90px);
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(120, 120, 120, 0.3);
  .header {
    @include cube(1140px, 100%);
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .logo {
        @include cube(146px, 56px);
      }
      .slogan {
        @include cube(164px, 56px);
      }
    }
    .right {
      .menu {
        $size: $font-size-small-s;
        display: flex;
        justify-content: flex-end;
        padding-top: 12px;
        height: $size;
        line-height: $size;
        font-size: $font-size-small-s;
        li {
          padding: 0 10px;
          border-right: 1px solid #d8d8d8;
          color: $color-text;
          position: relative;
          &:last-child {
            border: none;
          }
        }
        .wx-qr-code {
          .qr-code {
            position: absolute;
            @include square(100px);
            margin-left: -50px;
            background: url('./wx-qr-code.png') 0 / contain;
          }
        }
        .app-qr-code {
          .qr-code {
            position: absolute;
            @include square(100px);
            margin-left: -50px;
            background: url('./app-qr-code.png') 0 / contain;
          }
        }
        .contact {
          img {
            margin-left: 5px;
            width: 110px;
          }
        }
      }
      .navs {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        font-size: $font-size-small;
        color: $color-text;
        li {
          margin: 0 20px;
          height: 30px;
          padding: 0 10px;
          cursor: pointer;
          &:last-child {
            margin-right: 0;
          }
          &.router-link-active {
            color: $color-theme;
            border-bottom: 2px solid $color-theme;
          }
        }
      }
    }
  }
}
</style>
