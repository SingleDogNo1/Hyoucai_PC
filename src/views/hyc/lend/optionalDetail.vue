<template>
  <div class="lend-detail">
    <section class="production-info">
      <div class="title">
        <h2>
          <img src="./image/icon_ying.png">
          <span>{{projectInfo.projectName}}</span>
        </h2>
      </div>
      <div class="content">
        <div class="decs-wrap">
          <div class="item">
            <p class="value">
              <strong>{{projectInfo.investRate}}</strong>
              <span class="red">%</span>
            </p>
            <p class="desc">预期年化收益率</p>
          </div>
          <div class="item">
            <p class="value">
              <span>{{projectInfo.surplusAmt}}</span>
            </p>
            <p class="desc">剩余可投(元)</p>
          </div>
          <div class="item">
            <p class="value">
              <span>{{projectInfo.investPeopleCount}}</span>
              <span>人</span>
            </p>
            <p class="desc">已购人数</p>
          </div>
        </div>
        <div class="progress-wrap">
          <span class="title">项目进度</span>
          <el-progress :percentage="projectInfo.investPercent"></el-progress>
          <span class="score">{{projectInfo.investPercent}}%</span>
        </div>
      </div>
      <div class="tips">
        <div class="method">
          <span class="title">计息方式：</span>
          <span>等额本息</span>
        </div>
        <div class="countdown">
          <span class="title">募集倒计时：</span>
          <span class="large">{{projectInfo.investEndDay}}</span>
          <span>{{projectInfo.investEndTime}}</span>
        </div>
      </div>
      <div class="invest-module">
        <h2>
          <span
            :class="{ 'unopened-status-title': investStatus === 'unopened' }"
            class="status-title"
          >{{investStatusTitle}}</span>
          <button v-if="investStatus != 'unopened'" class="status-btn">
            <router-link :to="{ name: 'charge' }">{{investStatusBtn}}</router-link>
          </button>
        </h2>
        <div class="content">
          <p class="available-balance">
            <span class="title">可用余额</span>
            <span class="value">{{projectInfo.balance}}</span>
          </p>
          <p class="starting-amount">
            <span class="title">起投金额</span>
            <span class="value">{{projectInfo.minInvAmount}}元</span>
          </p>
          <p class="single-limit">
            <span class="title">单人限额</span>
            <span class="value">{{projectInfo.maxInvTotalAmount}}元</span>
          </p>
          <div class="risk-notice">
            <el-checkbox v-model="isAgree">已阅读并同意
              <router-link target="_blank" :to="{ name: 'riskNoticationLetterAgreement'}">《风险告知书》</router-link>
            </el-checkbox>
          </div>
          <div class="all-lending" v-if="!investDetail.tailProject">
            <el-checkbox class="all-lending-checkbox" v-model="isAllLending">全部出借</el-checkbox>
          </div>
          <div class="action" v-if="investStatus === 'willSale' || investStatus === 'lending'">
            <input class="amount-input" v-model="invAmount" @keyup="handleExpectedIncome" :disabled="invAmountDisabled">
            <button
              class="action-btn"
              :disabled="isDisableInvestBtn"
              @click="handleInvest"
            >{{investBtn}}</button>
          </div>
          <div class="action" v-if="investStatus === 'fullyMarked' || investStatus === 'finished'">
            <button class="action-btn-disabled" @click="handleInvest">{{investStatusTitle}}</button>
          </div>
          <p class="expected-profits">
            <span class="title">预期收益：</span>
            <span class="value">{{expectedIncome}}元</span>
          </p>
          <p class="err-msg" v-if="errMsg">{{errMsg}}</p>
        </div>
      </div>
    </section>
    <section class="tab-wrap">
      <el-tabs
        class="lend-detail-tab"
        v-model="lendDetailActiveName"
        type="border-card"
        @tab-click="handleItemClick()"
      >
        <el-tab-pane label="项目信息 " name="XMXX">
          <div v-if="lendDetailActiveName === 'XMXX'" class="content">
            <section>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">基本信息</span>
              </p>
              <div class="essential-information">
                <div class="txt">
                  <p>
                    <span class="left">项目名称：</span>
                    <span class="right">{{productDetail.projectName}}</span>
                  </p>
                  <p>
                    <span class="left">还款方式：</span>
                    <span class="right">{{productDetail.repaymentWay}}</span>
                  </p>
                </div>
                <div class="txt">
                  <p>
                    <span class="left">合同编号：</span>
                    <span class="right">{{productDetail.contractNum}}</span>
                  </p>
                  <p>
                    <span class="left">融资金额：</span>
                    <span class="right">{{productDetail.loanAmt}}</span>
                  </p>
                </div>
                <div class="txt">
                  <p>
                    <span class="left">借贷期限：</span>
                    <span class="right">{{productDetail.loanMent}}</span>
                  </p>
                  <p>
                    <span class="left">历史年化收益率：</span>
                    <span class="right">{{productDetail.investRate}}</span>
                  </p>
                </div>
              </div>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">审核信息</span>
              </p>
              <div class="table-wrap" v-if="oddAuditInfoList.length > 0">
                <table class="examine">
                  <tr class="examine-title">
                    <td>身份信息</td>
                    <td>认证情况</td>
                  </tr>
                  <tr v-for="(item, index) in oddAuditInfoList" :key="index">
                    <td>{{item.key}}</td>
                    <td v-if="!item.isShowSmallPic">{{item.result}}</td>
                    <td v-if="item.isShowSmallPic && item.field === 'haveIDCard'"> <img @click="openReviewInfoPop(item)" src="./image/bg.png" /></td>
                    <td v-if="item.isShowSmallPic && item.field === 'internetInformation'"> <img @click="openReportPop" src="./image/bg.png" /></td>
                    <td v-if="item.isShowSmallPic && item.field === 'faceRecognition'"> <img @click="openFaceRecognitionPop(item)" src="./image/bg.png" /></td>
                    <td v-if="item.isShowSmallPic && item.field === 'signing'"> <img @click="toSigning(item)" src="./image/bg.png" /></td>
                  </tr>
                </table>
                <table class="examine" v-if="evenAuditInfoList.length > 0">
                  <tr class="examine-title">
                    <td>身份信息</td>
                    <td>认证情况</td>
                  </tr>
                  <tr v-for="(item, index) in evenAuditInfoList" :key="index">
                    <td>{{item.key}}</td>
                    <td v-if="!item.isShowSmallPic">{{item.result}}</td>
                    <td v-if="item.isShowSmallPic && item.field === 'haveIDCard'"> <img @click="openReviewInfoPop(item)" src="./image/bg.png" /></td>
                    <td v-if="item.isShowSmallPic && item.field === 'internetInformation'"> <img @click="openReportPop" src="./image/bg.png" /></td>
                    <td v-if="item.isShowSmallPic && item.field === 'faceRecognition'"> <img @click="openFaceRecognitionPop(item)" src="./image/bg.png" /></td>
                    <td v-if="item.isShowSmallPic && item.field === 'signing'"> <img @click="toSigning(item)" src="./image/bg.png" /></td>
                  </tr>
                </table>
              </div>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">还款来源</span>
              </p>
              <div class="repayment">借款人固定工作收入</div>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">相关费用</span>
              </p>
              <div class="table-wrap">
                <table class="examine cost">
                  <tr class="examine-title">
                    <td class="left">相关操作</td>
                    <td class="right">收费标准</td>
                  </tr>
                  <tr>
                    <td>转让手续费</td>
                    <td>{{productDetail.relatedExpenses}}</td>
                  </tr>
                  <tr>
                    <td>提现／充值／投资</td>
                    <td>免费</td>
                  </tr>
                </table>
              </div>
            </section>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出借详情" name="CJXQ">
          <div v-if="lendDetailActiveName === 'CJXQ'" class="content">
            <p class="desc">{{investDetail.appDesc}}</p>
            <ul class="detail-list">
              <li>
                <p class="title">
                  <span>协议</span>
                </p>
                <router-link
                  target="_blank"
                  class="value"
                  :to="{ name: 'threePartyAgreement', query: {productId: productId}}"
                >《三方协议》</router-link>
              </li>
              <li>
                <p class="title">
                  <span>出借目标</span>
                </p>
                <span class="value">{{investDetail.investTarget}}</span>
              </li>
              <li>
                <p class="title">
                  <span>锁定期</span>
                </p>
                <span class="value">{{investDetail.dueDate}}</span>
              </li>
              <li>
                <p class="title">
                  <span>起息时间</span>
                </p>
                <span class="value">{{investDetail.interestStartDate}}</span>
              </li>
              <li>
                <p class="title">
                  <span>利息分配</span>
                </p>
                <span class="value">{{investDetail.profitShare}}</span>
              </li>
              <li>
                <p class="title">
                  <span>退出机制</span>
                </p>
                <span class="value">{{investDetail.existSystem}}</span>
              </li>
              <li>
                <p class="title">
                  <span>费用说明</span>
                </p>
                <span class="value">{{investDetail.costdes}}</span>
              </li>
              <li>
                <p class="title">
                  <span>项目风险评估及可能产生的风险结果</span>
                </p>
                <span class="value">{{investDetail.riskAppraisal}}</span>
              </li>
              <li>
                <p class="title">
                  <span>出借人适当性管理提示</span>
                </p>
                <span class="value">{{investDetail.riskManagementTip}}</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加入记录" name="JRJL">
          <div v-if="lendDetailActiveName === 'JRJL'" class="content">
            <el-table
              :header-cell-style="{ background: '#f0f7ff'}"
              class="join-record-table"
              :data="joinRecordData"
              border
            >
              <el-table-column align="center" prop="mobile" label="出借人"></el-table-column>
              <el-table-column align="center" height="40" prop="invAmt" label="出借金额"></el-table-column>
              <el-table-column align="center" height="40" prop="invTime" label="出借时间"></el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <pagination
                :count-page="total"
                :size-val="size"
                :page-val="page"
                @handleCurrentChange="handleCurrentChange"
              ></pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="借款人信息" name="JKRXX">
          <div v-if="lendDetailActiveName === 'JKRXX'" class="content">
            <section>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">借款人信息</span>
              </p>
              <div class="borrower">
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">借款人姓名：</span>
                    <span class="right">{{loanPeopleInfo.borrowerName}}</span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">性别：</span>
                    <span class="right">{{loanPeopleInfo.sex}}</span>
                  </p>
                  <p>
                    <span class="left">身份证号：</span>
                    <span class="right">{{loanPeopleInfo.idNum}}</span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">年龄：</span>
                    <span class="right">{{loanPeopleInfo.age}}</span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">行业：</span>
                    <span class="right">{{loanPeopleInfo.industry}}</span>
                  </p>
                  <p>
                    <span class="left">居住地址：</span>
                    <span class="right">{{loanPeopleInfo.domicile}}</span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">婚姻状况：</span>
                    <span class="right">{{loanPeopleInfo.maritalStatus}}</span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">月收入：</span>
                    <span class="right">{{loanPeopleInfo.income}}</span>
                  </p>
                  <p>
                    <span class="left">借款金额：</span>
                    <span class="right">{{loanPeopleInfo.prinAmt}}</span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">借款用途：</span>
                    <span class="right">{{loanPeopleInfo.loanAim}}</span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">借款主体性质：</span>
                    <span class="right">{{loanPeopleInfo.borrowerTheme}}</span>
                  </p>
                  <p>
                    <span class="left">借款期限：</span>
                    <span class="right">{{loanPeopleInfo.loanDay}}</span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">还款来源：</span>
                    <span class="right">{{loanPeopleInfo.paymentSource}}</span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">逾期金额：</span>
                    <span class="right">{{loanPeopleInfo.amountOverride}}</span>
                  </p>
                  <p></p>
                </div>
                <p class="borrower-txt">
                  <span class="left">征信报告：</span>
                  <span class="right">核查人银行征信报告，该借款人近6个月无逾</span>
                </p>
                <p class="borrower-txt">
                  <span class="left">在其他网络借贷平台借款情况：</span>
                  <span class="right">{{loanPeopleInfo.borrowSituation}}</span>
                  <a class="view-detail" :href="loanPeopleInfo.guaranteeProtocolUrl" target="_blank">
                    点击查看
                    <i class="iconfont icon-more"></i>
                  </a>
                </p>
              </div>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">贷后情况</span>
              </p>
              <div class="situation">
                <div class="situation-div situation-left">
                  <p>
                    <span class="left">平台历史逾期次数：</span>
                    <span class="right">{{peopleLoanInfo.platformOverdueCut}}</span>
                  </p>
                  <p>
                    <span class="left">借款人还款能力变化情况：</span>
                    <span class="right">{{peopleLoanInfo.platformOverdueAmt}}</span>
                  </p>
                </div>
                <div class="situation-div situation-center">
                  <p>
                    <span class="left">平台历史逾期金额：</span>
                    <span class="right">{{peopleLoanInfo.loanUseInfo}}</span>
                  </p>
                  <p>
                    <span class="left">借款人涉诉情况：</span>
                    <span class="right">{{peopleLoanInfo.repaymentAbilityChg}}</span>
                  </p>
                </div>
                <div class="situation-div situation-right">
                  <p>
                    <span class="left">借款资金运用情况：</span>
                    <span class="right">{{peopleLoanInfo.involvedInAppeal}}</span>
                  </p>
                  <p>
                    <span class="left">借款人受行政处罚情况：</span>
                    <span class="right">{{peopleLoanInfo.administrativePenalty}}</span>
                  </p>
                </div>
              </div>
            </section>
          </div>
        </el-tab-pane>
        <el-tab-pane label="风险告知" name="FXGZS">
          <div v-if="lendDetailActiveName === 'FXGZS'" class="content">
            <p>尊敬的出借人：</p>
            <p>恭喜您成为江西汇通金融信息服务有服公司运营的网络借贷平台—汇有财平台的用户。感谢您参与/出借本服务/出借标的，在您签署本《风险告知书》之前，请您认真、仔细阅读以下内容及本平台制定并发布的规则制度及其更新或修正的内容，本《风险告知书》经您确认，即视为您已详细了解并理解本风险告知书的全部内容，对其中揭示的风险均有足够的认识，您可在了解融资项目信贷风险后，根据您的金融产品出借经历、风险认知能力、风险识别能力和风险承受能力，自主选择将来源合法的自有资金通过汇有财平台进行资金出借。当您点击“出借”、“申请出借”、“立即出借”、“确认出借”、“同意协议”、“接受协议”或类似文字时，即视为您已经充...</p>
            <p class="view-more">
              <router-link target="_blank" :to="{ name: 'riskNoticationLetterAgreement'}">
                点击查看更多
                <i class="iconfont icon-more"></i>
              </router-link>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <div class="authentication-pop" v-if="isShowAuthenticationPop">
      <div class="content">
        <div class="close-wrap">
          <i @click="closeReviewInfoPop" class="el-icon-circle-close-outline close"></i>
          <img
            class="front"
            :src="picList[0]"
          >
          <img
            class="back"
            :src="picList[1]"
          >
        </div>
      </div>
    </div>
    <div class="face-recognition-pop" v-if="isShowFaceRecognitionPop">
      <div class="content face-content">
        <div class="close-wrap">
          <i @click="closeFaceRecognitionPop" class="el-icon-circle-close-outline close"></i>
          <img
            class="face"
            :src="facePic"
          >
        </div>
      </div>
    </div>
    <div class="report-pop" v-if="isShowReportPop">
      <div class="content report-content">
        <div class="close-wrap">
          <i @click="closeReportPop" class="el-icon-circle-close-outline close"></i>
          <h3>互联网资信报告</h3>
          <ul>
            <li v-for="( item, index) in internetInformationList" :key="index">
              <span>{{item.key}}：</span>
              <span>{{item.value}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Dialog
      :show.sync="isShowSignDialog"
      title="汇有财温馨提示"
      confirmText="签约"
      class="sign-dialog"
      :onConfirm="toSign"
    >
      <div>
        <p>您当前未签约或签约状态不符合合规要求，
          <br>请重新签约！
        </p>
      </div>
    </Dialog>
    <Dialog
      :show.sync="isShowRiskDialog"
      title="汇有财温馨提示"
      :confirmText="riskConfirmText"
      class="risk-dialog"
      :onConfirm="toRisk"
    >
      <div>
        <p v-html="riskContent"></p>
      </div>
    </Dialog>
    <Dialog
      :show.sync="isShowSystemMaintenanceDialog"
      title="汇有财温馨提示"
      confirmText="我知道了"
      class="system-maintenance-dialog"
      :singleButton="singleButton"
    >
      <div>
        <p>当前系统正在维护中，当日23:45-次日0:15分钟暂不可进行出借！</p>
      </div>
    </Dialog>
    <Dialog
      :show.sync="isShowConfirmInvestmentDialog"
      title="确认出借"
      confirmText="确认出借"
      class="confirm-investment-dialog"
    >
      <div>
        <ul class="amount-list">
          <li>
            <p class="title">1000.00</p>
            <p class="desc">出借金额(元)</p>
          </li>
          <li>
            <p class="title">1000.00</p>
            <p class="desc">支付金额(元)</p>
          </li>
          <li>
            <p class="title">20.00</p>
            <p class="desc">预期收益(元)</p>
          </li>
        </ul>
        <div class="red-envelope-wrap">
          <p class="title">红包</p>
          <div class="swiper-wrap">
            <div class="swiper-container-red-envelope">
              <div class="swiper-wrapper">
                <div class="swiper-slide swiper-no-swiping">
                  <div class="red-envelope-box">
                    <p class="vouche-box">
                      <span class="vouche">
                        20
                        <i>元</i>
                      </span>
                      <span class="vouche-aside">可与加息券同时使用</span>
                    </p>
                    <p class="start">起投金额：121.00元</p>
                    <div class="endData">有效期至2019-02-28</div>
                    <button class="receive-btn" @click="receiveRedPacket(item.id)">选取</button>
                  </div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                  <div class="red-envelope-box">
                    <p class="vouche-box">
                      <span class="vouche">
                        20
                        <i>元</i>
                      </span>
                      <span class="vouche-aside">可与加息券同时使用</span>
                    </p>
                    <p class="start">起投金额：121.00元</p>
                    <div class="endData">有效期至2019-02-28</div>
                    <button class="receive-btn" @click="receiveRedPacket(item.id)">选取</button>
                  </div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                  <div class="red-envelope-box">
                    <p class="vouche-box">
                      <span class="vouche">
                        20
                        <i>元</i>
                      </span>
                      <span class="vouche-aside">可与加息券同时使用</span>
                    </p>
                    <p class="start">起投金额：121.00元</p>
                    <div class="endData">有效期至2019-02-28</div>
                    <button class="receive-btn" @click="receiveRedPacket(item.id)">选取</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <div class="rate-stamp-wrap">
          <p class="title">加息券</p>
          <div class="swiper-wrap">
            <div class="swiper-container-rate-stamp">
              <div class="swiper-wrapper">
                <div class="swiper-slide swiper-no-swiping">
                  <div class="rate-stamp-box">
                    <p class="vouche-box">
                      <span class="vouche">4
                        <i>%</i>
                        <i class="font">利息</i>
                      </span>
                      <span class="vouche-aside">可加息30天</span>
                    </p>
                    <p class="start">投资限额：111至1111元</p>
                    <div class="endData">有效期至2019-02-28</div>
                    <button class="receive-btn" @click="receiveRedPacket(item.id)">选取</button>
                  </div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                  <div class="rate-stamp-box">
                    <p class="vouche-box">
                      <span class="vouche">4
                        <i>%</i>
                        <i class="font">利息</i>
                      </span>
                      <span class="vouche-aside">可加息30天</span>
                    </p>
                    <p class="start">投资限额：111至1111元</p>
                    <div class="endData">有效期至2019-02-28</div>
                    <button class="receive-btn" @click="receiveRedPacket(item.id)">选取</button>
                  </div>
                </div>
                <div class="swiper-slide swiper-no-swiping">
                  <div class="rate-stamp-box">
                    <p class="vouche-box">
                      <span class="vouche">4
                        <i>%</i>
                        <i class="font">利息</i>
                      </span>
                      <span class="vouche-aside">可加息30天</span>
                    </p>
                    <p class="start">投资限额：111至1111元</p>
                    <div class="endData">有效期至2019-02-28</div>
                    <button class="receive-btn" @click="receiveRedPacket(item.id)">选取</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev1"></div>
            <div class="swiper-button-next1"></div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
import { mapState } from 'vuex'
import Pagination from '@/components/pagination/pagination'
import { timeCountDown } from '@/assets/js/utils'
import { optionalInvestDetail, amountInfo, optionalInvestRecord, expectedIncome, systemMaintenance, amountSync, internetInformation, peopleLoanInfo } from '@/api/hyc/lendDetail'
import { getPeopleInfoApi } from '@/api/hyc/Mine/lend'
import ProjectDetail from './popup/projectDetail'
import Dialog from '@/components/Dialog/Dialog'
export default {
  data() {
    return {
      lendDetailActiveName: 'XMXX', // 选项卡选中状态
      projectNo: '', // 标的编号
      isAgree: false, // 是否同意风险告知书
      isAllLending: false, // 是否自动出借
      page: 1,
      size: 10,
      total: 0,
      investStatus: '', // 投资状态
      investStatusTitle: '出借中...', // 投资状态文字
      investStatusBtn: '充值', // 投资按钮状态文字
      investBtn: '申请出借', // 出借按钮文字
      isDisableInvestBtn: false, // 是否禁用申请出借按钮
      invAmount: '', // 申请出借输入框金额
      invAmountDisabled: false, // 申请出借输入框是否禁用
      expectedIncome: '0.00', //逾期收益
      projectInfo: {
        investEndDay: '', // 募集倒计时(天) 
        investEndTime: '', // 募集倒计时(时分秒) 
        investRate: '', // 利率
        projectName: '', // 标的名称
        surplusAmt: '', // 剩余可投金额
        investPeopleCount: '', // 已购人次
        investPercent: 0, // 投资百分比
        interestRate: '', // 结息方式
        minInvAmount: '', // 起投金额
        maxInvTotalAmount: '', // 个人累计投资限额
        status: 0, // 标的状态 0.预售 1.投资中 2.满标 3.已完结
        balance: '', // 可用余额
        maxInvAmount: '' // 最大投资金额
      },
      investDetail: {
        appDesc: '', // 项目介绍
        investTarget: '', // 投资目标
        dueDate: '', // 投资到期日
        interestStartDate: '', // 最大投资金额
        profitShare: '', // 产品起息时间描述
        existSystem: '', // 退出机制
        costdes: '', // 费用说明
        riskAppraisal: '', // 项目风险评估及可能产生的风险结果
        riskManagementTip: '', // 出借人适当性管理提示
        tailProject: '' // 是否是尾标(true : 尾标 false: 不是尾标)
      },
      productDetail: {
        projectName: '', // 标的名称
        contractNum: '', // 合同编号
        productName: '', // 项目类型
        loanMent: '', // 期限
        repaymentWay: '', // 还款方式
        loanAmt: '', // 融资金额，后端返回“元”
        investRate: '', // 预期年化收益率
        loanDate: '', // 申请日期
        relatedExpenses: '' // 相关费用
      },
      auditInfoList: [], // 审核信息数组
      isShowSmallPic: false, // 审核信息表中认证情况列是否显示小图片
      oddAuditInfoList: [], // 审核信息的第一个表格
      evenAuditInfoList: [],  // 审核信息的第二个表格
      internetInformationList: [], // 互联网资信报告数组
      picList: [],  // 身份证弹窗图片
      facePic: '',  // 人脸识别弹窗图片
      joinRecordData: [], // 加入记录数据
      loanPeopleInfo: {
        borrowerName: '', // 借款人姓名
        sex: '', // 性别
        idNum: '', // 身份证号
        age: '', // 年龄
        industry: '', // 行业
        domicile: '', // 户籍地点
        maritalStatus: '', // 婚姻状况
        income: '', // 月收入，后端返回单位“元”
        prinAmt: '', // 本金（元），后端返回单位“元”
        loanAim: '', // 借款目的
        borrowerTheme: '', // 借款人主题性质
        loanDay: '', // 期限（天）
        paymentSource: '', // 还款来源
        amountOverride: '', // 逾期金额，后端返回单位“元”
        guaranteeProtocolUrl: '', // 《保证书》pdf url
        borrowSituation: '' // 在其他网络借贷平台借款情况
      },
      peopleLoanInfo: {
        platformOverdueCut: '', // 平台历史逾期次数
        platformOverdueAmt: '', // 平台历史逾期金额
        loanUseInfo: '', // 借款资金运用状况
        repaymentAbilityChg: '', // 借款人还款能力变化情况
        involvedInAppeal: '', // 借款人涉诉情况
        administrativePenalty: '' // 借款人行政处罚情况情况
      },
      productId: '', // 标的id
      isShowAuthenticationPop: false, // 是否显示身份证认证弹窗
      isShowFaceRecognitionPop: false, // 是否显示人脸识别弹窗
      isShowReportPop: false, // 是否显示运营报告弹窗
      errMsg: '', // 错误提示
      isShowSignDialog: false, // 是否显示签约弹窗
      isShowRiskDialog: false, // 是否显示风险测评弹窗
      isShowSystemMaintenanceDialog: false, // 是否显示系统维护弹窗
      singleButton: true, // 是否显示只有确定按钮
      riskConfirmText: '重新评测', // 风险测评弹窗按钮文字 
      riskContent: '您当前出借的额度或期限不符合您的风险评测<br />等级分布，若您在上次评测后风险承受能力发<br />生改变，请您重新进行风险评测！', // 风险测评弹窗默认文字
      isShowConfirmInvestmentDialog: true // 是否显示出借弹窗
    }
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      userBasicInfo: state => state.user.userBasicInfo
    })
  },
  methods: {
    handleItemClick() {
      switch (this.lendDetailActiveName) {
        case 'XMXX':
          this.getLendDetailList()
          break
        case 'CJXQ':
          this.getLendDetailList()
          break
        case 'JRJL':
          this.getJoinRecordList()
          break
        case 'JKRXX':
          this.getLoanPeopleInfo()
          break
      }
    },
    handleCurrentChange(val) {
      this.page = val
      this.getJoinRecordList()
    },
    handleExpectedIncome(e) {
      e.target.value = e.target.value.replace(/[^\d.]/g, '')
      e.target.value = e.target.value.replace(/\.{2,}/g, '.')
      e.target.value = e.target.value
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
      e.target.value = e.target.value.replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
      this.invAmount = e.target.value
      this.calculationExpectedIncome()
    },
    calculationExpectedIncome() {
      let postData = {
        invAmount: this.invAmount,
        investRate: this.projectInfo.investRate,
        productId: this.productId
      }
      expectedIncome(postData).then(res => {
        let data = res.data.data
        this.expectedIncome = data.expectedIncome
      })
    },
    getUserBasicInfo() {
      console.log(this.userBasicInfo)
      //this.userBasicInfo.escrowAccountInfo = ''
      if (!this.userBasicInfo.escrowAccountInfo) {
        this.investStatus = 'unopened' // 状态为为开户
        this.investStatusTitle = '未开户'
        this.investBtn = '立即开户'
      } else {
        this.getInvestStatus()
      }
    },
    getInvestStatus() {
      console.log('status===', this.projectInfo.status)
      this.projectInfo.status = 1
      switch (
        this.projectInfo.status // 0.预售    1.出借中   2.满标   3.已完结
      ) {
        case 0:
          this.investStatusTitle = '预售中....'
          this.investStatus = 'willSale'
          this.isDisableInvestBtn = true
          break
        case 1:
          this.investStatusTitle = '出借中....'
          this.investStatus = 'lending'
          break
        case 2:
          this.investStatusTitle = '已满标'
          this.investStatus = 'fullyMarked'
          break
        default:
          this.investStatusTitle = '已完结'
          this.investStatus = 'finished'
          break
      }
    },
    getInvestDetailList() {
      this.projectNo = this.$route.query.projectNo
      this.productId = this.$route.query.productId
      let postData = {
        projectNo: this.projectNo
      }
      optionalInvestDetail(postData).then(res => {
        let data = res.data.data
        console.log('data===', data)
        let projectInfo = data.projectInfo
        let investEndTimestamp = projectInfo.investEndTimestamp
        this.projectInfo.projectName = projectInfo.projectName
        this.projectInfo.investRate = projectInfo.investRate
        this.projectInfo.surplusAmt = projectInfo.surplusAmt
        this.projectInfo.investPeopleCount = projectInfo.investPeopleCount
        this.projectInfo.investPercent = projectInfo.investPercent
        this.projectInfo.interestRate = projectInfo.interestRate
        this.projectInfo.minInvAmount = projectInfo.minInvAmount
        this.projectInfo.maxInvTotalAmount = projectInfo.maxInvTotalAmount
        this.projectInfo.status = projectInfo.status
        this.projectInfo.maxInvAmount = projectInfo.maxInvAmount

        // 预售状态中，募集倒计时不倒计
        timeCountDown(investEndTimestamp, this.projectInfo.status, data => {
          if (data.indexOf('天') > -1) {
            this.projectInfo.investEndDay = data.substr(0, data.indexOf('天') + 1)
            this.projectInfo.investEndTime = data.substr(data.indexOf('天') + 1, data.length - 1)
          } else {
            this.projectInfo.investEndTime = data
          }
        })

        let productDetail = data.productDetail
        this.productDetail.projectName = productDetail.projectName
        this.productDetail.repaymentWay = productDetail.repaymentWay
        this.productDetail.contractNum = productDetail.contractNum
        this.productDetail.loanAmt = productDetail.loanAmt
        this.productDetail.loanMent = productDetail.loanMent
        this.productDetail.investRate = productDetail.investRate
        this.productDetail.relatedExpenses = productDetail.relatedExpenses

        let auditInfoList = productDetail.auditInfoList
        auditInfoList.forEach(item => {
          switch (item.field) {
            case 'haveIDCard':
              item.isShowSmallPic = true
              break
            case 'faceRecognition':
              item.isShowSmallPic = true
              break
            case 'signing':
              item.isShowSmallPic = true
              break
            case 'internetInformation':
              item.isShowSmallPic = true
              break
            default: 
              item.isShowSmallPic = false
          }
        })
        auditInfoList = auditInfoList.filter( (item)=> {
          return item.val
        })
        this.oddAuditInfoList = auditInfoList.filter( (item, index)=> {
          return (index + 1) % 2 === 1
        })
        this.evenAuditInfoList = auditInfoList.filter( (item, index)=> {
          return (index + 1) % 2 === 0
        })

        this.getUserBasicInfo()
        this.getAmountQuery()
      })
    },
    getLendDetailList() {
      this.projectNo = this.$route.query.projectNo
      let postData = {
        projectNo: this.projectNo
      }
      optionalInvestDetail(postData).then(res => {
        let data = res.data.data
        let investDetail = data.investDetail
        this.investDetail.appDesc = investDetail.appDesc
        this.investDetail.investTarget = investDetail.investTarget
        this.investDetail.dueDate = investDetail.dueDate
        this.investDetail.interestStartDate = investDetail.interestStartDate
        this.investDetail.profitShare = investDetail.profitShare
        this.investDetail.existSystem = investDetail.existSystem
        this.investDetail.costdes = investDetail.costdes
        this.investDetail.riskAppraisal = investDetail.riskAppraisal
        this.investDetail.riskManagementTip = investDetail.riskManagementTip

        // 判断是否是尾标
        if(this.investDetail.tailProject && parseFloat(this.projectInfo.surplusAmt) < 2 * parseFloat(this.projectInfo.minInvAmount)) {
          this.invAmount = '尾标：' + this.projectInfo.surplusAmt + '元'
          this.invAmountDisabled = true
        }
      })
    },
    getJoinRecordList() {
      this.projectNo = this.$route.query.projectNo
      let postData = {
        projectNo: this.projectNo,
        curPage: this.page,
        maxLine: this.size
      }
      optionalInvestRecord(postData).then(res => {
        let data = res.data.data
        this.joinRecordData = data.list
        this.total = parseInt(data.countPage)
        this.page = parseInt(data.curPage)
      })
    },
    getLoanPeopleInfo() {
      let postData = {
        projectNo: this.projectNo,
        nameEncrypt: true
      }
      getPeopleInfoApi(postData).then(res => {
        let data = res.data.data
        this.loanPeopleInfo.borrowerName = data.borrowerName
        this.loanPeopleInfo.sex = data.sex
        this.loanPeopleInfo.idNum = data.idNum
        this.loanPeopleInfo.age = data.age
        this.loanPeopleInfo.industry = data.industry
        this.loanPeopleInfo.domicile = data.domicile
        this.loanPeopleInfo.maritalStatus = data.maritalStatus
        this.loanPeopleInfo.income = data.income
        this.loanPeopleInfo.prinAmt = data.prinAmt
        this.loanPeopleInfo.loanAim = data.loanAim
        this.loanPeopleInfo.borrowerTheme = data.borrowerTheme
        this.loanPeopleInfo.loanDay = data.loanDay
        this.loanPeopleInfo.paymentSource = data.paymentSource
        this.loanPeopleInfo.amountOverride = data.amountOverride
        this.loanPeopleInfo.borrowSituation = data.borrowSituation
        this.loanPeopleInfo.guaranteeProtocolUrl = data.guaranteeProtocolUrl
      })
      let params = {
        productId: this.projectNo,
        productType: 0
      }
      peopleLoanInfo(params).then(res => {
        let data = res.data.data
        this.peopleLoanInfo.platformOverdueCut = data.platformOverdueCut
        this.peopleLoanInfo.platformOverdueAmt = data.platformOverdueAmt
        this.peopleLoanInfo.loanUseInfo = data.loanUseInfo
        this.peopleLoanInfo.repaymentAbilityChg = data.repaymentAbilityChg
        this.peopleLoanInfo.involvedInAppeal = data.involvedInAppeal
        this.peopleLoanInfo.administrativePenalty = data.administrativePenalty
      })
    },
    getAmountQuery() {
      amountInfo().then(res => {
        let data = res.data
        console.log('data===', data)
        if (data.resultCode === '1') {
          this.projectInfo.balance = this.investStatus === 'unopened' ? '未开户' : data.data.banlance
          console.log(this.projectInfo.balance)
        }
      })
    },
    openReviewInfoPop(item) {
      this.isShowAuthenticationPop = true
      this.picList = item.result.split(',')
    },
    openFaceRecognitionPop(item) {
      this.isShowFaceRecognitionPop = true
      this.facePic = item.result
    },
    openReportPop() {
      this.isShowReportPop = true
      let postData = {
        projectNo: this.projectNo
      } 
      internetInformation(postData).then(res=> {
        let data = res.data.data
        this.internetInformationList = data.internetInformationList
        console.log('data====', data)
      })
    },
    closeReviewInfoPop() {
      this.isShowAuthenticationPop = false
    },
    closeFaceRecognitionPop() {
      this.isShowFaceRecognitionPop = false
    },
    closeReportPop() {
      this.isShowReportPop = false
    },
    handleInvest() {
      this.errMsg = ''
      systemMaintenance().then(res => {
        let data = res.data
        // 此时段为系统维护
        if (data.resultCode === '60056') {
          this.isShowSystemMaintenanceDialog = true
        } else {
          amountSync().then(res => {
            let data = res.data
            console.log('data====', data)
            if (data.resultCode === '1') {
              this.projectInfo.balance = data.data.availBal
            }
          })
          // 如果是未开户，点击去开户页面
          if (this.investStatus === 'unopened') {
            this.$router.push({ name: 'account' })
          }
          // 如果没勾选风险告知书，弹出提示
          if (!this.isAgree) {
            this.errMsg = '请确认并同意《风险告知书》'
            return
          }
          // 是否已经签约
          this.userBasicInfo.userIsOpenAccount.registerProtocolSigned = true
          if (!this.userBasicInfo.userIsOpenAccount.registerProtocolSigned) {
            this.isShowSignDialog = true
            return
          }
          // 是否进行过风险测评
          this.userBasicInfo.evaluatingResult = true
          if (!this.userBasicInfo.evaluatingResult) {
            this.riskContent = '您当前还未风险评测或评测已过期，请进行风险评测。'
            this.riskConfirmText = '立即评测'
            this.isShowRiskDialog = true
            return
          }
          // 单人限额是否超过
          if (this.invAmount > this.projectInfo.maxInvTotalAmount) {
            this.errMsg = '单人限额' + this.projectInfo.maxInvTotalAmount + '元'
            return
          }
          // 单笔限额是否超过
          if (this.invAmount > this.projectInfo.maxInvAmount) {
            this.errMsg = '单笔限额' + this.projectInfo.maxInvAmount + '元'
            return
          }
        }
      })
    },
    toSign() {
      this.$router.push({ name: 'sign' })
    },
    toSigning(item) {
      item.result = 'http://112.124.117.23:8082/huiyoucaifiles/xyqz/trilateral2/2019/01/17/djs758987pd_694a1de0-4a9d-4b8f-b597-59ec64b292ff.pdf'
      const tempPage = window.open('', '_blank')
      tempPage.location = item.result
    },
    toRisk() {
      this.$router.push({ name: 'riskAss' })
    },
    redEnvelopeSwiper() {
      setTimeout(() => {
        this.redEnvelopeSwiper = new Swiper('.swiper-container-red-envelope', {
          paginationClickable: true,
          observer: true,
          observeParents: true,
          loopAdditionalSlides: 1,
          initialSlide: 1,
          effect: 'coverflow',
          slidesPerView: 1.3, // 一屏装几个slider
          centeredSlides: true,
          coverflowEffect: {
            rotate: 0,
            stretch: 35,
            depth: 20,
            modifier: 1,
            slideShadows: false
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        })
      }, 200)
    },
    rateStampSwiper() {
      setTimeout(() => {
        this.rateStampSwiper = new Swiper('.swiper-container-rate-stamp', {
          paginationClickable: true,
          observer: true,
          observeParents: true,
          loopAdditionalSlides: 1,
          initialSlide: 1,
          effect: 'coverflow',
          slidesPerView: 1.3, // 一屏装几个slider
          centeredSlides: true,
          coverflowEffect: {
            rotate: 0,
            stretch: 35,
            depth: 20,
            modifier: 1,
            slideShadows: false
          },
          navigation: {
            nextEl: '.swiper-button-next1',
            prevEl: '.swiper-button-prev1'
          }
        })
      }, 300)
    },
  },
  watch: {
    isAllLending: function(val, oldVal) {
      console.log('val===', val)
      this.isAllLending = val;
      this.isAllLending ? this.invAmount = this.projectInfo.surplusAmt : this.invAmount= ''
      this.calculationExpectedIncome()
    }
  },
  mounted() {
    this.getInvestDetailList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
.lend-detail {
  padding-top: 30px;
  .production-info {
    position: relative;
    width: 1138px;
    margin: 0 auto;
    border: 1px solid #e5e5e5;
    background: #fff;
    .title {
      border-bottom: 1px solid #e5e5e5;
      line-height: 58px;
      background: #fff;
      h2 {
        font-size: $font-size-medium;
        color: $color-text;
        text-indent: 20px;
        box-shadow: inset 0 3px 0 0 #fb9d1f;
        img {
          margin-right: 10px;
          vertical-align: middle;
          height: 22px;
          width: 22px;
        }
      }
    }
    .content {
      padding: 62px 55px 52px 55px;
      .decs-wrap {
        width: 542px;
        display: flex;
        justify-content: space-between;
        .item {
          margin-right: 104px;
          .value {
            margin-top: 14px;
            height: 22px;
            line-height: 22px;
            font-size: $font-size-large;
            color: $color-text;
            margin-bottom: 14px;
            text-align: center;
            strong {
              font-size: 42px;
              color: #fc5541;
              font-weight: 500;
            }
            span {
              color: $color-text;
            }
            span.red {
              color: #fc5541;
            }
          }
          .desc {
            font-size: $font-size-small-s;
            color: $color-text-s;
            text-align: center;
          }
          &:nth-child(1) {
            .value {
              margin-top: 0;
              height: 36px;
              line-height: 36px;
              text-align: left;
            }
            .desc {
              text-align: left;
            }
          }
          &:nth-child(3) {
            margin-right: 0;
          }
        }
      }
      .progress-wrap {
        width: 446px;
        display: flex;
        margin-top: 70px;
        .title {
          display: inline-block;
          height: 24px;
          line-height: 24px;
          font-size: $font-size-small-s;
          color: $color-text-s;
          border-bottom: 0;
          margin-right: 10px;
        }
        /deep/ .el-progress {
          width: 298px;
          line-height: 20px;
          /deep/ .el-progress-bar__outer {
            height: 6px !important;
            border-radius: 100px;
            background-color: #fdc48d;
          }
          /deep/ .el-progress-bar__inner {
            border-radius: 100px;
            background-color: #fb891f;
          }
          /deep/ .el-progress__text {
            display: none;
          }
        }
        .score {
          display: inline-block;
          margin-left: -44px;
          width: 72px;
          height: 24px;
          line-height: 24px;
          background: url('./image/bg_invest_percent.png') center center no-repeat;
          font-size: $font-size-small-s;
          color: #fff;
          text-align: center;
          background-size: cover;
          padding-left: 4px;
        }
      }
    }
    .tips {
      padding: 15px 50px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      .method,
      .countdown {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        font-size: $font-size-small-s;
        color: $color-text;
        margin-right: 120px;
        .title {
          height: 20px;
          line-height: 20px;
          color: $color-text-s;
          border-bottom: 0;
        }
        .large {
          font-size: $font-size-medium;
        }
      }
    }
    .invest-module {
      position: absolute;
      top: 3px;
      right: 0;
      height: calc(100% - 3px);
      width: 300px;
      background: #fff;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
      h2 {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        justify-content: space-around;
        padding: 0 20px;
        .status-title {
          width: 100px;
          height: 55px;
          line-height: 52px;
          font-size: $font-size-medium-x;
          color: $color-text;
          margin-right: 120px;
        }
        .unopened-status-title {
          width: 140px;
        }
        .status-btn {
          width: 70px;
          height: 30px;
          line-height: 30px;
          background: #0083fe;
          font-size: $font-size-small;
          color: #fff;
          text-align: center;
          margin-top: 12px;
          border-radius: 4px;
          padding: 0;
          a {
            display: block;
            width: 100%;
            height: 100%;
            color: #fff;
          }
          &:hover {
            background: lighten(#0083fe, 5%);
            cursor: pointer;
          }
        }
      }
      .content {
        padding: 17px 20px;
        .available-balance,
        .starting-amount,
        .single-limit {
          display: flex;
          width: 100%;
          height: 16px;
          line-height: 16px;
          margin-bottom: 17px;
          justify-content: space-around;
          font-size: $font-size-small;
          color: $color-text;
          .title {
            width: 64px;
            line-height: 16px;
            margin-right: 30px;
            color: $color-text-s;
            border: 0;
          }
          .value {
            width: 160px;
            line-height: 16px;
            text-align: right;
          }
        }
        .risk-notice {
          padding: 0 32px;
          font-size: $font-size-small-ss;
          padding-top: 10px;
          /deep/ .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              background-color: #4a90e2;
              border-color: #4a90e2;
            }
          }
          /deep/ .el-checkbox__input.is-focus {
            .el-checkbox__inner {
              border-color: #4a90e2;
            }
          }
          /deep/ .el-checkbox__label {
            color: $color-text-s;
            a {
              color: #4a90e2;
            }
          }
          .el-checkbox__input.is-focus .el-checkbox__inner /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: $color-text-s;
          }
        }
        .all-lending {
          width: 100%;
          height: 16px;
          position: relative;
          margin-top: 20px;
          .all-lending-checkbox {
            position: absolute;
            top: 0;
            right: 0;
            /deep/ .el-checkbox__input,
            /deep/ .el-checkbox__input.is-focus {
              width: 14px;
              height: 14px;
              border-radius: 100%;
              /deep/ .el-checkbox__inner {
                border-radius: 100%;
                color: #fb891f;
                border: 1px solid #fb891f;
              }
            }
            /deep/ .el-checkbox__input.is-checked {
              position: relative;
              width: 14px;
              height: 14px;
              /deep/ .el-checkbox__inner {
                border-radius: 100%;
                width: 14px;
                height: 14px;
                background-color: #fff;
                position: relative;
                cursor: pointer;
                display: inline-block;
                box-sizing: border-box;
                border: 1px solid #fb891f;
                color: #fb891f;
                &::after {
                  width: 6px;
                  height: 6px;
                  border-radius: 100%;
                  background-color: #fb891f;
                  content: '';
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transition: transform 0.15s ease-in;
                  transform: translate(-50%, -50%) scale(1);
                  border: 0;
                }
              }
            }
            /deep/ .el-checkbox__label {
              color: #fb891f;
            }
          }
        }
        .action {
          display: flex;
          width: 264px;
          height: 44px;
          margin-top: 10px;
          .amount-input {
            display: inline-block;
            width: 126px;
            height: 24px;
            border: 1px solid #e5e5e5;
            padding: 10px;
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
          .action-btn {
            display: inline-block;
            width: 111px;
            height: 46px;
            line-height: 46px;
            background: #fb891f;
            text-align: center;
            font-size: $font-size-medium;
            color: #fff;
            cursor: pointer;
            &:disabled {
              background: #e3e3e3;
              &:hover {
                background: #e3e3e3;
                cursor: not-allowed;
              }
            }
            &:hover {
              background: lighten(#fb891f, 5%);
              cursor: pointer;
            }
          }
          .action-btn-disabled {
            display: inline-block;
            width: 100%;
            height: 46px;
            line-height: 46px;
            background: #e3e3e3;
            text-align: center;
            font-size: $font-size-medium;
            color: #fff;
            border-radius: 6px;
          }
        }
        .expected-profits {
          display: flex;
          width: 100%;
          height: 16px;
          line-height: 16px;
          margin-top: 20px;
          margin-bottom: 13px;
          justify-content: space-around;
          font-size: $font-size-small;
          color: $color-text;
          .title {
            width: 117px;
            line-height: 16px;
            margin-right: 30px;
            color: $color-text;
            border: 0;
          }
          .value {
            width: 200px;
            line-height: 16px;
            text-align: right;
          }
        }
        .err-msg {
          width: 100%;
          font-size: $font-size-small-ss;
          color: #e9122c;
          text-align: center;
        }
      }
    }
  }
  .tab-wrap {
    width: 1138px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 38px;
    background: #fff;
    /deep/ .el-tabs__header {
      background-color: #fff;
      /deep/ .el-tabs__item {
        border-top: 4px solid transparent;
        height: 49px;
        line-height: 40px;
        padding: 0 30px;
        font-size: $font-size-small-s;
        color: $color-text-s;
        &.is-active {
          border-top: 4px solid #ffb01a;
          color: #fb891f;
        }
      }
    }
    .content {
      padding: 15px;
      section {
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
          .borrower-box {
            height: 30px;
            line-height: 30px;
            display: flex;
            .borrower-box-left {
              width: 196px;
              height: 210px;
            }
            .borrower-box-center {
              width: 140px;
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
            .view-detail {
              margin-left: 115px;
              font-size: $font-size-small-s;
              color: #fb7b1f;
            }
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
      .desc {
        font-size: $font-size-small-s;
        color: $color-text-s;
      }
      .detail-list {
        width: 1080px;
        margin-top: 20px;
        border: 1px solid #e3e3e3;
        li {
          display: flex;
          width: 100%;
          font-size: $font-size-small-s;
          border-bottom: 1px solid #e3e3e3;
          align-items: center;
          .title {
            background: #f0f7ff;
            padding: 10px;
            color: $color-text;
            display: inline-block;
            width: 380px;
            text-align: center;
            border-right: 1px solid #e3e3e3;
          }
          .value {
            display: inline-block;
            width: 629px;
            padding: 10px;
            padding-left: 30px;
            text-align: left;
            color: $color-text-s;
          }
          a.value {
            color: #0083fe;
          }
          &:nth-child(8) {
            .title {
              line-height: 60px;
            }
            .value {
              line-height: 20px;
            }
          }
          &:nth-child(9) {
            border-bottom: 0;
            .title {
              line-height: 100px;
            }
            .value {
              line-height: 26px;
            }
          }
        }
      }
      .join-record-table,
      .project-composition-table {
        width: 1080px;
        table-layout: fixed;
        /deep/ thead {
          color: $color-text;
          font-size: $font-size-small;
          line-height: 20px;
          th {
            padding: 8px 0;
          }
        }
        /deep/ tbody {
          td {
            padding: 8px 0;
            color: $color-text-s;
            font-size: $font-size-small-s;
            .view-detail {
              font-size: $font-size-small-s;
              color: #fab645;
            }
          }
        }
      }
      .view-more {
        position: relative;
        width: 100%;
        height: 25px;
        line-height: 25px;
        margin-top: 20px;
        a {
          position: absolute;
          top: 0;
          right: 0;
          display: block;
          color: #fc5541;
        }
      }
    }
  }
  .authentication-pop,
  .face-recognition-pop,
  .report-pop {
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
  .sign-dialog,
  .risk-dialog,
  .system-maintenance-dialog,
  .confirm-investment-dialog {
    p {
      font-size: $font-size-small;
      line-height: 26px;
    }
  }
  .confirm-investment-dialog {
    /deep/ .inner {
      width: 718px;
      padding: 30px 0;
      .amount-list {
        display: flex;
        width: 443px;
        margin: 0 auto;
        margin-top: 42px;
        margin-bottom: 40px;
        justify-content: space-between;
        li {
          text-align: center;
          margin-right: 112px;
          p.title {
            color: #fb891f;
            font-size: $font-size-small;
          }
          p.desc {
            color: $color-text;
            font-size: $font-size-small-ss;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      .red-envelope-wrap,
      .rate-stamp-wrap {
        position: relative;
        width: 664px;
        margin: 0 auto;
        margin-bottom: 53px;
        .title {
          margin-left: 52px;
          margin-bottom: 14px;
          font-size: $font-size-small;
          color: $color-text-s;
        }
        .swiper-wrap {
          width: 100%;
          .swiper-container-red-envelope, .swiper-container-rate-stamp {
            width: 560px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            list-style: none;
            padding: 0;
            z-index: 1;
            /deep/ .red-envelope-box, /deep/ .rate-stamp-box {
              position: relative;
              width: 378px;
              height: 105px;
              background: url('./image/bg_red_envelope_nochoose.png') center center no-repeat;
              cursor: pointer;
              &:hover {
                .receive-btn {
                  background: rgba(255, 227, 17, 1);
                  color: rgba(255, 58, 41, 1);
                  border: 1px solid rgba(255, 227, 17, 1);
                  border-left: 0;
                }
              }
              .vouche-box {
                padding-top: 19px;
                margin-bottom: 4px;
                .vouche {
                  font-size: $font-size-large-xxx;
                  font-family: PingFangSC-Semibold;
                  font-weight: 600;
                  color: $color-text;
                  margin-left: 33px;
                  i {
                    font-size: $font-size-large-x;
                    font-weight: 400;
                  }
                  .font {
                    font-size: 16px;
                  }
                }
                .vouche-aside {
                  display: inline-block;
                  padding: 1px 6px;
                  text-align: center;
                  height: 18px;
                  border-radius: 100px;
                  border: 1px solid $color-text-s;
                  font-size: $font-size-small-ss;
                  font-family: PingFang-SC-Regular;
                  font-weight: 400;
                  color: $color-text-s;
                  line-height: 18px;
                  margin-left: 8px;
                  position: relative;
                  top: -4px;
                }
              }
              .start {
                margin-left: 33px;
                font-size: $font-size-small-ss;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: $color-text-s;
                line-height: 20px;
              }
              .endData {
                margin-left: 33px;
                font-size: $font-size-small-ss;
                font-family: PingFang-SC-Regular;
                font-weight: 400;
                color: $color-text-s;
                line-height: 18px;
              }
              .receive-btn {
                display: inline-block;
                width: 52px;
                height: 105px;
                background: #fff;
                border-radius: 4px;
                padding: 13px 17px;
                font-size: 18px;
                font-family: PingFangSC-Semibold;
                font-weight: 600;
                color: $color-text-s;
                border: 1px solid #dadada;
                border-left: 0;
                line-height: 20px;
                top: 0;
                right: 0;
                position: absolute;
                cursor: pointer;
                span {
                  display: inline-block;
                  white-space: normal;
                }
              }
            }
            /deep/ .rate-stamp-box {
              background: url('./image/bg_rate_stamp.png') center center no-repeat;
            }
          }
          .swiper-button-prev {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: 0;
            right: auto;
            background: url('./image/swiper_prev.png') no-repeat center center;
            height: 33px;
            width: 33px;
            background-size: cover;
            outline: 0;
          }
          .swiper-button-next {
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: 0;
            left: auto;
            background: url('./image/swiper_next.png') no-repeat center center;
            height: 33px;
            width: 33px;
            background-size: cover;
            outline: 0;
          }
          .swiper-button-prev1 {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: 0;
            right: auto;
            background: url('./image/swiper_prev.png') no-repeat center center;
            height: 33px;
            width: 33px;
            background-size: cover;
            outline: 0;
            cursor: pointer;
          }
          .swiper-button-next1 {
            position: absolute;
            top: 50%;
            right: 0;
            margin-top: 0;
            left: auto;
            background: url('./image/swiper_next.png') no-repeat center center;
            height: 33px;
            width: 33px;
            background-size: cover;
            outline: 0;
            cursor: pointer;
          }
          .swiper-button-prev1.swiper-button-disabled, .swiper-button-next1.swiper-button-disabled {
            opacity: 0.35;
            cursor: auto;
            pointer-events: none;
          }
        }
      }
      footer {
        width: 382px;
        margin: 0 auto;
      }
    }
  }
}
</style>
