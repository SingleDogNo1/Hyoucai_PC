<template>
  <div class="content-box">
    <div class="content">
      <header>
        <router-link
          target="_blank"
          class="agreement"
          :to="{ name: 'threePartyAgreement', query: {productId: productId}}"
        >《三方协议》</router-link>
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
              <span class="left">历史平均年化收益率：</span>
              <span class="right">{{rate}}.0%</span>
            </p>
          </div>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">审核信息</span>
        </p>
        <div class="table-wrap" v-if="auditInfoList1.length > 0">
          <table class="examine">
            <tr class="examine-title">
              <td class="examine-td">身份信息</td>
              <td class="examine-td">认证情况</td>
            </tr>
            <tr class="examine-tr" v-for="(item,index) in auditInfoList1" :key="index">
              <td>{{item.key}}</td>
              <td>
                <span v-show="!item.result">{{item.val}}</span>
                <img
                  v-show="item.result&&item.field=='haveIDCard'"
                  @click="openReviewInfoPop(item)"
                  src="./../image/bg.png"
                >
                <!-- 人脸识别 -->
                <img
                  v-show="item.result&&item.field=='faceRecognition'"
                  @click="openFaceRecognitionPop(item)"
                  src="./../image/bg.png"
                >
                <a
                  :href="trilateralPdfPath"
                  target="_blank"
                  v-show="item.img&&item.field=='signing'"
                >
                  <img @click="signing()" src="./../image/bg.png">
                </a>
                <img
                  v-show="item.result&&item.field=='internetInformation'"
                  @click="internetInformation()"
                  src="./../image/bg.png"
                >
              </td>
            </tr>
          </table>
          <table class="examine" v-if="auditInfoList2.length > 0">
            <tr class="examine-title">
              <td>身份信息</td>
              <td>认证情况</td>
            </tr>
            <tr v-for="(item,index) in auditInfoList2" :key="index">
              <td>{{item.key}}</td>
              <td>
                <span v-show="!item.img">{{item.val}}</span>
                <img
                  v-show="item.img&&item.field=='haveIDCard'"
                  @click="openReviewInfoPop(item)"
                  src="./../image/bg.png"
                >
                <!-- 人脸识别 -->
                <img
                  v-show="item.img&&item.field=='faceRecognition'"
                  @click="openFaceRecognitionPop(item)"
                  src="./../image/bg.png"
                >
                <!-- 签约 -->
                <a
                  :href="trilateralPdfPath"
                  target="_blank"
                  v-show="item.img&&item.field=='signing'"
                >
                  <img @click="signing()" src="./../image/bg.png">
                </a>
                <img
                  v-show="item.img&&item.field=='internetInformation'"
                  @click="internetInformation()"
                  src="./../image/bg.png"
                >
              </td>
            </tr>
            <tr v-show="isTr">
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
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
          <a class="look-detail" :href="guaranteeProtocolUrl" target="_blank">点击查看>></a>
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
    <div class="face-recognition-pop" v-if="isShowFaceRecognitionPop">
      <div class="content face-content">
        <div class="close-wrap">
          <i @click="closeFaceRecognitionPop" class="el-icon-circle-close-outline close"></i>
          <img class="face" :src="facePic">
        </div>
      </div>
    </div>
    <Dialog :show.sync="isShowDialog" class="dialog" :singleButton="singleButton">
      <div class="dialog-div">{{resultMsg}}</div>
    </Dialog>
    <div class="authentication-pop" v-if="isShowAuthenticationPop">
      <div class="content">
        <div class="close-wrap">
          <i @click="closeReviewInfoPop" class="el-icon-circle-close-outline close"></i>
          <img class="front" :src="picList[0]">
          <img class="back" :src="picList[1]">
        </div>
      </div>
    </div>
    <div class="face-recognition-pop" v-if="isShowFaceRecognitionPop">
      <div class="content face-content">
        <div class="close-wrap">
          <i @click="closeFaceRecognitionPop" class="el-icon-circle-close-outline close"></i>
          <img class="face" :src="facePic">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPeopleInfoApi, getProjectDetail, getInternetInformation, getTrilateralPdfPath } from '@/api/hyc/Mine/lend'
