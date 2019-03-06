<template>
  <div class="lend-detail">
    <section class="production-info">
      <div class="title">
        <h2>
          <img :src="projectInfo.iconUrl" alt />
          <span>{{ projectInfo.projectName }}</span>
        </h2>
      </div>
      <div class="content">
        <div class="decs-wrap">
          <div class="item">
            <p class="value">
              <strong>{{ projectInfo.investRate }}</strong>
              <span class="red">%</span>
            </p>
            <p class="desc">历史平均年化收益率</p>
          </div>
          <div class="item">
            <p class="value">
              <span>{{ projectInfo.surplusAmount }}</span>
            </p>
            <p class="desc">剩余可投(元)</p>
          </div>
          <div class="item">
            <p class="value">
              <span>{{ projectInfo.investPropleCount }}</span>
              <span>人</span>
            </p>
            <p class="desc">已出借人数</p>
          </div>
        </div>
        <div class="progress-wrap">
          <span class="title">项目进度</span>
          <el-progress :percentage="parseFloat(projectInfo.projectProgress)"></el-progress>
          <span class="score">{{ projectInfo.projectProgress }}%</span>
        </div>
      </div>
      <div class="tips">
        <div class="method">
          <span class="title">计息方式：</span>
          <span v-if="projectInfo.repayType === 'XXHB'">先息后本</span>
          <span v-if="projectInfo.repayType === 'DEBX'">等额本息</span>
        </div>
      </div>
      <div class="invest-module">
        <h2>
          <span :class="{ 'unopened-status-title': investStatus === 'unopened' }" class="status-title">{{ investStatusTitle }}</span>
          <router-link class="status-btn" v-if="investStatus !== 'unopened'" :to="{ name: 'charge' }">{{ investStatusBtn }}</router-link>
          <router-link class="status-btn" v-else :to="{ name: 'account' }">{{ investStatusBtn }}</router-link>
        </h2>
        <div class="content">
          <p class="available-balance">
            <span class="title">可用余额</span>
            <span class="value" v-if="projectInfo.balance === '未开户'">{{ projectInfo.balance }}</span>
            <span class="value" v-else>{{ projectInfo.balance }}元</span>
          </p>
          <p class="starting-amount">
            <span class="title">起投金额</span>
            <span class="value">{{ projectInfo.minInvAmt }}元</span>
          </p>
          <p class="single-limit">
            <span class="title">单人限额</span>
            <span class="value">{{ projectInfo.singleLimit }}元</span>
          </p>
          <div class="risk-notice">
            <el-checkbox v-model="isAgree"
              >已阅读并同意
              <router-link target="_blank" :to="{ name: 'riskNoticationLetterAgreement' }">《风险告知书》</router-link>
            </el-checkbox>
          </div>
          <div class="all-lending" v-if="investStatus === 'enable'">
            <el-checkbox class="all-lending-checkbox" v-model="isAllLending" @change="toggleFill">全部出借</el-checkbox>
          </div>
          <div class="action">
            <input maxlength="13" class="amount-input" v-model="invAmount" @keyup="handleExpectedIncome(invAmount)" />
            <button class="action-btn" :disabled="isDisableInvestBtn" @click="handleInvest">{{ investBtn }}</button>
          </div>
          <p class="err-msg" v-if="errMsg">{{ errMsg }}</p>
          <p class="expected-profits">
            <span class="title">预期收益：</span>
            <span class="value">{{ expectedIncome }}元</span>
          </p>
        </div>
      </div>
    </section>
    <section class="tab-wrap">
      <el-tabs class="lend-detail-tab" v-model="lendDetailActiveName" type="border-card" @tab-click="handleItemClick()">
        <el-tab-pane label="出借详情" name="CJXQ">
          <div v-if="lendDetailActiveName === 'CJXQ'" class="content">
            <p class="desc">{{ projectInfo.appDesc }}</p>
            <ul class="detail-list">
              <li>
                <p class="title">
                  <span>协议</span>
                </p>
                <a target="_blank" class="value" :href="projectInfo.agreementUrl">{{ projectInfo.agreementName }}</a>
              </li>
              <li v-for="(item, index) in projectInfo.projectServiceEntity" :key="index">
                <!-- <p class="value">
                  <span>{{item.serviceName}}</span>
                </p>-->
                <span class="title">{{ item.serviceName }}</span>
                <span class="value">{{ item.serviceMessage }}</span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加入记录" name="JRJL">
          <div v-if="lendDetailActiveName === 'JRJL'" class="content">
            <el-table :header-cell-style="{ background: '#f0f7ff' }" class="join-record-table" :data="joinRecordData" border>
              <el-table-column align="center" prop="userName" label="出借人"></el-table-column>
              <el-table-column align="center" height="40" prop="invAmt" label="出借金额"></el-table-column>
              <el-table-column align="center" height="40" prop="invTime" label="出借时间"></el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <pagination :count-page="total" :size-val="size" :page-val="page" @handleCurrentChange="handleJoinRecordCurrentChange"></pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目组成" name="XMZC">
          <div v-if="lendDetailActiveName === 'XMZC'" class="content">
            <el-table :header-cell-style="{ background: '#f0f7ff' }" class="project-composition-table" :data="projectCompositionData" border>
              <el-table-column align="center" prop="ownBondName" label="借款人" width="220"></el-table-column>
              <el-table-column align="center" height="40" prop="totalBondAmt" label="借款金额(元)" width="214"></el-table-column>
              <el-table-column align="center" height="40" prop="investRate" label="历史平均年化收益率" width="232"></el-table-column>
              <el-table-column align="center" height="40" prop="repaymentStatus" label="还款状态" width="205"></el-table-column>
              <el-table-column align="center" height="40" prop="invTime" label="项目详情" width="204">
                <template slot-scope="scope">
                  <a :projectNo="scope.row.projectNo" href="javascript:void(0);" class="view-detail" @click="projectDetail(scope.row)">详情</a>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <pagination
                :count-page="total"
                :size-val="size"
                :page-val="page"
                @handleCurrentChange="handleProjectCompositionCurrentChange"
              ></pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="风险告知书" name="FXGZS">
          <div v-if="lendDetailActiveName === 'FXGZS'" class="content">
            <p>尊敬的出借人：</p>
            <p>
              恭喜您成为江西汇通金融信息服务有服公司运营的网络借贷平台—汇有财平台的用户。感谢您参与/出借本服务/出借标的，在您签署本《风险告知书》之前，请您认真、仔细阅读以下内容及本平台制定并发布的规则制度及其更新或修正的内容，本《风险告知书》经您确认，即视为您已详细了解并理解本风险告知书的全部内容，对其中揭示的风险均有足够的认识，您可在了解融资项目信贷风险后，根据您的金融产品出借经历、风险认知能力、风险识别能力和风险承受能力，自主选择将来源合法的自有资金通过汇有财平台进行资金出借。当您点击“出借”、“申请出借”、“立即出借”、“确认出借”、“同意协议”、“接受协议”或类似文字时，即视为您已经充...
            </p>
            <p class="view-more">
              <router-link target="_blank" :to="{ name: 'riskNoticationLetterAgreement' }">
                点击查看更多
                <i class="iconfont icon-more"></i>
              </router-link>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <!-- 风险评测有问题弹窗 -->
    <Dialog
      :show.sync="isShowRiskDialog"
      title="汇有财温馨提示"
      :confirmText="riskConfirmText"
      cancelText="我知道了"
      :singleButton="riskDialogSingleButton"
      class="risk-dialog align"
      :onConfirm="toRisk"
      :onClose="refreshPage"
    >
      <div>
        <p>{{ riskType }}</p>
        <p>{{ riskContent }}</p>
      </div>
    </Dialog>
    <!-- 正常流程弹窗 -->
    <Dialog :show.sync="isShowConfirmInvestmentDialog" title="确认出借" confirmText="确认出借" class="confirm-investment-dialog" :onConfirm="confirm" :onClose="refreshPage">
      <div>
        <ul class="amount-list">
          <li>
            <p class="title">{{ invAmount }}</p>
            <p class="desc">出借金额(元)</p>
          </li>
          <li>
            <p class="title">{{ invAmount - chooseRedPacketAmt }}</p>
            <p class="desc">支付金额(元)</p>
          </li>
          <li>
            <p class="title">{{ expectedIncome }}</p>
            <p class="desc">预期收益(元)</p>
          </li>
        </ul>
        <div class="red-envelope-wrap" v-if="redPacketsList.length > 0">
          <p class="title">红包</p>
          <div class="swiper-wrap">
            <div class="swiper-container-red-envelope">
              <div class="swiper-wrapper">
                <div class="swiper-slide swiper-no-swiping" v-for="(item, index) in redPacketsList" :key="index">
                  <div
                    :class="[
                      {
                        'dk-red-packet': item.secondType === 1,
                        'xj-red-packet': item.secondType === 2,
                        active: redPacketIndex === index
                      }
                    ]"
                  >
                    <p class="vouche-box">
                      <span class="vouche">
                        <em>{{ item.redPacketAmount }}</em>
                        <i>元</i>
                      </span>
                      <span class="vouche-aside" v-if="item.commonUse === 0">不可与加息券同时使用</span>
                      <span class="vouche-aside" v-if="item.commonUse === 1">可与加息券同时使用</span>
                    </p>
                    <p class="start">起投金额：{{ item.investMinAmount }}元</p>
                    <div class="endData">有效期至{{ item.usableExpireDate }}</div>
                    <button class="receive-btn" @click="receiveRedPacket(item, index)" v-if="redPacketIndex !== index">选取</button>
                    <button class="receive-btn" @click="cleanRedpacket" v-else>已选取</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <div class="rate-stamp-wrap" v-if="couponsList.length > 0">
          <p class="title">加息券</p>
          <div class="swiper-wrap">
            <div class="swiper-container-rate-stamp">
              <div class="swiper-wrapper">
                <div class="swiper-slide swiper-no-swiping" v-for="(item, index) in couponsList" :key="index">
                  <div :class="['rate-stamp-box', { active: couponIndex === index }]">
                    <p class="vouche-box">
                      <span class="vouche">
                        <strong>+</strong>
                        <em>{{ item.couponRate }}</em>
                        <i>%</i>
                        <i class="font">利息</i>
                      </span>
                      <span class="vouche-aside">可加息{{ item.validDays }}天</span>
                    </p>
                    <p class="start">出借限额：{{ item.amountMin }}至{{ item.amountMax }}元</p>
                    <div class="endData">有效期至{{ item.usableExpireDate }}</div>
                    <button class="receive-btn" @click="receiveCoupon(item, index)" v-if="couponIndex !== index">选取</button>
                    <button class="receive-btn" @click="cleanCoupon" v-else>已选取</button>
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
    <!-- 出借流程ERROR弹窗 -->
    <Dialog
      :show.sync="investErrDialog.show"
      title="汇有财温馨提示"
      confirmText="我知道了"
      class="system-maintenance-dialog align"
      :singleButton="investErrDialog.singleButton"
    >
      <div>
        <p>{{ investErrDialog.msg }}</p>
      </div>
    </Dialog>
    <!-- 出借普通产品成功弹窗 -->
    <Dialog
      :show.sync="investCommonSuccessDialog.show"
      :title="investCommonSuccessDialog.title"
      confirmText="进入我的出借"
      :showCloseBtn="investCommonSuccessDialog.showCloseBtn"
      class="common-dialog align"
      :singleButton="investCommonSuccessDialog.singleButton"
      :onClose="refreshPage"
    >
      <div>
        <p>{{ investCommonSuccessDialog.msg }}</p>
      </div>
    </Dialog>
    <!-- 出借手机乐产品成功弹窗 -->
    <Dialog
      :show.sync="investSJLSuccessDialog.show"
      :title="investSJLSuccessDialog.title"
      confirmText="填写地址"
      class="sjl-dialog align"
      :onConfirm="confirmSJL"
      :onClose="refreshPage"
    >
      <div>
        <p>{{ investSJLSuccessDialog.msg }}</p>
      </div>
    </Dialog>
    <!-- 自动出借类产品成功弹窗 -->
    <Dialog
      :show.sync="investAutoInvestSuccessDialog.show"
      :title="investAutoInvestSuccessDialog.title"
      class="auto-invest-dialog"
      :onConfirm="confirmAutoInvest"
      :onClose="refreshPage"
    >
      <div class="msg-wrap">
        <span>您已成功出借{{ projectInfo.projectName }}{{ invAmount }}元</span>
        <router-link
          tag="div"
          :style="{
            fontSize: '14px',
            color: '#FB8B1F',
            lineHeight: '26px'
          }"
          :to="{ name: 'userLend' }"
          >查看我的出借
          <i class="iconfont icon-more"></i>
        </router-link>
      </div>
      <div class="auto-invest-way-wrap">
        <div class="auto-invest-way1">
          <el-radio v-model="investAutoInvestSuccessDialog.autoInvestWay" label="1">本金到期后自动出借</el-radio>
        </div>
        <div class="auto-invest-way2">
          <el-radio v-model="investAutoInvestSuccessDialog.autoInvestWay" label="2">本息到期后自动出借</el-radio>
        </div>
      </div>
      <router-link target="_blank" class="auto-invest-agreement" :to="{ name: 'autoLendAgreement' }">《自动出借协议》</router-link>
      <p class="tips" v-if="investAutoInvestSuccessDialog.autoInvestWay === '1'">
        在本金自动出借模式下，每月产品到期时，系统自动将利息转入用户汇有财账户，本金继续出借。用户可在【我的账户】-【自动出借】界面取消，如有任何疑问，请联系客服：400-099-7979。
      </p>
      <p class="tips" v-if="investAutoInvestSuccessDialog.autoInvestWay === '2'">
        在本息自动出借模式下，每月产品到期时系统默认将本金与利息合并后继续出借。用户可在【我的账户】-【自动出借】界面中取消。如有任何疑问，如有任何疑问，请联系客服：400-099-7979。
      </p>
    </Dialog>
    <!-- 设置成功弹窗 -->
    <Dialog
      :show.sync="setSuccessDialog.show"
      :showTitle="setSuccessDialog.showTitle"
      :singleButton="setSuccessDialog.singleButton"
      :onClose="refreshPage"
    >
      <div style="text-align: center">
        <i class="iconfont icon-success" style="font-size: 60px; color: #fb7b1f;"></i>
        <p style="margin: 20px 0 50px;">设置成功</p>
      </div>
    </Dialog>
    <!-- 未签约弹窗 -->
    <Dialog
      class="align"
      :show.sync="withoutSignDialogOptions.show"
      :singleButton="withoutSignDialogOptions.singleButton"
      :onConfirm="toSign"
      :confirmText="withoutSignDialogOptions.confirmText"
    >
      <div>
        {{withoutSignDialogOptions.msg}}
      </div>
    </Dialog>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
