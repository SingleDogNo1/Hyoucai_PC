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
          <span class="status-title">出借中…</span>
          <button class="status-btn">开户</button>
        </h2>
        <div class="content">
          <p class="available-balance">
            <span class="title">可用余额</span>
            <span class="value">未开户</span>
          </p>
          <p class="starting-amount">
            <span class="title">起投金额</span>
            <span class="value">100.00元</span>
          </p>
          <p class="single-limit">
            <span class="title">单人限额</span>
            <span class="value">100,000.00元</span>
          </p>
          <div class="risk-notice">
            <el-checkbox v-model="isAgree">
              已阅读并同意
              <a href="#">《风险告知书》</a>
            </el-checkbox>
          </div>
          <div class="all-lending">
            <el-checkbox class="all-lending-checkbox" v-model="isAllLending">全部出借</el-checkbox>
          </div>
          <div class="action">
            <input class="amount-input">
            <button class="action-btn">立即开户</button>
          </div>
          <p class="expected-profits">
            <span class="title">预期收益：</span>
            <span class="value">0.00</span>
          </p>
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
              <table class="examine">
                <tr class="examine-title">
                  <td>身份信息</td>
                  <td>认证情况</td>
                 <tr v-for="(item, index) in auditInfoList" :key="index">
                  <td>身份证认证</td>
                  <td>
                    <img @click="openReviewInfoPop" src="./image/bg.png">
                  </td>
                  <td>运营商认证</td>
                  <td>中国移动运营商认证通过</td>
                </tr>
                <!-- </tr>
                <tr>
                  <td>身份证认证</td>
                  <td>
                    <img @click="openReviewInfoPop" src="./image/bg.png">
                  </td>
                  <td>运营商认证</td>
                  <td>中国移动运营商认证通过</td>
                </tr>
                <tr>
                  <td>学信网认证</td>
                  <td>白领</td>
                  <td>人脸识别</td>
                  <td>
                    <img @click="openFaceRecognitionPop" src="./image/bg.png">
                  </td>
                </tr>
                <tr>
                  <td>签约</td>
                  <td>
                    <img src="./image/bg.png">
                  </td>
                  <td>银行卡认证</td>
                  <td>6228 **** **** 1234银行卡账户、开户名、开户手机、身份证号认证成功</td>
                </tr>
                <tr>
                  <td>互联网资讯报告</td>
                  <td>
                    <img @click="openReportPop" src="./image/bg.png">
                  </td>
                  <td></td>
                  <td></td>
                </tr> -->
              </table>
              <table class="examine">
                <tr class="examine-title">
                  <td>身份信息</td>
                  <td>认证情况</td>
                 <tr v-for="(item, index) in auditInfoList" :key="index">
                  <td>身份证认证</td>
                  <td>
                    <img @click="openReviewInfoPop" src="./image/bg.png">
                  </td>
                  <td>运营商认证</td>
                  <td>中国移动运营商认证通过</td>
                </tr>
                <!-- </tr>
                <tr>
                  <td>身份证认证</td>
                  <td>
                    <img @click="openReviewInfoPop" src="./image/bg.png">
                  </td>
                  <td>运营商认证</td>
                  <td>中国移动运营商认证通过</td>
                </tr>
                <tr>
                  <td>学信网认证</td>
                  <td>白领</td>
                  <td>人脸识别</td>
                  <td>
                    <img @click="openFaceRecognitionPop" src="./image/bg.png">
                  </td>
                </tr>
                <tr>
                  <td>签约</td>
                  <td>
                    <img src="./image/bg.png">
                  </td>
                  <td>银行卡认证</td>
                  <td>6228 **** **** 1234银行卡账户、开户名、开户手机、身份证号认证成功</td>
                </tr>
                <tr>
                  <td>互联网资讯报告</td>
                  <td>
                    <img @click="openReportPop" src="./image/bg.png">
                  </td>
                  <td></td>
                  <td></td>
                </tr> -->
              </table>
              <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">还款来源</span>
              </p>
              <div class="repayment">借款人固定工作收入</div>
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
              <!-- <p class="title">
                <span class="title-boder"></span>
                <span class="title-text">借款人信息</span>
              </p>
              <div class="borrower">
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">借款人姓名：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">性别：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">身份证号：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">年龄：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">行业：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">居住地址：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">婚姻状况：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">月收入：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">借款金额：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">借款用途：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">借款主体性质：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">借款期限：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">还款来源：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">逾期金额：</span>
                    <span class="right"></span>
                  </p>
                  <p></p>
                </div>
                <p class="borrower-txt">
                  <span class="left">征信报告：</span>
                  <span class="right">核查人银行征信报告，该借款人近6个月无逾</span>
                </p>
                <p class="borrower-txt">
                  <span class="left">在其他网络借贷平台借款情况：</span>
                  <span class="right">借款人保证在不同网络借贷信息中介机构平台借款总余额与本合同借款金额合计总额不超过人民币100万元</span>
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
              </div>-->
            </section>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出借详情" name="CJXQ">
          <div v-if="lendDetailActiveName === 'CJXQ'" class="content">
            <p
              class="desc"
            >投资月月盈即可享受30天优惠收益，预期年化净收益率达7%。 加入当日生息，30天到期后本息自动转入账户余额，届时投资人可自主选择按本息复投或本金复投模式继续投资，坐享收益。</p>
            <ul class="detail-list">
              <li>
                <p class="title">
                  <span>协议</span>
                </p>
                <a class="value" href="#">《点金石债权转让协议》（范本）</a>
              </li>
              <li>
                <p class="title">
                  <span>出借目标</span>
                </p>
                <span class="value">所有点金石的用户，寻求安全、灵活、稳定高收益的投资人。</span>
              </li>
              <li>
                <p class="title">
                  <span>锁定期</span>
                </p>
                <span class="value">90天</span>
              </li>
              <li>
                <p class="title">
                  <span>起息时间</span>
                </p>
                <span class="value">以所投标的实际起息时间为准。</span>
              </li>
              <li>
                <p class="title">
                  <span>利息分配</span>
                </p>
                <span class="value">单标复审成功计息，到期即可提现。</span>
              </li>
              <li>
                <p class="title">
                  <span>退出机制</span>
                </p>
                <span class="value">等额本息自动转入账户余额。</span>
              </li>
              <li>
                <p class="title">
                  <span>费用说明</span>
                </p>
                <span class="value">暂无任何手续费。</span>
              </li>
              <li>
                <p class="title">
                  <span>项目风险评估及可能产生的风险结果</span>
                </p>
                <span
                  class="value"
                >根据借款人当前情况进行评估，借款人具有偿还贷款的能力，但不排除未来借款人因收入下降、过度举债等因素导致财务状况恶化，从而发生逾期的可能。</span>
              </li>
              <li>
                <p class="title">
                  <span>出借人适当性管理提示</span>
                </p>
                <span class="value">1.该标的的每一个借款人在本平台借款余额未超过20万元，符合监管政策要求；
                  <br>2.出借人应根据自身的出借偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任，包括但不限于可能的本息损失。网贷有风险，出借需谨慎。
                </span>
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
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">性别：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">身份证号：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">年龄：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">行业：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">居住地址：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">婚姻状况：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">月收入：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">借款金额：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">借款用途：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">借款主体性质：</span>
                    <span class="right"></span>
                  </p>
                  <p>
                    <span class="left">借款期限：</span>
                    <span class="right"></span>
                  </p>
                </div>
                <div class="borrower-box">
                  <p class="borrower-box-left">
                    <span class="left">还款来源：</span>
                    <span class="right"></span>
                  </p>
                  <p class="borrower-box-center">
                    <span class="left">逾期金额：</span>
                    <span class="right"></span>
                  </p>
                  <p></p>
                </div>
                <p class="borrower-txt">
                  <span class="left">征信报告：</span>
                  <span class="right">核查人银行征信报告，该借款人近6个月无逾</span>
                </p>
                <p class="borrower-txt">
                  <span class="left">在其他网络借贷平台借款情况：</span>
                  <span class="right">借款人保证在不同网络借贷信息中介机构平台借款总余额与本合同借款金额合计总额不超过人民币100万元</span>
                  <a class="view-detail" href="javascript:void(0);">
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
            src="https://www.hyoucai.com:8082/huiyoucaifiles/picture/certification/2018-09-25/idCardM_a_BD20180925023001020650_djs361466uv.png"
          >
          <img
            class="back"
            src="https://www.hyoucai.com:8082/huiyoucaifiles/picture/certification/2018-09-25/idCardM_b_BD20180925023001020650_djs361466uv.png"
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
            src="https://www.hyoucai.com:8082/huiyoucaifiles/picture/certification/2018-09-25/faceM_BD20180925023001020650_djs361466uv.png"
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
            <li>
              <span>姓名：</span>
              <span>张*</span>
            </li>
            <li>
              <span>身份证号：</span>
              <span>4108**********0103</span>
            </li>
            <li>
              <span>年龄：</span>
              <span>3*</span>
            </li>
            <li>
              <span>出生地区：</span>
              <span>河南省焦作市</span>
            </li>
            <li>
              <span>性别：</span>
              <span>女</span>
            </li>
            <li>
              <span>是否实名认证：</span>
              <span>是</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
