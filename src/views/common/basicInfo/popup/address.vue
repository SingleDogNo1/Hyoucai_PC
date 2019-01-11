<template>
  <div class="box">
    <div class="modify">
      <span class="modify_name">收货地址</span>
      <div class="modify_ipt_box">
        <input class="modify_ipt" type="text" placeholder="请输入收件人姓名" v-model="consigneeName" />
        <input class="modify_ipt" type="text" placeholder="请输入收件人电话" v-model="consigneePhone" />
        <input class="modify_ipt" type="text" placeholder="请输入收件人地址" v-model="address" />
      </div>
    </div>
    <div class="btn">
      <button class="determine" @click="saveMailingAddress">保存</button>
      <button class="cancle" @click="isShow.isShow4 = !isShow.isShow4">取消</button>
    </div>
  </div>
</template>
<script>
import { saveMailingAddress } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'Address',
  data() {
    return {
      consigneeName: '',
      consigneePhone: '',
      address: ''
    }
  },
  props: ['isShow'],
  computed: {
    ...mapGetters(['user'])
  },
  components: {},
  methods: {
    saveMailingAddress: function() {
      let obj = {}
      obj.consigneeName = this.consigneeName
      obj.consigneePhone = this.consigneePhone
      obj.address = this.address
      obj.userName = this.user.userName
      saveMailingAddress(obj)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
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
</style>
