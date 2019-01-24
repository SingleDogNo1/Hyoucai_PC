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
        <h2>
          <span class="status-title">出借中…</span>
          <button class="status-btn">开户</button>
        </h2>
        <div class="content">
          <p class="available-balance">
            <span class="title">可用余额</span>
            <span class="value">未开户</span>
          </p>
          <p class="starting-amount">
            <span class="title">起投金额</span>
            <span class="value">100.00元</span>
          </p>
          <p class="single-limit">
            <span class="title">单人限额</span>
            <span class="value">100,000.00元</span>
          </p>
          <div class="risk-notice">
            <el-checkbox v-model="isAgree">
              已阅读并同意
              <a href="#">《风险告知书》</a>
            </el-checkbox>
          </div>
          <div class="all-lending">
            <el-checkbox class="all-lending-checkbox" v-model="isAllLending">全部出借</el-checkbox>
          </div>
          <div class="action">
            <input class="amount-input">
            <button class="action-btn">立即开户</button>
          </div>
          <p class="expected-profits">
            <span class="title">预期收益：</span>
            <span class="value">0.00</span>
          </p>
        </div>
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
            <ul class="detail-list">
              <li>
                <p class="title">
                  <span>协议</span>
                </p>
                <a class="value" href="#">《点金石债权转让协议》（范本）</a>
              </li>
              <li>
                <p class="title">
                  <span>出借目标</span>
                </p>
                <span class="value">所有点金石的用户，寻求安全、灵活、稳定高收益的投资人。</span>
              </li>
              <li>
                <p class="title">
                  <span>锁定期</span>
                </p>
                <span class="value">90天</span>
              </li>
              <li>
                <p class="title">
                  <span>起息时间</span>
                </p>
                <span class="value">以所投标的实际起息时间为准。</span>
              </li>
              <li>
                <p class="title">
                  <span>利息分配</span>
                </p>
                <span class="value">单标复审成功计息，到期即可提现。</span>
              </li>
              <li>
                <p class="title">
                  <span>退出机制</span>
                </p>
                <span class="value">等额本息自动转入账户余额。</span>
              </li>
              <li>
                <p class="title">
                  <span>费用说明</span>
                </p>
                <span class="value">暂无任何手续费。</span>
              </li>
              <li>
                <p class="title">
                  <span>项目风险评估及可能产生的风险结果</span>
                </p>
                <span
                  class="value"
                >根据借款人当前情况进行评估，借款人具有偿还贷款的能力，但不排除未来借款人因收入下降、过度举债等因素导致财务状况恶化，从而发生逾期的可能。</span>
              </li>
              <li>
                <p class="title">
                  <span>出借人适当性管理提示</span>
                </p>
                <span class="value">1.该标的的每一个借款人在本平台借款余额未超过20万元，符合监管政策要求；
                  <br>2.出借人应根据自身的出借偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任，包括但不限于可能的本息损失。网贷有风险，出借需谨慎。
                </span>
              </li>
            </ul>
          </div>
        </el-tab-pane>
        <el-tab-pane label="加入记录" name="JRJL">
          <div v-if="lendDetailActiveName === 'JRJL'" class="content">
            <el-table
              :header-cell-style="{ background: '#f0f7ff'}"
              class="join-record-table"
              :data="joinRecordData"
              border
            >
              <el-table-column align="center" prop="mobile" label="出借人"></el-table-column>
              <el-table-column align="center" height="40" prop="invAmt" label="出借金额"></el-table-column>
              <el-table-column align="center" height="40" prop="invTime" label="出借时间"></el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <pagination
                :count-page="total"
                :size-val="size"
                :page-val="page"
                @handleCurrentChange="handleCurrentChange"
              ></pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="项目组成" name="XMZC">
          <div v-if="lendDetailActiveName === 'XMZC'" class="content">
            <el-table
              :header-cell-style="{ background: '#f0f7ff'}"
              class="project-composition-table"
              :data="projectCompositionData"
              border
            >
              <el-table-column align="center" prop="mobile" label="借款人" width="220"></el-table-column>
              <el-table-column align="center" height="40" prop="invAmt" label="借款金额(元)" width="214"></el-table-column>
              <el-table-column
                align="center"
                height="40"
                prop="invTime"
                label="历史平均年化收益率"
                width="232"
              ></el-table-column>
              <el-table-column align="center" height="40" prop="invTime" label="还款状态" width="205"></el-table-column>
              <el-table-column align="center" height="40" prop="invTime" label="项目详情" width="204">
                <template>
                  <a
                    href="javascript:void(0);"
                    class="view-detail"
                    @click="isProjectDetail=!isProjectDetail"
                  >详情</a>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-wrapper">
              <pagination
                :count-page="total"
                :size-val="size"
                :page-val="page"
                @handleCurrentChange="handleCurrentChange"
              ></pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="风险告知书" name="FXGZS">
          <div v-if="lendDetailActiveName === 'FXGZS'" class="content">
            <p>尊敬的出借人：</p>
            <p>恭喜您成为江西汇通金融信息服务有服公司运营的网络借贷平台—汇有财平台的用户。感谢您参与/出借本服务/出借标的，在您签署本《风险告知书》之前，请您认真、仔细阅读以下内容及本平台制定并发布的规则制度及其更新或修正的内容，本《风险告知书》经您确认，即视为您已详细了解并理解本风险告知书的全部内容，对其中揭示的风险均有足够的认识，您可在了解融资项目信贷风险后，根据您的金融产品出借经历、风险认知能力、风险识别能力和风险承受能力，自主选择将来源合法的自有资金通过汇有财平台进行资金出借。当您点击“出借”、“申请出借”、“立即出借”、“确认出借”、“同意协议”、“接受协议”或类似文字时，即视为您已经充...</p>
            <p class="view-more">
              <router-link target="_blank" :to="{ name: 'riskNoticationLetterAgreement'}">
                点击查看更多
                <i class="iconfont icon-more"></i>
              </router-link>
            </p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </section>
    <ProjectDetail @changeProjectDetail="changeProjectDetail" v-show="isProjectDetail"/>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import ProjectDetail from './projectDetail'
