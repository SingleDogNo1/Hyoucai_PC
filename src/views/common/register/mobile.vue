<template>
  <div class="container">
    <div class="form-container">
      <div class="form">
        <h1>新用户注册</h1>
        <div class=""></div>
        <button></button>
        <p>同意<span>《汇有财注册协议》</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobile'
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/theme.scss';
.container {
  min-width: 1140px;
  width: 100%;
  height: 500px;
  /*background: url('./mobile_bg.png') center center;*/
  .form-container {
    width: 1140px;
    height: 100%;
    margin: 0 auto;
    padding: 35px 0;
    .form {
      width: 380px;
      height: 430px;
      border-radius: 6px;
      margin: 0 0 0 auto;
      background: #fff;
    }
  }
}
</style>
