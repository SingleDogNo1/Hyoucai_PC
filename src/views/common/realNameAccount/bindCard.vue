<template>
  <div class="form">
    <el-row>
      <el-col :span="9" class="row-title">充值金额</el-col>
      <el-col :span="6" class="row-value">
        <i class="iconfont icon-user"></i>
        <input type="tel" v-model="amount" placeholder="请输入充值金额"/>
      </el-col>
      <el-col :span="9" class="row-suffix">元 <span class="suffix">（100元起充）</span></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">姓名</el-col>
      <el-col :span="6" class="row-value"><span>{{ user.realName.substr(0,1)}}**</span></el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">银行卡</el-col>
      <el-col :span="6" class="row-value">
        <i class="iconfont icon-Bankcard"></i>
        <input type="tel" v-model="bankCardNum" placeholder="请输入银行卡号" />
      </el-col>
      <el-col :span="9" class="row-suffix" style="position:relative">
        <span class="mark">?</span>
        <div class="bankList">
          <p>绑卡支持以下银行</p>
          <div class="banks">
            <div class="bank"  v-for="bank in bankList" :key="bank.bankCode">
              <img :src="bank.iconUrl" alt="">
              <span>{{bank.bankName}}</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--<el-row>
      <el-col :span="9" class="row-title">开户银行</el-col>
      <el-col :span="6" class="row-value"></el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>-->
    <el-row>
      <el-col :span="9" class="row-title">手机号</el-col>
      <el-col :span="6" class="row-value">
        <i class="iconfont icon-phone"></i>
        <input type="tel" v-model="mobileNo" placeholder="请输入银行卡预留手机号" maxlength="11" />
      </el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row>
      <el-col :span="9" class="row-title">验证码</el-col>
      <el-col :span="6" class="row-value">
        <i class="iconfont icon-validation"></i>
        <input type="tel" class="validation" v-model="validCode" placeholder="请输入验证码" maxlength="11" />
        <i class="get-code" @click="getSMSCode">{{countDownText}}</i>
      </el-col>
      <el-col :span="9" class="row-suffix"></el-col>
    </el-row>
    <el-row class="btn">
      <el-col :span="6" :offset="9"><el-button type="primary" @click="bindCard">确认绑卡</el-button></el-col>
    </el-row>
    <el-row class="tips">
      <el-col :span="6" :offset="9" >
        <p>温馨提示：</p>
        <p>为了您的账户提现快速到账，请您绑定一类卡</p>
        <p>点击了解何为一类卡>></p>
      </el-col>
    </el-row>
    <Dialog :show.sync="showDialogSuccess" :singleButton="true" :showTitle="false" :onClose="confirmCharged"  class="djs-charge-dialog">
      <img style="width:70px;height:70px;margin-bottom: 10px;" src="./success.png" alt="" />
      <div>您已成功完成绑卡操作</div>
    </Dialog>
  </div>
</template>

<script>
import { supportBankList } from '@/api/djs/addBankCard'
import { mapGetters } from 'vuex'
import { countDownTime } from '@/assets/js/const'
import { rechargeApiDirectPayServer, queryCardInfo } from '@/api/djs/Mine/charge'
import Dialog from '@/components/Dialog/Dialog'
export default {
  name: 'bindCard',
  components: {
    Dialog
  },
  data() {
    return {
      bankList: [],
      countDownText: '获取验证码',
      amount: '', // 充值金额
      bankCardNum: '', // 银行卡号
      bankCode: '', // 充值银行
      mobileNo: '', // 手机号
      validCode: '', // 验证码
      showDialogSuccess: false
    }
  },
  computed: {
    ...mapGetters(['user', 'userBasicInfo'])
  },
  methods: {
    bindCard() {
      rechargeApiDirectPayServer({
        amount: this.amount,
        userName: this.user.userName,
        bankCardNum: this.bankCardNum,
        bankCode: this.bankCode,
        mobileNo: this.mobileNo,
        rechargeType: 'KQAP',
        whichSetp: 'val',
        validCode: this.validCode
      }).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.showDialogSuccess = true
        } else {
          this.errMsg.smsCode = data.resultMsg
        }
      })
    },
    getSMSCode() {
      if (this.countDownText === '获取验证码') {
        queryCardInfo({
          bankCardNum: this.bankCardNum
        }).then(res => {
          this.bankCode = res.data.bankCode
          let data = {
            amount: this.amount,
            userName: this.user.userName,
            bankCardNum: this.bankCardNum,
            bankCode: this.bankCode,
            mobileNo: this.mobileNo,
            rechargeType: 'KQAP',
            whichSetp: 'send'
          }
          rechargeApiDirectPayServer(data).then(res => {
            if (res.data.resultCode === '1') {
              this.countDown()
            }
            /*let data = res.data
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
            }*/
          })
        })
      }
    },
    countDown() {
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
    confirmCharged() {
      this.$router.push({ name: 'overview' })
    }
  },
  created() {
    supportBankList().then(res => {
      if (res.data.resultCode === '1') {
        this.bankList = res.data.list
      }
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  margin: 0 auto;
  .el-row {
    margin: 15px 0;
    line-height: 40px;
    .row-title {
      font-size: 18px;
      font-weight: 500;
      text-align: right;
      padding-right: 10px;
    }
    .row-value {
      width: 284px;
      height: 40px;
      line-height: 40px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      i {
        position: absolute;
        top: 5px;
        width: 40px;
        border-right: 1px solid;
        border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
        font-size: 20px;
        color: #cecece;
        line-height: 30px;
        text-align: center;
        &.get-code {
          border-left: 1px solid;
          border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
          line-height: 40px;
          cursor: pointer;
          width: 91px;
          font-size: 14px;
          color: #0083fe;
          top: 0;
          right: 0;
        }
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
        &.validation {
          padding: 4px 91px 4px 52px;
        }
      }
    }
    .row-suffix {
      padding-left: 10px;
      span.suffix {
        font-size: 13px;
        color: rgb(205, 205, 205);
      }
      span.mark {
        display: inline-block;
        border: 1px solid rgb(205, 205, 205);
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 50%;
        color: rgb(205, 205, 205);
        cursor: pointer;
      }
      span.mark:hover + .bankList {
        display: block;
      }
      .bankList {
        display: none;
        padding: 15px;
        font-size: 12px;
        position: absolute;
        z-index: 10000;
        top: -68px;
        left: 44px;
        width: 218px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
        border: 1px solid rgba(227, 227, 227, 1);
        &:before {
          position: absolute;
          top: 83px;
          left: -9px;
          content: '';
          width: 0;
          height: 0;
          /*border-top: 5px solid transparent;*/
          border-right: 10px solid red;
          /*border-bottom: 5px solid transparent;*/
        }
        .banks {
          display: flex;
          flex-wrap: wrap;
          .bank {
            width: 90px;
            height: 31px;
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-right: 5px;
            }
          }
        }
      }
    }

    &.btn {
      margin-top: 30px;
      .el-button {
        width: 100%;
        font-size: 18px;
      }
    }
    &.tips {
      margin-top: 32px;
      margin-bottom: 40px;
      p {
        font-size: 14px;
        line-height: 24px;
        color: #9b9b9b;
      }
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
