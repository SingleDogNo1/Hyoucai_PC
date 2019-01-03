<template>
  <div class="overview">
    <div class="board">
      <section>
        <h6>累计利息收益</h6>
        <p><span class="big">{{totalIncomeBig}}</span> <span class="small">.{{totalIncomeSmall}}元</span></p>
      </section>
      <el-button type="info">系统切换</el-button>
      <el-button type="warning">充值</el-button>
      <el-button type="warning">提现</el-button>
    </div>
    <div class="amount" id="amount"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/graphic'

import api from '@/api/hyc/Mine/overview'
import { mapGetters } from 'vuex'

export default {
  name: 'overview',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'overview',
      amountInfo: {},
      totalIncomeBig: 0,
      totalIncomeSmall: 0
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {},
  mounted() {
    const $this = this
    async function initPage() {
      const myChart = echarts.init(document.getElementById('amount'))
      await api
        .getUserBasicInfo({
          userName: $this.user.userName
        })
        .then(res => {
          console.log(res)
        })
      await api.getAmountInfo().then(res => {
        const totalIncome = res.data.data.totalIncome
        $this.amountInfo = res.data.data
        $this.totalIncomeBig = totalIncome.split('.')[0]
        $this.totalIncomeSmall = totalIncome.split('.')[1]
      })
      await myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // title: {
        //   text: '总资产（元）',
        //   subtext: $this.amountInfo.totalAmount,
        //   left: '20%',
        //   top: 'center',
        //   x: 'center',
        //   textStyle: {
        //     width: '100px',
        //     color: '#4a4a4a',
        //     fontSize: 14,
        //   },
        //   subtextStyle: {
        //     color: '#4a4a4a',
        //     fontSize: 20,
        //   }
        // },
        graphic: [
          {
            type: 'text',
            left: '20%',
            top: '45%',
            z: 2,
            zlevel: 100,
            style: {
              text: '总资产（元）',
              x: 400,
              y: 400,
              textAlign: 'center',
              font: '14px sans-serif',
              fill: '#4a4a4a'
            }
          },
          {
            type: 'text',
            left: '18%',
            top: '50%',
            z: 2,
            zlevel: 100,
            style: {
              text: $this.amountInfo.totalAmount,
              fill: '#4a4a4a',
              font: '20px sans-serif'
            }
          }
        ],
        color: ['#F8DF38', '#F98128', '#42B1FF', '#37F1BE'],
        legend: {
          orient: 'vertical',
          top: 'middle',
          right: 100,
          itemGap: 30,
          data: ['可用余额', '在投本金', '冻结金额', '待收利息']
        },
        series: [
          {
            name: '金额类型',
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['25%', '50%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: $this.amountInfo.banlance, name: '可用余额' },
              { value: $this.amountInfo.waitBackPrincipal, name: '在投本金' },
              { value: $this.amountInfo.freezeAmount, name: '冻结金额' },
              { value: $this.amountInfo.waitBackInterest, name: '待收利息' }
            ]
          }
        ]
      })
    }

    initPage()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.overview {
  width: 842px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.board {
  height: 180px;
  background-color: #ffffff;
  border: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  padding: 0 40px;
  section {
    font-size: $font-size-small-s;
    color: $color-text;
    line-height: 1;
    margin-right: 200px;
    h6 {
      text-align: center;
      margin-bottom: 20px;
    }
    span.big {
      font-size: 34px;
    }
    span.small {
      font-size: 18px;
    }
  }
  button {
    width: 120px;
    border-radius: 8px;
    margin: 0 15px;
    font-size: $font-size-medium;
    color: #fff;
    &:last-child {
      margin-right: 0;
    }
  }
}
.amount {
  background-color: #fff;
  border: 1px solid #dcdcdc;
  padding: 0 40px;
  margin-top: 20px;
  flex: 1;
}
</style>
