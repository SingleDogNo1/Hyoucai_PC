<template>
  <div class="SBDetail">
    <div class="sb-detail-wrapper">
      <header>注：本标为按天计息标，借款人可能提前还款。如果出现提前还款，您所获得实际利息将按借款人实际借款天数计算，请知悉！</header>
      <div class="income coupon" v-if="BenefitPlan.useCoupon === '1'">
        <div class="title">
          <span>加息收益</span>
          <i class="iconfont icon-changjianwenti">
            <div class="formula-pop">
              <div class="box">
                <p>加息公式:</p>
                <p>{ 待收本金 * (加息年化/360) * 加息天数 }</p>
              </div>
            </div>
          </i>
        </div>
        <ul>
          <li>
            <span>{{BenefitPlan.userCouponRateTemp}}</span>
            <p>加息利率</p>
          </li>
          <li>
            <span>{{BenefitPlan.userCouponDays}}</span>
            <p>加息天数</p>
          </li>
          <li>
            <span>{{BenefitPlan.userCouponAmount}}</span>
            <p>待收加息收益(元)</p>
          </li>
        </ul>
      </div>
      <div class="income detail">
        <div class="title">收益计划</div>
        <ul>
          <li>
            <span>{{BenefitPlan.investmentPeriod}}</span>
            <p>锁定期</p>
          </li>
          <li>
            <span>{{BenefitPlan.interestRate}}</span>
            <p>计息方式</p>
          </li>
          <li>
            <span>{{BenefitPlan.investAmount}}</span>
            <p>出借本金(元)</p>
          </li>
          <li>
            <span>{{BenefitPlan.interest}}</span>
            <p>待收利息(元)</p>
          </li>
        </ul>
      </div>
      <table cellspacing="0">
        <thead>
          <tr>
            <th>回款日期</th>
            <th>本金(元)</th>
            <th>利息(元)</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in BenefitPlan.gainPlanPerTermList">
            <tr :key="index" :class="{'done': item.status === '已结清'}">
              <td>{{item.gainDate}}</td>
              <td>{{item.principalPerTerm}}</td>
              <td>{{item.interest}}</td>
              <td>{{item.status}}</td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="people-info-wrapper">
        <h1>借款人详情</h1>
        <div class="lists">
          <ul>
            <li>
              <b>借款人姓名：</b>
              <span>{{personalInfo.borrowerName}}</span>
            </li>
            <li>
              <b>年龄：</b>
              <span>{{personalInfo.age}}</span>
            </li>
            <li>
              <b>婚姻状况：</b>
              <span>{{personalInfo.maritalStatus}}</span>
            </li>
            <li>
              <b>借款用途：</b>
              <span>{{personalInfo.loanAim}}</span>
            </li>
            <li>
              <b>还款来源：</b>
              <span>{{personalInfo.paymentSource}}</span>
            </li>
          </ul>
          <ul>
            <li>
              <b>性别：</b>
              <span>{{personalInfo.sex}}</span>
            </li>
            <li>
              <b>行业：</b>
              <span>{{personalInfo.industry}}</span>
            </li>
            <li>
              <b>月收入：</b>
              <span>{{personalInfo.income}}</span>
            </li>
            <li>
              <b>借款主体性质：</b>
              <span>{{personalInfo.borrowerTheme}}</span>
            </li>
            <li>
              <b>逾期金额：</b>
              <span>{{personalInfo.amountOverride}}</span>
            </li>
          </ul>
          <ul>
            <li>
              <b>身份证号：</b>
              <span>{{personalInfo.idNum}}</span>
            </li>
            <li>
              <b>居住地址：</b>
              <span>{{personalInfo.domicile}}</span>
            </li>
            <li>
              <b>借款金额：</b>
              <span>{{personalInfo.prinAmt}}</span>
            </li>
            <li>
              <b>借款期限：</b>
              <span>{{personalInfo.loanDay}}</span>
            </li>
          </ul>
        </div>
        <div class="report">
          <b>征信报告：</b>
          <span>{{personalInfo.creditReport}}</span>
        </div>
        <div class="other">
          <b>在其他网络借贷平台借款情况：</b>
          <div>
            <span>{{personalInfo.borrowSituation}}</span>
            <a
              v-if="personalInfo.guaranteeProtocolUrl"
              :href="personalInfo.guaranteeProtocolUrl"
              target="_blank"
            >点击查看>></a>
          </div>
        </div>
        <a
          v-for="(item, index) in agreements"
          :key="index"
          :href="item.showUrl"
          target="_blank"
          class="agreement"
        >{{item.name}}{{item.description2}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getZXTGainPlan, getPeopleInfoApi, getAgreementApi } from '@/api/hyc/Mine/lend'

