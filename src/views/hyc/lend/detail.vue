<template>
  <div class="lend-detail">
    <section class="production-info">
      <div class="title">
        <h2>
          <img src="./image/icon_hui.png">
          <span>汇选（6个月）1620190117</span>
        </h2>
      </div>
      <div class="content">
        <div class="decs-wrap">
          <div class="item">
            <p class="value">
              <strong>5.5</strong>
              <span class="red">%</span>
            </p>
            <p class="desc">预期年化收益率</p>
          </div>
          <div class="item">
            <p class="value">
              <span>100,000,000</span>
            </p>
            <p class="desc">剩余可投(元)</p>
          </div>
          <div class="item">
            <p class="value">
              <span>22</span>
              <span>人</span>
            </p>
            <p class="desc">已购人数</p>
          </div>
        </div>
        <div class="progress-wrap">
          <span class="title">项目进度</span>
          <el-progress :percentage="63.56"></el-progress>
          <span class="score">63.56%</span>
        </div>
      </div>
      <div class="tips">
        <div class="method">
          <span class="title">计息方式：</span>
          <span>等额本息</span>
        </div>
        <div class="countdown">
          <span class="title">募集倒计时：</span>
          <span class="large">6天</span>
          <span>18:40:49</span>
        </div>
      </div>
      <div class="invest-module">
        <h2></h2>
      </div>
    </section>
    <section class="tab-wrap">
      <el-tabs
        class="lend-detail-tab"
        v-model="lendDetailActiveName"
        type="border-card"
        @tab-click="handleItemClick()"
      >
        <el-tab-pane label="出借详情" name="CJXQ">
          <div v-if="lendDetailActiveName === 'CJXQ'" class="content">
            <p
              class="desc"
            >投资月月盈即可享受30天优惠收益，预期年化净收益率达7%。 加入当日生息，30天到期后本息自动转入账户余额，届时投资人可自主选择按本息复投或本金复投模式继续投资，坐享收益。</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加入记录" name="JRJL">
          <div v-if="lendDetailActiveName === 'JRJL'" class="content"></div>
        </el-tab-pane>
        <el-tab-pane label="项目组成" name="XMZC">
          <div v-if="lendDetailActiveName === 'XMZC'" class="content"></div>
        </el-tab-pane>
        <el-tab-pane label="风险告知书" name="FXGZS">
          <div v-if="lendDetailActiveName === 'FXGZS'" class="content"></div>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lendDetailActiveName: 'CJXQ'
    }
  },
  methods: {
    handleItemClick() {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
.lend-detail {
  padding-top: 30px;
  .production-info {
    position: relative;
    width: 1138px;
    margin: 0 auto;
    border: 1px solid #e5e5e5;
    background: #fff;
    .title {
      border-bottom: 1px solid #e5e5e5;
      line-height: 58px;
      background: #fff;
      h2 {
        font-size: $font-size-medium;
        color: $color-text;
        text-indent: 20px;
        box-shadow: inset 0 3px 0 0 #fb9d1f;
        img {
          margin-right: 10px;
          vertical-align: middle;
          height: 22px;
          width: 22px;
        }
      }
    }
    .content {
      padding: 62px 55px 52px 55px;
      .decs-wrap {
        width: 542px;
        display: flex;
        justify-content: space-between;
        .item {
          margin-right: 104px;
          .value {
            margin-top: 14px;
            height: 22px;
            line-height: 22px;
            font-size: $font-size-large;
            color: $color-text;
            margin-bottom: 14px;
            text-align: center;
            strong {
              font-size: 42px;
              color: #fc5541;
              font-weight: 500;
            }
            span {
              color: $color-text;
            }
            span.red {
              color: #fc5541;
            }
          }
          .desc {
            font-size: $font-size-small-s;
            color: $color-text-s;
            text-align: center;
          }
          &:nth-child(1) {
            .value {
              margin-top: 0;
              height: 36px;
              line-height: 36px;
              text-align: left;
            }
            .desc {
              text-align: left;
            }
          }
          &:nth-child(3) {
            margin-right: 0;
          }
        }
      }
      .progress-wrap {
        width: 446px;
        display: flex;
        margin-top: 70px;
        .title {
          display: inline-block;
          height: 24px;
          line-height: 24px;
          font-size: $font-size-small-s;
          color: $color-text-s;
          border-bottom: 0;
          margin-right: 10px;
        }
        /deep/ .el-progress {
          width: 298px;
          line-height: 20px;
          /deep/ .el-progress-bar__outer {
            height: 6px !important;
            border-radius: 100px;
            background-color: #fdc48d;
          }
          /deep/ .el-progress-bar__inner {
            border-radius: 100px;
            background-color: #fb891f;
          }
          /deep/ .el-progress__text {
            display: none;
          }
        }
        .score {
          display: inline-block;
          margin-left: -44px;
          width: 64px;
          height: 24px;
          line-height: 24px;
          background: url('./image/score_bk.png') center center no-repeat;
          font-size: $font-size-small-s;
          color: #fff;
          text-align: right;
          padding-right: 8px;
        }
      }
    }
    .tips {
      padding: 15px 50px;
      border-top: 1px solid #e5e5e5;
      display: flex;
      .method,
      .countdown {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        font-size: $font-size-small-s;
        color: $color-text;
        margin-right: 120px;
        .title {
          height: 20px;
          line-height: 20px;
          color: $color-text-s;
          border-bottom: 0;
        }
        .large {
          font-size: $font-size-medium;
        }
      }
    }
    .invest-module {
      position: absolute;
      top: 3px;
      right: 0;
      height: calc(100% - 3px);
      width: 300px;
      background: #fff;
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
    }
  }
  .tab-wrap {
    width: 1138px;
    margin: 0 auto;
    margin-top: 20px;
    background: #fff;
    /deep/ .el-tabs__item {
      border-top: 4px solid transparent;
      height: 49px;
      line-height: 40px;
      font-size: $font-size-small-s;
      color: $color-text-s;
      &.is-active {
        border-top: 4px solid #ffb01a;
        color: #fb891f;
      }
    }
    .content {
      padding: 15px;
      .desc {
        font-size: $font-size-small-s;
        color: $color-text-s;
      }
    }
  }
}
</style>

