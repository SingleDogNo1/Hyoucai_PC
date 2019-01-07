<template>
  <div class="tocash">
    <h3>提现</h3>
    <div class="inner">
      <ul class="title">
        <li>
          <dl>
            <dt><img src="./image/jiangxi.png" alt="" /></dt>
            <dd><span>江西银行电子账户</span> <em>6212461250000747855</em></dd>
          </dl>
        </li>
        <li><img src="./image/long_arrow@2x.png" alt="" /></li>
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
          <span class="title">&emsp;&emsp;&emsp;<i class="high-light-red">*</i>&nbsp;提现方式</span>
          <el-radio-group v-model="type">
            <el-radio :label="1">实时</el-radio>
            <el-radio :label="2">大额</el-radio>
          </el-radio-group>
        </li>
        <li>
          <span class="title">&emsp;&emsp;&emsp;<i class="high-light-red">*</i>&nbsp;提现金额</span>
          <div class="info-wrapper"><input type="number" placeholder="请输入提现金额" @input="amountInput" /> <em class="unit">元</em></div>
        </li>
        <div class="err-msg" v-if="errMsg.amount">{{ errMsg.amount }}</div>
        <!--<li>-->
        <!--<span class="title">&emsp;&emsp;&nbsp;&nbsp;&nbsp;提现手续费</span>-->
        <!--<span class="text">-->
        <!--<i class="high-light">{{ fee }}</i> 元</span-->
        <!--&gt;-->
        <!--</li>-->
        <li v-if="largeAmountFlag">
          <span class="title">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;银行</span> <span class="text"> {{ bankCardInfo.bankName }} </span>
        </li>
        <li class="bank-no-wrapper" v-if="largeAmountFlag">
          <span class="title">&emsp;&emsp;&emsp;&emsp;开户行号</span>
          <div class="info-wrapper">
            <input type="number" placeholder="请输入联行号" v-model="cardBankCnaps" />
            <div class="select" @click.stop="controlShowSelect($event)"><i class="iconfont icon-xiala" id="rotate-arrow"></i></div>
            <em class="bank-no">查不到？<a target="_blank" href="http://www.lianhanghao.com/">联网查询</a></em>
            <el-card class="box-card" v-if="showSelector">
              <div slot="header" class="clearfix">
                <span>{{ bankName }}</span>
              </div>
              <div>
                <el-select v-model="provinceCode" placeholder="请选择">
                  <el-option v-for="item in provinceList" :key="item.id" :label="item.provinceName" :value="item.provinceCode"> </el-option>
                </el-select>
                <el-select v-model="cityCode" placeholder="请选择">
                  <el-option v-for="item in cityList" :key="item.id" :label="item.cityName" :value="item.cityCode"> </el-option>
                </el-select>
                <el-select v-model="areaCode" placeholder="请选择">
                  <el-option v-for="item in areaList" :key="item.areaCode" :label="item.areaName" :value="item.areaCode"> </el-option>
                </el-select>
                <el-input v-model="searchVal" placeholder="输入关键词"></el-input>
                <el-button type="primary" size="medium" @click="getSysBranceBankList(areaCode, bankCardInfo.bankNo, searchVal)">搜索</el-button>
              </div>
              <!--<div class="table-scroll-wrapper">-->
              <el-scrollbar class="page-component__scroll" id="page-component__scroll">
                <el-table :data="bankList" style="width: 100%" @row-click="selectItem">
                  <el-table-column type="index" label="序号"> </el-table-column>
                  <el-table-column prop="bankNum" label="联行号"> </el-table-column>
                  <el-table-column prop="bankName" label="银行名称"> </el-table-column>
                </el-table>
              </el-scrollbar>
              <!--</div>-->
            </el-card>
          </div>
        </li>
        <div class="err-msg" v-if="errMsg.cardBankCnaps">{{ errMsg.cardBankCnaps }}</div>
        <li><span class="title"></span> <input style="margin-left: 110px;" type="button" value="确认提现" @click="withDraw" /></li>
      </ul>
    </div>
    <div class="tips">
      <p>温馨提示</p>
      <p>1.江西银行电子交易账户采用同卡进出设置，资金只能提现至您本人充值的银行卡。</p>
      <p>2.实时提现：支持5万（含5万）以下资金提现，实时到账。</p>
      <p>3.大额提现：支持5万以上资金提现，工作日9:00-16:45。到账时间为30分钟左右，依据发卡行不同可能略有差异。</p>
      <p>4.提现手续费0元，每日限10笔。</p>
      <p>5.提现中有任何疑问，可以立即联系点金石客服：021-23099138。</p>
    </div>
    <div class="model" v-if="showSelector" @click.stop="controlShowSelect($event)"></div>
    <Dialog :show.sync="showDialog" :singleButton="singleButton">
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
  withdrawApi,
  amountInfoApi
} from '@/api/hyc/tocash'
import { getUser } from '@/assets/js/cache'
import { getAuth, getRetBaseURL, myDOM } from '@/assets/js/utils'
import Dialog from '@/components/Dialog/Dialog'
export default {
  data() {
    return {
      amount: null,
      type: 1, // 2：大额， 1: 实时
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
        common: ''
      },
      showDialog: false,
      singleButton: true
    }
  },
  watch: {
    type() {
      if (this.type === 1) {
        if (this.amount > 50000) {
          this.amount = 50000
        }
        this.largeAmountFlag = false
      } else {
        this.errMsg.amount = ''
        this.largeAmountFlag = true
      }
    },
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
      if (this.type === 1 && e.target.value >= 50000) {
        // AppToast.maxVal('toCashAmount', '5万', '实时');
        this.errMsg.amount = '实时提现，不可多余50000！'
        e.target.value = 50000
      }
      if (this.type === 2 && e.target.value > parseFloat(this.balance)) {
        e.target.value = parseFloat(this.balance)
        // this.errMsg.amount = '输入金额不能大于可提现余额，请重新输入！'
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
      // this.showSelector = false
      if (item.bankNum) {
        this.cardBankCnaps = item.bankNum
        this.bankName = item.bankName
        // this.showSelector = false
      }
    },
    withDraw() {
      if (!this.amount) {
        this.errMsg.amount = '输入提现金额！'
        return
      } else {
        this.errMsg.amount = ''
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        // Toast('输入金额不能大于可提现余额，请重新输入!');
        this.errMsg.amount = '输入金额不能大于可提现余额，请重新输入！'
        return
      } else {
        this.errMsg.amount = ''
      }
      if (this.type === 2 && !this.cardBankCnaps) {
        // AppToast.empty('unionBankNo');
        this.errMsg.cardBankCnaps = '输入联行号！'
        return
      } else {
        this.errMsg.cardBankCnaps = ''
      }

      let url = getRetBaseURL() + '/mine/basicInfo'
      let forgetUrl = getRetBaseURL() + '/mine/basicInfo'
      let data = {
        txAmount: this.amount,
        routeCode: this.type,
        retUrl: url,
        forgotPwdUrl: forgetUrl,
        platform: 'PC'
      }
      if (this.type === 2) {
        data.cardBankCnaps = this.cardBankCnaps
      }
      if (this.provinceCode) {
        data.provinceCode = this.provinceCode
      }
      if (this.cityCode) {
        data.cityCode = this.cityCode
      }
      if (this.areaCode) {
        data.areaCode = this.areaCode
      }
      if (this.bankCardInfo.bankName) {
        data.bankName = this.bankCardInfo.bankName
      }
      if (this.idNo) {
        data.idNo = this.bankCardInfo.bankName
      }
      if (this.bankCardInfo.mobile) {
        data.mobile = this.bankCardInfo.mobile
      }
      withdrawApi(data).then(res => {
        let data = res.data
        let resultCode = data.resultCode
        let resultMsg = data.resultMsg
        if (resultCode === '1') {
          let option = data.data.paramReq
          this.postcall(data.data.redirectUrl, option)
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
          this.bankList = data.data.list
          if (!this.bankList.length) {
            // Toast('无数据')
            this.bankName = '暂无数据'
            this.cardBankCnaps = ''
            return
          } else {
            this.bankName = this.bankList[0].bankName
            this.cardBankCnaps = this.bankList[0].bankNum
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
          this.areaList = data.data.list
          if (!this.areaList.length) {
            // Toast('无数据')
            this.areaCode = ''
            return
          } else {
            this.areaCode = this.areaList[0].areaCode
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
          this.cityList = data.data.list
          if (!this.cityList.length) {
            // Toast('无数据')
            this.cityCode = ''
            return
          } else {
            this.cityCode = this.cityList[0].cityCode
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
          this.provinceList = data.data.list
          if (!this.provinceList.length) {
            // Toast('无数据');
            this.provinceCode = ''
            return
          } else {
            this.provinceCode = this.provinceList[0].provinceCode
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
      bankCardQueryApi().then(res => {
        let data = res.data
        let resultCode = data.resultCode
        // let resultMsg = data.resultMsg
        if (resultCode === '1') {
          this.bankCardInfo = data.data
        } else {
          // Toast(resultMsg)
        }
      })
    },
    controlShowSelect(e) {
      if (!this.provinceList.length) {
        this.getSysProvinceList()
      }
      let className = e.target.className
      console.log(className)
      let iDom = document.getElementById('rotate-arrow')
      if (className.indexOf('select') > 0 || className.indexOf('icon-xiala') > 0) {
        if (this.showSelector) {
          this.showSelector = false
          myDOM.removeClass(iDom, 'rotate-up')
          myDOM.addClass(iDom, 'rotate-down')
        } else {
          this.showSelector = true
          myDOM.removeClass(iDom, 'rotate-down')
          myDOM.addClass(iDom, 'rotate-up')
        }
      } else {
        if (this.showSelector) {
          this.showSelector = false
          myDOM.removeClass(iDom, 'rotate-up')
          myDOM.addClass(iDom, 'rotate-down')
        }
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
    this.getBankUnionNumberUrl()
    amountInfoApi().then(res => {
      if (res.data.resultCode === '1') {
        const data = res.data.data
        this.balance = data.banlance
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.tocash {
  position: relative;
  min-height: 815px;
  background-color: #fff;
  font-size: $font-size-small-s;
  border: 1px solid #f5f5f5;
  .model {
    position: absolute;
    top: 0;
    left: 0;
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
    height: 621px;
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
}
</style>