export default {
  name: 'SBDetail',
  data() {
    return {
      projectNo: this.$route.query.productId,
      invRecordId: this.$route.query.id,
      BenefitPlan: [],
      personalInfo: {},
      agreements: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    const $this = this
    ;(async function init() {
      // 获取收益计划
      const ZXTGainPlan = await getZXTGainPlan({
        projectNo: $this.projectNo,
        invRecordId: $this.invRecordId
      })
      // 获取借款人详情
      const personalInfo = await getPeopleInfoApi({
        projectNo: $this.projectNo
      })
      // 获取可用协议列表
      const agreements = await getAgreementApi({
        type: 'SYJH',
        projectType: 0,
        invRecordId: $this.invRecordId,
        userName: $this.user.userName
      })

      return {
        ZXTGainPlan: ZXTGainPlan.data.data,
        personalInfo: personalInfo.data.data,
        agreements: agreements
      }
    })().then(res => {
      this.BenefitPlan = res.ZXTGainPlan
      this.personalInfo = res.personalInfo
      // 处理协议
      const ori_agre = res.agreements.data.data.result
      let agreements = []
      for (let i = 0; i < ori_agre.length; i++) {
        if (ori_agre[i].list.length > 0) {
          agreements.push(ori_agre[i].list)
        }
      }
      $this.agreements = agreements.flat(Infinity)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

table,
table tr th,
table tr td {
  border: 1px solid #e3e3e3;
}

.sb-detail-wrapper {
  height: 100%;
  background: #fff;
  border: 1px solid #e3e3e3;
  header {
    box-sizing: border-box;
    padding-left: 20px;
    height: 60px;
    line-height: 60px;
    font-size: $font-size-small-s;
    color: $color-sub-theme;
    border-bottom: 1px solid #e3e3e3;
  }
  .income {
    display: flex;
    align-items: center;
    height: 80px;
    &.coupon {
      border-bottom: 1px solid #e3e3e3;
    }
    .title {
      font-size: $font-size-small;
      height: 20px;
      line-height: 20px;
      margin-left: 20px;
      padding-left: 12px;
      position: relative;
      .icon-changjianwenti {
        display: inline-block;
        margin-left: 6px;
        position: absolute;
        cursor: pointer;
        &:hover {
          color: #fb9d1f;
          .formula-pop {
            display: block;
          }
        }
      }
      .formula-pop {
        display: none;
        position: absolute;
        top: -13px;
        left: -10px;
        .box {
          position: relative;
          width: 252px;
          height: 40px;
          border: 1px solid #fb7b1f;
          margin-top: 6px;
          margin-left: 36px;
          box-sizing: border-box;
          font-size: 14px;
          padding: 4px 10px;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
          background: #fff;
          border-radius: 4px;
          p {
            line-height: 15px;
            font-size: $font-size-small-ss;
            color: $color-text;
          }
        }
        .box:before,
        .box:after {
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          bottom: -8px;
          top: 42%;
          margin-left: -16px;
          overflow: hidden;
          pointer-events: none;
          -webkit-transform: rotate(135deg);
          -mz-transform: rotate(135deg);
          transform: rotate(135deg);
        }
        .box:before {
          background: #fb7b1f;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        .box:after {
          top: 15px;
          left: 11px;
          background: #fff;
        }
      }
      &:after {
        content: '';
        display: block;
        width: 5px;
        height: 14px;
        background: $color-theme;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
    }
    ul {
      height: 100%;
      flex: 1;
      display: flex;
      li {
        width: 185px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          font-size: $font-size-medium;
          color: $color-theme;
        }
        p {
          font-size: $font-size-small-ss;
          color: $color-text-s;
        }
      }
    }
  }
  table {
    width: 800px;
    margin: 0 auto;
    border: 1px solid #e3e3e3;
    th {
      height: 46px;
      background: rgba(0, 131, 254, 0.09);
      color: $color-text;
      font-size: $font-size-small-s;
    }
    tr {
      font-size: $font-size-small-ss;
      height: 46px;
      border-bottom: 1px solid #e3e3e3;
      text-align: center;
      &.done {
        color: $color-text-s;
      }
    }
  }

  .income-table {
    a,
    p {
      cursor: pointer;
      color: $color-theme;
    }
  }
}

.people-info-wrapper {
  width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 25px 0;
  h1 {
    height: $font-size-small;
    line-height: $font-size-small;
    font-size: $font-size-small;
    color: $color-text;
    border-left: 6px solid $color-theme;
    padding-left: 12px;
    margin-bottom: 20px;
  }
  .lists {
    display: flex;
    ul {
      &:nth-child(1) {
        width: 240px;
      }
      &:nth-child(2) {
        width: 210px;
      }
      li {
        min-height: 45px;
        line-height: 45px;
        font-size: $font-size-small-s;
        b {
          font-weight: normal;
          color: $color-text-s;
        }
        span {
          color: $color-text;
        }
      }
    }
  }
  .report {
    font-size: $font-size-small-s;
    margin-bottom: 15px;
    b {
      font-weight: normal;
      color: $color-text-s;
    }
    span {
      color: $color-text;
    }
  }
  .other {
    font-size: $font-size-small-s;
    display: flex;
    margin-bottom: 20px;
    b {
      font-weight: normal;
      color: $color-text-s;
    }
    div {
      flex: 1;
      a {
        color: $color-theme;
        margin-left: 20px;
      }
    }
  }
  .agreement {
    color: $color-text-blue;
    font-size: $font-size-small-s;
  }
}
</style>
