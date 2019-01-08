<template>
  <div class="tocash">
    <h3>提现</h3>
    <div class="inner">
      <ul class="title">
        <li>
          <dl>
            <dt><img src="image/jiangxi.png" alt="" /></dt>
            <dd><span>江西银行电子账户</span> <em>6212461250000747855</em></dd>
          </dl>
        </li>
        <li><img src="image/long_arrow@2x.png" alt="" /></li>
        <li>
          <dl>
            <dt><img :src="bankCardInfo.iconUrl" alt="" /></dt>
            <dd>
              <span>{{ bankCardInfo.bankName }}</span> <em>{{ bankCardInfo.cardNo }}</em>
            </dd>
          </dl>
        </li>
      </ul>
      <ul class="bottom">
        <li>
          <span class="title">&nbsp;&nbsp;可用金额（元）</span>
          <span class="text">
            <i class="high-light-red">{{ balance }}</i> 元</span
          >
        </li>
        <li>
          <span class="title">&emsp;&emsp;&emsp;<i class="high-light-red">*</i>&nbsp;提现金额</span>
          <div class="info-wrapper"><input type="number" placeholder="请输入提现金额" @input="amountInput" /> <em class="unit">元</em></div>
        </li>
        <div class="err-msg" v-if="errMsg.amount">{{ errMsg.amount }}</div>
        <!--<li>
          <span class="title">&emsp;&emsp;&nbsp;&nbsp;&nbsp;提现手续费</span>
          <span class="text"
            ><i class="high-light">{{ fee }}</i> 元</span
          >
        </li>-->
        <li>
          <span class="title">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;银行</span> <span class="text"> {{ bankCardInfo.bankName }} </span>
        </li>
        <li class="bank-no-wrapper">
          <span class="title">&emsp;&emsp;&emsp;&emsp;开户行号</span>
          <div class="info-wrapper">
            <input type="number" placeholder="请输入联行号" v-model="cardBankCnaps" />
            <div class="select" @click.stop="controlShowSelect">
              <i class="iconfont icon-xiala" :class="showSelector ? 'rotate-up' : 'rotate-down'" id="rotate-arrow"></i>
            </div>
            <em class="bank-no">查不到？<a target="_blank" href="http://www.lianhanghao.com/">联网查询</a></em>
            <el-card class="box-card" v-if="showSelector">
              <div slot="header" class="clearfix">
                <span>{{ bankName }}</span>
              </div>
              <div>
                <el-select v-model="provinceCode" placeholder="请选择">
                  <el-option v-for="item in provinceList" :key="item.id" :label="item.provinceName" :value="item.provinceCode"></el-option>
                </el-select>
                <el-select v-model="cityCode" placeholder="请选择">
                  <el-option v-for="item in cityList" :key="item.id" :label="item.cityName" :value="item.cityCode"></el-option>
                </el-select>
                <el-select v-model="areaCode" placeholder="请选择">
                  <el-option v-for="item in areaList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode"></el-option>
                </el-select>
                <el-input v-model="searchVal" placeholder="输入关键词"></el-input>
                <el-button type="primary" size="medium" @click="getSysBranceBankList(areaCode, bankCardInfo.bankNo, searchVal)">搜索 </el-button>
              </div>
              <el-scrollbar class="page-component__scroll" id="page-component__scroll">
                <el-table :data="bankList" style="width: 100%" @row-click="selectItem($event)">
                  <el-table-column type="index" label="序号"></el-table-column>
                  <el-table-column prop="bankNum" label="联行号"></el-table-column>
                  <el-table-column prop="bankName" label="银行名称"></el-table-column>
                </el-table>
              </el-scrollbar>
            </el-card>
          </div>
        </li>
        <div class="err-msg" v-if="errMsg.cardBankCnaps">{{ errMsg.cardBankCnaps }}</div>
        <li>
          <span class="title">&emsp;&emsp;&emsp;&emsp;&emsp;手机号</span> <span class="text">{{ plusStar(bankCardInfo.mobile, 3, 4) }}</span>
        </li>
        <div class="err-msg" v-if="errMsg.mobile">{{ errMsg.mobile }}</div>
        <li class="validation">
          <span class="title">&emsp;&emsp;&emsp;&emsp;&emsp;验证码</span>
          <div class="info-wrapper">
            <input type="text" placeholder="请输入短信验证码" v-model="smsCode" />
            <div class="get-code-wrapper" v-if="!showCountDown" @click="getSmsCode"><button>获取验证码</button></div>
            <div class="count-down-wrapper" v-else>
              <button>{{ countDown }}S</button>
            </div>
          </div>
        </li>
        <div class="err-msg" v-if="errMsg.smsCode">{{ errMsg.smsCode }}</div>
        <li><span class="title"></span> <input style="margin-left: 112px;" type="button" value="确认提现" @click="withDraw" /></li>
      </ul>
    </div>
    <div class="tips">
      <p>温馨提示</p>
      <p>1.在你申请提现前，请先在页面下方或"基本信息"账户信息页面绑定银行卡。</p>
      <p>2.收到你的提现请求后，我们将在1个工作日（双休日或法定节假日顺延）处理你的提现申请，请你注意查收。</p>
      <p>3.为保障你的账户资金安全，申请提现时，你选择的银行卡开户名必须与你汇有财网账户实名认证一致，否则提现申请将不予受理。</p>
    </div>
    <div class="model" v-if="showSelector" @click.stop="controlShowSelect"></div>
    <Dialog :show.sync="showDialog" :singleButton="singleButton" class="to-cash-dialog">
      <div>{{ errMsg.common }}</div>
    </Dialog>
  </div>
