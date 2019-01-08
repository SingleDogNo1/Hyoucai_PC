<template>
  <div class="jhb-detail-wrapper">
    <header>
      注：本标为按天计息标，借款人可能提前还款。如果出现提前还款，您所获得实际利息将按借款人实际借款天数计算，请知悉！
    </header>
    <div class="income coupon">
      <div class="title">加息收益</div>
      <ul>
        <li>
          <span>1012.00</span>
          <p>累计加息收益(元)</p>
        </li>
        <li>
          <span>30天</span>
          <p>加息天数</p>
        </li>
        <li>
          <span>10.00元</span>
          <p>待收加息收益(元)</p>
        </li>
      </ul>
    </div>
    <div class="income detail">
      <div class="title">收益计划</div>
      <ul>
        <li>
          <span>3个月</span>
          <p>锁定期</p>
        </li>
        <li>
          <span>等额本息</span>
          <p>计息方式</p>
        </li>
        <li>
          <span>1234.00元</span>
          <p>出借本金(元)</p>
        </li>
        <li>
          <span>123.00元</span>
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
        <tr
          :key="index"
          :class="{'done': item.status === '已结清'}"
        >
          <td>{{item.gainDate}}</td>
          <td>{{item.principalPerTerm}}</td>
          <td>{{item.interest}}</td>
          <td>{{item.status}}</td>
        </tr>
      </template>
      </tbody>
    </table>
    <div class="income">
      <div class="title">项目组成</div>
    </div>
    <table>
      <thead>
      <tr>
        <th>标的号</th>
        <th>出借本金(元)</th>
        <th>利息(元)</th>
        <th>借款人详情</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>12312313231131</td>
        <td>1000.00</td>
        <td>100.00</td>
        <td><p>查看</p></td>
        <td><a href="">三方协议</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getQSTGainPlan, getQSTInfo } from '@/api/hyc/Mine/lend'

export default {
  name: 'JHBDetail',
  mixins: [],
  data() {
    return {
      projectNo: this.$route.query.id,
      productType: this.$route.query.type,
      BenefitPlan: [], // 收益计划
      itemDesign: [] // 项目组成
    }
  },
  methods: {},
  computed: {},
  created() {
    // 获取加息收益和收益计划
    getQSTGainPlan({
      recordPackageId: this.projectNo,
      productType: this.productType
    }).then(res => {
      this.BenefitPlan = res.data.data
      console.log(res)
    })
    getQSTInfo({
      recordPackageId: this.projectNo,
      productType: this.productType
    }).then(res => {
      console.log(res)
    })
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.jhb-detail-wrapper {
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
  table,
  table tr th,
  table tr td {
    border: 1px solid #e3e3e3;
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
}
</style>
