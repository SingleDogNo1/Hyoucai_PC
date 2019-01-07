<template>
  <div class="wrapper">
    <div class="top">
      <img src="./image/date_back.png" />
      <ul>
        <li>
          <dl>
            <dt>
              <div class="title"><i></i> <span>用户累计出借额（元）</span></div>
            </dt>
            <dd><count-up v-if="lendCount !== null" name="lendCount" :count="lendCount"></count-up></dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div class="title"><i></i> <span>累计赚取金额（元）</span></div>
            </dt>
            <dd><count-up v-if="incomeCount !== null" name="incomeCount" :count="incomeCount"></count-up></dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <div class="title"><i></i> <span>今日交易（元）</span></div>
            </dt>
            <dd><count-up v-if="todayCount !== null" name="todayCount" :count="todayCount"></count-up></dd>
          </dl>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="area" v-for="(item, i) in list" :key="i">
        <h3 v-if="item.head">
          <i><img :src="item.head.icon" alt=""/></i> <span>{{ item.head.title }}</span>
        </h3>
        <ul class="items">
          <li class="item">
            <div class="title">
              <i><img :src="item.iconUrl" alt=""/></i> <span>{{ item.projectName }}</span>
              <em v-for="(tag, index) in item.tags" :key="index">{{ tag.tagName }}</em>
            </div>
            <ul class="info-wrapper">
              <li class="info">
                <dl>
                  <dt>{{ item.investRate }} <span>%</span></dt>
                  <dd>历史平均年化收益率</dd>
                </dl>
              </li>
              <li class="info">
                <dl>
                  <dt>{{ item.loanMent }}</dt>
                  <dd>锁定期限</dd>
                </dl>
              </li>
              <li class="info">
                <dl>
                  <dt>{{ item.minInvAmount }}元</dt>
                  <dd>起投金额</dd>
                </dl>
              </li>
              <li class="info">
                <dl>
                  <dt>{{ item.surplusAmt }}元</dt>
                  <dd>剩余可投金额</dd>
                </dl>
              </li>
              <li class="info">
                <dl>
                  <dt>
                    已投<span class="hight-light">{{ item.investPercent }}%</span>
                  </dt>
                  <dd><el-progress :percentage="item.investPercent"></el-progress></dd>
                </dl>
              </li>
              <li class="info"><el-button type="primary">下载APP</el-button></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="pagination-wrapper">
        <pagination
          v-if="countPage"
          :count-page="countPage"
          :size-val="size"
          :page-val="page"
          @handleCurrentChange="handleCurrentChange"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import countUp from '@/components/countUp/index'
import { getCountMsg, getList } from '@/api/hyc/lend'
import { getUser } from '@/assets/js/cache'

