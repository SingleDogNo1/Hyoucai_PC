<template>
  <div>
    <!-- 主体部分开始 -->
    <div class="user_reg">
      <div class="user_reg_second">
        <div class="formBox" id="second">
          <h1>开通银行存管电子账户</h1>
          <div class="open_pic">
            <ul class="pic">
              <li></li>
              <li><img height="45.6" width="45.6" src="./deposit.png"/></li>
              <li></li>
            </ul>
            <ul class="pic">
              <li></li>
              <li><img height="45.6" width="45.6" src="./auth.png"/></li>
              <li></li>
            </ul>
            <ul class="words">
              <li><h2>开通银行存款</h2></li>
            </ul>
            <ul class="words">
              <li><h2>业务授权</h2></li>
            </ul>
          </div>
          <div class="confirm_info">
            <p>签订协议后就可以投资了~</p>
          </div>
          <div class="form-data">
            <dl>
              <dt><i :class="checkAgree ? 'icon-check' : 'icon-choose'" class="iconfont" @click="checkAgree=!checkAgree"></i></dt>
              <dd>
                我已阅读<a href="javascript:;" class="agre_find">《业务授权协议》</a>
              </dd>
            </dl>
            <button type="submit" :class="!checkAgree ? 'disabled' : ''" :disabled="!checkAgree" id="submit" @click="clickNext">立即授权</button>
          </div>

        </div>
      </div>
      <div id="openAccount"></div>
    </div>
  </div>
</template>

