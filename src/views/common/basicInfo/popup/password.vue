<template>
  <div class="box">
    <div class="modify">
      <span class="modify_name">修改登录密码</span>
      <div class="modify_ipt_box">
        <input class="modify_ipt" type="text" placeholder="请输入旧密码" v-model="oldPwd">
        <input class="modify_ipt" type="text" placeholder="请输入新密码" v-model="newPwd">
        <input
          class="modify_ipt"
          type="text"
          placeholder="请输入确认密码"
          @blur="isIdentical"
          v-model="newPwd2"
        >
        <!-- 两次输入密码不同时的提示信息-->
        <span class="tips" v-show="flag">新密码两次输入不一致</span>
        <!-- <PasswordStrength :pwd="newPwd" class="pwd_strength"/> -->
      </div>
    </div>
    <div class="btn">
      <button class="determine" @click="updateUserPsw">确定</button>
      <button class="cancle" @click="isShow.isShow2=!isShow.isShow2">取消</button>
    </div>
  </div>
</template>
<script>
// import PasswordStrength from '@/components/passwordStrength'
import { updateUserPsw } from '@/api/common/basicInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'Password',
  data() {
    return {
      oldPwd: '',
      newPwd: '',
      newPwd2: '',
      flag: false
    }
  },
  props: ['isShow'],
  components: {
    // PasswordStrength
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    isIdentical: function() {
      if (this.newPwd != this.newPwd2) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    updateUserPsw: function() {
      this.isShow.isShow2 = !this.isShow.isShow2
      let obj = {}
      obj.userName = this.user.userName
      obj.oldPassWord = this.oldPwd
      obj.newPassWord = this.newPwd
      updateUserPsw(obj).then(() => {
        // console.log(res)
      })
    }
  },
  created() {
    this.updateUserPsw()
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
      line-height: 16px;
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
        font-size: 16px;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 16px;
        margin-bottom: 15px;
      }
      .tips {
        color: red;
        font-size: $font-size-small-s;
      }
      //   .pwd_strength{
      //     position: absolute;
      //     right: 0;
      //   }
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
