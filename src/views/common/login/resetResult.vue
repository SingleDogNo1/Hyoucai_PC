<template>
  <div class="app-container">
    <div class="main">
      <div class="form-container">
      <h1>找回密码</h1>
      <img src="./success.png" alt="">
      <p>新密码设置成功，请重新登录！</p>
      <el-button type="primary" @click="$router.push({name: 'login'})">重新登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'resetResult'
}
</script>

<style scoped lang="scss">
.app-container {
  min-height: 528px;
  background: rgba(239, 239, 239, 1);
  padding: 30px 0 28px;
  .main {
    width: 1140px;
    margin: 0 auto;
    min-height: 470px;
    background: #fff;
    border: 1px solid rgba(227, 227, 227, 1);
    border-top: 3px solid #f7be39;
    .form-container {
      width: 287px;
      margin: 0 auto;
      text-align: center;
      padding-top: 30px;
      color: rgba(74, 74, 74, 1);
      h1 {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 40px;
      }
      img {
        margin-top: 100px;
        width: 66px;
        height: 66px;
      }
      p {
        font-size: 20px;
        margin-top: 27px;
      }
      button {
        margin-top: 50px;
        width: 284px;
        height: 42px;
        font-size: 18px;
      }
    }
  }
}
</style>
