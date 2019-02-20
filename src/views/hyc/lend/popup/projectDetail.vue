<template>
  <div class="content-box">
    <div class="content">
      <header>
        <span class="agreement" @click="agreement()">《三方协议》</span>
        <i class="el-icon-circle-close-outline cancel" @click="change"></i>
      </header>
      <section>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">基本信息</span>
        </p>
        <div class="essential-information">
          <div class="txt">
            <p>
              <span class="left">项目名称：</span>
              <span class="right">{{projectName}}</span>
            </p>
            <p>
              <span class="left">还款方式：</span>
              <span class="right">{{repaymentWay}}</span>
            </p>
          </div>
          <div class="txt">
            <p>
              <span class="left">合同编号：</span>
              <span class="right">{{contractNum}}</span>
            </p>
            <p>
              <span class="left">融资金额：</span>
              <span class="right">{{prinAmt}}</span>
            </p>
          </div>
          <div class="txt">
            <p>
              <span class="left">借贷期限：</span>
              <span class="right">{{loanDay}}</span>
            </p>
            <p>
              <span class="left">历史年化收益率：</span>
              <span class="right">{{rate}}.0%</span>
            </p>
          </div>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">审核信息</span>
        </p>
        <table class="examine">
          <tr class="examine-title">
            <td class="examine-td">身份信息</td>
            <td class="examine-td">认证情况</td>
            <td class="examine-td">身份信息</td>
            <td class="examine-td">认证情况</td>
          </tr>
          <tr class="examine-tr">
            <td colspan="2">
              <table class="td-table">
                <tr v-for="(item,index) in auditInfoList1" :key="index">
                  <td style="border-left: 1px solid rgba(227, 227, 227, 1)">{{item.key}}</td>
                  <td>
                    <span v-show="!item.result">{{item.val}}</span>
                    <img
                      v-show="item.result&&item.field=='haveIDCard'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                    <img
                      v-show="item.result&&item.field=='faceRecognition'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                    <img
                      v-show="item.result&&item.field=='signing'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                    <img
                      v-show="item.result&&item.field=='internetInformation'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                  </td>
                </tr>
              </table>
            </td>
            <td colspan="2">
              <table class="td-table">
                <tr v-for="(item,index) in auditInfoList2" :key="index">
                  <td style="border-left: 1px solid #fff">{{item.key}}</td>
                  <td>
                    <span v-show="!item.result">{{item.val}}</span>
                    <img
                      v-show="item.result&&item.field=='haveIDCard'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                    <img
                      v-show="item.result&&item.field=='faceRecognition'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                    <img
                      v-show="item.result&&item.field=='signing'"
                      @click="flag=!flag"
                      src="./../image/bg.png"
                    >
                    <img
                      v-show="item.result&&item.field=='internetInformation'"
                      @click="internetInformation()"
                      src="./../image/bg.png"
                    >
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- <tr>
            <td>身份证认证</td>
            <td>
              <img @click="flag=!flag" src="./../image/bg.png">
            </td>
            <td>运营商认证</td>
            <td>中国移动运营商认证通过</td>
          </tr>
          <tr>
            <td>学信网认证</td>
            <td>白领</td>
            <td>人脸识别</td>
            <td>
              <img src="./../image/bg.png">
            </td>
          </tr>
          <tr>
            <td>签约</td>
            <td>
              <img src="./../image/bg.png">
            </td>
            <td>银行卡认证</td>
            <td>6228 **** **** 1234银行卡账户、开户名、开户手机、身份证号认证成功</td>
          </tr>
          <tr>
            <td>互联网资讯报告</td>
            <td>
              <img src="./../image/bg.png">
            </td>
            <td></td>
            <td></td>
          </tr>-->
        </table>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">还款来源</span>
        </p>
        <div class="repayment">{{paymentSource}}</div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">相关费用</span>
        </p>
        <table class="examine cost">
          <tr class="examine-title">
            <td class="left">相关操作</td>
            <td class="right">收费标准</td>
          </tr>
          <tr>
            <td>转让手续费</td>
            <td>按每笔转让收取，费用为年化金额0.6%</td>
          </tr>
          <tr>
            <td>提现／充值／投资</td>
            <td>免费</td>
          </tr>
        </table>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">借款人信息</span>
        </p>
        <div class="borrower">
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">借款人姓名：</span>
              <span class="right">{{borrowerName}}</span>
            </p>
            <p class="borrower-box-center">
              <span class="left">性别：</span>
              <span class="right">{{sex}}</span>
            </p>
            <p>
              <span class="left">身份证号：</span>
              <span class="right">{{idNum}}</span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">年龄：</span>
              <span class="right">{{age}}</span>
            </p>
            <p class="borrower-box-center">
              <span class="left">行业：</span>
              <span class="right">{{industry}}</span>
            </p>
            <p>
              <span class="left">居住地址：</span>
              <span class="right">{{domicile}}</span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">婚姻状况：</span>
              <span class="right">{{maritalStatus}}</span>
            </p>
            <p class="borrower-box-center">
              <span class="left">月收入：</span>
              <span class="right">{{income}}</span>
            </p>
            <p>
              <span class="left">借款金额：</span>
              <span class="right">{{prinAmt}}</span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">借款用途：</span>
              <span class="right">{{loanAim}}</span>
            </p>
            <p class="borrower-box-center">
              <span class="left">借款人主体性质：</span>
              <span class="right">{{borrowerTheme}}</span>
            </p>
            <p>
              <span class="left">借款期限：</span>
              <span class="right">{{loanDay}}</span>
            </p>
          </div>
          <div class="borrower-box">
            <p class="borrower-box-left">
              <span class="left">还款来源：</span>
              <span class="right">{{paymentSource}}</span>
            </p>
            <p class="borrower-box-center">
              <span class="left">逾期金额：</span>
              <span class="right">{{amountOverride}}</span>
            </p>
            <p></p>
          </div>
          <p class="borrower-txt">
            <span class="left">征信报告：</span>
            <span class="right">{{creditReport}}</span>
          </p>
          <p class="borrower-txt">
            <span class="left">在其他网络借贷平台借款情况：</span>
            <span class="right">{{borrowSituation}}</span>
          </p>
          <p class="look-detail">点击查看>></p>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">贷后情况</span>
        </p>
        <div class="situation">
          <div class="situation-div situation-left">
            <p>
              <span class="left">平台历史逾期次数：</span>
              <span class="right">0次</span>
            </p>
            <p>
              <span class="left">借款人还款能力变化情况：</span>
              <span class="right">未发现异常</span>
            </p>
          </div>
          <div class="situation-div situation-center">
            <p>
              <span class="left">平台历史逾期金额：</span>
              <span class="right">0.00元</span>
            </p>
            <p>
              <span class="left">借款人涉诉情况：</span>
              <span class="right">未发现新增涉诉</span>
            </p>
          </div>
          <div class="situation-div situation-right">
            <p>
              <span class="left">借款资金运用情况：</span>
              <span class="right">未发现挪用</span>
            </p>
            <p>
              <span class="left">借款人受行政处罚情况：</span>
              <span class="right">未发现新增行政处罚</span>
            </p>
          </div>
        </div>
      </section>
    </div>
    <div class="id-image" v-show="flag">
      <i @click="flag=!flag" class="el-icon-circle-close-outline close"></i>
      <img
        class="front"
        src="https://www.hyoucai.com:8082/huiyoucaifiles/picture/certification/2018-09-25/idCardM_a_BD20180925023001020650_djs361466uv.png"
      >
      <img
        class="back"
        src="https://www.hyoucai.com:8082/huiyoucaifiles/picture/certification/2018-09-25/idCardM_b_BD20180925023001020650_djs361466uv.png"
      >
    </div>
    <div v-show="isInternetInformation" class="internetInformation">
      <h3 class="internetInformation-h2">
        互联网资信报告
        <i
          class="el-icon-circle-close-outline internetInformation-i"
          @click="isInternetInformation=false"
        ></i>
      </h3>
      <div class="internetInformation-div">
        <p v-for="(item,index) in internetInformationList" :key="index">
          <span>{{item.key}}：</span>
          <span>{{item.value}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPeopleInfoApi, getProjectDetail, getInternetInformation } from '@/api/hyc/Mine/lend'
