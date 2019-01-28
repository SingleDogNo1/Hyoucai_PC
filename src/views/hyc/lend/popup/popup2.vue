<template>
  <div class="content">
    <p class="title">设置自动出借，省心赚钱</p>
    <p class="lend">
      <span class="lend-txt">您已成功出借XXXXYYY.YY元</span>
      <button class="lend-btn">查看我的出借>></button>
    </p>
    <el-radio-group v-model="radio">
      <el-radio :label="1">本金到期后自动出借</el-radio>
      <el-radio :label="2">本息到期后自动出借</el-radio>
    </el-radio-group>
    <a class="agreement">《自动出借协议》</a>
    <p
      class="txt"
    >在本金自动出借模式下，每月产品到期时，系统自动将利息转入用户汇有财账户，本金继续出借。用户可在【我的账户】-【自动出借】界面取消，如有任何疑问，请联系客服：400-099-7979。</p>
    <p class="btn">
      <button class="determine">确定</button>
      <button class="cancel">取消</button>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Popup',
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
  height: 470px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 10px 0px rgba(205, 205, 205, 1);
  border-radius: 6px;
  border: 1px solid rgba(227, 227, 227, 1);
  font-family: PingFangSC-Regular;
  font-weight: 400;
  .title {
    width: 264px;
    height: 33px;
    font-size: $font-size-large-x;
    color: rgba(74, 74, 74, 1);
    line-height: 33px;
    margin: 32px auto 30px;
  }
  .lend {
    width: 430px;
    height: 70px;
    line-height: 70px;
    background: rgba(243, 242, 242, 1);
    margin: 0 auto;
    position: relative;
    .lend-txt {
      display: inline-block;
      width: 237px;
      height: 25px;
      font-size: 18px;
      color: rgba(155, 155, 155, 1);
      line-height: 25px;
      margin-left: 15px;
    }
    .lend-btn {
      display: inline-block;
      height: 20px;
      font-size: $font-size-small-s;
      color: rgba(251, 139, 31, 1);
      line-height: 20px;
      position: absolute;
      background: rgba(243, 242, 242, 1);
      right: 12px;
      top: 25px;
    }
  }
  /deep/ .el-radio-group {
    display: block;
    width: 173px;
    height: 70px;
    color: rgba(74, 74, 74, 1);
    line-height: 35px;
    margin: 30px auto 7px;
    /deep/ .el-radio + .el-radio {
      margin-left: 0;
    }
    .el-radio {
      color: rgba(155, 155, 155, 1);
    }
    /deep/ .el-radio__label {
      font-size: $font-size-medium;
    }
    /deep/ .el-radio__inner {
      width: 20px;
      height: 20px;
      border: 1px solid #cdcdcd;
    }
    /deep/ .el-radio__inner::after {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      border: 1px solid #cdcdcd;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: rgba(74, 74, 74, 1);
    }
    .is-checked {
      /deep/ .el-radio__inner {
        background: #fff;
        border: 1px solid rgba(251, 123, 31, 1);
      }
      .el-radio__inner::after {
        background: rgba(251, 123, 31, 1);
        border: 1px solid rgba(251, 123, 31, 1);
      }
    }
  }
  .agreement {
    display: block;
    width: 112px;
    height: $font-size-small-s;
    font-size: $font-size-small-s;
    color: rgba(45, 133, 237, 1);
    line-height: $font-size-small-s;
    margin: 0 auto;
    border-bottom: 1px solid rgba(45, 133, 237, 1);
  }
  .txt {
    width: 429px;
    height: 59px;
    font-size: $font-size-small-ss;
    color: rgba(155, 155, 155, 1);
    line-height: 17px;
    margin: 20px auto 21px;
  }
  .btn {
    width: 350px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto 40px;
    button {
      width: 160px;
      height: 44px;
      line-height: 44px;
      border-radius: 4px;
      text-align: center;
      font-size: $font-size-medium;
    }
    .determine {
      background: rgba(251, 123, 31, 1);
      color: rgba(255, 255, 255, 1);
    }
    .cancel {
      color: rgba(251, 123, 31, 1);
      background: #fff;
      border: 1px solid rgba(251, 137, 31, 1);
    }
  }
}
</style>
