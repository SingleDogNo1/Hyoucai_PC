<template>
  <div class="charge">
    <div class="inner">
      <el-tabs type="border-card">
        <el-tab-pane label="快捷充值">
          <div>
            <ul class="top">
              <li>
                <dl>
                  <dt>{{ balance }}</dt>
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
                <span class="title">&emsp;&emsp;姓名</span> <span class="text">{{ bankCardInfo.fullName }}</span>
              </li>
              <li><span class="title">银行卡号</span> <input type="text" placeholder="请输入银行卡号" readonly v-model="backCardNo" /></li>
              <li>
                <span class="title">开户银行</span>
                <span class="text">
                  {{ bankCardInfo.bankName }}<i class="high-light"> {{ bankCardInfo.quota }}</i>
                </span>
              </li>
              <li v-if="isSpecialUser !== '1'">
                <span class="title">&emsp;手机号</span> <input type="text" placeholder="请输入银行绑定手机号" @input="mobileInput" />
              </li>
              <div class="err-msg" v-if="errMsg.mobile">{{ errMsg.mobile }}</div>
              <li v-if="isSpecialUser === '1'">
                <span class="title">&emsp;&emsp;&emsp;&emsp;</span> <input type="button" value="确认充值" @click="transferCharge" />
              </li>
              <li v-else><span class="title">&emsp;&emsp;&emsp;&emsp;</span> <input type="button" value="确认充值" @click="checkAmount" /></li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="转账充值">
          <div class="transfer-charge">
            <div class="left">
              <div class="charge-phone"><img src="./image/charge-phone.png" alt="" /></div>
            </div>
            <div class="right">
              <img src="./image/unionpay.png" alt="" />
              <div class="des">
                您可以使用您注册汇有财时绑定的银行卡，通过线下跨行转账（柜台、网银、手机银行APP）方式将资金充值到您的江西银行电子账户。
              </div>
              <ul class="items">
                <li>
                  <dl>
                    <dt>您收款方户名:</dt>
                    <dd>江西汇通金融信息服务有限公司</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>收款方账号:</dt>
                    <dd>7919 1331 4800 301 <span class="copy_num" :data-clipboard-text="791913314800301">复制</span></dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>收款银行:</dt>
                    <dd>江西银行</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>收款方开户行:</dt>
                    <dd>江西银行股份有限公司南昌铁路支行营业部</dd>
                  </dl>
                </li>
              </ul>
              <h6 @click="showDetail">线下充值流程更改说明，点击查看>></h6>
              <p>温馨提示：</p>
              <p>1、以上账户为汇有财平台在江西银行的存管账户，平台将根据您的转账金额自动发放至您的电子账户，资金安全由第三方江西银行全权保障。</p>
              <p>
                充值过程中收取的转账费用，以银行规定为准，汇有财不收取任何手续费用；如资金未到账，请联系汇有财客服：<a href="javascript:void(0);"
                  >400-78-96266</a
                >
              </p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Dialog :show.sync="showDialog" :singleButton="singleButton" class="djs-charge-dialog">
      <div>{{ errMsg.common }}</div>
    </Dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import { bankCardQueryApi, checkAmountApi, rechargeApi, amountInfoApi, transferChargeApi } from '@/api/hyc/Mine/charge'
