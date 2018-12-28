<template>
  <div class="detail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="网站公告" name="first"></el-tab-pane>
      <el-tab-pane label="行业资讯" name="second"></el-tab-pane>
      <el-tab-pane label="媒体报道" name="third"></el-tab-pane>
    </el-tabs>
    <!-- <div class="crumbs">
      <router-link :to="{ name: 'index'}" class="back-home">首页</router-link>&gt;
      <router-link :to="{ name: 'announcement'}" class="back-home">网站公告</router-link>&gt;
      <a>新闻中心</a>
    </div>-->
    <article class="detail-content">
      <div class="title-wrap">
        <h2>P2P行业不断利好，出借需求仍在增长中</h2>
        <p>
          <span class="origin">来源：汇通金融</span>
          <span class="click-count">点击量：10次</span>
          <span class="time">2018-12-03 16:44:37</span>
        </p>
      </div>
      <section>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >近期P2P行业不断出现好消息，行业向着合规方向稳步发展，目前已经有数百家平台上交自查报告，已有27家银行在互金协会披露存管数据，P2P网贷正式被纳入中国银保监会的管辖。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >也许还会有人对今年夏天的暴雷潮之后心有余悸，但你不得不承认P2P行业对部分出借人群的吸引力仍然很大，他们很有这方面的需求。尤其是在今年这个大环境下，货币基金回报率跌破3％，银行产品回报率跌破4.5％，而P2P的年回报率高达10％的确非常有吸引力。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >对于一部分出借者来说，P2P还是值得一试的，即使是曾经踩过雷的出借者，也无需谈P2P色变，更重要的是从中吸取教训，调整自己的出借策略，或是更加慎重地选择平台。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >
            <br style="margin: 0px; padding: 0px;">
          </span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >什么样的平台才是好平台？要怎么样调整自己的出借策略？</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >好的P2P平台是什么标准？是成交量大、知名度高、背景强大还是有银行存管？肯定不是单一的标准，应该综合考察平台的各项指标。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >如果刚刚接触P2P平台的出借者可以从短期开始。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >P2P平台上的标的分为多种期限，有短期也有中长期的。但是在备案结束之前，对于新手小白来说，还是建议选择短期标的。而且最好是支持灵活债权转让的产品，这样无论是个人原因，还是平台原因，想要随时提现会相对快捷。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >有很多出借者会觉得要分散资产选择平台，但切忌过于分散。出于风险控制，利用不同的平台、不同的回报、不同的产品去提升个人回报现在已经是老司机们的共识。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >&nbsp;</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: normal; max-width: 100%; box-sizing: border-box; clear: both; min-height: 1em; color: rgb(51, 51, 51); font-family: -apple-system-font, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif; font-size: 14px; letter-spacing: 1px; text-align: justify; widows: 1; background-color: rgb(255, 255, 255); line-height: 1.75em; word-wrap: break-word !important;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-size: 16px; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >无论大小平台，只要在备案行列，且有积极的备案行动，都能显出一个平台是否决定长久走下去的态度，有态度的平台才值得我们选择和关注。</span>
        </p>
        <p
          style="margin-top: 0px; margin-bottom: 0px; padding: 0px; cursor: default; color: rgb(102, 102, 102); font-family: 微软雅黑, arial, sans-serif; white-space: normal; background-color: rgb(255, 255, 255); line-height: 1.75em;"
        >
          <span
            style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box; font-family: 微软雅黑, &quot;Microsoft YaHei&quot;; word-wrap: break-word !important;"
          >
            <br style="margin: 0px; padding: 0px;">
          </span>
        </p>
        <p>
          <br>
        </p>
      </section>
      <!-- <div class="footer">
        <share :config="config"></share>
        <a class="back-list">返回列表&gt;&gt;</a>
      </div> -->
    </article>
    <div class="actions">
      <a href="#" class="btn-prev">
        <span class="action">&lt; 上一篇</span>
        <span class="title">央行：第二批P2P老赖信息纳入央行征信，第三批正在筛选</span>
      </a>
      <a href="#" class="btn-next">
        <span class="title">央行：第二批P2P老赖信息纳入央行征信，第三批正在筛选</span>
        <span class="action">下一篇 &gt;</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first',
      config: {}
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.detail {
  width: 1140px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  /deep/ .el-tabs__nav-wrap {
    .el-tabs__item {
      color: #5a5a5a;
      text-align: center;
    }
    .is-active {
      color: #fb891f;
    }
    .el-tabs__active-bar {
      background-color: #fb891f;
    }
    .el-tabs__active-bar {
      height: 1px;
    }
  }
  /deep/ .el-tabs__nav-wrap::after {
    display: none;
  }
  .crumbs {
    width: 100%;
    height: 54px;
    line-height: 54px;
    a {
      font-size: $font-size-small-s;
      color: #666666;
    }
    .back-home:hover {
      color: #fb891f;
    }
  }
  .detail-content {
    position: relative;
    display: block;
    border: 1px solid #ccc;
    border-top: 4px solid rgba(255, 176, 26, 1);
    padding: 10px 36px;
    .title-wrap {
      width: 100%;
      font-size: $font-size-small-s;
      height: 80px;
      font-style: normal;
      border-bottom: 1px solid #e3e3e3;
      h2 {
        width: 474px;
        margin: 0 auto;
        margin-top: 20px;
        font-size: $font-size-large-x;
        color: $color-text-gray;
        height: 24px;
        line-height: 24px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        width: 420px;
        height: 14px;
        line-height: 14px;
        margin: 0 auto;
        margin-top: 15px;
        text-align: center;
        font-size: $font-size-small-s;
        color: $color-text-s;
        span {
          display: inline-block;
          height: 100%;
        }
        .time,
        .click-count {
          margin-left: 40px;
        }
      }
    }
    section {
      margin-top: 30px;
    }
    .footer {
      margin-top: 65px;
      margin-bottom: 14px;
      width: 100%;
      height: 106px;
      overflow: hidden;
      position: relative;
      font-size: $font-size-small-s;
      .back-list {
        color: #e84518;
        position: absolute;
        right: 36px;
        bottom: 0;
      }
    }
  }
  .actions {
    display: flex;
    font-size: $font-size-small-s;
    overflow: hidden;
    height: 60px;
    line-height: 60px;
    border: 1px solid #ccc;
    border-top: none;
    padding: 0 30px;
    a {
      display: flex;
      width: 50%;
      height: 60px;
      color: $color-text-gray;
    }
    .btn-prev {
      text-align: left;
      .action {
        display: inline-block;
        width: 12%;
        height: 60px;
        margin-right: 1em;
        color: $color-text-s;
      }
      .title {
        display: inline-block;
        width: 80%;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .btn-next {
      text-align: right;
      .action {
        display: inline-block;
        width: 12%;
        height: 60px;
        margin-left: 1em;
        color: $color-text-s;
      }
      .title {
        display: inline-block;
        width: 85%;
        height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    a:hover {
      color: $color-text-hover;
      .action {
        color: $color-text-hover;
      }
    }
  }
}
</style>
