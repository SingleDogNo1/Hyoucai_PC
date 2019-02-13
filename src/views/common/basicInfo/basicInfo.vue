<template>
  <div class="basicInfo">
    <header>
      <div class="last_time">上次登录时间:&nbsp;&nbsp;{{ lastLoginTime }}</div>
      <div class="data_full">
        <span class="text">资料完整度</span>
        <span class="bar"></span>
        <span class="crade">{{ infoFinishGrade }}</span>
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
          <span class="wrap_center">{{ userBasicInfo.nickname }}</span>
          <button class="wrap_btn" @click="isShow.isShow1 = !isShow.isShow1">修改</button>
        </div>
        <Name v-show="isShow.isShow1" :isShow="isShow" @success="success"></Name>
        <div class="wrap_rows">
          <span class="wrap_left">登录密码</span>
          <span class="wrap_center">{{ passWord }}</span>
          <button class="wrap_btn" @click="isShow.isShow2 = !isShow.isShow2">修改</button>
        </div>
        <Password v-show="isShow.isShow2" :isShow="isShow"></Password>
        <div class="wrap_rows">
          <span class="wrap_left">注册手机号</span>
          <span class="wrap_center">{{ mobile }}</span>
          <button class="wrap_btn" @click="isShow.isShow3 = !isShow.isShow3">修改</button>
        </div>
        <Phone v-show="isShow.isShow3" :isShow="isShow" :oldMobile="mobile"></Phone>
        <div class="wrap_rows">
          <span class="wrap_left">风险测评</span>
          <span class="wrap_center">{{ evaluatingResult.evaluatingName || '未评测'}}</span>
          <button class="wrap_btn" v-show="!isEvaluation" @click="toRiskAssessment">去评测</button>
          <button class="wrap_btn" v-show="isEvaluation" @click="toRiskAssessment">重新测评</button>
        </div>
        <div class="wrap_rows last_rows">
          <span class="wrap_left">收货地址</span>
          <span class="wrap_center">{{ address }}</span>
          <button class="wrap_btn" @click="isShow.isShow4 = !isShow.isShow4">{{msg}}</button>
        </div>
        <Address v-show="isShow.isShow4" :isShow="isShow" :getMailingAddress="getMailingAddress"></Address>
      </div>
    </div>
    <!-- 存管信息 -->
    <div class="dep_information">
      <h3 class="title">存管信息</h3>
      <div class="wrap" v-show="flag">
        <div class="wrap_rows">
          <span class="wrap_left">真实姓名</span>
          <span class="wrap_center">{{ escrowAccountInfo.name }}</span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">身份证号</span>
          <span class="wrap_center">{{ escrowAccountInfo.idNo }}</span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">存管账户</span>
          <span class="wrap_center">{{ escrowAccountInfo.accountId }}</span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">交易密码</span>
          <span class="wrap_center">{{ escrowAccountInfo.transPassword }}</span>
          <button class="wrap_btn" @click="tansactionPwd">修改</button>
        </div>
        <div class="wrap_rows last_rows">
          <span class="wrap_left">电子账户手机号</span>
          <span class="wrap_center">{{ escrowAccountInfo.mobile }}</span>
          <button class="wrap_btn" @click="isShow.isShow5 = !isShow.isShow5">修改</button>
        </div>
        <DzPhone v-show="isShow.isShow5" :isShow="isShow"></DzPhone>
      </div>
      <div class="openAccount" v-show="!flag">
        <div class="tips">
          <img src="./bank.png" class="bank_logo">
          <span class="tips_content">您还未开通存管账户</span>
        </div>
        <button class="open_btn" @click="toAccount">开通存管账户</button>
      </div>
    </div>
  </div>
</template>

<script>
import { userBasicInfo } from '@/api/common/login'
import { getMailingAddress, tansactionPwd } from '@/api/common/basicInfo'
import { mapGetters, mapMutations } from 'vuex'
import { getRetBaseURL } from '@/assets/js/utils'
import Name from './popup/name'
import Password from './popup/password'
import Phone from './popup/phone'
import Address from './popup/address'
import DzPhone from './popup/dzPhone'

