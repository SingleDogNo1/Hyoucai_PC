<template>
  <div class="box">
    <div class="modify">
      <span class="modify_name">修改昵称</span>
      <input class="modify_ipt" type="text" placeholder="请输入昵称" v-model="nikename">
    </div>
    <div class="btn">
      <button class="determine" @click="modifyNikename">确定</button>
      <button class="cancle" @click="isShow.isShow1=!isShow.isShow1">取消</button>
    </div>
  </div>
</template>
<script>
import { modifyNikename } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'Name',
  data() {
    return {
      nikename: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  props: ['isShow'],
  methods: {
    modifyNikename: function() {
      this.isShow.isShow1 = !this.isShow.isShow1
      let obj = {}
      obj.nikename = this.nikename
      obj.userName = this.user.userName
      // obj.uuid
      modifyNikename(obj).then(res => {
        console.log(res)
      })
    }
  },
  created() {
    this.modifyNikename()
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
    margin-left: 193px;
    font-family: PingFangSC-Regular;
    .modify_name {
      font-size: $font-size-small;
      font-weight: 400;
      color: rgba(90, 90, 90, 1);
      line-height: 16px;
    }
    .modify_ipt {
      width: 280px;
      height: 40px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(218, 218, 218, 1);
      margin-left: 12px;
      padding-left: 12px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 16px;
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
