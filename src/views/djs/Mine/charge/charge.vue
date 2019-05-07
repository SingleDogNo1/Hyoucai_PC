<template>
  <div class="charge">
    <div class="inner">
      <el-tabs type="border-card">
        <el-tab-pane label="快捷充值">
          <div>
            <p class="tips" v-if="!isBankcardSupport">为了您的账户提现快速到账，请您使用一类卡充值&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://mp.weixin.qq.com/s/AGl5G7v0Z8UvMfLtDGQaMg" target="_blank">点击了解何为一类卡>></a></p>
            <ul class="top">
              <li>
                <dl>
                  <dt>{{ personalInfo.banlance }}</dt>
                  <dd>可用余额(元)</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>{{ chargedBalance }}</dt>
                  <dd>充值后余额(元)</dd>
                </dl>
              </li>
            </ul>
            <ul class="bottom">
              <li>
                <span class="title">充值金额</span>
                <div class="info-wrapper">
                  <input type="text" placeholder="请输入充值金额" @input="amountInput" /> <em class="unit">元</em> <i class="tips">(100元起充)</i>
                </div>
              </li>
              <div class="err-msg" v-if="errMsg.amount">{{ errMsg.amount }}</div>
              <li>
                <span class="title">&emsp;&emsp;姓名</span> <span class="text">{{ plusStar(bankCardInfo.accountName, 1, 0) }}</span>
              </li>
              <li>
                <span class="title">银行卡号</span>
                <input type="text" placeholder="请输入银行卡号" v-if="isBankcardSupport" readonly v-model="bankCardNo" />
                <input type="text" placeholder="请输入银行卡号" v-model="unableBankCardNo" v-else />
              </li>
              <li>
                <span class="title">开户银行</span>
                <span class="text" v-if="isBankcardSupport">{{ bankCardInfo.bankName }}<i class="high-light">{{ bankCardInfo.quota }}</i></span>
              </li>
              <li>
                <span class="title">&emsp;手机号</span>
                <input type="text" placeholder="请输入手机号" v-if="isBankcardSupport" readonly v-model="bankCardInfo.mobile" />
                <input type="text" placeholder="请输入手机号" v-else v-model="unableMobile"/>
              </li>
              <li class="validation">
                <span class="title">&emsp;验证码</span>
                <div class="info-wrapper">
                  <input type="text" placeholder="请输入短信验证码" v-model="smsCode" />
                  <div class="get-code-wrapper" v-if="!showCountDown" @click="getSmsCode"><button>获取验证码</button></div>
                  <div class="count-down-wrapper" v-else>
                    <button>{{ countDown }}S</button>
                  </div>
                </div>
              </li>
              <div class="err-msg" v-if="errMsg.smsCode">{{ errMsg.smsCode }}</div>
              <li><span class="title">&emsp;&emsp;&emsp;&emsp;</span> <input type="button" value="确认充值" @click="submitCharge" /></li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="网银充值">
          <div>
            <ul class="top">
              <li>
                <dl>
                  <dt>{{ personalInfo.banlance }}</dt>
                  <dd>可用余额(元)</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>{{ chargedBalance }}</dt>
                  <dd>充值后余额(元)</dd>
                </dl>
              </li>
            </ul>
            <ul class="bottom">
              <li>
                <span class="title">充值金额</span>
                <div class="info-wrapper">
                  <input type="text" placeholder="请输入充值金额" @input="amountInput" /> <em class="unit">元</em> <i class="tips">(100元起充)</i>
                </div>
              </li>
              <div class="err-msg" v-if="errMsg.amount">{{ errMsg.amount }}</div>
              <li></li>
            </ul>
          </div>
          <div class="unionpay-charge"><el-button type="primary" @click="submitUnionPay">点击进入充值</el-button></div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Dialog :show.sync="showDialog" :singleButton="singleButton" class="djs-charge-dialog">
      <div>{{ errMsg.common }}</div>
    </Dialog>
    <Dialog :show.sync="showDialogSuccess" :showTitle="false" :onConfirm="confirmCharged" :onClose="confirmCharged" class="djs-charge-dialog">
      <img style="width:70px;height:70px;margin-bottom: 10px;" src="./image/success.png" alt="" />
      <div>充值成功</div>
    </Dialog>
  </div>
</template>