// import {getPeopleLoanInfo} from '@/api/hyc/lend'
export default {
  name: 'ProjectDetal',
  data() {
    return {
      flag: false,
      isInternetInformation: false,
      borrowerName: '',
      sex: '',
      idNum: '',
      age: '',
      industry: '',
      domicile: '',
      maritalStatus: '',
      income: '',
      prinAmt: '',
      loanAim: '',
      borrowerTheme: '',
      loanDay: '',
      paymentSource: '',
      amountOverride: '',
      creditReport: '',
      borrowSituation: '',
      repaymentWay: '',
      rate: '',
      projectName: '',
      contractNum: '',
      auditInfoList1: [],
      auditInfoList2: [],
      internetInformationList: []
    }
  },
  methods: {
    agreement() {
      this.$router.push({
        name: 'threePartyAgreement'
      })
    },
    change: function() {
      this.$router.go(-1)
    },
    getProjectDetail() {
      getProjectDetail({ projectNo: this.$route.params.projectNo }).then(res => {
        // console.log(res)
        this.contractNum = res.data.data.productDetail.contractNum
        let auditInfoList = res.data.data.productDetail.auditInfoList
        auditInfoList.map((item, index) => {
          switch (item.field) {
            case 'haveIDCard':
              item.result = true
              break
            case 'faceRecognition':
              item.result = true
              break
            case 'signing':
              item.result = true
              break
            case 'internetInformation':
              item.result = true
              break
            default:
              item.result = false
          }
          if (index % 2 == 0) {
            this.auditInfoList1.push(auditInfoList[index])
          } else {
            this.auditInfoList2.push(auditInfoList[index])
          }
        })
        // this.projectName
      })
    },
    internetInformation() {
      // 互联网资信报告
      getInternetInformation({ projectNo: this.$route.params.projectNo }).then(res => {
        this.internetInformationList = res.data.data.internetInformationList
        // console.log(res.data.data.internetInformationList)
      })
      this.isInternetInformation = !this.isInternetInformation
    },
    getPeopleInfoApi() {
      getPeopleInfoApi({ projectNo: this.$route.params.projectNo, nameEncrypt: true }).then(res => {
        let data = res.data.data
        this.borrowerName = data.borrowerName
        this.sex = data.sex
        this.idNum = data.idNum
        this.age = data.age
        this.domicile = data.domicile
        this.maritalStatus = data.maritalStatus
        this.industry = data.industry
        this.income = data.income
        this.prinAmt = data.prinAmt
        this.loanAim = data.loanAim
        this.borrowerTheme = data.borrowerTheme
        this.loanDay = data.loanDay
        this.paymentSource = data.paymentSource
        this.amountOverride = data.amountOverride
        this.creditReport = data.creditReport
        this.borrowSituation = data.borrowSituation
        this.repaymentWay = data.repaymentWay
        this.rate = data.rate
      })
    }
  },
  created() {
    this.projectName = this.$route.params.projectName
    // console.log(this.$route.params)
    this.getPeopleInfoApi()
    this.getProjectDetail()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
.content-box {
  padding: 120px 200px 110px;
  background: rgba(227, 227, 227, 1);
  // position: absolute;
  // top: 0;
  // z-index: 2;
  .content {
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    border: 1px solid rgba(229, 229, 229, 1);
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: $font-size-small;
    min-width: 1100px;
    header {
      height: 61px;
      line-height: 61px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      color: rgba(0, 131, 254, 1);
      padding-left: 30px;
      position: relative;
      .agreement {
        cursor: pointer;
      }
      .cancel {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 29px;
        height: 29px;
        border-radius: 50%;
        cursor: pointer;
        color: #4a4a4a;
        font-size: 32px;
      }
    }
    section {
      padding-top: 24px;
      padding-left: 50px;
      .title {
        .title-boder {
          display: inline-block;
          width: 6px;
          height: 16px;
          background: rgba(251, 157, 31, 1);
          vertical-align: middle;
        }
        .title-text {
          display: inline-block;
          font-size: 16px;
          color: rgba(74, 74, 74, 1);
          line-height: 22px;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .essential-information {
        display: flex;
        margin: 11px 112px 0 0;
        justify-content: space-between;
        margin-bottom: 39px;
        .txt {
          height: 80px;
          font-size: $font-size-small;
          color: rgba(155, 155, 155, 1);
          line-height: 40px;
          .right {
            color: rgba(74, 74, 74, 1);
          }
        }
      }
      .examine {
        margin: 21px 50px 32px 0;
        // width:1080px;
        width: 92%;
        tr {
          width: 100%;
          td {
            width: 25%;
            height: 40px;
            border: 1px solid rgba(227, 227, 227, 1);
            text-align: center;
            font-size: $font-size-small-ss;
            color: rgba(155, 155, 155, 1);
            line-height: 14px;
            // padding: 0 15px;
            img {
              width: 24px;
              height: 17px;
              border-radius: 2px;
              vertical-align: middle;
              cursor: pointer;
            }
          }
          .left {
            width: 30%;
          }
        }
        .examine-tr {
          width: 100%;
          td {
            width: 25%;
            border: none;
            .td-table {
              width: 100%;
              tr {
                width: 100%;
                td {
                  border: none;
                  height: 40px;
                  width: 50%;
                  border-right: 1px solid rgba(227, 227, 227, 1);
                  border-bottom: 1px solid rgba(227, 227, 227, 1);
                }
              }
            }
          }
        }
        .examine-title {
          background: rgba(240, 247, 255, 1);
          td {
            color: rgba(74, 74, 74, 1);
          }
        }
      }
      .repayment {
        font-size: 14px;
        color: rgba(155, 155, 155, 1);
        line-height: 14px;
        margin: 20px 0 58px;
      }
      .cost {
        margin-top: 25px;
        margin-bottom: 20px;
      }
      .borrower {
        margin: 19px 0 50px;
        font-size: $font-size-small-s;
        position: relative;
        .borrower-box {
          height: 30px;
          line-height: 30px;
          display: flex;
          .borrower-box-left {
            width: 196px;
            height: 210px;
          }
          .borrower-box-center {
            width: 160px;
            height: 150px;
            margin-left: 150px;
            margin-right: 150px;
          }
        }
        .left {
          color: rgba(155, 155, 155, 1);
        }
        .borrower-txt {
          height: 30px;
          line-height: 30px;
        }
        .look-detail {
          width: 94px;
          height: $font-size-small-s;
          color: rgba(251, 123, 31, 1);
          line-height: $font-size-small-s;
          position: absolute;
          right: 57px;
          bottom: 8px;
          cursor: pointer;
        }
      }
      .situation {
        margin: 10px 0 36px;
        display: flex;
        font-size: $font-size-small;
        .situation-left {
          width: 272px;
          height: 80px;
        }
        .situation-div {
          color: rgba(155, 155, 155, 1);
          line-height: 40px;
          .right {
            color: rgba(74, 74, 74, 1);
          }
        }
        .situation-center {
          margin: 0 98px 0 106px;
        }
      }
    }
  }
  .id-image {
    width: 420px;
    height: 530px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.32);
    border-radius: 8px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 29px;
      height: 29px;
      cursor: pointer;
      color: #4a4a4a;
      font-size: 28px;
    }
    img {
      display: block;
      width: 329px;
      height: 205px;
      margin: 0 auto;
    }
    img.front {
      padding-top: 60px;
      margin-bottom: 20px;
    }
  }
  .internetInformation {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 2;
    background: #fff;
    width: 550px;
    height: 260px;
    border: 1px solid #ccc;
    border-radius: 10px;
    line-height: 28px;
    color: #666;
    .internetInformation-h2 {
      display: block;
      width: 100%;
      margin: 20px 0 10px;
      text-align: center;
      position: relative;
      .internetInformation-i {
        position: absolute;
        top: 4px;
        right: 20px;
        cursor: pointer;
      }
    }
    .internetInformation-div {
      padding: 0 10px 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      p {
        width: 50%;
      }
    }
  }
}
</style>