</template>

<script>
import {
  bankCardQueryApi,
  getBankUnionNumberUrlApi,
  sysProvinceListApi,
  sysCityListApi,
  sysBankAreaListApi,
  sysBranceBankListApi,
  amountInfoApi,
  getSmsCode,
  toCashApply
} from '@/api/djs/Mine/tocash'
import { getUser } from '@/assets/js/cache'
import { getAuth } from '@/assets/js/utils'
import Dialog from '@/components/Dialog/Dialog'

const ERR_OK = '1'
export default {
  data() {
    return {
      amount: null,
      // type: 1, // 2：大额， 1: 实时
      largeAmountFlag: false,
      balance: 0,
      fee: '0.00', // 手续费
      cardBankCnaps: '', // 联行号
      bankCardInfo: {
        accountId: '6212462190000950068',
        area: '',
        bankNo: '',
        cardNo: '6222988812340041',
        city: '',
        fullName: '测试账号41',
        mobile: '17000000041',
        openBankCode: '',
        openBankName: '',
        province: '',
        quota: '',
        strikeAmount: '100',
        userName: 'djs776205tt'
      },
      idNo: '',
      retUrl: '',
      forgotPwdUrl: '',
      bankUnionNumberUrl: '',
      showSelector: false,
      searchVal: '',
      provinceList: [],
      cityList: [],
      areaList: [],
      bankList: [],
      provinceCode: '',
      cityCode: '',
      areaCode: '',
      bankName: '', // 选择的银行
      userName: getUser().userName,
      authorization: getAuth(),
      errMsg: {
        amount: '',
        cardBankCnaps: '',
        mobile: '',
        smsCode: '',
        common: ''
      },
      showDialog: false,
      singleButton: true,
      showCountDown: false,
      countDown: 60,
      smsCode: ''
    }
  },
  watch: {
    provinceCode(ne) {
      this.getSysCityList(ne)
    },
    cityCode(ne) {
      this.getSysBankAreaList(ne)
    },
    areaCode(ne) {
      this.getSysBranceBankList(ne, this.bankCardInfo.bankNo, this.searchVal)
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
      if (e.target.value > parseFloat(this.balance)) {
        e.target.value = parseFloat(this.balance)
      }
      this.amount = e.target.value
      this.checkAmountInput()
    },
    selectBank() {
      if (this.showSelector) {
        this.showSelector = false
      } else {
        this.showSelector = true
      }
    },
    selectItem(item) {
      if (item.bankNum) {
        this.cardBankCnaps = item.bankNum
        this.bankName = item.bankName
        this.showSelector = false
      }
    },
    getSmsCode() {
      this.smsCode = ''
      if (!this.amount) {
        this.errMsg.amount = '输入提现金额！'
        return
      } else {
        this.errMsg.amount = ''
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        this.errMsg.amount = '输入金额不能大于可提现余额，请重新输入！'
        return
      } else {
        this.errMsg.amount = ''
      }
      if (!this.cardBankCnaps || this.cardBankCnaps.length != 12) {
        this.errMsg.cardBankCnaps = '输入正确的联行号！'
        return
      } else {
        this.errMsg.cardBankCnaps = ''
      }
      let data = {
        userName: this.userName,
        mobileNo: this.bankCardInfo.mobile,
        authorization: getAuth()
      }
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
      }, 2000)
      getSmsCode(data).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.showDialog = true
          this.errMsg.common = '短信发送成功！'
        }
      })
    },
    withDraw() {
      if (!this.amount) {
        this.errMsg.amount = '输入提现金额！'
        return
      } else {
        this.errMsg.amount = ''
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        this.errMsg.amount = '输入金额不能大于可提现余额，请重新输入！'
        return
      } else {
        this.errMsg.amount = ''
      }
      if (!this.cardBankCnaps || this.cardBankCnaps.length != 12) {
        this.errMsg.cardBankCnaps = '请输入正确的联行号！'
        return
      } else {
        this.errMsg.cardBankCnaps = ''
      }
      if (!this.smsCode) {
        this.errMsg.smsCode = '请输入验证码！'
        return
      } else {
        this.errMsg.smsCode = ''
      }

      let data = {
        userName: this.userName,
        bankCardId: this.bankCardInfo.id,
        amount: this.amount,
        identifyCode: this.smsCode,
        province: this.provinceCode,
        city: this.cityCode,
        area: this.areaCode,
        openBankCode: this.cardBankCnaps,
        authorization: getAuth()
      }
      toCashApply(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.showDialog = true
          this.errMsg.common = '提现成功，正在跳转到首页...'
          setTimeout(() => {
            this.$router.push({ name: 'index' })
          }, 1000)
        } else {
          // Toast(resultMsg);
          this.errMsg.common = resultMsg
          this.showDialog = true
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
    getSysBranceBankList(areaCode, bankNo, keyWord) {
      let data = { areaCode: areaCode }
      if (bankNo) {
        data.bankNo = bankNo
      }
      if (keyWord) {
        data.keyWord = keyWord
      }
      sysBranceBankListApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankList = data.list
          if (!this.bankList.length) {
            // Toast('无数据')
            this.bankName = '暂无数据'
            this.cardBankCnaps = ''
            return
          } else {
            if (!this.cardBankCnaps) {
              // 如果银行卡信息里有联行号和市级代码
              this.bankName = this.bankList[0].bankName
              this.cardBankCnaps = this.bankList[0].bankNum
            }
          }
        } else {
          // Toast(resultMsg)
        }
      })
    },
    getSysBankAreaList(cityCode) {
      sysBankAreaListApi({ cityCode: cityCode }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.areaList = data.list
          if (!this.areaList.length) {
            // Toast('无数据')
            this.areaCode = ''
            return
          } else {
            if (!this.areaCode) {
              // 如果银行卡信息里有联行号和市级代码
              this.areaCode = this.areaList[0].areaCode
            }
          }
        } else {
          // Toast(resultMsg)
        }
      })
    },
    getSysCityList(provinceCode) {
      sysCityListApi({ provinceCode: provinceCode }).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.cityList = data.list
          if (!this.cityList.length) {
            // Toast('无数据')
            this.cityCode = ''
            return
          } else {
            if (!this.cityCode) {
              // 如果银行卡信息里有联行号和市级代码
              this.cityCode = this.cityList[0].cityCode
            }
          }
        } else {
          // Toast(resultMsg)
        }
      })
    },
    getSysProvinceList() {
      sysProvinceListApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg;
        if (resultCode === '1') {
          this.provinceList = data.list
          if (!this.provinceList.length) {
            // Toast('无数据');
            this.provinceCode = ''
            return
          } else {
            if (!this.provinceCode) {
              // 如果银行卡信息里有联行号和省份代码
              this.provinceCode = this.provinceList[0].provinceCode
            }
          }
        } else {
          // Toast(resultMsg)
        }
      })
    },
    getBankUnionNumberUrl() {
      getBankUnionNumberUrlApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankUnionNumberUrl = data.data.url
        } else {
          // Toast(resultMsg)
        }
      })
    },
    getBankCardQuery() {
      let data = {
        userName: this.userName,
        authorization: this.authorization
      }
      bankCardQueryApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankCardInfo = data.list[0]
          if (this.bankCardInfo.openBankCode) {
            this.cardBankCnaps = this.bankCardInfo.openBankCode
            this.bankName = this.bankCardInfo.openBank
            this.provinceCode = this.bankCardInfo.province
            this.cityCode = this.bankCardInfo.city
            this.areaCode = this.bankCardInfo.area
            this.getSysProvinceList()
          }
        } else {
          // Toast(resultMsg)
        }
      })
    },
    matchClass() {
      if (this.showSelector) {
        return 'rotate-down'
      } else {
        return 'rotate-up'
      }
    },
    controlShowSelect() {
      if (!this.provinceList.length) {
        this.getSysProvinceList()
      }
      if (this.showSelector) {
        this.showSelector = false
      } else {
        this.showSelector = true
      }
    },
    checkAmountInput() {
      if (!this.amount) {
        this.errMsg.amount = '请输入提现金额！'
        if (this.errMsg.cardBankCnaps) {
          this.errMsg.cardBankCnaps = ''
        }
        return false
      }
      this.errMsg.amount = ''
    }
  },
  computed: {
    filterResult() {
      let data = this.bankList.filter(value => new RegExp(this.searchVal, 'i').test(value.name))
      return data
    }
  },
  components: {
    Dialog
  },
  created() {
    this.getBankCardQuery()
    amountInfoApi().then(res => {
      if (res.data.resultCode === '1') {
        const data = res.data
        this.balance = data.banlance
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.tocash {
  position: relative;
  background-color: #fff;
  font-size: $font-size-small-s;
  border: 1px solid #f5f5f5;
  .model {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 98;
    display: block;
    content: ' ';
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
  h3 {
    height: 51px;
    padding-left: 20px;
    margin-bottom: 23px;
    line-height: 51px;
    border-top: 1px solid #f7be39;
    font-size: $font-size-small;
    color: $color-text;
  }
  .inner {
    padding: 0 20px;
    > .title {
      padding: 20px 0;
      overflow: hidden;
      font-size: 0;
      text-align: center;
      background-color: rgba(240, 247, 255, 1);
      border: 1px solid rgba(227, 227, 227, 1);
      li {
        display: inline-block;
        vertical-align: top;
        dl {
          overflow: hidden;
          font-size: 0;
          dt {
            display: inline-block;
            vertical-align: top;
            width: 51px;
            margin-right: 15px;
            img {
              width: 100%;
            }
          }
          dd {
            display: inline-block;
            vertical-align: top;
            margin-top: 5px;
            font-size: $font-size-small-s;
            text-align: left;
            span,
            em {
              display: block;
            }
          }
        }
        &:nth-of-type(2) {
          width: 80px;
          margin: 18px 40px 0;
        }
        &:last-child {
          dl {
            dt {
              width: 44px;
            }
          }
        }
      }
    }
    .bottom {
      li {
        box-sizing: border-box;
        margin-bottom: 22px;
        padding-left: 20%;
        .title {
          display: inline-block;
          vertical-align: top;
          margin: 10px 18px 0 0;
          font-size: $font-size-small-s;
          color: $color-text;
          .high-light-red {
            color: #fc5541;
          }
        }
        /deep/ .el-radio-group {
          .el-radio {
            line-height: 40px;
            .el-radio__input {
              .el-radio__inner {
                &::after {
                  @include square(6px);
                  background-color: #787878;
                }
              }
              &.is-checked {
                .el-radio__inner {
                  border-color: #cdcdcd;
                  background-color: #fff;
                }
                + .el-radio__label {
                  color: $color-text;
                }
              }
            }
          }
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
          padding-left: 15px;
          border-radius: 2px;
          border: 1px solid rgba(205, 205, 205, 1);
          &::-webkit-input-placeholder {
            color: rgba(205, 205, 205, 1);
          }
          &::-moz-placeholder {
            color: rgba(205, 205, 205, 1);
          }
          &:-ms-input-placeholder {
            color: rgba(205, 205, 205, 1);
          }
        }
        .text {
          display: inline-block;
          width: 284px;
          text-align: left;
          line-height: 40px;
          color: $color-text;
          font-size: $font-size-small-ss;
          .high-light {
            color: #fb891f;
          }
          .high-light-red {
            color: #fc5541;
            font-size: $font-size-small;
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
        .bank-no {
          position: absolute;
          top: 10px;
          right: -125px;
          color: $color-text;
          a {
            color: #6aa4e8;
          }
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
        &:first-child {
          margin: 50px 0 20px 0;
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
        &.bank-no-wrapper {
          .info-wrapper {
            position: relative;
            width: 284px;
            border-radius: 4px;
            border: 1px solid rgba(205, 205, 205, 1);
            input {
              width: 248px;
              border: 0;
            }
            .select {
              position: relative;
              display: inline-block;
              width: 34px;
              height: 38px;
              text-align: center;
              cursor: pointer;
              @keyframes arrowRotateUp {
                0% {
                  transform: rotateZ(0);
                }
                100% {
                  transform: rotateZ(-180deg);
                }
              }
              @keyframes arrowRotateDown {
                0% {
                  transform: rotateZ(-180deg);
                }
                100% {
                  transform: rotateZ(0);
                }
              }
              i {
                position: absolute;
                display: inline-block;
                width: 34px;
                height: 38px;
                line-height: 38px;
                left: 0;
                top: 0;
                font-size: 18px;
                color: #cdcdcd;
                /*transform: rotateX(0);*/
                /*transition: all 0.3s;*/
                &.rotate-up {
                  animation: arrowRotateUp 0.3s forwards;
                }
                &.rotate-down {
                  animation: arrowRotateDown 0.3s forwards;
                }
              }
            }
            /deep/ .el-card.is-always-shadow {
              position: absolute;
              z-index: 99;
              top: 43px;
              width: 460px;
              box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.1);
              .el-card__header {
                height: 40px;
                line-height: 40px;
                padding: 0 10px;
                background-color: #f8f8fb;
                color: #fc5541;
              }
              .el-card__body {
                padding: 10px;
                .el-select {
                  width: 80px;
                  .el-input__inner {
                    border-radius: 0;
                    border-right: none;
                  }
                  &:nth-of-type(3) {
                    margin-right: 16px;
                    .el-input__inner {
                      border-right: 1px solid #dcdfe6;
                      &:focus {
                        border-color: #fa600c;
                      }
                    }
                  }
                  .el-input {
                    .el-input__inner {
                      height: 35px;
                      line-height: 35px;
                      padding-left: 10px;
                      padding-right: 20px;
                      font-size: $font-size-small-ss;
                    }
                    .el-input__suffix {
                      right: 0;
                      .el-input__icon {
                        line-height: 35px;
                      }
                    }
                    &.is-focus {
                      .el-input__inner {
                        border-right: 1px solid #fa600c;
                      }
                    }
                  }
                }
                > div {
                  overflow: hidden;
                  > .el-input {
                    width: 100px;
                    margin-right: 11px;
                    .el-input__inner {
                      border-radius: 0;
                      height: 35px;
                      line-height: 35px;
                      padding-left: 10px;
                      padding-right: 20px;
                      font-size: $font-size-small-ss;
                    }
                  }
                  > button {
                    background-color: #fc5541;
                  }
                  &.page-component__scroll {
                    height: 150px;
                    overflow: hidden;
                    .el-scrollbar__wrap {
                      overflow: auto;
                    }
                    .el-table {
                      border: 0;
                      font-size: $font-size-small-ss;
                      &::before {
                        display: none;
                      }
                      th {
                        border-bottom: 0;
                        .cell {
                          line-height: 20px;
                          text-align: center;
                          color: $color-text-s;
                        }
                      }
                      td {
                        height: 30px;
                        padding: 0;
                        border-bottom: 0;
                        cursor: pointer;
                        .cell {
                          line-height: 20px;
                          text-align: center;
                          color: $color-text;
                        }
                      }
                    }
                  }
                }
              }
            }
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
        margin-left: 287px;
      }
    }
  }
  .tips {
    margin-left: 20px;
    margin-bottom: 20px;
    color: $color-text-s;
    font-size: $font-size-small-s;
    line-height: 24px;
  }
  .to-cash-dialog {
    div {
      text-align: center;
    }
  }
}
</style>
