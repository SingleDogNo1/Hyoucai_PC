<template>
  <div class="form">
    <div class="form-item">
      <i class="iconfont icon-user"></i> <input type="tel" v-model="userName" placeholder="请输入手机号" maxlength="11" />
    </div>
    <div class="form-item">
      <i class="iconfont icon-password"></i> <input type="password" v-model="passWord" placeholder="请输入密码" @keydown.enter="doLogin" />
    </div>
    <el-button type="primary" disabled>下一步</el-button>
    <div class="tips">
      <p>温馨提示：</p>
      <p> 1.请保持姓名和身份证号一致;</p>
      <p> 2.请勿使用过期证件。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'realNameAuth'
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
    border-radius: 2px;
    &:focus {
      border-color: #fb7b1f;
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
</style>
