<template>
  <div class="add-bankcard-wrapper">
    <h3>绑定银行卡</h3>
    <div class="item">
      <span class="title">&emsp;姓名</span>
      <div class="info-wrapper">
        <i class="iconfont icon-user"></i>
        <input type="text" placeholder="请输入姓名" readonly v-model="user.realName">
      </div>
    </div>
    <div class="item">
      <span class="title">身份证</span>
      <div class="info-wrapper">
        <i class="iconfont icon-certificate"></i>
        <input type="text" placeholder="请输入身份证号码" readonly v-model="userBasicInfo.identityNo">
      </div>
    </div>
    <div class="item add-card">
      <span class="title">银行卡</span>
      <div class="info-wrapper">
        <i class="iconfont icon-Bankcard"></i>
        <input type="text" placeholder="请输入银行卡号" @input="bankCardInput($event)">
        <div class="bank-support">
          <el-popover placement="right" width="440" trigger="hover">
            <ul class="bank-list">
              <li>绑卡支持以下银行：</li>
              <li v-for="(list, i) in bankList" :key="i">
                <img :src="list.iconUrl">
                <span>{{ list.bankName }} 单笔{{ list.onceLimit }}，单日{{ list.dayLimit }}</span>
              </li>
            </ul>
            <el-button slot="reference">
              <i class="iconfont icon-changjianwenti"></i>
            </el-button>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="err-msg" v-if="errMsg.bankCardNo">{{ errMsg.bankCardNo }}</div>
    <div class="item">
      <span class="title">手机号</span>
      <div class="info-wrapper">
        <i class="iconfont icon-phone1"></i>
        <input type="text" placeholder="请输入手机号" v-model="mobile">
      </div>
    </div>
    <div class="err-msg" v-if="errMsg.mobile">{{ errMsg.mobile }}</div>
    <div class="item validation">
      <span class="title">验证码</span>
      <div class="info-wrapper">
        <i class="iconfont icon-validation"></i>
        <input type="text" placeholder="请输入验证码" v-model="smsCode">
        <div class="get-code-wrapper" v-if="!showCountDown">
          <button @click="getSmsCode">获取验证码</button>
        </div>
        <div class="count-down-wrapper" v-else>
          <button>{{ countDown }}S</button>
        </div>
      </div>
    </div>
    <div class="err-msg" v-if="errMsg.smsCode">{{ errMsg.smsCode }}</div>
    <div class="item">
      <span class="title">&emsp;&emsp;&emsp;</span>
      <div class="info-wrapper">
        <input type="button" value="确认绑卡" @click="submitChangeBankCard">
      </div>
    </div>
    <Dialog
      :show.sync="showDialog"
      :onClose="jumpBankCard"
      :singleButton="singleButton"
      class="djs-add-bankcard-dialog"
    >
      <div>{{ errMsg.common }}</div>
    </Dialog>
  </div>
</template>

<script>
import { userChangeBankCard, supportBankList, smsBankCardCode } from '@/api/djs/addBankCard'
import { getUser } from '@/assets/js/cache'
import { mapGetters } from 'vuex'
import Dialog from '@/components/Dialog/Dialog'
import { isMobile, isMobCode, isBankCard } from '@/assets/js/regular'