import { mapState } from 'vuex'
import Pagination from '@/components/pagination/pagination'
import { timeCountDown } from '@/assets/js/utils'
import { optionalInvestDetail, amountInfo } from '@/api/hyc/lendDetail'
import ProjectDetail from './popup/projectDetail'
import Dialog from '@/components/Dialog/Dialog'
export default {
  data() {
    return {
      lendDetailActiveName: 'XMXX',
      projectNo: '',
      isAgree: true,
      isAllLending: true,
      page: 1,
      size: 10,
      total: 0,
      investStatus: '', // 投资状态
      investStatusTitle: '出借中...', // 投资状态文字
      investStatusBtn: '充值', // 投资按钮状态文字
      investBtn: '申请出借',
      isDisableInvestBtn: false, // 是否禁用申请出借按钮
      invAmount: '',
      expectedIncome: '0.00',
      projectInfo: {
        investEndDay: '',
        investEndTime: '',
        investRate: '',
        projectName: '',
        surplusAmt: '',
        investPeopleCount: '',
        investPercent: 0,
        interestRate: '',
        minInvAmount: '',
        maxInvTotalAmount: '',
        status: 0,
        balance: '',
        maxInvAmount: ''
      },
      investDetail: {
        appDesc: '',
        threeAgreeJumpUrl: '',
        investTarget: '',
        dueDate: '',
        interestStartDate: '',
        profitShare: '',
        existSystem: '',
        costdes: '',
        riskAppraisal: '',
        riskManagementTip: ''
      },
      productDetail: {
        projectName: '',
        contractNum: '',
        productName: '',
        loanMent: '',
        repaymentWay: '',
        loanAmt: '',
        investRate: '',
        loanDate: ''
      },
      auditInfoList: [],
      isShowAuthenticationPop: false,
      isShowFaceRecognitionPop: false,
      isShowReportPop: false
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
    handleItemClick() {},
    handleCurrentChange(val) {
      this.page = val
      this.getList()
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
        
        let auditInfoList = productDetail.auditInfoList
        auditInfoList.forEach(item => {
          switch (item.field) {
            case 'haveIDCard':
              item.result = require('./image/bg.png') 
              break
            case 'faceRecognition':
              item.result = require('./image/bg.png') 
              break
            case 'signing':
              item.result = require('./image/bg.png') 
              break
            case 'internetInformation':
              item.result = require('./image/bg.png') 
              break
          }
        })
        this.auditInfoList = auditInfoList

        this.getUserBasicInfo()
        this.getAmountQuery()
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
    openReviewInfoPop() {
      this.isShowAuthenticationPop = true
    },
    openFaceRecognitionPop() {
      this.isShowFaceRecognitionPop = true
    },
    openReportPop() {
      this.isShowReportPop = true
    },
    closeReviewInfoPop() {
      this.isShowAuthenticationPop = false
    },
    closeFaceRecognitionPop() {
      this.isShowFaceRecognitionPop = false
    },
    closeReportPop() {
      this.isShowReportPop = false
    }
  },
  mounted () {
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
          width: 80px;
          height: 55px;
          line-height: 52px;
          font-size: $font-size-medium-x;
          color: $color-text;
          margin-right: 120px;
        }
        .status-btn {
          width: 60px;
          height: 30px;
          line-height: 28px;
          background: #0083fe;
          font-size: $font-size-small;
          color: #fff;
          text-align: center;
          margin-top: 12px;
          border-radius: 4px;
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
            margin-right: 92px;
            color: $color-text-s;
            border: 0;
          }
          .value {
            width: 99px;
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
            background: #fb891f;
            text-align: center;
            font-size: $font-size-medium;
            color: #fff;
            cursor: pointer;
            &:hover {
              background: lighten(#fb891f, 5%);
              cursor: pointer;
            }
          }
        }
        .expected-profits {
          display: flex;
          width: 100%;
          height: 16px;
          line-height: 16px;
          margin-top: 20px;
          margin-bottom: 17px;
          justify-content: space-around;
          font-size: $font-size-small;
          color: $color-text;
          .title {
            width: 108px;
            line-height: 16px;
            margin-right: 92px;
            color: $color-text;
            border: 0;
          }
          .value {
            width: 99px;
            line-height: 16px;
            text-align: right;
          }
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
        .examine {
          margin: 21px 0 32px;
          width: 100%;
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
}
</style>
