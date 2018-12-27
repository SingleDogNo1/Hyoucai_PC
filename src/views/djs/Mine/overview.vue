<template>
  <div class="overview">
    <div class="board">
      <section>
       <h6>累计利息收益</h6>
        <p>
          <span class="big">123</span>
          <span class="small">.456元</span>
        </p>
      </section>
      <button class="switcher">系统切换</button>
      <button class="recharge">充值</button>
      <button class="extract">提现</button>
    </div>
    <div class="amount" id="amount"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts'

export default {
  name: 'overview',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'overview'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  mounted() {
    Highcharts.chart(
      'amount',
      {
        chart: {
          spacing: [40, 0, 40, 0]
        },
        credits: {
          enabled: false
        },
        title: {
          floating: true,
          text: '圆心显示的标题<br>' + 613923712
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        series: [
          {
            type: 'pie',
            innerSize: '80%',
            name: '市场份额',
            data: [
              { name: 'Firefox', y: 45.0, url: 'http://bbs.hcharts.cn' },
              ['IE', 26.8],
              {
                name: 'Chrome',
                y: 12.8,
                sliced: true,
                selected: true,
                url: 'http://www.hcharts.cn'
              },
              ['Safari', 8.5],
              ['Opera', 6.2],
              ['其他', 0.7]
            ]
          }
        ]
      },
      function(c) {
        var centerY = c.series[0].center[1],
          titleHeight = parseInt(c.title.styles.fontSize)
        c.setTitle({
          y: centerY + titleHeight / 2
        })
      }
    )
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.overview {
  width: 842px;
}
.board {
  height: 148px;
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
    cursor: pointer;
    width: 120px;
    height: 40px;
    background: $color-theme;
    border-radius: 8px;
    margin: 0 15px;
    font-size: $font-size-medium;
    color: #fff;
    &.switcher {
      background: #099ef5;
    }
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
}
</style>
