<template>
  <div class="calendar-wrapper">
    <h1>回款日历</h1>
    <div class="calendar-item">
      <div class="left">
        <calendarItem
          :zero="calendar.zero"
          :lunar="calendar.lunar"
          :value="calendar.value"
          :begin="calendar.begin"
          :end="calendar.end"
          @select="calendar.select"
          @getLendDetail="getLendDetail"
        />
      </div>
      <div class="right">
        <div>
          <p>12345678元</p>
          <span>今日回款本息</span>
        </div>
        <div>
          <p>1笔</p>
          <span>当月已回款笔数</span>
        </div>
        <div>
          <p>12345678元</p>
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
        <tr>
          <td>2018-12-06</td>
          <td>手机了</td>
          <td>6.0%</td>
          <td>100.00</td>
          <td class="show" @click="showDetail('hello,world')">操作</td>
        </tr>
        <tr>
          <td>2018-12-16</td>
          <td>手机了2</td>
          <td>26.0%</td>
          <td>1200.00</td>
          <td>操作2</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import calendarItem from '@/components/calendar/calendar.vue'

export default {
  name: 'calendar',
  mixins: [],
  components: {
    calendarItem
  },
  data() {
    return {
      calendar: {
        display: '2018/02/16',
        zero: false,
        lunar: true,
        select: value => {
          this.calendar.show = false
          this.calendar.value = value
          this.calendar.display = value.join('/')
        }
      },
      showDetailTable: true // 是否显示底部的table
    }
  },
  methods: {
    getLendDetail(year, month, day) {
      console.log(year, month, day)
    },
    showDetail(id) {
      alert(id)
    }
  },
  mounted() {}
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
