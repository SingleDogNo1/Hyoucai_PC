<template>
  <div class="content-box">
    <div class="content">
      <header>
        <span>借款流水号：318011121021XX</span>
        <i class="el-icon-circle-close-outline cancel"></i>
      </header>
      <section>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">个人消费</span>
        </p>
        <div class="personal">
          <p class="investment">
            <span class="top">100.00</span>
            <span class="bottom">投资金额(元)</span>
          </p>
          <p class="schedule">
            <span class="top">1/3</span>
            <span class="bottom">还款进度</span>
          </p>
          <p class="way">
            <span class="top">等额本息</span>
            <span class="bottom">还款方式</span>
          </p>
          <p class="status">
            <span class="top">正常还款</span>
            <span class="bottom">还款状态</span>
          </p>
          <p class="interest-rate">
            <span class="top">10.0%</span>
            <span class="bottom">借款人约定的借款利率</span>
          </p>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">贷款信息</span>
        </p>
        <div class="situation">
          <div class="situation-div situation-left">
            <p>
              <span class="left">流水号：</span>
              <span class="right">318011121021XX</span>
            </p>
            <p>
              <span class="left">募表起始日期：</span>
              <span class="right">2018.11.12</span>
            </p>
          </div>
          <div class="situation-div situation-center">
            <p>
              <span class="left">贷款期限：</span>
              <span class="right">0个月</span>
            </p>
          </div>
          <div class="situation-div situation-right">
            <p>
              <span class="left">还款方式：</span>
              <span class="right">等额本息</span>
            </p>
          </div>
        </div>
        <p class="title">
          <span class="title-boder"></span>
          <span class="title-text">借款人信息</span>
        </p>
        <div class="borrower">
          <div class="borrower-div borrower-left">
            <p>
              <span class="left">借款人姓名：</span>
              <span class="right">陈**</span>
            </p>
          </div>
          <div class="borrower-div borrower-center">
            <p>
              <span class="left">性别：</span>
              <span class="right">男</span>
            </p>
          </div>
          <div class="borrower-div borrower-right">
            <p>
              <span class="left">年龄：</span>
              <span class="right">22岁</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanDetail',
  data() {
    return {
      flag: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
.content-box {
  padding: 120px 200px 110px;
  background: rgba(227, 227, 227, 1);
  .content {
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    border: 1px solid rgba(229, 229, 229, 1);
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: $font-size-small;
    min-width: 1100px;
    header {
      height: 61px;
      line-height: 61px;
      background: rgba(255, 255, 255, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      color: rgba(0, 131, 254, 1);
      padding-left: 30px;
      position: relative;
      .cancel {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 29px;
        height: 29px;
        border-radius: 50%;
        cursor: pointer;
        color: #4a4a4a;
        font-size: 32px;
      }
    }
    section {
      padding-top: 24px;
      padding-left: 50px;
      .title {
        .title-boder {
          display: inline-block;
          width: 6px;
          height: 16px;
          background: rgba(251, 157, 31, 1);
          vertical-align: middle;
        }
        .title-text {
          display: inline-block;
          font-size: 16px;
          color: rgba(74, 74, 74, 1);
          line-height: 22px;
          margin-left: 5px;
          vertical-align: middle;
        }
      }
      .personal {
        margin: 21px 0 60px;
        display: flex;
        .top {
          display: block;
          font-size: $font-size-medium;
          color: rgba(250, 96, 12, 1);
          line-height: $font-size-medium;
        }
        .bottom {
          display: block;
          margin-top: 6px;
          font-size: $font-size-small-ss;
          color: rgba(155, 155, 155, 1);
          line-height: $font-size-small-ss;
        }
        .investment,
        .schedule,
        .way {
          width: 132px;
        }
        .schedule {
          margin: 0 108px 0 14px;
          text-align: center;
        }
        .way {
          text-align: center;
        }
        .status {
          width: 100px;
          margin: 0 161px 0 121px;
          text-align: center;
        }
        .interest-rate {
          width: 123px;
          text-align: center;
        }
      }
      .situation {
        margin: 20px 0 60px;
        display: flex;
        font-size: $font-size-small-s;
        .situation-left {
          width: 182px;
          height: 60px;
        }
        .situation-div {
          color: rgba(155, 155, 155, 1);
          line-height: 30px;
          .right {
            color: rgba(74, 74, 74, 1);
          }
        }
        .situation-center {
          margin: 0 183px 0 184px;
        }
      }
      .borrower {
        margin: 23px 0 59px;
        display: flex;
        font-size: $font-size-small-s;
        .borrower-left {
          width: 113px;
          height: 30px;
        }
        .borrower-div {
          color: rgba(155, 155, 155, 1);
          line-height: 30px;
          .right {
            color: rgba(74, 74, 74, 1);
          }
        }
        .borrower-center {
          margin: 0 234px 0 233px;
        }
      }
    }
  }
}
</style>
