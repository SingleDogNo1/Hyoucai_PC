<template>
  <div class="borrow">
    <img src="./banner.png" alt class="banner">
    <div class="block advantage">
      <h3>我们的优势</h3>
      <ul>
        <li>
          <div class="logo"></div>
          <p>轻松注册</p>
          <span>一键注册，即可申请</span>
        </li>
        <li>
          <div class="logo"></div>
          <p>申请便捷</p>
          <span>流程简单，操作方便</span>
        </li>
        <li>
          <div class="logo"></div>
          <p>闪电放款</p>
          <span>最快2小时到账</span>
        </li>
      </ul>
    </div>
    <div class="intro-wrap">
      <div class="block intro">
        <h3>借款产品</h3>
        <div class="detail">
          <div class="left">
            <img alt src="./qianbaik_ico.png">
          </div>
          <div class="right">
            <div class="title">
              <span>仟佰快</span>
              <button>分期还款</button>
            </div>
            <div>
              <p>贷款对象：</p>
              <span>有消费需求的客户</span>
            </div>
            <div>
              <p>贷款条件：</p>
              <span>年龄在25到36岁，有固定收入或经济偿还能力的完全民事行为能力的自然人（大学生除外）</span>
            </div>
            <div class="operable">
              <p>贷款额度：</p>
              <em>{{ amount }}</em>
              <span>元</span>
              <button :class="['add', { disable: isMax }]" @click="addAmount"></button>
              <button :class="['del', { disable: isMin }]" @click="delAmount"></button>
            </div>
            <div>
              <p>借款期限：</p>
              <span>3个月</span>
              <p style="margin-left: 70px;">贷款服务费率：</p>
              <span>8%</span>
            </div>
            <div>
              <p>借款年化：</p>
              <span>10%</span>
              <p style="margin-left: 78px">每月应还本息：</p>
              <span>{{ repayAmt }}元</span>
            </div>
            <div>
              <p>每月应还服务费：</p>
              <span>{{ serviceAmt }}元</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Borrow',
  data() {
    return {
      amount: 2000,
      isMin: false,
      isMax: false,
      minAmount: 500,
      maxAmount: 10000
    }
  },
  watch: {
    amount: function(val) {
      if (val <= this.minAmount) {
        this.amount = this.minAmount
        this.isMin = true
        this.isMax = false
      } else if (val >= this.maxAmount) {
        this.amount = this.maxAmount
        this.isMax = true
        this.isMin = false
      } else {
        this.isMax = false
        this.isMin = false
      }
    }
  },
  computed: {
    repayAmt: function() {
      var rate = 0.1 / 12
      return ((this.amount * rate * Math.pow(1 + rate, 3)) / (Math.pow(1 + rate, 3) - 1)).toFixed(2)
    },
    serviceAmt: function() {
      var rate1 = 0.18 / 12,
        rate2 = 0.1 / 12
      return (
        (this.amount * rate1 * Math.pow(1 + rate1, 3)) / (Math.pow(1 + rate1, 3) - 1) -
        (this.amount * rate2 * Math.pow(1 + rate2, 3)) / (Math.pow(1 + rate2, 3) - 1)
      ).toFixed(2)
    }
  },
  methods: {
    addAmount: function() {
      this.amount += 100
    },
    delAmount: function() {
      this.amount -= 100
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.borrow {
  background: #fff;
  .banner {
    font-size: 0;
    width: 100%;
  }
  .block {
    width: 1140px;
    margin: 0 auto;
    h3 {
      width: 140px;
      margin: 0 auto 60px;
      font-size: 28px;
      color: $color-text-b;
      text-align: center;
      line-height: 44px;
      border-bottom: 2px solid $color-theme;
    }
  }
  .advantage {
    padding-top: 60px;
    margin-bottom: 130px;
    ul {
      display: flex;
      justify-content: space-between;
      li {
        text-align: center;
        .logo {
          @include cube(155px, 120px);
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          margin-bottom: 40px;
        }
        &:nth-child(1) .logo {
          background-image: url('./advantage1.png');
        }
        &:nth-child(2) .logo {
          background-image: url('./advantage2.png');
        }
        &:nth-child(3) .logo {
          background-image: url('./advantage3.png');
        }
        p {
          font-size: $font-size-small;
        }
        span {
          font-size: $font-size-small-s;
        }
      }
    }
  }
  .intro-wrap {
    background: #fafafa;
    .intro {
      padding-top: 45px;
      padding-bottom: 45px;
      h3 {
        margin-bottom: 40px;
      }
      .detail {
        display: flex;
        .left {
          margin-right: 40px;
        }
        .right {
          .title {
            font-size: $font-size-large-xxx;
            color: $color-text;
            margin-bottom: 15px;
            button {
              box-sizing: border-box;
              width: 90px;
              height: 30px;
              border-radius: 6px;
              border: 1px solid $color-theme;
              transform: translateY(-4px);
              margin-left: 10px;
              background: transparent;
              color: $color-theme;
            }
          }
          p {
            display: inline-block;
            color: $color-text-s;
          }
          span {
            color: $color-text;
          }
          .operable {
            display: flex;
            align-items: center;
            em {
              display: inline-block;
              font-weight: normal;
              width: 70px;
              height: 28px;
              text-align: center;
              line-height: 28px;
              background: #fff;
              border-radius: 4px;
              border: 1px solid #cdcdcd;
            }
            span {
              margin: 0 7px;
              font-size: $font-size-small-ss;
              color: $color-text-s;
            }
            button {
              @include square(28px);
              background: #000;
              margin-right: 12px;
              background-size: contain;
              &.add {
                background-image: url('./add.png');
              }
              &.add.disable {
                background-image: url('./add-disable.png');
              }
              &.del {
                background-image: url('./del.png');
              }
              &.del.disable {
                background-image: url('./del-disable.png');
              }
            }
          }
        }
      }
    }
  }
}
</style>
