<template>
  <div class="referralCode">
    <div class="referral-code-wrap">
      <div class="my-referral-code">
        <img :src="qrCodeUrl">
        <div class="desc">
          <p class="title">我的推荐码</p>
          <p class="content">{{ referralCode }}</p>
          <p class="copy-text" @click="btnCopy">
            复制邀请码链接
            <i class="iconfont icon-more"></i>
          </p>
        </div>
      </div>
      <p class="referral-man">
        <span>推荐人</span>
        <span class="referral-name" v-if="refereeName">{{ refereeName }}</span>
        <button class="btn-fill" v-if="!refereeName" @click="btnFill">补填</button>
      </p>
    </div>
    <div class="tips">
      <p class="my-referral-man">
        <span>我推荐的人</span>
        <span class="bold">{{ inviteNum }}位</span>
      </p>
      <p class="my-referral-man">
        <span>当前合计在投金额</span>
        <span class="bold">{{ totalInvestAmount }}元</span>
      </p>
    </div>
    <el-table :data="inviteUserList" border class="referral-table">
      <el-table-column prop="createTime" label="注册日期"></el-table-column>
      <el-table-column prop="name" label="推荐人姓名"></el-table-column>
      <el-table-column prop="investStatus" label="在投状态"></el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <pagination
        :count-page="total"
        :size-val="size"
        :page-val="page"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
    <Dialog
      :show.sync="isShowFillialog"
      title="填写推荐人邀请码"
      class="djs-fill-dialog"
      :onConfirm="saveInviteCode"
      :onClose="closeFillDialog"
      :preventClose="preventClose"
    >
      <div>
        <input
          v-model="fillInReferral"
          class="fill-in-referral-input"
          type="text"
          placeholder="请输入推荐人邀请码"
        >
      </div>
    </Dialog>
    <Dialog
      :show.sync="showCopyDialog"
      title="点金石温馨提示"
      :singleButton="singleButton"
      class="djs-copy-dialog"
    >
      <div>
        <p class="copy-dialog-text">已成功复制推荐好友链接，您可通过微信、短信、QQ等方式发送给好友！</p>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clipboard from 'clipboard'
import Pagination from '@/components/pagination/pagination'
import Dialog from '@/components/Dialog/Dialog'
import { saveInviteCode, qRCodeShare, userInviteInfo } from '@/api/djs/Mine/referralCode'
import { referralCodeReg } from '@/assets/js/utils'