export default {
  data() {
    return {
      lendDetailActiveName: 'FXGZS',
      isAgree: true,
      isAllLending: true,
      isProjectDetail: false,
      page: 1,
      size: 10,
      total: 0,
      joinRecordData: [
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        },
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        },
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        },
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        }
      ],
      projectCompositionData: [
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        },
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        },
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        },
        {
          mobile: '186*****5668',
          invAmt: '10418.00',
          invTime: '2017-05-18 11:19:50'
        }
      ]
    }
  },
  components: {
    Pagination,
    ProjectDetail
  },
  methods: {
    handleItemClick() {},
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    changeProjectDetail() {
      this.isProjectDetail = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme';
.lend-detail {
  padding-top: 30px;
  position: relative;
  overflow: auto;
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
      h2 {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        justify-content: space-around;
        padding: 0 20px;
        .status-title {
          width: 80px;
          height: 55px;
          line-height: 52px;
          font-size: $font-size-medium-x;
          color: $color-text;
          margin-right: 120px;
        }
        .status-btn {
          width: 60px;
          height: 30px;
          line-height: 28px;
          background: #0083fe;
          font-size: $font-size-small;
          color: #fff;
          text-align: center;
          margin-top: 12px;
          border-radius: 4px;
          &:hover {
            background: lighten(#0083fe, 5%);
            cursor: pointer;
          }
        }
      }
      .content {
        padding: 17px 20px;
        .available-balance,
        .starting-amount,
        .single-limit {
          display: flex;
          width: 100%;
          height: 16px;
          line-height: 16px;
          margin-bottom: 17px;
          justify-content: space-around;
          font-size: $font-size-small;
          color: $color-text;
          .title {
            width: 64px;
            line-height: 16px;
            margin-right: 92px;
            color: $color-text-s;
            border: 0;
          }
          .value {
            width: 99px;
            line-height: 16px;
            text-align: right;
          }
        }
        .risk-notice {
          padding: 0 32px;
          font-size: $font-size-small-ss;
          padding-top: 10px;
          /deep/ .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              background-color: #4a90e2;
              border-color: #4a90e2;
            }
          }
          /deep/ .el-checkbox__input.is-focus {
            .el-checkbox__inner {
              border-color: #4a90e2;
            }
          }
          /deep/ .el-checkbox__label {
            color: $color-text-s;
            a {
              color: #4a90e2;
            }
          }
          .el-checkbox__input.is-focus .el-checkbox__inner /deep/ .el-checkbox__input.is-checked + .el-checkbox__label {
            color: $color-text-s;
          }
        }
        .all-lending {
          width: 100%;
          height: 16px;
          position: relative;
          margin-top: 20px;
          .all-lending-checkbox {
            position: absolute;
            top: 0;
            right: 0;
            /deep/ .el-checkbox__input,
            /deep/ .el-checkbox__input.is-focus {
              width: 14px;
              height: 14px;
              border-radius: 100%;
              /deep/ .el-checkbox__inner {
                border-radius: 100%;
                color: #fb891f;
                border: 1px solid #fb891f;
              }
            }
            /deep/ .el-checkbox__input.is-checked {
              position: relative;
              width: 14px;
              height: 14px;
              /deep/ .el-checkbox__inner {
                border-radius: 100%;
                width: 14px;
                height: 14px;
                background-color: #fff;
                position: relative;
                cursor: pointer;
                display: inline-block;
                box-sizing: border-box;
                border: 1px solid #fb891f;
                color: #fb891f;
                &::after {
                  width: 6px;
                  height: 6px;
                  border-radius: 100%;
                  background-color: #fb891f;
                  content: '';
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  transition: transform 0.15s ease-in;
                  transform: translate(-50%, -50%) scale(1);
                  border: 0;
                }
              }
            }
            /deep/ .el-checkbox__label {
              color: #fb891f;
            }
          }
        }
        .action {
          display: flex;
          width: 264px;
          height: 44px;
          margin-top: 10px;
          .amount-input {
            display: inline-block;
            width: 126px;
            height: 24px;
            border: 1px solid #e5e5e5;
            padding: 10px;
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
          .action-btn {
            display: inline-block;
            width: 111px;
            height: 46px;
            background: #fb891f;
            text-align: center;
            font-size: $font-size-medium;
            color: #fff;
            cursor: pointer;
            &:hover {
              background: lighten(#fb891f, 5%);
              cursor: pointer;
            }
          }
        }
        .expected-profits {
          display: flex;
          width: 100%;
          height: 16px;
          line-height: 16px;
          margin-top: 20px;
          margin-bottom: 17px;
          justify-content: space-around;
          font-size: $font-size-small;
          color: $color-text;
          .title {
            width: 108px;
            line-height: 16px;
            margin-right: 92px;
            color: $color-text;
            border: 0;
          }
          .value {
            width: 99px;
            line-height: 16px;
            text-align: right;
          }
        }
      }
    }
  }
  .tab-wrap {
    width: 1138px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 38px;
    background: #fff;
    /deep/ .el-tabs__item {
      border-top: 4px solid transparent;
      height: 49px;
      line-height: 40px;
      padding: 0 30px;
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
      .detail-list {
        width: 1080px;
        margin-top: 20px;
        border: 1px solid #e3e3e3;
        li {
          display: flex;
          width: 100%;
          font-size: $font-size-small-s;
          border-bottom: 1px solid #e3e3e3;
          align-items: center;
          .title {
            background: #f0f7ff;
            padding: 10px;
            color: $color-text;
            display: inline-block;
            width: 380px;
            text-align: center;
            border-right: 1px solid #e3e3e3;
          }
          .value {
            display: inline-block;
            width: 629px;
            padding: 10px;
            padding-left: 30px;
            text-align: left;
            color: $color-text-s;
          }
          a.value {
            color: #0083fe;
          }
          &:nth-child(8) {
            .title {
              line-height: 60px;
            }
            .value {
              line-height: 20px;
            }
          }
          &:nth-child(9) {
            border-bottom: 0;
            .title {
              line-height: 100px;
            }
            .value {
              line-height: 26px;
            }
          }
        }
      }
      .join-record-table,
      .project-composition-table {
        width: 1080px;
        table-layout: fixed;
        /deep/ thead {
          color: $color-text;
          font-size: $font-size-small;
          line-height: 20px;
          th {
            padding: 8px 0;
          }
        }
        /deep/ tbody {
          td {
            padding: 8px 0;
            color: $color-text-s;
            font-size: $font-size-small-s;
            .view-detail {
              font-size: $font-size-small-s;
              color: #fab645;
            }
          }
        }
      }
      .view-more {
        position: relative;
        width: 100%;
        height: 25px;
        line-height: 25px;
        margin-top: 20px;
        a {
          position: absolute;
          top: 0;
          right: 0;
          display: block;
          color: #fc5541;
        }
      }
    }
  }
}
</style>
