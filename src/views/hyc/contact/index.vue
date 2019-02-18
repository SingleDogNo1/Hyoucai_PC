<template>
  <div class="contact">
    <h1>联系我们</h1>
    <ul>
      <li><i></i> <span class="value">地址：江西省南昌市红谷滩新区红谷中大道1669号华尔登商业中心办公写字楼31层</span></li>
      <li><i></i> <span class="value">咨询、投诉、举报联系电话：400-099-7979</span></li>
      <li><i></i> <span class="value">联系时间：工作日 09:00 - 12:00 13:00 - 18:00</span></li>
      <li><i></i> <span class="value">咨询、投诉、举报电子邮箱：cs@idjshi.com</span></li>
    </ul>
    <p class="tips">如果您在使用汇有财的过程中有任何疑问，请您与汇有财客服人员联系。</p>
    <img class="bg-contact" src="./images/bg_contact.png" />
    <div class="download-wrap">
      <p>如果您还希望了解更多关于汇有财动态信息，请下载或关注我们的APP或微信。</p>
      <div class="qrcode-wrap">
        <div class="qrcode1">
          <img src="./images/bg_qrocde1.png" />
          <p>微信公众号</p>
        </div>
        <div class="qrcode2">
          <img src="./images/bg_qrocde2.png" />
          <p>APP下载</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.contact {
  width: 1140px;
  margin: 30px auto;
  background: #fff;
  padding: 70px 214px;
  h1 {
    font-size: $font-size-large-xxx;
    font-weight: 400;
    color: $color-text;
  }
  ul {
    margin-top: 40px;
    li {
      display: flex;
      width: 100%;
      height: 40px;
      margin-bottom: 22px;
      i {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 19px;
      }
      .value {
        height: 40px;
        line-height: 40px;
        display: inline-block;
        font-size: $font-size-small;
        color: $color-text;
      }
      &:nth-child(1) {
        i {
          background: url('./images/icon_position.png') center center no-repeat;
          background-size: cover;
        }
      }
      &:nth-child(2) {
        i {
          background: url('./images/icon_tel.png') center center no-repeat;
          background-size: cover;
        }
      }
      &:nth-child(3) {
        i {
          background: url('./images/icon_calendar.png') center center no-repeat;
          background-size: cover;
        }
      }
      &:nth-child(4) {
        i {
          background: url('./images/icon_email.png') center center no-repeat;
          background-size: cover;
        }
      }
    }
  }
  .tips {
    font-size: 15px;
    color: $color-text-s;
  }
  .bg-contact {
    margin-top: 40px;
    margin-bottom: 33px;
  }
  .download-wrap {
    width: 712px;
    border: 1px solid #d9d9d9;
    padding: 35px 74px;
    font-size: $font-size-small;
    color: $color-text;
    text-align: center;
    .qrcode-wrap {
      margin: 0 auto;
      margin-top: 33px;
      .qrcode1 {
        width: 110px;
        height: 111px;
        display: inline-block;
        margin-right: 80px;
        p {
          margin-top: 18px;
          color: $color-text-s;
        }
      }
      .qrcode2 {
        width: 110px;
        height: 111px;
        display: inline-block;
        p {
          margin-top: 18px;
          color: $color-text-s;
        }
      }
    }
  }
}
</style>
