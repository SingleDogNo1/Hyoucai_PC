<template>
  <div class="charge">
    <div class="inner">
      <el-tabs type="border-card">
        <el-tab-pane label="快捷充值">
          <div>
            <ul class="top">
              <li>
                <dl>
                  <dt>{{balance}}</dt>
                  <dd>可用余额(元)</dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt>{{chargedBalance}}</dt>
                  <dd>充值后余额(元)</dd>
                </dl>
              </li>
            </ul>
            <ul class="bottom">
              <li>
                <span class="title">充值金额</span>
                <div class="info-wrapper">
                  <input type="text" placeholder="请输入充值金额" />
                  <em class="unit">元</em>
                  <i class="tips">(100元起充)</i>
                </div>
              </li>
              <li>
                <span class="title">&emsp;&emsp;姓名</span>
                <span class="text">王**</span>
              </li>
              <li>
                <span class="title">银行卡号</span>
                <input type="text" placeholder="请输入银行卡号" />
              </li>
              <li>
                <span class="title">开户银行</span>
                <span class="text">
                  招商银行
                  <i class="high-light">单笔限额5万，单日限额10万</i>
                </span>
              </li>
              <li>
                <span class="title">&emsp;手机号</span>
                <input type="text" placeholder="请输入手机号" />
              </li>
              <li>
                <span class="title">&emsp;&emsp;&emsp;&emsp;</span>
                <input type="button" value="确认充值" />
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="转账充值">转账充值</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
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
  margin: 0 auto 30px;
  overflow: hidden;
  .inner {
    width: 840px;
    float: right;
    background-color: #fff;
    /deep/ .el-tabs--border-card {
      box-shadow: none;
      > .el-tabs__header {
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        border-color: #e3e3e3;
        .el-tabs__item {
          height: 60px;
          line-height: 60px;
          color: $color-text-s;
          font-size: $font-size-small-s;
          &.is-active {
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
      }
    }
  }
}
</style>