const ERR_OK = '1'
export default {
  name: 'lend',
  data() {
    return {
      lendCount: null,
      incomeCount: null,
      todayCount: null,
      page: 1,
      size: 10,
      countPage: 0,
      userName: getUser().userName,
      // couponId: this.$router,
      // couponId: this.$router,
      list: []
    }
  },
  filters: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getData()
    },
    getData() {
      let params = {
        userName: this.userName,
        curPage: this.page,
        maxLine: this.size
      }
      if (this.couponId) {
        params.couponId = this.couponId
      }
      if (this.redPacketId) {
        params.redPacketId = this.redPacketId
      }
      getList(params).then(res => {
        let result = res.data
        if (result.resultCode === ERR_OK) {
          this.list = result.data.list
          this.countPage = parseInt(result.data.countPage)
          this.page = parseInt(result.data.curPage)
        }
      })
    },
    getTopMsg() {
      getCountMsg().then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.lendCount = data.accumulativeInvAmountSum
          this.incomeCount = data.accumulativeProfitAmtSum
          this.todayCount = data.invTodayAmt
        }
      })
    }
  },
  components: {
    pagination,
    countUp
  },
  created() {
    this.getData()
    this.getTopMsg()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';
.wrapper {
  .top {
    position: relative;
    width: 100%;
    margin-bottom: 30px;
    img {
      width: 100%;
    }
    ul {
      position: absolute;
      top: 23%;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      width: 1140px;
      font-size: 0;
      overflow: hidden;
      li {
        display: inline-block;
        margin-right: 130px;
        font-size: $font-size-small-s;
        text-align: center;
        dl {
          dt {
            color: #ccc;
            font-size: 0;
            margin-bottom: 5px;
            i {
              display: inline-block;
              vertical-align: top;
              @include square(19px);
              margin-right: 8px;
              background-position: center center;
              background-size: 100% 100%;
              background-repeat: no-repeat;
            }
            span {
              display: inline-block;
              vertical-align: top;
              font-size: $font-size-small-s;
            }
          }
          dd {
            font-size: 16px;
            letter-spacing: 1px;
          }
        }
        &:nth-of-type(1) {
          dl {
            dt {
              i {
                background-image: url('./image/investment@2x.png');
              }
            }
          }
        }
        &:nth-of-type(2) {
          dl {
            dt {
              i {
                background-image: url('./image/income@2x.png');
              }
            }
          }
        }
        &:nth-of-type(3) {
          dl {
            dt {
              i {
                background-image: url('./image/time@2x.png');
              }
            }
          }
        }
      }
    }
  }
  .content {
    width: 1140px;
    margin: 0 auto;
    .area {
      h3 {
        font-size: 0;
        margin-top: 30px;
        margin-bottom: 15px;
        i {
          display: inline-block;
          vertical-align: top;
          @include square(19px);
          margin-right: 8px;
          margin-top: 2px;
          background-position: center center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-color: #666666;
        }
        span {
          display: inline-block;
          vertical-align: top;
          font-size: $font-size-medium;
        }
      }
      .items {
        border: 1px solid #e5e5e5;
        border-bottom: 0;
        background-color: #fff;
        font-size: 0;
        overflow: hidden;
        .item {
          padding: 37px 30px 39px;
          background-color: #fff;
          border-bottom: 1px solid #eee;
          .title {
            font-size: 0;
            margin-bottom: 27px;
            i {
              display: inline-block;
              vertical-align: top;
              @include square(22px);
              background-position: center center;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-color: #d93f30;
            }
            span {
              display: inline-block;
              vertical-align: top;
              margin: 0 8px;
              font-size: $font-size-medium;
            }
            em {
              display: inline-block;
              vertical-align: top;
              margin-top: 3px;
              padding: 0 4px;
              border-radius: 2px;
              border: 1px solid rgba(252, 85, 65, 1);
              font-size: $font-size-small-ss;
              color: rgba(252, 85, 65, 1);
            }
          }
          .info-wrapper {
            display: flex;
            vertical-align: top;
            padding-left: 32px;
            .info {
              flex: 1;
              margin-top: 10px;
              dl {
                text-align: center;
                dt {
                  margin-bottom: 12px;
                  font-size: 22px;
                  color: $color-text;
                }
                dd {
                  font-size: $font-size-small-s;
                  color: #9b9b9b;
                }
              }
              &:first-child {
                margin-top: 0;
                dl {
                  text-align: left;
                  dt {
                    font-size: 30px;
                    color: #fc5541;
                    span {
                      font-size: 16px;
                    }
                  }
                }
              }
              &:nth-last-of-type(2) {
                margin-top: 14px;
                dl {
                  dt {
                    color: #9b9b9b;
                    font-size: $font-size-medium;
                  }
                }
                span {
                  margin-left: 5px;
                  color: #fc5541;
                }
                /deep/ .el-progress-bar__outer {
                  height: 4px !important;
                  border-radius: 0;
                  background-color: #fdc48d;
                }
                /deep/ .el-progress-bar__inner {
                  border-radius: 0;
                  background-color: #fb891f;
                }
                /deep/ .el-progress__text {
                  display: none;
                }
              }
              &:last-child {
                width: 160px;
                .el-button {
                  float: right;
                  width: 160px;
                  height: 44px;
                  margin-top: 8px;
                  background-color: #fb7b1f;
                  font-size: $font-size-medium;
                }
              }
            }
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      &:nth-last-of-type(2) {
        margin-bottom: 30px;
        .items {
          border-bottom: 1px solid #e5e5e5;
        }
      }
    }
    .pagination-wrapper {
      margin-bottom: 29px;
    }
  }
}
</style>