export default {
  name: 'referralCode',
  mixins: [],
  components: {
    Pagination,
    Dialog
  },
  data() {
    return {
      msg: 'referralCode',
      referralCode: '',
      refereeName: '',
      page: 1,
      size: 10,
      total: 0,
      inviteUserList: [],
      isShowFillialog: false,
      showCopyDialog: false,
      fillInReferral: '',
      singleButton: true,
      userName: '',
      qrCodeUrl: '',
      isErrMsg: false,
      preventClose: true,
      copyUrl: '',
      inviteNum: '',
      totalInvestAmount: ''
    }
  },
  props: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getUserInviteInfo()
    },
    btnFill() {
      this.isShowFillialog = true
    },
    clear() {
      this.fillInReferral = ''
    },
    saveInviteCode() {
      if (!this.fillInReferral) {
        this.$message({ message: '推荐人邀请码不能为空', type: 'error' })
        return
      }
      if (!referralCodeReg(this.fillInReferral)) {
        this.$message({ message: '推荐人邀请码格式有误，请重新输入', type: 'error' })
        return
      }
      let postData = {
        inviteCode: this.fillInReferral
      }
      saveInviteCode(postData).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.$notify({ title: '成功', message: '推荐人邀请码填写成功', type: 'success', duration: 2000 })
        } else {
          this.$notify({ title: '失败', message: data.resultMsg, type: 'error', duration: 2000 })
        }
        this.clear()
      })
    },
    closeFillDialog() {
      this.clear()
    },
    btnCopy() {
      this.showCopyDialog = true
    },
    getUserInviteInfo() {
      let params = {
        userName: this.userName,
        curPage: this.page,
        maxLine: this.size
      }
      userInviteInfo(params).then(res => {
        let data = res.data
        this.inviteNum = data.inviteNum
        this.referralCode = data.myInviteCode
        this.refereeName = data.recommendName
        this.totalInvestAmount = data.totalInvestAmount
        this.inviteUserList = data.inviteUser
        this.inviteUserList.forEach(val => {
          val.investStatus = val.investStatus === 0 ? '未投资' : '已投资'
        })
        this.total = parseInt(data.countPage)
        this.page = parseInt(data.curPage)
      })
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      userBasicInfo: state => state.user.userBasicInfo
    })
  },
  created() {},
  mounted() {
    //this.referralCode = this.userBasicInfo.myInviteCode
    //this.refereeName = this.userBasicInfo.refereeName
    this.userName = this.user.userName
    let postData = {
      userName: this.userName
    }
    qRCodeShare(postData).then(res => {
      let data = res.data
      this.qrCodeUrl = data.qrCodeUrl
      this.copyUrl = data.url
      new Clipboard('.copy-text', {
        text: () => {
          return this.copyUrl
        }
      })
    })
    this.getUserInviteInfo()
  },
  watch: {
    fillInReferral: function(val) {
      this.preventClose = !val || !referralCodeReg(val) ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

.referralCode {
  background: #fff;
  height: 100%;
  border: 1px solid #e5e5e5;
  border-top: 2px solid $color-theme;
  padding: 0 30px;
  .referral-code-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    border-bottom: 1px solid #e3e3e3;
    .my-referral-code {
      width: 286px;
      display: flex;
      justify-content: space-between;
      //margin-top: 15px;
      img {
        display: block;
        width: 112px;
        height: 112px;
        margin-right: 40px;
      }
      .desc {
        margin-top: 15px;
        .title {
          font-size: $font-size-small;
          color: $color-text-s;
        }
        .content {
          margin-top: 6px;
          font-size: $font-size-medium;
          color: $color-text;
        }
        .copy-text {
          margin-top: 12px;
          font-size: $font-size-small;
          color: #5a5a5a;
          cursor: pointer;
        }
      }
    }
    .referral-man {
      height: 112px;
      line-height: 112px;
      span {
        font-size: $font-size-small;
        color: $color-text;
      }
      .referral-name {
        border: 1px solid #9b9b9b;
        font-size: $font-size-small-s;
        color: $color-text-s;
        padding: 0 4px;
        margin-left: 8px;
      }
      .btn-fill {
        padding: 4px 12px;
        background: #fb891f;
        font-size: $font-size-small-s;
        color: #fff;
        margin-left: 8px;
        border-radius: 2px;
        cursor: pointer;
      }
      .btn-fill:hover {
        background: lighten(#fb891f, 5%);
      }
    }
  }
  .tips {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .my-referral-man,
    .amount {
      span {
        font-size: $font-size-small;
        color: $color-text;
      }
      .bold {
        margin-left: 6px;
        font-weight: 600;
      }
    }
  }
  .referral-table {
    margin-top: 20px;
    /deep/ .cell {
      text-align: center;
    }
  }
  .djs-fill-dialog {
    .fill-in-referral-input {
      width: 350px;
      height: 40px;
      border: 1px solid rgba(218, 218, 218, 1);
      margin: 0 auto;
      padding-left: 12px;
      font-size: $font-size-medium;
      color: $color-text-s;
      &::-webkit-input-placeholder {
        color: $color-text-s;
      }
      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: $color-text-s;
      }
      &:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: $color-text-s;
      }
      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: $color-text-s;
      }
    }
  }
  .djs-copy-dialog {
    /deep/ .single {
      button.el-button--default {
        color: #fff;
        background-color: #fa600c;
        border-color: #fa600c;
      }
      .el-button--default:hover,
      .el-button--default:focus {
        background: #fb803d;
        border-color: #fb803d;
        color: #fff;
      }
    }
  }
}
</style>
