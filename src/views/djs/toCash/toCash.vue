<template>
  <div class="tocash" ref="container">
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
            <dt><img src="./image/jiangxi.png" alt="" /></dt>
            <dd><span>江西银行电子账户</span> <em>6212461250000747855</em></dd>
          </dl>
        </li>
      </ul>
      <ul class="bottom">
        <li>
          <span class="title">&nbsp;&nbsp;可用金额（元）</span>
          <span class="text">
            <i class="high-light-red">{{ fee }}</i> 元</span
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
          <div class="info-wrapper"><input type="text" placeholder="请输入提现金额" /> <em class="unit">元</em></div>
        </li>
        <li>
          <span class="title">&emsp;&emsp;&nbsp;&nbsp;&nbsp;提现手续费</span>
          <span class="text">
            <i class="high-light">{{ fee }}</i> 元</span
          >
        </li>
        <li v-if="type === 2"><span class="title">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;银行</span> <span class="text"> 招商银行 </span></li>
        <li class="bank-no-wrapper" v-if="type === 2">
          <span class="title">&emsp;&emsp;&emsp;&emsp;开户行号</span>
          <div class="info-wrapper">
            <input type="number" placeholder="请输入联行号" v-model="cardBankCnaps">
            <div class="select" @click="selectBank"><i class="iconfont icon-xiala"></i></div>
            <em class="bank-no">查不到？<a target="_blank" href="http://www.lianhanghao.com/">联网查询</a></em>
            <el-card class="box-card" v-if="showSelector">
              <div slot="header" class="clearfix"><span>{{bankName}}</span></div>
              <div>
                <el-select v-model="provinceCode" placeholder="请选择">
                  <el-option
                    v-for="item in provinceList"
                    :key="item.id"
                    :label="item.provinceName"
                    :value="item.provinceCode">
                  </el-option>
                </el-select>
                <el-select v-model="cityCode" placeholder="请选择">
                  <el-option
                    v-for="item in cityList"
                    :key="item.id"
                    :label="item.cityName"
                    :value="item.cityCode">
                  </el-option>
                </el-select>
                <el-select v-model="areaCode" placeholder="请选择">
                  <el-option
                    v-for="item in areaList"
                    :key="item.areaCode"
                    :label="item.areaName"
                    :value="item.areaCode">
                  </el-option>
                </el-select>
                <el-input v-model="searchVal" placeholder="输入关键词"></el-input>
                <el-button type="primary" size="medium">搜索</el-button>
              </div>
              <div>
                <el-table
                  :data="bankList"
                  style="width: 100%"
                  @row-click="selectItem">
                  <el-table-column
                    type="index"
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    prop="bankNum"
                    label="联行号">
                  </el-table-column>
                  <el-table-column
                    prop="bankName"
                    label="银行名称">
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </li>
        <li><span class="title">&emsp;&emsp;&emsp;&emsp;&emsp;</span> <input type="button" value="确认提现" /></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      text: '提现',
      mobile: this.$route.query.mobile,
      text1: '选择银行开户地址',
      amount: null,
      type: 1, // 2：大额， 1: 实时
      smallAmountFlag: true,
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
      result: [],
      provinceList: [
        {id: 1, provinceCode: "110000", provinceName: "北京市"},
        {id: 2, provinceCode: "120000", provinceName: "天津市"}
      ],
      cityList: [
        {id: 3, cityCode: "120100", cityName: "天津市", fatherCode: "120000"}
      ],
      areaList: [
        {areaCode: "120100", areaName: "天津市"},
        {areaCode: "120221", areaName: "宁河县"}
      ],
      bankList: [
        {
          bankCityCode: '1100',
          bankFatherNum: '',
          bankName: '招商银行股份有限公司天津新港支行',
          bankNo: '308',
          bankNum: '308110023085'
        },
        {
          bankCityCode: '1100',
          bankFatherNum: '',
          bankName: '招商银行股份有限公司天津新港支行',
          bankNo: '308',
          bankNum: '308110023085'
        }
      ],
      provinceCode: '110000',
      cityCode: '120100',
      areaCode: '120100',
      bankName: '招商银行股份有限公司天津新港支行', // 选择的银行
      progress: ''
    }
  },
  watch: {
    type() {
      if (this.type === '1') {
        this.smallAmountFlag = true
        this.largeAmountFlag = false
      } else {
        this.smallAmountFlag = false
        this.largeAmountFlag = true
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
      if (this.type === '1' && e.target.value > 50000) {
        // AppToast.maxVal('toCashAmount', '5万', '实时');
        e.target.value = 50000
      }
      if (this.type === '2' && e.target.value > parseFloat(this.balance)) {
        e.target.value = parseFloat(this.balance)
        // Toast('输入金额不能大于可提现余额，请重新输入。');
      }
      this.amount = e.target.value
    },
    selectBank() {
      if (this.showSelector) {
        this.showSelector = false
      } else {
        this.showSelector = true
      }
      // if (this.progress === 'city') {
      //   this.getSysProvinceList()
      // }
      // if (this.progress === 'area') {
      //   this.getSysCityList(this.provinceCode)
      // }
      // if (this.progress === 'bank') {
      //   this.getSysBankAreaList(this.cityCode)
      // }
    },
    selectItem(item) {
      console.log(item)
      this.showSelector = false
      if (item.provinceCode) {
        this.provinceCode = item.provinceCode
        this.getSysCityList(item.provinceCode)
      }
      if (item.cityCode) {
        this.cityCode = item.cityCode
        this.getSysBankAreaList(item.cityCode)
      }
      if (item.areaCode) {
        this.areaCode = item.areaCode
        this.getSysBranceBankList(item.areaCode, this.bankCardInfo.bankNo, this.serachVal)
      }
      if (item.bankNum) {
        this.cardBankCnaps = item.bankNum
        this.showSelector = false
      }
    },
    withDraw() {
      if (!this.amount) {
        // AppToast.empty('toCashAmount');
        return
      }
      if (parseFloat(this.balance) <= 0 || this.amount > parseFloat(this.balance)) {
        // Toast('输入金额不能大于可提现余额，请重新输入!');
        return
      }
      if (this.type === '2' && !this.cardBankCnaps) {
        // AppToast.empty('unionBankNo');
        return
      }
      // let url = Hyoucai.getRetBaseURL() + '/mine';
      // let forgetUrl = Hyoucai.getRetBaseURL() + '/personal_info';
      // let data = {
      //   txAmount: this.amount,
      //   routeCode: this.type,
      //   retUrl: url,
      //   forgotPwdUrl: forgetUrl,
      //   platform: 'H5'
      // };
      // if (this.type === '2') {
      //   data.cardBankCnaps = this.cardBankCnaps;
      // }
      // if (this.provinceCode) {
      //   data.provinceCode = this.provinceCode;
      // }
      // if (this.cityCode) {
      //   data.cityCode = this.cityCode;
      // }
      // if (this.areaCode) {
      //   data.areaCode = this.areaCode;
      // }
      // if (this.bankCardInfo.bankName) {
      //   data.bankName = this.bankCardInfo.bankName;
      // }
      // if (this.idNo) {
      //   data.idNo = this.bankCardInfo.bankName;
      // }
      // if (this.bankCardInfo.mobile) {
      //   data.mobile = this.bankCardInfo.mobile;
      // }
      // api.withdrawApi(data).then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     let option = data.data.paramReq;
      //     this.postcall(data.data.redirectUrl, option);
      //   } else {
      //     // Toast(resultMsg);
      //   }
      // });
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
      // api.sysBranceBankListApi(data).then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     this.result = data.data.list;
      //     if (!this.result.length) {
      //       Toast('无数据');
      //       this.getSysBankAreaList(this.cityCode);
      //       this.progress = 'area';
      //       return;
      //     }
      //     this.progress = 'bank';
      //     this.result.map((obj) => {
      //       if (obj.bankNum) {
      //         this.$set(
      //           obj, 'code', obj.bankNum
      //         );
      //         this.$set(
      //           obj, 'name', obj.bankName
      //         );
      //       }
      //     });
      //   } else {
      //     Toast(resultMsg);
      //   }
      // });
    },
    getSysBankAreaList(cityCode) {
      // api.sysBankAreaListApi({ cityCode: cityCode }).then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     this.result = data.data.list;
      //     if (!this.result.length) {
      //       Toast('无数据');
      //       this.getSysCityList(this.provinceCode);
      //       this.progress = 'city';
      //       return;
      //     }
      //     this.progress = 'area';
      //     this.result.map((obj) => {
      //       if (obj.areaCode) {
      //         this.$set(
      //           obj, 'code', obj.areaCode
      //         );
      //         this.$set(
      //           obj, 'name', obj.areaName
      //         );
      //       }
      //     });
      //   } else {
      //     Toast(resultMsg);
      //   }
      // });
    },
    getSysCityList(provinceCode) {
      // api.sysCityListApi({ provinceCode: provinceCode }).then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     this.result = data.data.list;
      //     if (!this.result.length) {
      //       Toast('无数据');
      //       this.getSysProvinceList();
      //       this.progress = 'province';
      //       return;
      //     }
      //     this.progress = 'city';
      //     this.result.map((obj) => {
      //       if (obj.cityCode) {
      //         this.$set(
      //           obj, 'code', obj.cityCode
      //         );
      //         this.$set(
      //           obj, 'name', obj.cityName
      //         );
      //       }
      //     });
      //   } else {
      //     Toast(resultMsg);
      //   }
      // });
    },
    getSysProvinceList() {
      // api.sysProvinceListApi().then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     this.result = data.data.list;
      //     if (!this.result.length) {
      //       Toast('无数据');
      //       this.progress = '';
      //       return;
      //     }
      //     this.progress = 'province';
      //     this.result.map((obj) => {
      //       if (obj.provinceCode) {
      //         this.$set(
      //           obj, 'code', obj.provinceCode
      //         );
      //         this.$set(
      //           obj, 'name', obj.provinceName
      //         );
      //       }
      //     });
      //   } else {
      //     Toast(resultMsg);
      //   }
      // });
    },
    getBankUnionNumberUrl() {
      // api.getBankUnionNumberUrlApi().then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     this.bankUnionNumberUrl = data.data.url;
      //   } else {
      //     Toast(resultMsg);
      //   }
      // });
    },
    getBankCardQuery() {
      // api.bankCardQueryApi().then(res => {
      //   let data = res.data;
      //   let resultCode = data.resultCode;
      //   let resultMsg = data.resultMsg;
      //   if (resultCode === '1') {
      //     this.bankCardInfo = data.data;
      //   } else {
      //     Toast(resultMsg);
      //   }
      // });
    },
    getServiceTel() {
      // api.serviceTelApi({ 'type': '1' }).then((res) => {
      //     let data = res.data;
      //     let resultCode = data.resultCode;
      //     let resultMsg = data.resultMsg;
      //     if (resultCode === '1') {
      //       this.serviceTel = data.data;
      //     } else {
      //       Toast(resultMsg);
      //     }
      //   }
      // );
    }
  },
  computed: {
    filterResult() {
      let data = this.result.filter(value => new RegExp(this.searchVal, 'i').test(value.name))
      return data
    }
  },
  created() {
    this.getBankCardQuery()
    this.getBankUnionNumberUrl()
    this.getSysProvinceList()
    // api.amountInfoApi().then(res => {
    //   if (res.data.resultCode === '1') {
    //     const data = res.data.data;
    //     this.balance = data.banlance;
    //   }
    // });
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.tocash {
  height: 100%;
  background-color: #fff;
  font-size: $font-size-small-s;
  border: 1px solid #f5f5f5;
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
            .el-radio__input{
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
              display: inline-block;
              width: 34px;
              line-height: 40px;
              text-align: center;
              cursor: pointer;
              i {
                font-size: 18px;
                color: #cdcdcd;
              }
            }
            /deep/ .el-card.is-always-shadow {
              position: absolute;
              top: 43px;
              width: 460px;
              box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.1);
              .el-card__header {
                padding: 7px 10px;
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
                    }
                  }
                  .el-input{
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
                  > .el-input{
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
                    background-color: #FC5541;
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
  }
}
</style>