import { getUser } from '@/assets/js/cache'
import { getAuth, getRetBaseURL, Base64Utils } from '@/assets/js/utils'
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
      isValid: true,
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
      backCardNo: '',
      userName: getUser().userName,
      authorization: getAuth(),
      errMsg: {
        amount: '',
        mobile: '',
        common: ''
      },
      showDialog: false,
      singleButton: true,
      isSpecialUser: this.$route.query.isSpecialUser,
      retUrl: '' // 银行跳转回来的页面，这里主要是为了从出借详情过来的，因为还要在跳转回去
    }
  },
  props: ['entrance'],
  watch: {
    amount(ne) {
      if (!ne) {
        this.chargedBalance = this.balance
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
    mobileInput(e) {
      e.target.value = e.target.value.replace(/[^\d]/g, '')
      if (e.target.value.length > 11) {
        e.target.value = e.target.value.slice(0, 11)
      }
      this.mobile = e.target.value
      this.checkMobileInput()
    },
    checkAmountInput() {
      if (!this.amount) {
        this.errMsg.amount = '请输入充值金额！'
        if (this.errMsg.mobile) {
          this.errMsg.mobile = ''
        }
        return false
      }
      if (this.amount && this.amount < 100) {
        this.errMsg.amount = '100元起充！'
        if (this.errMsg.mobile) {
          this.errMsg.mobile = ''
        }
        return false
      }
      this.errMsg.amount = ''
    },
    checkMobileInput() {
      if (!this.mobile) {
        this.errMsg.mobile = '请输入手机号！'
        if (this.errMsg.amount) {
          this.errMsg.amount = ''
        }
        return false
      }
      if (this.mobile && this.mobile.length < 11) {
        this.errMsg.mobile = '请输入正确的手机号！'
        if (this.errMsg.amount) {
          this.errMsg.amount = ''
        }
        return false
      }
      if (this.mobile && this.mobile.length > 11) {
        this.errMsg.mobile = '请输入正确的手机号！'
        if (this.errMsg.amount) {
          this.errMsg.amount = ''
        }
        return false
      }
      this.errMsg.mobile = ''
    },
    checkAmount() {
      // this.checkInput()
      let data = {
        userName: this.userName,
        authorization: this.authorization,
        bankCode: this.bankCardInfo.bankCode,
        amount: this.amount
      }
      checkAmountApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        if (resultCode === '1') {
          this.reCharge()
        } else {
          alert(data.resultMsg)
        }
      })
    },
    reCharge() {
      let path
      if (this.entrance) {
        path = Base64Utils.base64ToObject(this.entrance).fullPath
      } else {
        path = '/mine/basicInfo'
      }
      let forgetUrl = '/mine/basicInfo'
      let data = {
        userName: this.userName,
        authorization: this.authorization,
        txAmount: this.amount,
        retUrl: this.retUrl ? getRetBaseURL() + this.retUrl : getRetBaseURL() + path,
        forgotPwdUrl: forgetUrl,
        mobile: this.mobile,
        platform: 'PC'
      }
      rechargeApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          let option = data.data.paramReq
          this.postcall(data.data.redirectUrl, option)
        } else {
          this.showDialog = true
          this.errMsg.common = resultMsg
        }
      })
    },
    transferCharge() {
      let path
      if (this.entrance) {
        path = Base64Utils.base64ToObject(this.entrance).fullPath
      } else {
        path = '/mine/basicInfo'
      }
      let params = {
        userName: this.userName,
        txAmount: this.amount,
        retUrl: this.retUrl ? getRetBaseURL() + this.retUrl : getRetBaseURL() + path
      }
      transferChargeApi(params).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          let option = data.data.paramReq
          this.postcall(data.data.redirectUrl, option)
        } else {
          this.showDialog = true
          this.errMsg.common = resultMsg
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
    getBankCardQuery() {
      bankCardQueryApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        if (resultCode === ERR_OK) {
          this.bankCardInfo = data.data
          let no = this.bankCardInfo.cardNo
          let len = no.length
          this.backCardNo = no.substring(0, 4) + '*******' + no.substring(len - 4, len)
        }
      })
    },
    showDetail() {
      this.$router.push({
        name: 'announcementDetail',
        params: {
          id: '2156'
        }
      })
    }
  },
  created() {
    this.getBankCardQuery()
    amountInfoApi().then(res => {
      if (res.data.resultCode === ERR_OK) {
        const data = res.data.data
        this.balance = this.chargedBalance = data.banlance
      }
    })
    let clipboard = new Clipboard('.copy_num')
    clipboard.on('success', () => {
      this.errMsg.common = '复制成功！'
      this.showDialog = true
    })
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'easyDetail' || from.name === 'optionalDetail') {
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
        .top {
          padding: 60px 0 80px 0;
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
            h6 {
              line-height: 26px;
              color: #fb7b1f;
              font-size: 14px;
              margin-bottom: 30px;
              cursor: pointer;
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
  .djs-charge-dialog {
    text-align: center;
  }
}
</style>