const ERR_OK = '1'
export default {
  name: 'addBankCard',
  data() {
    return {
      showCountDown: false,
      countDown: 60,
      bankList: [],
      userName: getUser().userName,
      bankCardNo: '',
      mobile: '',
      smsCode: '',
      timeInterval: null,
      showDialog: false,
      singleButton: true,
      errMsg: {
        bankCardNo: '',
        mobile: '',
        smsCode: '',
        common: ''
      },
      isJumpBankCard: false // 是否要跳转到我的银行卡页面
    }
  },
  components: {
    Dialog
  },
  computed: {
    ...mapGetters(['user', 'userBasicInfo'])
  },
  methods: {
    bankCardInput(e) {
      let value = e.target.value
      if (/^[\d]{0,19}$/.test(value.replace(/\s/g, ''))) {
        value = value.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ')
      }
      e.target.value = value
      this.bankCardNo = value.replace(/\D/g, '')
    },
    submitChangeBankCard() {
      if (!isBankCard(this.bankCardNo)) {
        this.errMsg.bankCardNo = '请输入正确的银行卡！'
        return
      } else {
        this.errMsg.bankCardNo = ''
      }
      if (!isMobile(this.mobile)) {
        this.errMsg.mobile = '请输入正确的手机号！'
        return
      } else {
        this.errMsg.mobile = ''
      }
      if (!isMobCode(this.smsCode)) {
        this.errMsg.smsCode = '请输入正确的验证码！'
        return
      } else {
        this.errMsg.smsCode = ''
      }
      let data = {
        verifyCode: this.smsCode,
        mobile: this.mobile,
        bankCardNo: this.bankCardNo
      }
      userChangeBankCard(data).then(res => {
        let data = res.data
        this.showDialog = true
        if (data.resultCode === ERR_OK) {
          this.isJumpBankCard = true
          this.errMsg.common = '修改银行卡成功！'
        } else {
          this.errMsg.common = data.resultMsg
        }
      })
    },
    getSmsCode() {
      if (!isBankCard(this.bankCardNo)) {
        this.errMsg.bankCardNo = '请输入正确的银行卡！'
        return
      } else {
        this.errMsg.bankCardNo = ''
      }
      if (!isMobile(this.mobile)) {
        this.errMsg.mobile = '请输入正确的手机号！'
        return
      } else {
        this.errMsg.mobile = ''
      }
      this.errMsg.smsCode = ''
      this.smsCode = ''
      this.showCountDown = true
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
      }
      this.timeInterval = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          this.showCountDown = false
          this.countDown = 60
          clearInterval(this.timeInterval)
        }
      }, 1000)
      let data = {
        userName: this.user.realName,
        mobileNo: this.mobile,
        bankCardNo: this.bankCardNo
      }
      smsBankCardCode(data).then(res => {
        let data = res.data
        this.showDialog = true
        if (data.resultCode === ERR_OK) {
          this.errMsg.common = '发送短信验证码成功！'
        } else {
          this.errMsg.common = data.resultMsg
        }
      })
    },
    getSupportBankList() {
      supportBankList().then(res => {
        if (res.data.resultCode === ERR_OK) {
          this.bankList = res.data.list
        }
      })
    },
    jumpBankCard() {
      if (this.isJumpBankCard)
        this.$router.push({
          name: 'bankcard'
        })
    }
  },
  created() {
    this.getSupportBankList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';
.add-bankcard-wrapper {
  width: 1140px;
  margin: 20px auto 40px;
  padding: 0 0 40px 0;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  h3 {
    padding: 45px 0;
    font-size: $font-size-medium;
    color: $color-text;
    text-align: center;
  }
  .item {
    margin-bottom: 15px;
    font-size: 0;
    text-align: center;
    &:nth-of-type(1),
    &:nth-of-type(2) {
      .info-wrapper {
        background-color: #f8f8fb;
      }
    }
    .title {
      display: inline-block;
      vertical-align: top;
      margin: 8px 10px 0 0;
      font-size: $font-size-medium;
      color: $color-text;
    }
    .info-wrapper {
      display: inline-block;
      vertical-align: top;
      width: 284px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      border: 1px solid rgba(205, 205, 205, 1);
      /*overflow: hidden;*/
      font-size: 0;
      i {
        display: inline-block;
        vertical-align: top;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        padding: 0 12px;
        font-size: 18px;
        color: rgba(205, 205, 205, 1);
        border-right: 1px solid rgba(205, 205, 205, 1);
      }
      input {
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        height: 100%;
        width: 239px;
        padding-left: 12px;
        font-size: $font-size-small-s;
        &::-webkit-input-placeholder {
          color: rgba(205, 205, 205, 1);
        }
        &::-moz-placeholder {
          color: rgba(205, 205, 205, 1);
        }
        &:-ms-input-placeholder {
          color: rgba(205, 205, 205, 1);
        }
        &:read-only {
          background-color: #f8f8fb;
        }
      }
    }
    &.add-card {
      .info-wrapper {
        position: relative;
        .bank-support {
          position: absolute;
          z-index: 999;
          right: -40px;
          top: 10px;
          line-height: 1;
          button {
            display: inline-block;
            @include square(20px);
            padding: 0;
            border: 0;
          }
          i {
            height: 0;
            margin-top: 0;
            line-height: 0.9;
            padding: 0;
            border-right: 0;
            color: $color-text-s;
            font-size: 16px;
          }
        }
      }
    }
    &.validation {
      .info-wrapper {
        input {
          width: 148px;
        }
        div {
          display: inline-block;
          vertical-align: top;
          width: 90px;
          height: 100%;
          &.get-code-wrapper {
            cursor: pointer;
            button {
              cursor: pointer;
              color: #0083fe;
            }
          }
          button {
            display: inline-block;
            background-color: #fff;
            width: 100%;
            height: 18px;
            line-height: 18px;
            margin-top: 11px;
            text-align: center;
            border-left: 1px solid #dadada;
            color: $color-text-s;
            font-size: $font-size-small-s;
          }
        }
      }
    }
    &:nth-last-of-type(1) {
      margin-top: 40px;
      .info-wrapper {
        border: 0;
      }
      input {
        width: 100%;
        color: #fff;
        font-size: $font-size-medium;
        background: rgba(250, 96, 12, 1);
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .err-msg {
    width: 284px;
    padding: 10px;
    min-height: 40px;
    border: 1px solid #e84518;
    background-color: #ffe5e5;
    color: #e84518;
    border-radius: 5px;
    margin-left: 459px;
    margin-bottom: 10px;
  }
  .djs-add-bankcard-dialog {
    div {
      text-align: center;
    }
  }
}
.bank-list {
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  li {
    float: left;
    width: 50%;
    margin-top: 10px;
    font-size: $font-size-small-ss;
    color: $color-text-gray;
    img {
      @include square(20px);
      margin-right: 5px;
    }
    // 标题
    &:first-child {
      float: none;
      width: 100%;
      margin-bottom: 10px;
      margin-top: 0;
    }
  }
}
</style>
<style lang="scss">
.el-popover {
  z-index: 99999 !important;
}
</style>
