<template>
  <div class="wrap">
    <div class="box">
      <div class="modify">
        <span class="modify_name">修改绑定手机号</span>
        <div class="modify_ipt_box">
          <input class="modify_ipt" type="number" placeholder="请输入手机号" v-model="mobile">
          <input class="modify_ipt" type="number" placeholder="请输入验证码" v-model="verifyCode">
          <span class="code" @click="getMobileSendCode" v-if="!showCountDown">获取验证码</span>
          <span class="code" v-if="showCountDown">{{countDown}}s</span>
          <p class="txt">{{txt}}</p>
        </div>
      </div>
      <div class="btn">
        <button class="determine" @click="modifyBindMobile">立即绑定</button>
        <button class="cancle" @click="isShow.isShow3 = !isShow.isShow3">取消</button>
      </div>
    </div>
    <errDialog :show.sync="showDialog" :singleButton="singleButton" class="djs-charge-dialog">
      <div>{{ errMsg.common }}</div>
    </errDialog>
  </div>
</template>
<script>
import { modifyBindMobile, modifyBindMobileSendCode } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
import errDialog from '@/components/Dialog/Dialog'
export default {
  name: 'Phone',
  data() {
    return {
      mobile: '',
      showCountDown: false,
      timeInterval: null,
      countDown: 90,
      showDialog: false,
      singleButton: true,
      errMsg: {
        common: ''
      },
      verifyCode: '',
      txt: ''
    }
  },
  components: {
    errDialog
  },
  props: ['isShow', 'oldMobile'],
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    modifyBindMobile: function() {
      if (this.mobile) {
        if (this.verifyCode) {
          this.txt = ''
          this.isShow.isShow3 = !this.isShow.isShow3
          let obj = {}
          obj.mobile = this.mobile
          obj.userName = this.user.userName
          obj.verifyCode = this.verifyCode
          obj.oldMobile = this.oldMobile
          modifyBindMobile(obj)
        } else {
          this.txt = '验证码不能为空'
        }
      } else {
        this.txt = '手机号不能为空'
      }
    },
    getMobileSendCode: function() {
      this.showCountDown = true
      let data = {}
      data.mobile = this.mobile
      data.userName = this.user.userName
      if (this.timeInterval) {
        clearInterval(this.timeInterval)
      }
      this.timeInterval = setInterval(() => {
        this.countDown--
        if (this.countDown <= 0) {
          this.showCountDown = false
          this.countDown = 90
          clearInterval(this.timeInterval)
        }
      }, 1000)
      modifyBindMobileSendCode(data).then(res => {
        this.showDialog = true
        if (res.data.resultMsg === 'SUCCESS') {
          this.errMsg.common = '验证码发送成功！'
        } else {
          this.errMsg.common = res.data.resultMsg
          this.countDown = 0
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
.wrap {
  position: relative;
  .box {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 1);
    border-radius: 4px;
    border: 1px solid rgba(235, 235, 235, 1);
    padding: 40px 0 41px;
    .modify {
      margin-left: 161px;
      font-family: PingFangSC-Regular;
      display: flex;
      .modify_name {
        font-size: $font-size-small;
        font-weight: 400;
        color: rgba(90, 90, 90, 1);
        line-height: $font-size-small;
        height: 40px;
        line-height: 40px;
      }
      .modify_ipt_box {
        margin-left: 12px;
        width: 294px;
        position: relative;
        .modify_ipt {
          width: 280px;
          height: 40px;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(218, 218, 218, 1);
          padding-left: 12px;
          font-size: $font-size-small;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          line-height: 16px;
          margin-bottom: 15px;
        }
        .txt {
          color: red;
          font-size: $font-size-small-s;
        }
        .code {
          display: inline-block;
          width: 96px;
          height: $font-size-medium;
          line-height: $font-size-medium;
          text-align: center;
          border-left: 1px solid rgba(218, 218, 218, 1);
          font-size: $font-size-small-s;
          font-weight: 400;
          color: rgba(0, 131, 254, 1);
          position: absolute;
          right: 10px;
          top: 68px;
          cursor: pointer;
        }
      }
    }
    .btn {
      margin-left: 196px;
      padding-top: 40px;
      button {
        display: inline-block;
        width: 160px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        border-radius: 4px;
        font-size: $font-size-medium;
        font-weight: 400;
        cursor: pointer;
      }
      .determine {
        background: rgba(251, 123, 31, 1);
        color: rgba(255, 255, 255, 1);
      }
      .cancle {
        margin-left: 30px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 235, 235, 1);
        box-shadow: 0px 4px 8px 0px rgba(205, 205, 205, 1);
        color: rgba(251, 123, 31, 1);
      }
    }
  }
  .djs-charge-dialog {
    display: block;
    z-index: 1;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    div {
      text-align: center;
    }
  }
}
</style>