<script>
import {
  queryCardInfo,
  userBankCardList,
  personalAccount,
  userRechargePreVerify,
  rechargeApiDirectPayServer,
  unionPay,
  userAndBankInfo
} from '@/api/djs/Mine/charge'
import { getUser } from '@/assets/js/cache'
import { getAuth, getRetBaseURL } from '@/assets/js/utils'
import Dialog from '@/components/Dialog/Dialog'

const ERR_OK = '1'

export default {
  name: 'charge',
  mixins: [],
  components: {
    Dialog
  },
  data() {
    return {
      amount: '',
      smsCode: '',
      mobile: '',
      balance: 0.0,
      chargedBalance: 0.0,
      bankCardInfo: {
        accountId: '',
        area: '',
        bankNo: '',
        cardNo: '',
        city: '',
        fullName: '',
        mobile: '',
        openBankCode: '',
        openBankName: '',
        province: '',
        quota: '',
        strikeAmount: '',
        userName: ''
      },
      personalInfo: {
        banlance: ''
      },
      userName: getUser().userName,
      authorization: getAuth(),
      bankCardNo: '',
      unableBankCardNo: '', // 不支持充值时手动填入的银行卡号
      unableMobile: '', // 不支持充值时手动填入的手机号
      showCountDown: false,
      countDown: 60,
      timeInterval: null,
      errMsg: {
        amount: '',
        smsCode: '',
        common: ''
      },
      singleButton: true,
      showDialog: false,
      showDialogSuccess: false,
      isBankcardSupport: false, // 快钱是否支持用户当前银行卡
      retUrl: '' // 银行跳转回来的页面，这里主要是为了从出借详情过来的，因为还要在跳转回去
    }
  },
  watch: {
    amount(ne) {
      if (!ne) {
        this.chargedBalance = this.personalInfo.banlance
      } else {
        const sumChargeAmt = parseFloat(this.balance) + ne
        if (this.balance.toString().includes('.00')) {
          this.chargedBalance = sumChargeAmt + '.00'
        } else {
          this.chargedBalance = sumChargeAmt
        }
      }
    }
  },
  methods: {
    plusStar(str, frontNO, endNo) {
      if (str && str.length) {
        let len = str.length - frontNO - endNo
        let star = ''
        for (let i = 0; i < len; i++) {
          star += '*'
        }
        return str.substring(0, frontNO) + star + str.substring(str.length - endNo)
      } else {
        return ''
      }
    },
    userAndBankInfo() {
      userAndBankInfo().then(res => {
        if (res.data.userInfo.cardNo) {
          this.userRechargePreVerify()
        }
      })
    },
    amountInput(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      if (e.target.value.indexOf('.') < 0 && e.target.value !== '') {
        e.target.value = parseFloat(e.target.value)
      }
      this.amount = parseFloat(e.target.value)
      this.checkAmountInput()
    },
    checkAmountInput() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        return false
      }
      this.errMsg.amount = ''
    },
    getSmsCode() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        return false
      }
      if (this.isBankcardSupport) {
        let data = {
          amount: this.amount,
          userName: this.userName,
          bankCardNum: this.bankCardInfo.cardNo,
          bankCode: this.bankCardInfo.bank,
          mobileNo: this.bankCardInfo.mobile,
          rechargeType: 'KQAP',
          whichSetp: 'send',
          authorization: this.authorization
        }
        rechargeApiDirectPayServer(data).then(res => {
          let data = res.data
          this.showDialog = true
          if (data.resultCode === ERR_OK) {
            this.errMsg.common = '验证码发送成功！'
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
          } else {
            this.errMsg.common = data.resultMsg
          }
        })
      } else {
        queryCardInfo({
          bankCardNum: this.unableBankCardNo
        }).then(res => {
          let data = {
            amount: this.amount,
            userName: this.userName,
            bankCardNum: this.unableBankCardNo,
            bankCode: res.data.bankCode,
            mobileNo: this.unableMobile,
            rechargeType: 'KQAP',
            whichSetp: 'send',
            authorization: this.authorization
          }
          rechargeApiDirectPayServer(data).then(res => {
            let data = res.data
            this.showDialog = true
            if (data.resultCode === ERR_OK) {
              this.errMsg.common = '验证码发送成功！'
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
            } else {
              this.errMsg.common = data.resultMsg
            }
          })
        })
      }
    },
    submitCharge() {
      this.checkAmountInput()
      if (!this.smsCode) {
        this.errMsg.smsCode = '请输入短信验证码！'
      } else {
        if (this.isBankcardSupport) {
          rechargeApiDirectPayServer({
            amount: this.amount,
            userName: this.userName,
            bankCardNum: this.bankCardInfo.cardNo,
            bankCode: this.bankCardInfo.bank,
            mobileNo: this.bankCardInfo.mobile,
            rechargeType: 'KQAP',
            whichSetp: 'val',
            validCode: this.smsCode,
            authorization: this.authorization
          }).then(res => {
            let data = res.data
            if (data.resultCode === ERR_OK) {
              this.showDialogSuccess = true
            } else {
              this.errMsg.smsCode = data.resultMsg
            }
          })
        } else {
          queryCardInfo({
            bankCardNum: this.unableBankCardNo
          }).then(res => {
            console.log(res.data)
            const bankCode = res.data.bankCode
            rechargeApiDirectPayServer({
              amount: this.amount,
              userName: this.userName,
              bankCardNum: this.unableBankCardNo,
              bankCode: bankCode,
              mobileNo: this.unableMobile,
              rechargeType: 'KQAP',
              whichSetp: 'val',
              validCode: this.smsCode,
              authorization: this.authorization
            }).then(res => {
              let data = res.data
              if (data.resultCode === ERR_OK) {
                this.showDialogSuccess = true
              } else {
                this.errMsg.smsCode = data.resultMsg
              }
            })
          })
        }
      }
    },
    userRechargePreVerify() {
      userRechargePreVerify().then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.isBankcardSupport = data.isBankcardSupport
        }
      })
    },
    submitUnionPay() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        return false
      }
      let data = {
        amount: this.amount,
        rechargeType: 'KQ',
        returnUrl: this.retUrl ? getRetBaseURL() + this.retUrl : getRetBaseURL() + '/mine/charge',
        username: this.userName
      }
      unionPay(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          let map = data.map
          let redirectUrl = map.bill99MerUrl
          let options = JSON.parse(JSON.stringify(map))
          delete options.bill99MerUrl
          let params = options
          this.postcall(redirectUrl, params, '_blank')
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
        opt.setAttribute('name', x)
        opt.setAttribute('value', params[x])
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
    personalAccount() {
      let data = {
        userName: this.userName,
        authorization: this.authorization
      }
      personalAccount(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.personalInfo = data
          // this.personalInfo.banlance = 10000.89
          this.chargedBalance = this.personalInfo.banlance
        }
      })
    },
    getBasicInfo() {
      let params = {
        userName: this.userName,
        authorization: this.authorization,
        bankCardNum: this.bankCardNo
      }
      queryCardInfo(params).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.bankCardInfo = data
        }
      })
    },
    getBankCardNo() {
      let data = {
        userName: this.userName,
        authorization: this.authorization
      }
      userBankCardList(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.bankCardInfo = data.list[0]
          let nos = JSON.parse(JSON.stringify(this.bankCardInfo.cardNo))
          let len = nos.length
          this.bankCardNo = nos.substring(0, 4) + '*******' + nos.substring(len - 4, len)
          this.getBasicInfo()
        }
      })
    },
    confirmCharged() {
      this.retUrl ? getRetBaseURL() + this.retUrl : this.$router.push({ name: 'overview' })
    }
  },
  created() {
    this.getBankCardNo()
    this.personalAccount()
    // this.userRechargePreVerify()
    this.userAndBankInfo()
  },
  mounted() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'easyDetail') {
        vm.retUrl = from.fullPath
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';
.charge {
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  .inner {
    float: right;
    width: 840px;
    height: 100%;
    background-color: #fff;
    /deep/ .el-tabs--border-card {
      height: 100%;
      box-shadow: none;
      border-color: #f5f5f5;
      > .el-tabs__header {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        border-color: rgba(229, 229, 229, 1);
        .el-tabs__item {
          height: 60px;
          line-height: 58px;
          padding: 0 40px;
          color: $color-text-s;
          font-size: $font-size-small-s;
          border-top: 2px solid transparent;
          &.is-active {
            border-top: 2px solid $color-tab-selected;
            color: $color-tab-selected;
          }
        }
      }
      > .el-tabs__content {
        p.tips {
          padding-left: 18%;
          margin: 10px auto;
          color: red;
          font-size: 15px;
          a {
            color: #000;
          }
        }
        .top {
          padding: 40px 0 80px 0;
          overflow: hidden;
          li {
            float: left;
            width: 50%;
            text-align: center;
            dl {
              dt {
                margin-bottom: 12px;
                font-weight: 600;
                color: #fc5541;
                font-size: $font-size-large-x;
              }
              dd {
                color: $color-text;
                font-size: $font-size-medium;
              }
            }
          }
        }
        .bottom {
          li {
            box-sizing: border-box;
            margin-bottom: 22px;
            /*text-align: center;*/
            padding-left: 22.5%;
            .title {
              display: inline-block;
              vertical-align: top;
              margin: 10px 10px 0 0;
              font-size: $font-size-small-s;
              color: $color-text;
            }
            .info-wrapper {
              box-sizing: border-box;
              position: relative;
              display: inline-block;
              vertical-align: top;
            }
            input {
              box-sizing: border-box;
              display: inline-block;
              vertical-align: top;
              width: 284px;
              height: 40px;
              line-height: 40px;
              border-radius: 2px;
              padding-left: 15px;
              border: 1px solid rgba(205, 205, 205, 1);
              &:read-only {
                background-color: #f8f8fb;
              }
            }
            input[type='button'] {
              padding-left: 0;
            }
            .text {
              display: inline-block;
              width: 284px;
              text-align: left;
              line-height: 40px;
              color: $color-text;
              font-size: $font-size-small-ss;
              .high-light {
                color: #fc5541;
              }
            }
            .tips {
              position: absolute;
              top: 12px;
              right: -100px;
              font-size: $font-size-small-ss;
              color: rgba(155, 155, 155, 1);
            }
            .unit {
              position: absolute;
              top: 10px;
              right: -25px;
              color: $color-text;
            }
            &.validation {
              .info-wrapper {
                border: 1px solid rgba(205, 205, 205, 1);
                border-radius: 2px;
                input {
                  border: 0;
                  width: 193px;
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
            &:last-child {
              margin-top: 50px;
              input {
                color: #fff;
                font-size: $font-size-medium;
                background: rgba(250, 96, 12, 1);
                border: 0;
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
            margin-left: 248px;
          }
        }
        .transfer-charge {
          margin-top: 65px;
          padding-bottom: 87px;
          overflow: hidden;
          .left {
            float: left;
            width: 281px;
            margin-left: 30px;
            img {
              width: 100%;
            }
          }
          .right {
            float: right;
            width: 422px;
            margin-right: 29px;
            img {
              display: block;
              width: 91px;
              margin: 26px auto 41px;
            }
            .des {
              margin-bottom: 43px;
              line-height: 21px;
              font-size: $font-size-small-s;
              color: rgba(155, 155, 155, 1);
            }
            .items {
              margin-bottom: 30px;
              li {
                line-height: 26px;
                color: $color-button;
                &:last-child {
                  margin-bottom: 0;
                }
                dl {
                  margin-bottom: 0.16rem;
                  overflow: hidden;
                  font-size: 0;
                  &:last-child {
                    margin-bottom: 0;
                  }
                  dt,
                  dd {
                    display: inline-block;
                    font-size: $font-size-small-s;
                  }
                  dt {
                    margin-right: 8px;
                  }
                  dd {
                    .copy_num {
                      display: inline-block;
                      width: 50px;
                      height: 24px;
                      line-height: 24px;
                      text-align: center;
                      margin-left: 10px;
                      background-color: #fb891f;
                      color: #fff;
                      border-radius: 3px;
                      font-size: $font-size-small-ss;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            > p {
              margin-bottom: 8px;
              font-size: $font-size-small-s;
              color: $color-text-s;
              a {
                color: $color-button;
              }
            }
            .last-tip {
              margin-top: 30px;
              font-size: $font-size-small-s;
              color: rgba(252, 85, 65, 1);
            }
          }
        }
      }
    }
  }
  .unionpay-charge {
    button {
      width: 284px;
      margin: 50px 0 0 250px;
      font-size: $font-size-medium;
    }
  }
  .djs-charge-dialog {
    text-align: center;
    div {
      text-align: center;
    }
  }
}
</style>
