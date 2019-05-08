<template>
  <div class="form">
    <div class="form-item">
      <i class="iconfont icon-user"></i> <input type="text" v-model="form.realName" placeholder="请输入姓名" maxlength="11" />
    </div>
    <div class="form-item">
      <i class="iconfont icon-certificate"></i> <input type="text" v-model="form.identityNo" placeholder="请输入身份证号" maxlength="18" />
    </div>
    <div class="error-msg" v-if="error_msg">
      <span>{{ error_msg }}</span>
    </div>
    <el-button type="primary" :disabled="btnDisabled" @click="nextStep">下一步</el-button>
    <div class="tips">
      <p>温馨提示：</p>
      <p> 1.请保持姓名和身份证号一致;</p>
      <p> 2.请勿使用过期证件。</p>
    </div>
  </div>
</template>

<script>
import { realNameCertification } from '@/api/common/realNameAccount'
import { regular } from '@dpandora/dpandora-sdk'
export default {
  name: 'realNameAuth',
  data() {
    return {
      form: {
        realName: '',
        identityNo: '',
        identityType: 1
      },
      error_msg: ''
    }
  },
  computed: {
    btnDisabled() {
      return this.form.realName === '' || this.form.identityNo === ''
    }
  },
  methods: {
    nextStep() {
      if (!this.validateForm()) return false
      realNameCertification(this.form).then(res => {
        if (res.data.resultCode !== '1') {
          this.error_msg = res.data.resultMsg
        } else {
          this.error_msg = ''
          this.$router.push({ name: 'realNameBindCard', query: { from: this.$router.query.from } })
        }
      })
    },
    validateForm() {
      if (!regular.isChName(this.form.realName)) {
        this.error_msg = '请输入正确的姓名'
        return false
      }
      if (!regular.isIdcard(this.form.identityNo)) {
        this.error_msg = '请输入正确的身份证号'
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 284px;
  margin: 0 auto;
}
.form-item {
  width: 284px;
  height: 40px;
  background: rgba(255, 255, 255, 1);
  position: relative;
  margin: 15px auto;
  i {
    display: inline-block;
    position: absolute;
    top: 5px;
    width: 40px;
    border-right: 1px solid;
    border-image: linear-gradient(180deg, rgba(169, 169, 169, 0), rgba(226, 226, 226, 0.96), rgba(151, 151, 151, 0)) 1 1;
    font-size: 20px;
    color: #cecece;
    line-height: 30px;
    text-align: center;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 4px 0 4px 52px;
    border: 1px solid rgba(227, 227, 227, 1);
    border-radius: 4px;
    &:focus {
      border-color: #fb7b1f;
    }
    &::placeholder {
      color: #c0c4cc;
    }
  }
}
button {
  width: 284px;
  height: 42px;
  border-radius: 4px;
  margin: 30px auto;
  display: block;
  font-size: 18px;
  cursor: pointer;
}
.tips {
  margin: 32px auto 124px;
  p {
    font-size: 12px;
    color: rgba(155, 155, 155, 1);
    line-height: 18px;
  }
}
.error-msg {
  margin: 10px auto;
  width: 284px;
  padding: 10px;
  border: 1px solid #e84518;
  background: #ffe5e5;
  color: #e84518;
  border-radius: 5px;
  font-size: 12px;
  text-align: left;
}
</style>
