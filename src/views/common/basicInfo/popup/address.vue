<template>
  <div class="wrap">
    <div class="box">
      <div class="modify">
        <span class="modify_name">收货地址</span>
        <div class="modify_ipt_box">
          <input class="modify_ipt" type="text" placeholder="请输入收件人姓名" v-model="consigneeName">
          <input class="modify_ipt" type="text" placeholder="请输入收件人电话" v-model="consigneePhone">
          <input class="modify_ipt" type="text" placeholder="请输入收件人地址" v-model="address">
          <p class="txt">{{txt}}</p>
        </div>
      </div>
      <div class="btn">
        <button class="determine" @click="saveMailingAddress">保存</button>
        <button class="cancle" @click="close">取消</button>
      </div>
    </div>
    <errDialog :show.sync="showDialog" :singleButton="singleButton" class="djs-charge-dialog" :onClose="close">
      <div>{{ errMsg.common }}</div>
    </errDialog>
  </div>
</template>
<script>
import { saveMailingAddress } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
import errDialog from '@/components/Dialog/Dialog'
import { isMobile } from '@/assets/js/regular'
export default {
  name: 'Address',
  data() {
    return {
      consigneeName: '',
      consigneePhone: '',
      address: '',
      showDialog: false,
      singleButton: true,
      txt: '',
      errMsg: {
        common: ''
      }
    }
  },
  props: ['isShow', 'getMailingAddress'],
  computed: {
    ...mapGetters(['user'])
  },
  components: {
    errDialog
  },
  methods: {
    saveMailingAddress: function() {
      let obj = {}
      obj.consigneeName = this.consigneeName
      obj.consigneePhone = this.consigneePhone
      obj.address = this.address
      obj.userName = this.user.userName
      if (isMobile(this.consigneePhone)) {
        saveMailingAddress(obj).then(res => {
          if (res.data.resultCode === '1') {
            this.showDialog = true
            this.errMsg.common = res.data.resultMsg = '修改收货地址成功'
          } else {
            this.showDialog = true
            this.errMsg.common = res.data.resultMsg
          }
        })
      } else {
        this.txt = '请输入正确的手机号'
      }
    },
    close() {
      this.consigneeName = ''
      this.consigneePhone = ''
      this.address = ''
      this.txt = ''
      this.getMailingAddress()
      this.isShow.isShow4 = !this.isShow.isShow4
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
          margin-left: 80px;
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
