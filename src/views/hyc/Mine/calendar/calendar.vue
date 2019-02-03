<template>
  <div class="calendar-wrapper">
    <h1>回款日历</h1>
    <div class="calendar-item">
      <div class="left">
        <calendarItem
          ref="calendarItem"
          :zero="calendar.zero"
          :lunar="calendar.lunar"
          :begin="calendar.begin"
          :end="calendar.end"
          @prev="getPrevMonth"
          @next="getNextMonth"
          @getLendDetail="getLendDetail"
        />
      </div>
      <div class="right">
        <div>
          <p>{{ incomeDetail.todayIncome }}</p>
          <span>今日回款本息</span>
        </div>
        <div>
          <p>{{ incomeDetail.collectCounts }}</p>
          <span>当月已回款笔数</span>
        </div>
        <div>
          <p>{{ incomeDetail.waitIncome }}</p>
          <span>当月待收本息</span>
        </div>
      </div>
    </div>
    <div v-if="showDetailTable" class="table">
      <table class="detail">
        <thead>
          <th>回款时间</th>
          <th>项目名称</th>
          <th>历史平均年化收益率</th>
          <th>回款金额</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dayIncome" :key="index">
            <td>{{ item.collectTime }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.rate }}</td>
            <td>{{ item.amount }}元</td>
            <td class="show" @click="showDetail(`要查看${item.productName}的内容`)">查看详情</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import calendarItem from '@/components/calendar/calendar.vue'
import api from '@/api/hyc/Mine/calendar'
import { mapGetters } from 'vuex'

export default {
  name: 'calendar',
  mixins: [],
  components: {
    calendarItem
  },
  data() {
    return {
      calendar: {
        zero: false,
        lunar: true
      },
      year: 0,
      month: 0,
      day: 0,
      showDetailTable: false, // 是否显示底部的table
      incomeDetail: {}, // 收益详情
      dayIncome: []
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getLendDetail(year, month, day) {
      this.getIncome(year, month + 1, day, res => {
        let data = res.data.data
        if (data.details && data.details.length > 0) {
          this.dayIncome = data.details
          this.showDetailTable = true
        }
      })
    },
    showDetail(id) {
      console.log(id)
      // this.$router.push({
      //   name: '',
      //   query: id
      // })
    },
    getPrevMonth(month, year) {
      this.getIncome(year, month)
    },
    getNextMonth(month, year) {
      this.getIncome(year, month)
    },
    getIncome(year, month, day, callback) {
      api
        .getIncomeApi({
          userName: this.user.userName,

          year: year,
          month: month,
          day: day,
          type: '0'
        })
        .then(res => {
          this.incomeDetail = res.data.data
          if (callback) callback(res)
        })
    }
  },
  mounted() {
    ;[this.year, this.month, this.day] = this.$refs.calendarItem.value
    this.getIncome(this.year, this.month, this.day)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.calendar-wrapper {
  border-top: 2px solid $color-theme;
  background: #fff;
  padding: 0 30px 100px;
  h1 {
    font-size: $font-size-small;
    line-height: 50px;
  }
  .calendar-item {
    display: flex;
    .left {
      width: 600px;
      height: 430px;
      box-shadow: 1px 1px 2px 0 #dadada;
      border-radius: 4px 4px 8px 8px;
      border: 1px solid #e3e3e3;
    }
    .right {
      flex: 1;
      padding: 0 30px;
      div {
        height: 116px;
        width: 145px;
        background: rgba(255, 255, 255, 1);
        border-bottom: 2px solid #ebebeb;
        padding-top: 40px;
        p {
          font-size: $font-size-medium;
          color: #fc5541;
          line-height: 30px;
        }
        span {
          font-size: $font-size-small-s;
          color: $color-text;
        }
      }
    }
  }
  .table {
    border-radius: 4px 4px 8px 8px;
    overflow: hidden;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;
    margin-top: 20px;
  }
  .detail {
    width: 100%;
    th {
      height: 42px;
      background: #f8f8fb;
      color: $color-text;
    }
    tr {
      height: 42px;
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
    }
    td {
      font-size: $font-size-small;
      text-align: center;
      &.show {
        cursor: pointer;
        color: #0083fe;
      }
    }
  }
}
</style>
