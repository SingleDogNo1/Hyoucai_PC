<template>
  <div class="charge">
    <div class="inner">
      <el-tabs type="border-card">
        <el-tab-pane label="快捷充值">
          <div>
            <ul class="top">
              <li>
                <dl>
                  <dt>{{ balance }}</dt>
                  <dd>可用余额(元)</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>{{ chargedBalance }}</dt>
                  <dd>充值后余额(元)</dd>
                </dl>
              </li>
            </ul>
            <ul class="bottom">
              <li>
                <span class="title">充值金额</span>
                <div class="info-wrapper">
                  <input type="text" placeholder="请输入充值金额" /> <em class="unit">元</em> <i class="tips">(100元起充)</i>
                </div>
              </li>
              <li><span class="title">&emsp;&emsp;姓名</span> <span class="text">王**</span></li>
              <li><span class="title">银行卡号</span> <input type="text" placeholder="请输入银行卡号" /></li>
              <li>
                <span class="title">开户银行</span> <span class="text"> 招商银行 <i class="high-light">单笔限额5万，单日限额10万</i> </span>
              </li>
              <li><span class="title">&emsp;手机号</span> <input type="text" placeholder="请输入手机号" /></li>
              <li><span class="title">&emsp;&emsp;&emsp;&emsp;</span> <input type="button" value="确认充值" /></li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="转账充值">
          <div class="transfer-charge">
            <div class="left">
              <div class="charge-phone"><img src="./image/charge-phone.png" /></div>
            </div>
            <div class="right">
              <img src="./image/unionpay.png" />
              <div class="des">您可以使用您的银行卡，通过线下跨行转账（柜台、网银、手机银行）方式将资金充值到您的江西银行电子账户。</div>
              <ul class="items">
                <li>
                  <dl>
                    <dt>您收款方户名:</dt>
                    <dd>杨阳</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>收款方账号:</dt>
                    <dd>6212 4611 4000 0276 031 <span class="copy_num" :data-clipboard-text="6212461140000276031">复制</span></dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>收款银行:</dt>
                    <dd>江西银行</dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt>收款方开户行:</dt>
                    <dd>江西银行股份有限公司南昌铁路支行营业部</dd>
                  </dl>
                </li>
              </ul>
              <p>温馨提示：</p>
              <p>1、充值过程中收取的转账费用，以银行规定为准，汇有财不收取任何手续费用；</p>
              <p>2、如资金未到账，请联系汇有财客服：<a href="javascript:;">400-78-96266</a></p>
              <div class="last-tip">充值两小时后请到“账户总览”页面点击资金同步按钮进行资金同步。</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'

let clipboard = new Clipboard('.copy_num')
clipboard.on('success', function() {
  console.log('复制成功')
})
export default {
  name: 'charge',
  mixins: [],
  components: {},
  data() {
    return {
      text: '充值',
      amount: '',
      smsCode: '',
      mobile: '',
      isValid: true,
      balance: 0.0,
      chargedBalance: 0.0,
      bankCardInfo: {
        accountId: '',
        area: '',
        bankNo: '',
        cardNo: '',
        city: '',
        fullName: '',
        mobile: '',
        openBankCode: '',
        openBankName: '',
        province: '',
        quota: '',
        strikeAmount: '',
        userName: ''
      }
    }
  },
  methods: {
    checkAmount() {}
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';
.charge {
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  .inner {
    float: right;
    width: 840px;
    height: 100%;
    background-color: #fff;
    /deep/ .el-tabs--border-card {
      height: 100%;
      box-shadow: none;
      border-color: #f5f5f5;
      > .el-tabs__header {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        border-color: rgba(229, 229, 229, 1);
        .el-tabs__item {
          height: 60px;
          line-height: 58px;
          padding: 0 40px;
          color: $color-text-s;
          font-size: $font-size-small-s;
          border-top: 2px solid transparent;
          &.is-active {
            border-top: 2px solid $color-tab-selected;
            color: $color-tab-selected;
          }
        }
      }
      > .el-tabs__content {
        .top {
          padding: 60px 0 80px 0;
          overflow: hidden;
          li {
            float: left;
            width: 50%;
            text-align: center;
            dl {
              dt {
                margin-bottom: 12px;
                font-weight: 600;
                color: #fc5541;
                font-size: $font-size-large-x;
              }
              dd {
                color: $color-text;
                font-size: $font-size-medium;
              }
            }
          }
        }
        .bottom {
          li {
            box-sizing: border-box;
            margin-bottom: 22px;
            /*text-align: center;*/
            padding-left: 22.5%;
            .title {
              display: inline-block;
              vertical-align: top;
              margin: 10px 10px 0 0;
              font-size: $font-size-small-s;
              color: $color-text;
            }
            .info-wrapper {
              box-sizing: border-box;
              position: relative;
              display: inline-block;
              vertical-align: top;
            }
            input {
              box-sizing: border-box;
              display: inline-block;
              vertical-align: top;
              width: 284px;
              height: 40px;
              line-height: 40px;
              padding-left: 15px;
              border-radius: 2px;
              border: 1px solid rgba(205, 205, 205, 1);
            }
            .text {
              display: inline-block;
              width: 284px;
              text-align: left;
              line-height: 40px;
              color: $color-text;
              font-size: $font-size-small-ss;
              .high-light {
                color: #fc5541;
              }
            }
            .tips {
              position: absolute;
              top: 12px;
              right: -100px;
              font-size: $font-size-small-ss;
              color: rgba(155, 155, 155, 1);
            }
            .unit {
              position: absolute;
              top: 10px;
              right: -25px;
              color: $color-text;
            }
            &:last-child {
              margin-top: 50px;
              input {
                color: #fff;
                font-size: $font-size-medium;
                background: rgba(250, 96, 12, 1);
                border: 0;
                border-radius: 4px;
                cursor: pointer;
              }
            }
          }
        }
        .transfer-charge {
          margin-top: 65px;
          padding-bottom: 87px;
          overflow: hidden;
          .left {
            float: left;
            width: 281px;
            margin-left: 30px;
            img {
              width: 100%;
            }
          }
          .right {
            float: right;
            width: 422px;
            margin-right: 29px;
            img {
              display: block;
              width: 91px;
              margin: 26px auto 41px;
            }
            .des {
              margin-bottom: 43px;
              line-height: 21px;
              font-size: $font-size-small-s;
              color: rgba(155, 155, 155, 1);
            }
            .items {
              margin-bottom: 30px;
              li {
                line-height: 26px;
                color: $color-button;
                &:last-child {
                  margin-bottom: 0;
                }
                dl {
                  margin-bottom: 0.16rem;
                  overflow: hidden;
                  font-size: 0;
                  &:last-child {
                    margin-bottom: 0;
                  }
                  dt,
                  dd {
                    display: inline-block;
                    font-size: $font-size-small-s;
                  }
                  dt {
                    margin-right: 8px;
                  }
                  dd {
                    .copy_num {
                      display: inline-block;
                      width: 50px;
                      height: 24px;
                      line-height: 24px;
                      text-align: center;
                      margin-left: 10px;
                      background-color: #fb891f;
                      color: #fff;
                      border-radius: 3px;
                      font-size: $font-size-small-ss;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
            > p {
              margin-bottom: 8px;
              font-size: $font-size-small-s;
              color: $color-text-s;
              a {
                color: $color-button;
              }
            }
            .last-tip {
              margin-top: 30px;
              font-size: $font-size-small-s;
              color: rgba(252, 85, 65, 1);
            }
          }
        }
      }
    }
  }
}
</style>
