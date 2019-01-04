<template>
	<div class="dl-container">
        <div class="dl-content">
            <p class="logo-name">汇有财APP</p>
            <p class="logo-des">唯有赚钱不能停</p>
            <p class="qr-code"></p>
            <span class="dl-btn ios" href="javasctipt:void()">苹果版APP下载</span>
            <span class="dl-btn android" href="javasctipt:void()">安卓版APP下载</span>
            <div class="dl-banner"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import '../../../assets/css/theme.scss';
.dl-container {
  min-width: 1140px;
  width: 100%;
  height: 550px;
  background: url('./bg.png') center center;

  .dl-content {
    width: 1140px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    color: #fff;
    .logo-name {
      position: absolute;
      top: 85px;
      left: 0;
      width: 238px;
      height: 48px;
      font-size: 48px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
    .logo-des {
      position: absolute;
      top: 157px;
      left: 0;
      width: 420px;
      height: 60px;
      font-size: 60px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
    }
    .qr-code {
      width: 204px;
      height: 204px;
      position: absolute;
      top: 260px;
      left: 0px;
      background: url(./code.png) center center;
    }
    span.dl-btn {
      width: 225px;
      height: 70px;
      border-radius: 50px;
      border: 2px solid #fff;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #fff;
      line-height: 70px;
      padding-left: 75px;
      display: block;
      left: 238px;

      &.ios {
        position: absolute;
        top: 274px;
        background-size: 30px 41px;
        background: url(./ios.png) 31px center no-repeat;
      }

      &.android {
        position: absolute;
        top: 384px;
        background: url(./android.png) 28px center no-repeat;
        background-size: 35px 40px;
      }
    }
    .dl-banner {
      width: 387px;
      height: 497px;
      background: url(./banner.png) top right;
      position: absolute;
      top: 52px;
      right: 0;
    }
  }
}
</style>
