<template>
  <div class="content">
    <p class="title">设置自动出借，省心赚钱</p>
    <p class="success">
      <span class="success-span">您有2笔出借即将到期，设置自动出借加息1%， 到期出借生效</span>
    </p>
    <el-radio-group v-model="radio" class="radio">
      <el-radio :label="1">本金到期后自动出借</el-radio>
      <el-radio :label="2">本息到期后自动出借</el-radio>
    </el-radio-group>
    <p class="agreement">《自动出借协议》</p>
    <div class="btn">
      <button class="confirm">确定</button>
      <button class="cancel">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: 1
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/theme';
.content {
  width: 500px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 10px 0px rgba(205, 205, 205, 1);
  border-radius: 6px;
  border: 1px solid rgba(227, 227, 227, 1);
  padding-top: 32px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  .title {
    width: 264px;
    height: 33px;
    font-size: $font-size-large-x;
    color: rgba(74, 74, 74, 1);
    line-height: 33px;
    margin: 0 auto;
  }
  .success {
    width: 430px;
    height: 80px;
    background: rgba(243, 242, 242, 1);
    margin: 30px auto;
    .success-span {
      display: inline-block;
      width: 378px;
      height: 48px;
      font-size: $font-size-medium;
      color: rgba(91, 91, 91, 1);
      line-height: 24px;
      margin: 16px 0 0 20px;
    }
  }
  /deep/ .radio {
    display: block;
    width: 173px;
    height: 70px;
    line-height: 35px;
    text-align: center;
    margin: 0 auto;
    .el-radio + .el-radio {
      margin-left: 0;
    }
    .el-radio__label {
      font-size: $font-size-medium;
      color: rgba(155, 155, 155, 1);
    }
    .el-radio__inner {
      width: 20px;
      height: 20px;
      border: 1px solid rgba(205, 205, 205, 1);
    }
    .el-radio__inner::after {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      border: 1px solid rgba(205, 205, 205, 1);
    }
    .is-checked {
      .el-radio__inner {
        border: 1px solid rgba(251, 123, 31, 1);
        background: #fff;
      }
      .el-radio__inner::after {
        background: rgba(251, 123, 31, 1);
        border: 1px solid rgba(251, 123, 31, 1);
      }
      .el-radio__label {
        font-size: $font-size-medium;
        color: rgba(74, 74, 74, 1);
      }
    }
  }
  .agreement {
    width: 112px;
    font-size: $font-size-small-s;
    color: rgba(45, 133, 237, 1);
    line-height: $font-size-small-s;
    margin: 7px auto 20px;
    border-bottom: 1px solid rgba(45, 133, 237, 1);
  }
  .btn {
    width: 350px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin: 32px auto 40px;
    .confirm {
      width: 160px;
      height: 44px;
      line-height: 44px;
      background: rgba(251, 123, 31, 1);
      border-radius: 4px;
      font-size: $font-size-medium;
      color: rgba(255, 255, 255, 1);
      text-align: center;
    }
    .cancel {
      width: 160px;
      height: 44px;
      line-height: 44px;
      border: 1px solid rgba(251, 137, 31, 1);
      background: #fff;
      border-radius: 4px;
      font-size: $font-size-medium;
      color: rgba(251, 123, 31, 1);
      text-align: center;
    }
  }
}
</style>
