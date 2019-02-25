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
    <Certification v-if="accountStatus !== 'COMPLETE'" reg-flow-to="risk"> <span></span> </Certification>
  </div>
</template>

<script>
import userMenu from '@/components/UserMenu/UserMenu'
import { mapGetters, mapMutations } from 'vuex'
import { userBasicInfo } from '@/api/common/login'
import Dialog from '@/components/Dialog/Dialog'
import Certification from '@/components/CertificationFlow/CertificationFlow'
import api from '@/api/common/userIndex'

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
      openSignText: ''
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
      api.alertInfoAcceptApi({ type: 'evaluate' }).then(res => {
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
          params: {
            type: this.routerParam
          }
        })
      }
    },
    async getAlertInfo() {
      await api.getAlertInfo().then(res => {
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
                  this.routerLink = 'lend'
                  this.routerParam = ''
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
      await function() {
        console.log(`getAlertInfo two`)
      }
    },
    getUserCompleteInfo() {
      api.getUserCompleteInfo().then(res => {
        let data = res.data
        let list = data.data
        if (data.resultCode === CODE_OK) {
          this.showTitle = false
          this.showCloseBtn = true
          this.showLogo = true
          this.showFooter = false
          this.showDialog = true
          this.accountStatus = list.status
          switch (this.accountStatus) {
            case 'OPEN_ACCOUNT':
              this.openSignText = '开通存管账户'
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
              this.getAlertInfo()
          }
          this.dialogDis = list.message
        }
      })
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
  destroyed() {}
}
</script>

<style lang="scss" scoped>
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
</style>
