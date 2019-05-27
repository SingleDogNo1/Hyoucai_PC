<template>
  <div class="menu">
    <header class="avatar">
      <div class="user">
        <img src="./avatar.png" alt="" />
        <p>
          <em>{{ greet }}</em>
          <span>{{ userBasicInfo.nickname }}</span>
        </p>
      </div>
      <div class="safe">
        <span>安全等级</span> <span class="level">{{ safetyLevel }}</span>
      </div>
    </header>
    <ul class="block">
      <li class="title"><i class="iconfont icon-account"></i> <span>我的账户</span></li>
      <router-link class="link" tag="li" to="/mine/overview">账户总览</router-link>
      <router-link class="link" tag="li" to="/mine/basicInfo">基本信息</router-link>
      <router-link class="link" tag="li" to="/mine/bankcard">银行卡</router-link>
      <router-link class="link" tag="li" to="/mine/referralCode">推荐码</router-link>
    </ul>
    <ul class="block" @click="returnSelf($event)">
      <li class="title"><i class="iconfont icon-investment"></i> <span>我的出借</span></li>
      <router-link class="link" tag="li" to="/mine/lend">我的出借</router-link>
      <router-link class="link" tag="li" to="/mine/record">交易记录</router-link>
      <router-link
        class="link"
        tag="li"
        to="/mine/auto-lend"
        v-if="user.platformFlag === '1' || (user.platformFlag === '3' && currentPlatform === 'djs')"
        >自动出借</router-link
      >
      <router-link class="link" tag="li" to="/mine/calendar">回款日历</router-link>
    </ul>
    <ul class="block">
      <li class="title"><i class="iconfont icon-vouchers_"></i> <span>我的券包</span></li>
      <router-link class="link" tag="li" to="/mine/coupons">我的卡券</router-link>
      <router-link class="link" tag="li" to="/mine/experience-money">体验金</router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { userInviteInfo } from '@/api/djs/Mine/referralCode'
import { currentPlatform } from '@/assets/js/utils'

export default {
  name: 'UserMenu',
  mixins: [],
  data() {
    return {
      msg: 'UserMenu',
      isShowReferralCode: false,
      referralCode: '',
      currentPlatform: currentPlatform()
    }
  },
  methods: {
    returnSelf(ev) {
      const classList = ev.target.classList
      for (let value of classList) {
        if (value === 'router-link-active') {
          return false
        }
      }
    }
  },
  computed: {
    greet() {
      let msg = '',
        hour = new Date().getHours()
      if (hour < 11) {
        msg = '上午好!'
      } else if (hour >= 11 && hour < 14) {
        msg = '中午好!'
      } else if (hour >= 14 && hour < 19) {
        msg = '下午好!'
      } else {
        msg = '晚上好!'
      }
      return msg
    },
    safetyLevel() {
      let msg = ''
      switch (this.userBasicInfo.infoFinishGrade) {
        case 1:
          msg = '低'
          break
        case 2:
          msg = '中'
          break
        case 3:
          msg = '高'
          break
      }
      return msg
    },
    ...mapState({
      user: state => state.user.user,
      userBasicInfo: state => state.user.userBasicInfo
    })
  },
  created() {
    if (this.user.platformFlag === '1' || (this.user.platformFlag === '3' && currentPlatform() === 'djs')) {
      // 点金石用户
      userInviteInfo({ userName: this.user.userName }).then(res => {
        this.referralCode = res.data.myInviteCode
      })
    } else {
      // 汇有财用户
      this.referralCode = this.userBasicInfo.myInviteCode
    }
  },
  mounted() {
    this.isShowReferralCode = this.$route.name === 'referralCode'
  },
  watch: {
    $route() {
      // 刷新参数放到这里里面去触发就可以刷新相同界面了
      this.isShowReferralCode = this.$route.name === 'referralCode'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins';
@import '../../assets/css/theme';

.menu {
  box-sizing: border-box;
  width: 276px;
  background: #fff;
  padding-bottom: 30px;
  color: #414141;
  font-size: 14px;
  border: 1px solid #ebebeb;
  .avatar {
    padding: 30px 30px 0;
    border-bottom: 1px solid #e5e5e5;
    .user {
      display: flex;
      p {
        width: 113px;
        flex: 1;
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: $font-size-small;
        em {
          margin-bottom: 10px;
        }
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: $font-size-small-s;
        }
      }
    }
    .safe {
      width: 86px;
      margin: 25px 0;
      display: flex;
      justify-content: space-between;
    }
    .my-referral-code {
      width: 160px;
      margin: 15px 0;
      display: flex;
      //justify-content: space-between;
      .referral-code {
        margin-left: 4px;
      }
      .icon-more {
        margin-left: 10px;
      }
    }
  }
  .block {
    border-bottom: 1px solid #ebebeb;
    &:last-child {
      border: none;
    }
    .title {
      padding: 20px 0 20px 35px;
      font-size: $font-size-medium;
      i {
        font-size: $font-size-large;
        color: $color-theme;
        margin-right: 10px;
      }
    }
    .link {
      height: 40px;
      line-height: 40px;
      color: $color-text;
      padding-left: 70px;
      box-sizing: border-box;
      cursor: pointer;
      &.router-link-active {
        padding-left: 66px;
        color: $color-theme;
        background: rgba(251, 157, 31, 0.1);
        border-left: 4px solid #f8be38;
      }
      &:hover {
        padding-left: 66px;
        color: $color-theme;
        background: rgba(251, 157, 31, 0.1);
        border-left: 4px solid #f8be38;
      }
    }
  }
}
</style>