<style  scoped lang="scss">
input:disabled {
  background-color: rgb(235, 235, 228);
}
.form-data {
  width: 284px;
  margin: 0 auto;
}
/*登录注册页面公共样式*/
.user_reg {
  width: 1140px;
  margin: 60px auto;
  background-color: #ffffff;
  border: 1px solid #e3e3e3;
  overflow: hidden;
  form {
    display: none;
  }

  .user_reg_second {
    height: 670px;
  }

  .formBox {
    width: 331px;
    padding-bottom: 20px;
    position: relative;
    margin: 0 auto;
    h1 {
      padding: 40px 0 52.7px;
      font-size: 20px;
      color: #4a4a4a;
      line-height: 20px;
      text-align: center;
      font-weight: bold;
    }

    .open_pic {
      height: 70px;
      width: 331px;
      margin-bottom: 50px;
      ul {
        display: inline-block;
        width: 49%;
        &.pic {
          height: 41px;
          li {
            float: left;
          }
        }
      }

      ul:nth-of-type(1) li:nth-of-type(1) {
        background-image: linear-gradient(90deg, rgba(0, 185, 255, 0) 6%, #0083fe 100%);
        height: 2px;
        width: 61.5px;
        margin: 25px 5px 0 0;
      }

      ul:nth-of-type(1) li:nth-of-type(3) {
        background: #0083fe;
        height: 2px;
        width: 39.5px;
        margin: 25px 0 0 5px;
      }

      ul:nth-of-type(2) li:nth-of-type(1) {
        opacity: 0.3;
        background: #0083fe;
        height: 2px;
        width: 39.5px;
        margin: 25px 5px 0 0;
      }

      ul:nth-of-type(2) li:nth-of-type(3) {
        opacity: 0.3;
        background-image: linear-gradient(-90deg, rgba(0, 185, 255, 0) 6%, #0083fe 100%);
        height: 2px;
        width: 61.5px;
        margin: 25px 0 0 5px;
      }

      ul:nth-of-type(2) li img {
        opacity: 0.5;
      }

      ul.words {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        margin-top: 14px;
      }

      ul:nth-of-type(3) li {
        padding-left: 19px;
      }

      ul:nth-of-type(4) li {
        padding-right: 19px;
      }

      ul:nth-of-type(3) {
        color: #4a4a4a;
      }

      ul:nth-of-type(4) {
        color: #9b9b9b;
      }

      ul.words li h2 {
        font-size: 14px;
        font-weight: 400;
        text-align: center;
      }
    }

    .confirm_info {
      width: 200px;
      height: 36px;
      margin: 0 auto;
      margin-top: 123px;
      background: #f1f1f7;
      p {
        width: 168px;
        height: 20px;
        padding: 8px 16px;
        font-size: 14px;
        color: #9b9b9b;
      }
    }

    input {
      border: 1px solid #cdcdcd;
      outline: none;
      border-radius: 4px;
      height: 16px;
      padding: 10px;
      font-size: 14px;
      width: 262px;
      text-indent: 42px;
      &:focus {
        border: 1px solid #fab645;
      }
    }

    p,
    .sex {
      display: block;
      margin-bottom: 10px;
      position: relative;
    }

    p > i {
      position: absolute;
      left: 8px;
      top: 10px;
      font-size: 18px;
      color: #cecece;
      border-right: 1px solid #cecece;
      height: 23px;
      width: 26px;
    }

    .sex .sexInput {
      i {
        position: absolute;
        font-size: 18px;
        color: #cecece;
        height: 23px;
        width: 26px;
      }
      .icon-sex {
        left: 8px;
        top: 10px;
        border-right: 1px solid #cecece;
      }
      .icon-xiala {
        right: 8px;
        top: 10px;
        border: 0;
      }
    }

    p.text {
      font-size: 12px;
      margin-bottom: 10px;
    }

    .sex {
      position: relative;
    }

    .sexDlg {
      display: none;
      position: absolute;
      top: 37px;
      width: 284px;
      height: 40px;
      line-height: 40px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0 -3px 6px 0 rgba(0, 0, 0, 0.17);
      border-radius: 2px;
      z-index: 9999;

      a {
        font-size: 14px;
        color: #9b9b9b;
        &.man {
          padding: 0 30px 0 12px;
        }
        &:hover {
          color: #fb891f;
        }
      }
    }

    p .userBank-find {
      position: absolute;
      right: -24px;
      top: 12px;
      font-size: 20px;
      color: #fab645;
    }

    h3 {
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #e84518;
      background: #ffe5e5;
      color: #e84518;
      border-radius: 5px;
      font-size: 12px;
    }

    h3.on {
      display: block;
    }

    button {
      margin-bottom: 10px;
      background: #fb891f;
      border-radius: 4px;
      width: 284px;
      line-height: 38px;
      font-size: 18px;
      color: #fff;
      border: none;
      outline: none;
      cursor: pointer;
      transition: background, 0.5s;
    }

    button.disabled {
      background: #fb891f;
      opacity: 0.6;
    }

    .open_tip {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0;
      line-height: 18px;
      margin-top: 20px;
    }

    .mobileCode input {
      text-indent: 0px;
    }

    .mobileCode a {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 118px;
      line-height: 38px;
      font-size: 14px;
      color: #fab645;
      text-align: center;
    }

    .mobileCode a.disabled {
      color: #b1b1b1;
    }

    .mobileCode a .codeBorder {
      font-size: 12px;
      font-family: arial;
      border-left: 1px solid #cdcdcd;
      padding-left: 10px;
    }

    dl {
      display: block;
      height: 44px;
      text-align: center;
      margin-left: 48px;
      margin-top: 90px;
    }

    dl dt {
      overflow: hidden;
      float: left;
      width: 15px;
    }

    dl dt i {
      padding-right: 5px;
      cursor: pointer;
      color: #0083fe;
      font-size: 15px;
    }

    dl dt i.icon-weixuan {
      color: #b1b1b1;
      font-size: 24px;
    }

    dl dt i.icon-danxuan {
      font-size: 24px;
    }

    dl dd {
      float: left;
      width: 90%;
      color: #4a4a4a;
      font-size: 14px;
      text-align: left;
      padding-left: 8px;
    }

    dl a {
      color: #099ef5;
    }
  }
}

.account_service {
  width: 100%;
  margin: 0px auto;
  height: 448px;
  h3 {
    margin: 20px 0 20px 20px;
    color: #000;
    font-weight: 600;
    font-size: 15px;
  }
  p {
    margin: 20px 0 20px 20px;
  }
  h4 {
    color: #000;
    font-weight: 600;
    font-size: 16px;
  }
}

#support-bank {
  line-height: 1;
  margin: 10px 0;
  font-size: 12px;
  text-align: right;
  cursor: pointer;
  color: #9b9b9b;
}

#support-bank em {
  color: #fb891f;
  font-size: 12px;
}