// import {getPeopleLoanInfo} from '@/api/hyc/lend'
import Dialog from '@/components/Dialog/Dialog'
export default {
  name: 'ProjectDetal',
  data() {
    return {
      singleButton: true,
      isShowDialog: false,
      resultMsg: '',
      trilateralPdfPath: '',
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
      productId: '',
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
      isTr: false, //是否补齐表格
      isShowAuthenticationPop: false,
      isShowFaceRecognitionPop: false,
      picList: [], // 身份证弹窗图片
      facePic: '', // 人脸识别弹窗图片
      guaranteeProtocolUrl: '',
      auditInfoList1: [],
      auditInfoList2: [],
      internetInformationList: []
    }
  },
  components: {
    Dialog
  },
  methods: {
    closeReviewInfoPop() {
      this.isShowAuthenticationPop = false
    },
    closeFaceRecognitionPop() {
      this.isShowFaceRecognitionPop = false
    },
    openReviewInfoPop(item) {
      this.isShowAuthenticationPop = true
      this.picList = item.result.split(',')
    },
    openFaceRecognitionPop(item) {
      //人脸识别
      this.isShowFaceRecognitionPop = true
      this.facePic = item.result
    },
    signing() {
      //签约
      getTrilateralPdfPath({ invRecordId: this.$route.params.invRecordId }).then(res => {
        if (res.data.resultMsg == '用户暂未签署该协议') {
          this.resultMsg = res.data.resultMsg
          this.isShowDialog = true
          // console.log(2)
        } else {
          this.trilateralPdfPath = res.data.protocolPdfPath
        }
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
        this.repaymentWay = res.data.data.productDetail.repaymentWay
        this.projectName = res.data.data.productDetail.projectName
        this.productId = res.data.data.projectInfo.productId
        auditInfoList.map((item, index) => {
          switch (item.field) {
            case 'haveIDCard':
              item.img = true
              break
            case 'faceRecognition':
              item.img = true
              break
            case 'signing':
              item.img = true
              break
            case 'internetInformation':
              item.img = true
              break
            default:
              item.img = false
          }
          if (index % 2 == 0) {
            this.auditInfoList1.push(auditInfoList[index])
          } else {
            this.auditInfoList2.push(auditInfoList[index])
          }
        })
        if (auditInfoList.length % 2 != 0) {
          this.isTr = true
        }
        // this.projectName
      })
    },
    internetInformation() {
      // 互联网资信报告
      getInternetInformation({ projectNo: this.$route.params.projectNo }).then(res => {
        let data = res.data.data
        this.internetInformationList = data.internetInformationList
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
        this.rate = data.rate
        this.guaranteeProtocolUrl = data.guaranteeProtocolUrl
      })
    }
  },
  created() {
    this.getPeopleInfoApi()
    this.getProjectDetail()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
.content-box {
  padding: 120px 0 110px;
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
    width: 1140px;
    margin: 0 auto;
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
        font-size: $font-size-small;
        color: rgba(0, 131, 254, 1);
        line-height: 22px;
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
      height: 739px;
      overflow: auto;
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
          }
        }
        .examine-title {
          background: rgba(240, 247, 255, 1);
          td {
            color: rgba(74, 74, 74, 1);
          }
        }
      }
      .table-wrap {
        display: flex;
        .examine {
          margin: 21px 0 32px;
          width: 50%;
          tr {
            width: 100%;
            td {
              width: 25%;
              height: 40px;
              border: 1px solid rgba(227, 227, 227, 1);
              text-align: center;
              color: rgba(155, 155, 155, 1);
              font-size: $font-size-small-ss;
              line-height: 14px;
              padding: 0 20px;
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
          .examine-title {
            background: rgba(240, 247, 255, 1);
            td {
              color: rgba(74, 74, 74, 1);
            }
          }
          &:nth-child(2n) {
            tr td {
              border-left: 0;
            }
          }
        }
        .cost {
          width: 100%;
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
  .authentication-pop,
  .face-recognition-pop {
    position: fixed;
    z-index: 100000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .content {
      position: fixed;
      display: table;
      z-index: 100001;
      width: 420px;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      text-align: center;
      background: #fff;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.32);
      border-radius: 8px;
      overflow: hidden;
      .close-wrap {
        position: relative;
        width: 100%;
        .close {
          position: absolute;
          top: 16px;
          right: 16px;
          color: #4a4a4a;
          font-size: 28px;
          cursor: pointer;
        }
      }
      img {
        display: block;
        width: 329px;
        height: 205px;
        margin: 0 auto;
        margin-bottom: 20px;
      }
      img.front {
        padding-top: 60px;
      }
      img.face {
        width: 140px;
        height: 140px;
        padding-top: 20px;
      }
      h3 {
        padding-top: 20px;
        font-size: $font-size-medium-x;
        font-weight: 500;
        color: $color-text-s;
      }
      ul {
        width: 450px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 10px;
        padding-bottom: 20px;
        li {
          font-size: $font-size-small;
          color: $color-text-s;
          text-align: left;
          &:nth-child(2n) {
            width: 60%;
          }
          &:nth-child(2n + 1) {
            width: 40%;
          }
        }
      }
    }
    .content.face-content {
      width: 300px;
    }
    .report-content {
      width: 490px;
    }
  }
  .dialog {
    .dialog-div {
      text-align: center;
    }
  }
}
</style>