export default {
  name: 'basicInfo',
  mixins: [],
  components: {
    Name,
    Password,
    Phone,
    Address,
    DzPhone
  },
  data() {
    return {
      isShow: {
        isShow1: false,
        isShow2: false,
        isShow3: false,
        isShow4: false,
        isShow5: false
      },
      flag: false,
      escrowAccountInfo: {},
      lastLoginTime: '',
      passWord: '',
      mobile: '',
      infoFinishGrade: '',
      hasMailingAddress: '',
      address: '',
      evaluatingResult: {},
      isEvaluation: false,
      resultType: '',
      resultTitle: '',
      resultFont: '',
      msg: ''
    }
  },
  computed: {
    ...mapGetters(['user', 'userBasicInfo'])
  },
  props: {},
  watch: {},
  methods: {
    ...mapMutations({
      setUserBasicInfo: 'SET_USERBASICINFO'
    }),
    // 修改交易密码
    tansactionPwd: function() {
      let obj = {}
      obj.retUrl = getRetBaseURL() + '/mine/basicInfo'
      tansactionPwd(obj).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        if (resultCode === '1') {
          let option = data.data.paramReq
          this.postcall(data.data.redirectUrl, option)
        }
      })
    },
    postcall(url, params, target) {
      let tempform = document.createElement('form')
      tempform.setAttribute('name', 'form')
      tempform.action = url
      tempform.method = 'post'
      tempform.style.display = 'none'
      if (target) {
        tempform.target = target
      }
      for (let x in params) {
        let opt = document.createElement('input')
        opt.name = x
        opt.value = params[x]
        tempform.appendChild(opt)
      }

      let opt = document.createElement('input')
      opt.type = 'submit'
      opt.setAttribute('id', '_submit')
      tempform.appendChild(opt)
      document.body.appendChild(tempform)
      tempform.submit()
      document.body.removeChild(tempform)
    },
    toRiskAssessment() {
      if (this.userBasicInfo.evaluatingResult) {
        this.$router.push({
          name: 'riskAss',
          query: { status: 'isDone' }
        })
      } else {
        this.$router.push({
          name: 'riskAss'
        })
      }
    },
    toAccount() {
      this.$router.push({
        name: 'account'
      })
    },
    getUserBasicInfo: function() {
      this.lastLoginTime = this.userBasicInfo.lastLoginTime
      this.passWord = this.userBasicInfo.passWord
      this.mobile = this.userBasicInfo.mobileMask
      // 判断是否风险测评
      if (this.userBasicInfo.evaluatingResult) {
        this.isEvaluation = true
        this.evaluatingResult = this.userBasicInfo.evaluatingResult
      }
      this.hasMailingAddress = this.userBasicInfo.hasMailingAddress
      // 判断用户是否开户
      if (this.userBasicInfo.escrowAccountInfo) {
        this.escrowAccountInfo = this.userBasicInfo.escrowAccountInfo
        this.flag = true
      }
      switch (this.userBasicInfo.infoFinishGrade) {
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
          this.address = res.data.data.address
          this.msg = '修改'
        })
      } else {
        this.address = '未设置收货地址'
        this.msg = '设置'
      }
    },
    getMailingAddress: function() {
      getMailingAddress({ userName: this.user.userName }).then(res => {
        this.address = res.data.data.address
        this.msg = '修改'
      })
    },
    success() {
      userBasicInfo({
        userName: this.user.userName
      }).then(res => {
        this.setUserBasicInfo(res.data.data)
      })
    }
  },
  created() {
    this.getUserBasicInfo()
  }
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
          cursor: pointer;
        }
      }
      .last_rows {
        border-bottom: none;
      }
    }
    .openAccount {
      width: 780px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
      border-radius: 4px;
      border: 1px solid rgba(227, 227, 227, 1);
      display: flex;
      flex-direction: column;
      padding: 80px 0 70px;
      align-items: center;
      .tips {
        display: flex;
        flex-direction: column;
        align-items: center;
        .bank_logo {
          width: 62px;
          height: 62px;
        }
        .tips_content {
          width: 126px;
          height: 14px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 14px;
          margin: 12px 0 40px;
        }
      }
      .open_btn {
        width: 220px;
        height: 42px;
        background: rgba(9, 160, 249, 1);
        border-radius: 4px;
        font-size: $font-size-medium;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
