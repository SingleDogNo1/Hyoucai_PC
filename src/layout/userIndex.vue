<template>
  <div class="mine-wrapper" v-if="userBasicInfo">
    <user-menu></user-menu>
    <div class="wrapper"><router-view /></div>
    <Dialog
      ref="alertDialog"
      :showTitle="showTitle"
      :title="dialogTitle"
      :showLogo="showLogo"
      :showFooter="showFooter"
      :showCloseBtn="showCloseBtn"
      :singleButton="singleButton"
      :show.sync="showDialog"
      :confirmText="confirmText"
      :onBtnClose="onBtnClose"
      :onConfirm="onConfirm"
    >
      <div slot class="discribe">{{ dialogDis }}</div>
      <el-button v-if="openSignText" class="open-sign-btn" @click.native="viewDialog">{{ openSignText }}</el-button>
    </Dialog>
    <!-- 设置自动出借弹窗 -->
    <Dialog
      class="repeat-unread-dialog"
      :show.sync="repeatUnreadDialogOptions.show"
      title="设置自动出借，省心赚钱"
      :onConfirm="confirmRepeatUnread"
      :onBtnClose="closeConfirmRepeat"
    >
      <div v-if="repeatCouponRate !== ''">
        <!-- 复投加息 -->
        <p class="board">
          您有{{repeatInvestUnreadMsgList.length}}笔出借即将到期，设置自动出借加息{{repeatCouponRate}}%， 到期出借生效
        </p>
        <div class="auto-invest-way-wrap">
          <div class="auto-invest-way1">
            <el-radio v-model="repeatUnreadDialogOptions.autoInvestWay" label="1">本金到期后自动出借 </el-radio >
          </div>
          <div class="auto-invest-way2">
            <el-radio v-model="repeatUnreadDialogOptions.autoInvestWay" label="2">本息到期后自动出借</el-radio >
          </div>
        </div>
        <router-link class="auto-invest-agreement" :to="{ name: 'autoLendAgreement' }">《自动出借协议》</router-link>
      </div>
      <div v-else>
        <!-- 复投不加息 -->
        <p class="board">
          您有{{repeatInvestUnreadMsgList.length}}笔出借即将到期，设置自动出借坐享收益
        </p>
        <div class="auto-invest-way-wrap">
          <div class="auto-invest-way1">
            <el-radio v-model="repeatUnreadDialogOptions.autoInvestWay" label="1">本金到期后自动出借 </el-radio >
          </div>
          <div class="auto-invest-way2">
            <el-radio v-model="repeatUnreadDialogOptions.autoInvestWay" label="2">本息到期后自动出借</el-radio >
          </div>
        </div>
        <router-link class="auto-invest-agreement" :to="{ name: 'autoLendAgreement' }">《自动出借协议》</router-link>
      </div>
    </Dialog>
    <!-- 全局的错误弹窗（resultCode !== '1'） -->
    <Dialog
      :show.sync="investErrDialog.show"
    >
      <div>{{investErrDialog.msg}}</div>
    </Dialog>
    <Certification v-if="accountStatus !== 'COMPLETE'" reg-flow-to="risk">
      <span></span>
    </Certification>
  </div>
</template>

<script>
import userMenu from '@/components/UserMenu/UserMenu'
import { mapGetters, mapMutations } from 'vuex'
import { userBasicInfo } from '@/api/common/login'
import Dialog from '@/components/Dialog/Dialog'
import Certification from '@/components/CertificationFlow/CertificationFlow'
import { alertInfoAcceptApi, getAlertInfo, getUserCompleteInfo } from '@/api/common/userIndex'
import { repeatInvestApi, UpdateMessageApi } from '@/api/djs/userIndex'
import { currentPlatform } from '../assets/js/utils'
import Cookie from 'js-cookie'

