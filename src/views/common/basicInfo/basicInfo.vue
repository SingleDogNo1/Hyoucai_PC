<template>
  <div class="basicInfo">
    <header>
      <div class="last_time">上次登录时间:&nbsp;&nbsp;{{lastLoginTime}}</div>
      <div class="data_full">
        <span class="text">资料完整度</span>
        <span class="bar"></span>
        <span class="crade">{{infoFinishGrade}}</span>
      </div>
      <div class="authentication">
        <div class="identity">
          <img src="./identity.png">
        </div>
        <div class="phone">
          <img src="./phone.png">
        </div>
      </div>
    </header>
    <!-- 个人信息 -->
    <div class="ess_information">
      <h3 class="title">个人信息</h3>
      <div class="wrap">
        <div class="wrap_rows">
          <span class="wrap_left">昵称修改</span>
          <span class="wrap_center">{{nickname}}</span>
          <button class="wrap_btn" @click="isShow.isShow1 = !isShow.isShow1">修改</button>
        </div>
        <Name v-show="isShow.isShow1" :isShow="isShow"></Name>
        <div class="wrap_rows">
          <span class="wrap_left">登录密码</span>
          <span class="wrap_center">{{passWord}}</span>
          <button class="wrap_btn" @click="isShow.isShow2 = !isShow.isShow2">修改</button>
        </div>
        <Password v-show="isShow.isShow2" :isShow="isShow"></Password>
        <div class="wrap_rows">
          <span class="wrap_left">注册手机号</span>
          <span class="wrap_center">{{mobile}}</span>
          <button class="wrap_btn" @click="isShow.isShow3 = !isShow.isShow3">修改</button>
        </div>
        <Phone v-show="isShow.isShow3" :isShow="isShow"></Phone>
        <div class="wrap_rows">
          <span class="wrap_left">风险测评</span>
          <span class="wrap_center">{{evaluatingResult.evaluatingName}}</span>
          <button class="wrap_btn">重新测评</button>
        </div>
        <div class="wrap_rows last_rows">
          <span class="wrap_left">收货地址</span>
          <span class="wrap_center">{{address}}</span>
          <button class="wrap_btn" @click="isShow.isShow4 = !isShow.isShow4">修改</button>
        </div>
        <Address v-show="isShow.isShow4" :isShow="isShow"></Address>
      </div>
    </div>
    <!-- 存管信息 -->
    <div class="dep_information">
      <h3 class="title">存管信息</h3>
      <div class="wrap">
        <div class="wrap_rows">
          <span class="wrap_left">真实姓名</span>
          <span class="wrap_center">{{escrowAccountInfo.name}}</span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">身份证号</span>
          <span class="wrap_center">{{escrowAccountInfo.idNo}}</span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">存管账户</span>
          <span class="wrap_center">{{escrowAccountInfo.accountId}}</span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">交易密码</span>
          <span class="wrap_center">{{escrowAccountInfo.transPassword}}</span>
          <button class="wrap_btn">修改</button>
        </div>
        <div class="wrap_rows last_rows">
          <span class="wrap_left">电子账户手机号</span>
          <span class="wrap_center">{{escrowAccountInfo.mobile}}</span>
          <button class="wrap_btn">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserBasicInfo, getMailingAddress } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
import Name from './popup/name'
import Password from './popup/password'
import Phone from './popup/phone'
import Address from './popup/address'
export default {
  name: 'basicInfo',
  mixins: [],
  components: {
    Name,
    Password,
    Phone,
    Address
  },
  data() {
    return {
      isShow: {
        isShow1: false,
        isShow2: false,
        isShow3: false,
        isShow4: false
      },
      escrowAccountInfo: {},
      lastLoginTime: '',
      nickname: '',
      passWord: '',
      mobile: '',
      infoFinishGrade: '',
      hasMailingAddress: '',
      address: '',
      evaluatingResult: {}
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: {},
  watch: {},
  methods: {
    getUserBasicInfo: function() {
      let data = {}
      data.userName = this.user.userName
      getUserBasicInfo(data).then(res => {
        this.lastLoginTime = res.data.data.lastLoginTime
        this.nickname = res.data.data.nickname
        this.passWord = res.data.data.passWord
        this.mobile = res.data.data.mobileMask
        this.evaluatingResult = res.data.data.evaluatingResult
        this.escrowAccountInfo = res.data.data.escrowAccountInfo
        this.hasMailingAddress = res.data.data.hasMailingAddress
        switch (res.data.data.infoFinishGrade) {
          case 1:
            this.infoFinishGrade = '低'
            break
          case 2:
            this.infoFinishGrade = '中'
            break
          case 3:
            this.infoFinishGrade = '高'
            break
        }
        if (this.hasMailingAddress == 1) {
          getMailingAddress({ userName: this.user.userName }).then(res => {
            console.log(res)
            // this.address=res.
          })
        }
      })
      // console.log(this.user.userName)
    }
  },

  created() {
    this.getUserBasicInfo()
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.basicInfo {
  width: 840px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  padding-bottom: 33px;
  header {
    // 头部样式
    width: 809px;
    box-shadow: 0px -2px 0px 0px rgba(247, 190, 57, 1);
    padding: 30px 0 0 30px;
    .last_time {
      width: 235px;
      height: 14px;
      font-size: $font-size-small-s;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(90, 90, 90, 1);
      line-height: 14px;
    }
    .data_full {
      font-size: $font-size-small-s;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 14px;
      margin-top: 19px;
      .bar {
        display: inline-block;
        width: 360px;
        height: 6px;
        background: linear-gradient(270deg, rgba(255, 107, 30, 1) 0%, rgba(255, 214, 17, 1) 100%);
        border-radius: 100px;
        margin: 0 12px 0 10px;
      }
    }
    .authentication {
      margin-top: 14px;
      .identity {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 15px;
        img {
          width: 100%;
        }
      }
      .phone {
        display: inline-block;
        width: 30px;
        height: 30px;
        img {
          width: 100%;
        }
      }
    }
  }
  .ess_information,
  .dep_information {
    margin-left: 29px;
    margin-top: 45px;
    .title {
      width: 103px;
      height: 18px;
      font-size: $font-size-small;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(90, 90, 90, 1);
      line-height: 18px;
      margin-bottom: 12px;
    }
    .wrap {
      width: 780px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
      border-radius: 4px;
      border: 1px solid rgba(227, 227, 227, 1);
      .wrap_rows {
        height: 62px;
        line-height: 62px;
        border-bottom: 2px solid rgba(232, 232, 232, 1);
        margin-left: 21px;
        position: relative;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        .wrap_left {
          font-size: $font-size-small-s;
          color: rgba(90, 90, 90, 1);
          width: 141px;
          display: inline-block;
        }
        .wrap_center {
          font-size: $font-size-small-s;
          color: rgba(155, 155, 155, 1);
        }
        .wrap_btn {
          width: 100px;
          height: 34px;
          position: absolute;
          top: 18px;
          right: 20px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          border: 1px solid rgba(251, 137, 31, 1);
          font-size: $font-size-small;
          color: rgba(251, 123, 31, 1);
        }
      }
      .last_rows {
        border-bottom: none;
      }
      .modify {
      }
    }
  }
}
</style>