import { mapState } from 'vuex'
import Pagination from '@/components/pagination/pagination'
import {
  investCountProjectMsg,
  investUserCountMsg,
  bondproject,
  availableRedPacketApi,
  availableCouponApi,
  investApi,
  expectedIncome,
  expireRepeatApi,
  userInfoCompleteNoticeApi
} from '@/api/djs/lendDetail'
import Dialog from '@/components/Dialog/Dialog'

export default {
  data() {
    return {
      lendDetailActiveName: 'CJXQ', // 选项卡选中状态
      productId: '', // 标的id
      itemId: '', // 集合标项目ID
      projectNo: '',
      isAgree: false, // 是否同意风险告知书
      isAllLending: false, // 是否自动出借
      isProjectDetail: false, // 是否显示项目详情弹窗
      page: 1,
      size: 10,
      total: 0,
      investStatus: '', // 投资状态
      investStatusTitle: '出借中...', // 投资状态文字
      investStatusBtn: '', // 投资按钮状态文字
      investBtn: '申请出借', // 出借按钮文字
      isDisableInvestBtn: false, // 是否禁用申请出借按钮
      invAmount: '', // 申请出借输入框金额
      expectedIncome: '0.00', //逾期收益
      projectInfo: {
        iconUrl: '', // icon图片链接
        appDesc: '', // 项目介绍
        agreementName: '', // 协议名称
        agreementUrl: '', // 协议url
        investTarget: '', // 投资目标
        investMent: '', // 锁定期
        breathDate: '', // 产品起息时间
        profitShare: '', // 利息分配
        existSystem: '', // 退出机制
        costDes: '', // 费用说明
        riskAppraisal: '', // 项目风险评估及可能产生的风险结果
        riskManagementTip: '', // 出借人适当性管理提示
        projectServiceEntity: [],
        investRate: '', // 利率
        projectName: '', // 产品名称
        surplusAmount: '', // 剩余可投金额
        investPropleCount: '', // 已购人次
        projectProgress: 0, // 投资百分比
        repayType: '', // 结息方式
        minInvAmt: '', // 起投金额
        singleLimit: '', // 单人限额
        status: 0, // nteger - 项目状态 1.未开启 2.已投X% 3.满标
        balance: '', // 可用余额
        maxInvAmount: '', // 单笔投资上限金额限制
        projectType: '' // 项目名称
      },
      joinRecordData: [], // 加入记录数据
      projectCompositionData: [], // 项目组成数据
      errMsg: '', // 错误提示
      isShowRiskDialog: false, // 是否显示风险测评弹窗
      isShowSystemMaintenanceDialog: false,
      singleButton: true, // 是否显示系统维护弹窗
      riskConfirmText: '重新评测', // 风险测评弹窗按钮文字
      riskDialogSingleButton: false,
      riskType: '', // 风险测评的类型
      riskContent: '', // 风险测评弹窗默认文字
      isShowConfirmInvestmentDialog: false, // 是否显示出借弹窗
      redPacketsList: [],
      redPacketIndex: -1,
      chooseRedPacket: {},
      chooseCoupon: {},
      chooseRedPacketAmt: '', // 选中红包的金额
      chooseRedPacketId: '', // 选中红包的ID
      chooseCouponRate: '', // 选中加息券的利率
      chooseCouponId: '', // 选中加息券的ID
      couponsList: [],
      couponIndex: -1,
      investErrDialog: {
        // 出借错误弹窗（resultCode !== '1'）
        show: false,
        msg: '',
        singleButton: true
      },
      investCommonSuccessDialog: {
        // 出借普通产品成功弹窗
        show: false,
        title: '汇有财温馨提示',
        singleButton: true,
        msg: '出借成功，您可在“我的出借”中查看详情。',
        showCloseBtn: true
      },
      investSJLSuccessDialog: {
        // 出借手机乐产品成功弹窗
        show: false,
        title: '汇有财温馨提示',
        msg: ''
      },
      investAutoInvestSuccessDialog: {
        // 自动出借产品成功弹窗
        show: false,
        title: '设置自动出借，省心赚钱',
        msg: '',
        autoInvestWay: '1'
      },
      setSuccessDialog: {
        // 设置成功弹窗
        show: false,
        showTitle: false,
        singleButton: true
      },
      withoutSignDialogOptions: {
        // 签约状态不符弹窗
        show: false,
        msg: '您当前未签约或签约状态不符合合规要求，请重新签约！',
        singleButton: false,
        confirmText: '签约'
      },
      invId: 0,
      investType: ''
    }
  },
  components: {
    Pagination,
    Dialog
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      userBasicInfo: state => state.user.userBasicInfo,
      personalAccount: state => state.user.personalAccount
    })
  },
  watch: {
    invAmount(value) {
      this.handleExpectedIncome(value)
      // 值不等于可用余额 && 单人限额，就去掉全投状态
      this.isAllLending = !(value !== this.projectInfo.balance && value !== this.projectInfo.maxInvTotalAmount)
    }
  },
  methods: {
    projectDetail(val) {
      // console.log('val===', val)
      //项目详情
      this.$router.push({
        name: 'projectDetail',
        params: {
          data: val
        }
      })
    },
    handleItemClick() {
      this.page = 1
      switch (this.lendDetailActiveName) {
        case 'CJXQ':
          this.getInvestDetailList()
          break
        case 'JRJL':
          this.getJoinRecordList()
          break
        case 'XMZC':
          this.getProjectCompoList()
          break
      }
    },
    getUserBasicInfo() {
      if (!this.userBasicInfo.escrowAccountInfo) {
        this.investStatus = 'unopened' // 状态为为开户
        this.investStatusTitle = '出借中...'
        this.investBtn = '立即开户'
        this.investStatusBtn = '开户'
      } else {
        this.getInvestStatus()
        this.investStatusBtn = '充值'
      }
    },
    getInvestStatus() {
      switch (
        this.projectInfo.status // 0.禁用    1.启用
      ) {
        case '0':
          this.investStatusTitle = '预售中...'
          this.investStatus = 'disable'
          this.isDisableInvestBtn = true
          break
        case '1':
          this.investStatusTitle = '出借中...'
          this.investStatus = 'enable'
          break
      }
    },
    handleJoinRecordCurrentChange(val) {
      this.page = val
      this.getJoinRecordList()
    },
    handleProjectCompositionCurrentChange(val) {
      this.page = val
      this.getProjectCompoList()
    },
    handleExpectedIncome(invAmount) {
      this.invAmount = invAmount
        .replace(/[^\d.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/^(-)*(\d+)\.(\d\d).*$/, '$1$2.$3')

      let postData = {
        invAmount: this.invAmount,
        investRate: this.projectInfo.investRate,
        productNo: this.productNo,
        invDays: this.projectInfo.investMent,
        couponRate: this.chooseCouponRate,
        redpacketID: this.chooseRedPacketId,
        validDays: this.chooseCoupon.validDays
      }
      expectedIncome(postData).then(res => (this.expectedIncome = res.data.expectedIncome))
    },
    getInvestDetailList() {
      this.projectNo = this.$route.query.projectNo
      let postData = {
        projectNo: this.projectNo
      }
      investCountProjectMsg(postData).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.projectInfo = data
          this.getUserBasicInfo()
          this.getAmountQuery()
        } else {
          this.investErrDialog.show = true
          this.investErrDialog.msg = data.resultMsg
        }
      })
    },
    getJoinRecordList() {
      let postData = {
        projectNo: this.projectNo,
        curPage: this.page,
        maxLine: this.size
      }
      investUserCountMsg(postData).then(res => {
        let data = res.data
        this.joinRecordData = data.invUserList
        this.total = parseInt(data.countPage)
        this.page = parseInt(data.curPage)
      })
    },
    getProjectCompoList() {
      let postData = {
        projectNo: this.projectNo, //1902151101,
        curPage: this.page,
        maxLine: this.size
      }
      bondproject(postData).then(res => {
        let data = res.data
        this.projectCompositionData = data.list
        this.projectCompositionData.forEach(item => {
          item.investRate = item.investRate + '%'
        })
        this.total = parseInt(data.countPage)
        this.page = parseInt(data.curPage)
      })
    },
    getAmountQuery() {
      this.projectInfo.balance = this.investStatus === 'unopened' ? '未开户' : this.personalAccount.banlance
    },
    handleInvest() {
      this.errMsg = ''
      // 如果是未开户（未设置密码），点击去开户页面
      if (this.investStatus === 'unopened' || !this.userBasicInfo.userIsOpenAccount.isSetTranPSD) {
        this.$router.push({ name: 'account' })
      } else {
        if (this.invAmount === '') {
          this.errMsg = '请输入金额'
        } else {
          if (this.projectInfo.status === '0') {
            this.investErrDialog.show = true
            this.investErrDialog.msg = '该项目暂时无法投资'
          } else {
            // 如果没勾选风险告知书，弹出提示
            if (!this.isAgree) {
              this.errMsg = '请确认并同意《风险告知书》'
            } else {
              userInfoCompleteNoticeApi().then(res => {
                console.log(res.data)
                if (res.data.data.status === 'SIGN_PROTOCOL') {
                  // 未签约
                  this.withoutSignDialogOptions.show = true
                } else if (res.data.data.status === 'EVALUATE') {
                  // 未做过风险测评
                  this.isShowRiskDialog = true
                  this.riskType = '汇有财温馨提示'
                  this.riskContent = res.data.data.message
                } else if (res.data.data.status === 'COMPLETE') {
                  if (this.invAmount > this.projectInfo.balance - 0) {
                    this.errMsg = '当前账户余额不足，请充值'
                    return
                  }
                  if (this.invAmount < this.projectInfo.minInvAmt - 0) {
                    this.errMsg = '出借金额不能低于起投金额'
                    return
                  }
                  if (this.invAmount > this.projectInfo.surplusAmt - 0) {
                    this.errMsg = '剩余可投金额为' + this.projectInfo.surplusAmt + '元'
                    return
                  }

                  if (this.invAmount > this.projectInfo.singleLimit - 0) {
                    this.errMsg = '单人限额为' + this.projectInfo.singleLimit + '元'
                    return
                  }

                  const $this = this
                  ;(async function initInvestDialog() {
                    await availableRedPacketApi({
                      projectNo: $this.projectNo,
                      amount: $this.invAmount
                    }).then(res => {
                      let resultList = [],
                        originList = res.data.userRedPackets
                      // 从列表中筛选出可用的 (item.isVailable === 1)
                      if (originList.length > 0) {
                        originList.forEach(v => {
                          if (v.isVailable === 1) {
                            resultList.push(v)
                          }
                        })
                      }
                      $this.redPacketsList = resultList
                    })
                    await availableCouponApi({
                      projectNo: $this.projectNo,
                      amount: $this.invAmount
                    }).then(res => {
                      let resultList = [],
                        originList = res.data.coupons
                      // 从列表中筛选出可用的 (item.isVailable === 1)
                      if (originList.length > 0) {
                        originList.forEach(v => {
                          if (v.isVailable === 1) {
                            resultList.push(v)
                          }
                        })
                      }
                      $this.couponsList = resultList
                      $this.isShowConfirmInvestmentDialog = true
                    })
                    await $this.redEnvelopeSwiper()
                    await $this.rateStampSwiper()
                  })()
                }
              })
            }
          }
        }
      }
    },
    toSign() {
      this.$router.push({ name: 'sign' })
    },
    toRisk() {
      this.$router.push({ name: 'riskAss' })
    },
    receiveRedPacket(item, index) {
      if (item.commonUse === 0) {
        this.cleanCoupon()
        this.redPacketIndex = index
        this.chooseRedPacket = item
        if (item.secondType !== 2) {
          // secondType === 2是现金红包，不可以抵扣金额
          this.chooseRedPacketAmt = item.redPacketAmount
        }
        this.chooseRedPacketId = item.id
      } else {
        if (typeof this.chooseCoupon.commonUse === 'undefined' || this.chooseCoupon.commonUse === 1) {
          this.redPacketIndex = index
          this.chooseRedPacket = item
          if (item.secondType !== 2) {
            // secondType === 2是现金红包，不可以抵扣金额
            this.chooseRedPacketAmt = item.redPacketAmount
          }
          this.chooseRedPacketId = item.id
        }
      }
    },
    cleanRedpacket() {
      this.redPacketIndex = -1
      this.chooseRedPacket = {}
      this.chooseRedPacketAmt = ''
      this.chooseRedPacketId = ''
    },
    receiveCoupon(item, index) {
      if (item.commonUse === 0) {
        this.cleanRedpacket()
        this.couponIndex = index
        this.chooseCoupon = item
        this.chooseCouponRate = item.couponRate
        this.chooseCouponId = item.id

        this.handleExpectedIncome(this.invAmount)
      } else {
        if (typeof this.chooseRedPacket.commonUse === 'undefined' || this.chooseRedPacket.commonUse === 1) {
          this.couponIndex = index
          this.chooseCoupon = item
          this.chooseCouponRate = item.couponRate
          this.chooseCouponId = item.id
          this.handleExpectedIncome(this.invAmount)
        }
      }
    },
    cleanCoupon() {
      this.couponIndex = -1
      this.chooseCoupon = {}
      this.chooseCouponRate = ''
      this.chooseCouponId = ''

      this.handleExpectedIncome(this.invAmount)
    },
    redEnvelopeSwiper() {
      new Swiper('.swiper-container-red-envelope', {
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
    },
    rateStampSwiper() {
      new Swiper('.swiper-container-rate-stamp', {
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
    },
    toggleFill(value) {
      if (value) {
        if (this.projectInfo.balance - 0 > this.projectInfo.surplusAmt - 0) {
          this.invAmount = this.projectInfo.surplusAmt
        } else {
          this.invAmount = this.projectInfo.balance
        }
      } else {
        this.invAmount = ''
      }
    },
    confirm() {
      investApi({
        projectNo: this.projectNo,
        invAmount: this.invAmount,
        userCouponId: this.chooseCouponId,
        userRedPacketId: this.chooseRedPacketId,
        investSource: 'PC'
      }).then(res => {
        if (res.data.resultCode === '1') {
          const data = res.data
          if (this.projectInfo.doubleBonuCouponEntity.dbCouponRate || this.projectInfo.doubleBonuCouponEntity.dbValidDays !== null) {
            // 可以加息复投
            this.investAutoInvestSuccessDialog.show = true
            this.invId = data.id
            this.investType = data.investType
            this.investSJLSuccessDialog.msg = data.successInfo
          } else {
            if (res.data.investType === 'SJLHD') {
              // 手机乐活动
              this.investSJLSuccessDialog.show = true
              this.investSJLSuccessDialog.msg = data.successTitle + data.successInfo
            } else {
              // 普通产品
              this.investCommonSuccessDialog.show = true
            }
          }
        } else if (res.data.resultCode === '90021' || res.data.resultCode === '90022') {
          // 风险测评出借额度不够 || 出借期限不够
          switch (res.data.evaluatingResult) {
            case 'BSX':
              this.riskType = '【保守型】'
              break
            case 'WJX':
              this.riskType = '【谨慎型】'
              break
            case 'JJX':
              this.riskType = '【积极型】'
              break
            case 'JQX':
              this.riskType = '【积极型】'
              break
            case 'JINX':
              this.riskType = '【激进型】'
              break
          }

          if (['JINX'].includes(res.data.data.evaluatingResult)) {
            this.riskDialogSingleButton = true
          }
          this.riskContent = res.data.resultMsg
          this.isShowRiskDialog = true
        } else {
          this.investErrDialog.show = true
          this.investErrDialog.msg = res.data.resultMsg
        }
      })
    },
    confirmCommon() {
      this.$router.push({
        name: 'lendList',
        query: {
          projectNo: this.projectNo
        }
      })
    },
    confirmSJL() {
      this.$router.push({
        name: 'basicInfo',
        query: {
          projectNo: this.projectNo
        }
      })
    },
    confirmAutoInvest() {
      expireRepeatApi({
        invId: this.invId,
        projectNo: this.projectNo,
        repeatStatus: this.investAutoInvestSuccessDialog.autoInvestWay
      }).then(res => {
        const data = res.data
        if (data.resultCode === '1') {
          switch (this.investType) {
            case 'GENERAL':
              // 普通标
              this.setSuccessDialog.show = true
              break
            case 'SJLHD':
              // 手机乐活动
              this.investSJLSuccessDialog.show = true
              break
          }
        } else {
          this.investErrDialog.show = true
          this.investErrDialog.msg = data.resultMsg
        }
      })
    },
    refreshPage() {
      window.location.reload()
    }
  },
  mounted() {
    this.getInvestDetailList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';

.Dialog.align {
  text-align: center;
}

.lend-detail {
  padding-top: 30px;
  position: relative;
  overflow: auto;
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
          .el-progress-bar__outer {
            height: 6px !important;
            border-radius: 100px;
            background-color: #fdc48d;
          }
          .el-progress-bar__inner {
            border-radius: 100px;
            background-color: #fb891f;
          }
          .el-progress__text {
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
          margin-bottom: 20px;
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
          /deep/ .el-checkbox__inner:hover {
            border-color: #4a90e2;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: $color-text-s;
          }
        }
        .all-lending {
          width: 100%;
          height: 16px;
          position: relative;
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
          margin-top: 13px;
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
    .content {
      padding: 15px;
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
          background: #f0f7ff;
          .title {
            padding: 10px;
            color: $color-text;
            display: inline-block;
            width: 380px;
            text-align: center;
            border-right: 1px solid #e3e3e3;
          }
          .value {
            display: inline-block;
            width: 640px;
            padding: 10px;
            padding-left: 30px;
            text-align: left;
            color: $color-text-s;
            background: #fff;
          }
          a.value {
            color: #0083fe;
          }
          &:last-child {
            border-bottom: 0;
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
      .pagination-wrapper {
        margin-top: 20px;
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
          .swiper-container-red-envelope,
          .swiper-container-rate-stamp {
            width: 560px;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            list-style: none;
            padding: 0;
            z-index: 1;
            /deep/ .dk-red-packet,
            /deep/ .xj-red-packet,
            /deep/ .rate-stamp-box {
              position: relative;
              width: 378px;
              height: 105px;
              border-radius: 4px;
              background-position: center;
              background-repeat: no-repeat;
              cursor: pointer;
              .vouche-box {
                padding-top: 19px;
                margin-bottom: 4px;
                .vouche {
                  font-size: $font-size-large-xxx;
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
                font-weight: 400;
                color: $color-text-s;
                line-height: 20px;
              }
              .endData {
                margin-left: 33px;
                font-size: $font-size-small-ss;
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
              &.active,
              &:hover {
                .vouche {
                  color: #fff;
                }
                .vouche-aside {
                  border: 1px solid #fff;
                  color: #fff;
                }
                .start {
                  color: #fff;
                }
                .endData {
                  color: #fff;
                }
                .receive-btn {
                  background: rgba(255, 227, 17, 1);
                  color: rgba(255, 58, 41, 1);
                  border: 1px solid rgba(255, 227, 17, 1);
                  border-left: 0;
                }
              }
            }
            /deep/ .dk-red-packet {
              $unselectedBgImage: './image/bg_red_envelope_nochoose.png';
              $selectedBgImage: './image/bg_red_envelope_choosed.png';
              background-image: url($unselectedBgImage);
              &:hover {
                background-image: url($selectedBgImage);
                .receive-btn {
                  background: rgba(255, 227, 17, 1);
                  color: rgba(255, 58, 41, 1);
                  border: 1px solid rgba(255, 227, 17, 1);
                  border-left: 0;
                }
              }
              &.active {
                background-image: url($selectedBgImage);
              }
            }
            /deep/ .xj-red-packet {
              $unselectedBgImage: './image/xj-redpacket-nochoose.png';
              $selectedBgImage: './image/xj-redpacket-choose.png';
              background-image: url($unselectedBgImage);
              &:hover {
                background-image: url($selectedBgImage);
                .receive-btn {
                  background: rgba(255, 227, 17, 1);
                  color: rgba(255, 58, 41, 1);
                  border: 1px solid rgba(255, 227, 17, 1);
                  border-left: 0;
                }
              }
              &.active {
                background-image: url($selectedBgImage);
              }
            }
            /deep/ .rate-stamp-box {
              $unselectedBgImage: './image/bg_rate_stamp.png';
              $selectedBgImage: './image/bg_rate_choose.png';
              background-image: url($unselectedBgImage);
              &:hover {
                background-image: url($selectedBgImage);
                .receive-btn {
                  background: rgba(255, 227, 17, 1);
                  color: rgba(255, 58, 41, 1);
                  border: 1px solid rgba(255, 227, 17, 1);
                  border-left: 0;
                }
              }
              &.active {
                background-image: url($selectedBgImage);
              }
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
          .swiper-button-prev1.swiper-button-disabled,
          .swiper-button-next1.swiper-button-disabled {
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
  .auto-invest-dialog {
    /deep/ .inner {
      padding: 32px 30px 40px 30px;
      .msg-wrap {
        display: flex;
        width: 100%;
        height: 70px;
        // /line-height: 70px;
        padding: 22px 15px;
        background: #f3f2f2;
        justify-content: space-between;
        font-size: $font-size-medium;
        color: $color-text-s;
        span {
          line-height: 26px;
        }
        div:hover {
          cursor: pointer;
        }
        .view-my-invest {
          line-height: 24px;
          font-size: $font-size-small-s;
          color: #fb8b1f;
        }
      }
      .auto-invest-way-wrap {
        margin-top: 30px;
        .auto-invest-way1 {
          width: 200px;
          margin: 0 auto;
          margin-bottom: 12px;
        }
        .auto-invest-way2 {
          width: 200px;
          margin: 0 auto;
        }
        /deep/ .el-radio {
          color: $color-text-s;
          font-size: $font-size-medium;
          .el-radio__inner {
            width: 20px;
            height: 20px;
            &:after {
              width: 6px;
              height: 6px;
              border: 1px solid #cdcdcd;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .el-radio__label {
            font-size: $font-size-medium;
          }
        }
        /deep/ .el-radio.is-checked {
          .el-radio__inner {
            width: 20px;
            height: 20px;
            border-color: #fb7b1f;
            background: #fff;
            &:after {
              width: 6px;
              height: 6px;
              border: 1px solid #fb7b1f;
              background-color: #fb7b1f;
            }
          }
          .el-radio__label {
            color: $color-text;
            font-size: $font-size-medium;
          }
        }
      }
      .auto-invest-agreement {
        display: block;
        width: 200px;
        margin: 0 auto;
        margin-top: 10px;
        text-align: center;
        font-size: $font-size-small-s;
        color: #2d85ed;
        text-decoration: underline;
      }
      .tips {
        margin-top: 20px;
        color: $color-text-s;
        font-size: $font-size-small-ss;
      }
      footer {
        padding: 0 36px;
      }
    }
  }
}
.sjl-dialog p {
  text-align: center;
}
</style>