const CODE_OK = '1'
export default {
  name: 'Mine',
  mixins: [],
  components: {
    userMenu,
    Dialog,
    Certification
  },
  data() {
    return {
      showDialog: false,
      singleButton: false,
      confirmText: '确定',
      dialogDis: '',
      accountStatus: '',
      alertInfo: { haveAlert: false, count: 0, type: '' },
      routerLink: '', // 要跳转的路由
      routerParam: '',
      dialogTitle: '汇有财温馨提示',
      showCloseBtn: false,
      showTitle: true,
      showLogo: false,
      showFooter: true,
      openSignText: '',
      repeatInvestUnreadMsgList: [], // 点金石未读复投消息列表
      repeatCouponRate: '', // 复投加息的利率
      repeatUnreadDialogOptions: {
        // 点金石未读复投消息弹窗参数
        show: false,
        autoInvestWay: '1'
      },
      investErrDialog: {
        // 全局报错弹窗
        show: false,
        msg: ''
      },
      beforeRouterPath: ''
    }
  },
  props: {},
  watch: {
    '$route.name'(ne) {
      // 未开户状态下点击“我的账户”页面中的“银行卡”“充值”“提现”“自动出借”“我的推荐码”，均弹出开户弹框，该弹框只在进入“我的账户”弹出，在侧边栏切换至“账户总览”时，不弹出
      if (
        this.accountStatus === 'OPEN_ACCOUNT' &&
        (ne === 'bankcard' || ne === 'charge' || ne === 'tocash' || ne === 'referralCode' || ne === 'auto-lend')
      ) {
        this.showDialog = true
      }
    }
  },
  methods: {
    ...mapMutations({
      setUserBasicInfo: 'SET_USERBASICINFO'
    }),
    onBtnClose() {
      let path = this.$route.name
      if (path !== 'overview') {
        this.$router.push({ name: 'overview' })
      }
    },
    onConfirm() {
      alertInfoAcceptApi({ type: 'evaluate' }).then(res => {
        if (res.data.resultCode !== '1') {
          console.log(res.data.resultMsg)
        }
      })
      this.viewDialog()
    },
    viewDialog() {
      this.showDialog = false
      if (this.routerLink) {
        // 需要跳转的
        this.$router.push({
          name: this.routerLink,
          params: this.routerParam
        })
      }
    },
    getAlertInfo() {
      getAlertInfo().then(res => {
        let data = res.data
        if (data.resultCode === CODE_OK) {
          this.alertInfo = data.data
          this.showTitle = true
          this.showCloseBtn = false
          this.showLogo = false
          this.showFooter = true
          if (this.alertInfo.haveAlert) {
            this.showDialog = true
            if (this.alertInfo.type) {
              switch (this.alertInfo.type) {
                case 'redPacket':
                  this.showCloseBtn = true
                  this.dialogTitle = `您收到${this.alertInfo.count}个红包`
                  this.dialogDis = `${this.alertInfo.count}个红包已存入您的账户`
                  this.confirmText = '查看我的红包'
                  this.routerLink = 'lendCoupons'
                  this.routerParam = ''
                  break
                case 'coupon':
                  this.showCloseBtn = true
                  this.dialogTitle = `您收到${this.alertInfo.count}个加息券`
                  this.dialogDis = `${this.alertInfo.count}个加息券已存入您的账户`
                  this.confirmText = '查看我的加息券'
                  this.routerLink = 'lendCoupons'
                  this.routerParam = ''
                  break
                case 'refund':
                  this.showCloseBtn = true
                  this.dialogTitle = '汇有财温馨提示'
                  this.dialogDis = `银行系统原因，您有${this.alertInfo.count}笔出借退款项未匹配成功，已退回`
                  this.confirmText = '去查看'
                  this.routerLink = 'userLend'
                  this.routerParam = {
                    status: 'JHB_YTK'
                  }
                  break
                case 'refundBeforeDueDate':
                  this.showCloseBtn = true
                  this.dialogTitle = '提前还款通知'
                  this.dialogDis = this.alertInfo.message
                  this.confirmText = '我知道了'
                  this.routerLink = ''
                  this.routerParam = ''
                  break
                case 'evaluate':
                  this.showCloseBtn = false
                  this.dialogTitle = '温馨提示'
                  this.dialogDis = this.alertInfo.message
                  this.confirmText = '我知道了'
                  this.routerLink = ''
                  this.routerParam = ''
                  break
                default:
                  this.showCloseBtn = true
                  this.dialogTitle = '汇有财温馨提示'
                  this.dialogDis = `您有${this.alertInfo.count}笔出借提前还款`
                  this.confirmText = '我知道了'
                  this.routerLink = ''
                  this.routerParam = ''
              }
            }
          }
        } else {
          this.dialogDis = data.resultMsg
        }
      })
    },
    getUserCompleteInfo() {
      getUserCompleteInfo().then(res => {
        let data = res.data
        let list = data.data
        if (data.resultCode === CODE_OK) {
          // 复投弹窗在点击取消时，向cookie保存一个一天后过期的值。再次进入个人中心时，读取这个值，如果能拿的到说明不是第一次登陆，不显示
          const key = `repeat-key-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
          this.showTitle = false
          this.showCloseBtn = true
          this.showLogo = true
          this.showFooter = false
          this.beforeRouterPath && !this.userBasicInfo.userIsOpenAccount.registerProtocolSigned ? (this.showDialog = false) : (this.showDialog = true)
          this.accountStatus = list.status
          switch (this.accountStatus) {
            case 'REAL_NAME':
              this.openSignText = '开通实名账户'
              this.routerLink = 'realNameAuth'
              break
            case 'BANK_CARD':
              this.openSignText = '绑定银行卡'
              this.routerLink = 'realNameBindCard'
              break
            case 'OPEN_ACCOUNT':
              this.openSignText = '开通汇有财账户'
              this.routerLink = 'account'
              break
            case 'SET_PASSWORD':
              this.openSignText = '设置交易密码'
              this.routerLink = 'account'
              break
            case 'SIGN_PROTOCOL':
              this.openSignText = '签约'
              this.routerLink = 'sign'
              break
            case 'EVALUATE':
              this.openSignText = '风险评测'
              this.routerLink = 'riskAss'
              break
            default:
              this.openSignText = ''
              this.routerLink = ''
              this.showDialog = false
              if (currentPlatform() === 'djs' && !Cookie.get(key)) {
                repeatInvestApi({
                  userName: this.user.userName
                }).then(res => {
                  if (res.data.resultCode === '1') {
                    this.repeatCouponRate = res.data.couponRate
                    if (res.data.couponRate === '') {
                      // 复投不加息
                      if (res.data.list.length > 0) {
                        this.repeatUnreadDialogOptions.show = true
                        this.repeatInvestUnreadMsgList = res.data.list
                      } else {
                        this.getAlertInfo()
                      }
                    } else {
                      // 复投加息
                      if (res.data.list.length > 0) {
                        this.repeatUnreadDialogOptions.show = true
                        this.repeatInvestUnreadMsgList = res.data.list
                      } else {
                        this.getAlertInfo()
                      }
                    }
                  }
                })
              } else {
                this.repeatUnreadDialogOptions.show = false
                this.repeatInvestUnreadMsgList = []
                this.getAlertInfo()
              }
          }
          this.dialogDis = list.message
        }
      })
    },
    confirmRepeatUnread() {
      this.repeatInvestUnreadMsgList.forEach(v => {
        UpdateMessageApi({
          invId: v.id,
          userName: this.user.userName,
          projectNo: v.projectNo,
          repeatStatus: this.repeatUnreadDialogOptions.autoInvestWay
        }).then(res => {
          if (res.data.resultCode !== '1') {
            this.investErrDialog.msg = res.data.resultMsg
            this.investErrDialog.show = true
          }
        })
      })
    },
    closeConfirmRepeat() {
      // 复投弹窗关闭时，插入一段cookie，以供同一天登陆时判断
      const key = `repeat-key-${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      Cookie.set(key, 'down', { expires: 1 })
    }
  },
  computed: {
    ...mapGetters(['user', 'userBasicInfo'])
  },
  created() {
    this.getUserCompleteInfo()
    userBasicInfo({
      userName: this.user.userName
    }).then(res => {
      this.setUserBasicInfo(res.data.data)
    })
  },
  mounted() {},
  destroyed() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'easyDetail' || from.name === 'optionalDetail') {
        vm.beforeRouterPath = from.fullPath
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixins';
@import '../assets/css/theme';

.mine-wrapper {
  width: 1140px;
  height: 100%;
  margin: 30px auto 50px auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .wrapper {
    flex: 1;
    width: 842px;
    margin-left: 20px;
  }
  .open-sign-btn {
    display: block;
    margin: 30px auto 0;
    padding: 10px 130px;
    background-color: #09a0f9;
    border-color: #09a0f9;
    color: #fff;
    font-size: 16px;
  }
}

.repeat-unread-dialog {
  /deep/ .inner {
    padding: 40px 30px;
  }
  .board {
    background: #f3f2f2;
    padding: 16px 20px;
    font-size: 18px;
    color: #5b5b5b;
    line-height: 26px;
    text-align: center;
  }
}

.auto-invest-way-wrap {
  margin-top: 30px;
  .auto-invest-way1 {
    width: 200px;
    margin: 0 auto 12px;
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
  margin: 20px auto 0;
  text-align: center;
  font-size: $font-size-small-s;
  color: #2d85ed;
  text-decoration: underline;
}
</style>