.isBlock {
  display: block !important;
  z-index: 999;
}
.userSupportBank_icon ul {
  width: 100%;
  &::after {
    content: ' ';
    display: block;
    clear: both;
  }
  li {
    width: 23%;
    float: left;
    display: block;
    padding-left: 10px;
    padding-bottom: 30px;
    img {
      width: 38px;
      vertical-align: top;
    }
    h2 {
      width: 112px;
      display: inline-block;
      padding-left: 8px;
      text-align: left;
      margin-top: -3px;
      line-height: 18px;
    }
    strong {
      font-size: 16px;
      color: #4a4a4a;
      font-weight: normal;
    }
    span {
      font-size: 12px;
      color: #4a4a4a;
    }
  }
}

.userSupportBank {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  overflow: hidden;
  transition: all 0.3s;
  background: rgba(0, 0, 0, 0.4);
}

.userSupportBank.on {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}

.userSupportBank_in {
  width: 768px;
  height: 478px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  margin: auto;
  box-shadow: 0 1px 20px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ececec;
  border-radius: 8px;
  background: #fff;
}

.userSupportBank_in .closeBox {
  display: block;
  width: 50px;
  height: 50px;
  position: absolute;
  top: -8px;
  left: 95%;
}

.userSupportBank_in .closeBox i {
  display: block;
  width: 50px;
  text-align: center;
  line-height: 50px;
  color: #4a4a4a;
  font-size: 16px;
  cursor: pointer;
  transform: rotate(0deg);
  transition: all 0.3s;
}

.userSupportBank_in .closeBox i:hover {
  transform: rotate(360deg);
}

.userAuthority {
  z-index: 999;
  position: fixed;
  width: 100%;
  height: 600px;
  top: 8%;
  left: 0%;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.3s;
}

.userAuthority .userAuthority_in {
  width: 1138px;
  background-color: #fff;
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  margin: auto;
}

.userAuthority .userAuthority_in .hd {
  height: 52px;
  position: relative;
}

.userAuthority .userAuthority_in .hd ul {
  width: 100%;
  float: left;
  border-right: 1px solid #eee;
  background: #f8f8f8;
  color: #000;
  font-weight: bold;
}

.userAuthority .userAuthority_in .hd ul li {
  float: left;
  width: 100%;
  text-align: center;
  line-height: 52px;
  cursor: pointer;
  font-size: 16px;
}

.userAuthority .userAuthority_in .hd ul li.on {
  background: #fff;
  border-top: 4px solid #ffb01a;
  color: #000;
  font-weight: bold;
}

.userAuthority .userAuthority_in .hd ul li:hover {
  color: #333;
}

.userAuthority .userAuthority_in .bd {
  min-height: 458px;
  padding: 30px;
  overflow-y: scroll;
}

.userAuthority .userAuthority_in .ready_xieyi {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  bottom: 0px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 2px 2px 20px 5px rgba(120, 120, 120, 0.3);
  cursor: pointer;
}

.userAuthority .userAuthority_in .ready_xieyi a {
  width: 120px;
  display: block;
  text-align: center;
  background: #ffb01a;
  color: #fff;
  line-height: 30px;
  border-radius: 4px;
  margin: 6px auto;
}

.userAuthority .account_service {
  width: 100%;
  margin: 0px auto;
  height: 448px;
}

.userAuthority .account_service h3 {
  margin: 20px 0 20px 20px;
  color: #000;
  font-weight: 600;
  font-size: 15px;
}

.userAuthority .account_service p {
  margin: 20px 0 20px 20px;
}

.userAuthority .account_service h4 {
  color: #000;
  font-weight: 600;
  font-size: 16px;
}

/deep/ .el-dialog--center .el-dialog__body {
  padding-right: 0 !important;
}

/deep/ .el-dialog__headerbtn .el-dialog__close {
  color: #4a4a4a !important;
}
</style>

<script type="text/javascript">
import { bidToSign } from '@/api/sign/bidToSign'
export default {
  components: {},
  data() {
    return {
      checkAgree: false
    }
  },
  computed: {},
  mounted() {},
  methods: {
    bidToSign: function() {
      let data = {
        retUrl: location.href,
        smsCode: '',
        forgotPwdUrl: '',
        mobile: ''
      }
      bidToSign(data).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          console.log(res)
        } else {
          console.log(data.resultMsg)
        }
      })
    },
    clickNext: function() {
      this.bidToSign()
    }
  },
  watch: {}
}
</script>
