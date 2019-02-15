<template>
  <div class="calendar">
    <div class="calendar-tools">
      <!-- 可点击选择年份 -->
      <!--<div class="calendar-info" @click.stop="changeYear">-->
      <div class="calendar-info">
        <div class="year">{{ year }}年</div>
        <span class="calendar-prev" @click="prev">＜</span>
        <div class="month swiper-container" id="month">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="m in months" :key="m">{{ m }}</div>
          </div>
        </div>
        <span class="calendar-next" @click="next">＞</span>
        <div class="today" v-if="month !== new Date().getMonth()" @click="setToday">返回今天</div>
      </div>
    </div>
    <table cellpadding="5">
      <thead>
        <tr class="table-header">
          <td v-for="week in weeks" :key="week" class="week">{{ week }}</td>
        </tr>
      </thead>
      <tbody>
        <tr style="height: 20px;"></tr>
        <tr v-for="(day, k1) in days" :key="k1" :style="{ 'animation-delay': k1 * 30 + 'ms' }">
          <td v-for="(child, k2) in day" :key="k2" :class="{ selected: child.selected, disabled: child.disabled }" @click="select(k1, k2, $event)">
            <span
              :class="{
                red: k2 === 0 || k2 === 6 || ((child.isLunarFestival || child.isGregorianFestival) && lunar),
                isSpecial: child.isLunarFestival || child.isGregorianFestival
              }"
            >
              {{ child.day }}
            </span>
            <div class="text" v-if="child.eventName !== undefined">{{ child.eventName }}</div>
            <div
              class="text"
              :class="{ isLunarFestival: child.isLunarFestival, isGregorianFestival: child.isGregorianFestival }"
              v-if="(lunar && child.isLunarFestival) || (lunar && child.isGregorianFestival)"
            >
              {{ child.lunar }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="calendar-years" :class="{ show: yearsShow }">
      <span v-for="y in years" :key="y" @click.stop="selectYear(y)" :class="{ active: y === year }">{{ y }}</span>
    </div>
  </div>
</template>

<script>
import calendar from './calendar'
import Swiper from 'swiper'

export default {
  props: {
    // 默认日期
    value: {
      type: Array,
      default: function() {
        return [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
      }
    },
    // 是否小于10补零
    zero: {
      type: Boolean,
      default: false
    },
    // 屏蔽的日期
    disabled: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 是否显示农历
    lunar: {
      type: Boolean,
      default: false
    },

    // 自定义星期名称
    weeks: {
      type: Array,
      default: function() {
        return window.navigator.language.toLowerCase() === 'zh-cn'
          ? ['日', '一', '二', '三', '四', '五', '六']
          : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      }
    },
    // 自定义月份
    months: {
      type: Array,
      default: function() {
        return window.navigator.language.toLowerCase() === 'zh-cn'
          ? ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      }
    },
    // 自定义事件
    events: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      monthSwiper: '',
      years: [],
      yearsShow: false,
      year: 0,
      month: 0,
      day: 0,
      days: [],
      today: [],
      festival: {
        lunar: {
          '1-1': '春节',
          '1-15': '元宵节',
          '2-2': '龙头节',
          '5-5': '端午节',
          '7-7': '七夕节',
          '7-15': '中元节',
          '8-15': '中秋节',
          '9-9': '重阳节',
          '10-1': '寒衣节',
          '10-15': '下元节',
          '12-8': '腊八节',
          '12-23': '祭灶节',
          '12-30': '除夕'
        },
        gregorian: {
          '1-1': '元旦',
          '2-14': '情人节',
          '3-8': '妇女节',
          '3-12': '植树节',
          '4-5': '清明节',
          '5-1': '劳动节',
          '5-4': '青年节',
          '6-1': '儿童节',
          '7-1': '建党节',
          '8-1': '建军节',
          '9-10': '教师节',
          '10-1': '国庆节',
          '12-24': '平安夜',
          '12-25': '圣诞节'
        }
      }
    }
  },
  watch: {
    events() {
      this.render(this.year, this.month)
    },
    value() {
      this.init()
    }
  },
  methods: {
    init() {
      let now = new Date()
      this.year = now.getFullYear()
      this.month = now.getMonth()
      this.day = now.getDate()
      if (this.value.length > 0) {
        //单选
        this.year = parseInt(this.value[0])
        this.month = parseInt(this.value[1]) - 1
        this.day = parseInt(this.value[2])
      }
      this.render(this.year, this.month)
    },
    // 渲染日期
    render(y, m) {
      let firstDayOfMonth = new Date(y, m, 1).getDay() //当月第一天
      let lastDateOfMonth = new Date(y, m + 1, 0).getDate() //当月最后一天
      let lastDayOfLastMonth = new Date(y, m, 0).getDate() //最后一月的最后一天
      this.year = y
      let seletSplit = this.value
      let i,
        line = 0,
        temp = [],
        nextMonthPushDays = 1
      for (i = 1; i <= lastDateOfMonth; i++) {
        let day = new Date(y, m, i).getDay() //返回星期几（0～6）
        let k
        // 第一行
        if (day === 0) {
          temp[line] = []
        } else if (i === 1) {
          temp[line] = []
          k = lastDayOfLastMonth - firstDayOfMonth + 1
          for (let j = 0; j < firstDayOfMonth; j++) {
            temp[line].push(
              Object.assign(
                { day: k, disabled: true },
                this.getLunarInfo(this.computedPrevYear(), this.computedPrevMonth(true), k),
                this.getEvents(this.computedPrevYear(), this.computedPrevMonth(true), k)
              )
            )
            k++
          }
        }

        let chk = new Date()
        let chkY = chk.getFullYear()
        let chkM = chk.getMonth()
        // 匹配上次选中的日期
        if (parseInt(seletSplit[0]) === this.year && parseInt(seletSplit[1]) - 1 === this.month && parseInt(seletSplit[2]) === i) {
          temp[line].push(
            Object.assign({ day: i, selected: true }, this.getLunarInfo(this.year, this.month + 1, i), this.getEvents(this.year, this.month + 1, i))
          )
          this.today = [line, temp[line].length - 1]
        }
        // 没有默认值的时候显示选中今天日期
        else if (chkY === this.year && chkM === this.month && i === this.day && this.value === '') {
          temp[line].push(
            Object.assign({ day: i, selected: true }, this.getLunarInfo(this.year, this.month + 1, i), this.getEvents(this.year, this.month + 1, i))
          )
          this.today = [line, temp[line].length - 1]
        } else {
          // 普通日期
          let options = Object.assign(
            { day: i, selected: false },
            this.getLunarInfo(this.year, this.month + 1, i),
            this.getEvents(this.year, this.month + 1, i)
          )
          if (this.disabled.length > 0) {
            if (
              this.disabled.filter(v => {
                return this.year === v[0] && this.month === v[1] - 1 && i === v[2]
              }).length > 0
            ) {
              options.disabled = true
            }
          }
          temp[line].push(options)
        }

        // 到周六换行
        if (day === 6 && i < lastDateOfMonth) {
          line++
        } else if (i === lastDateOfMonth) {
          let k = 1
          for (let d = day; d < 6; d++) {
            temp[line].push(
              Object.assign(
                { day: k, disabled: true },
                this.getLunarInfo(this.computedNextYear(), this.computedNextMonth(true), k),
                this.getEvents(this.computedNextYear(), this.computedNextMonth(true), k)
              )
            )
            k++
          }
          // 下个月除了补充的前几天开始的日期
          nextMonthPushDays = k
        }
      } //end for
      // 补充第六行让视觉稳定
      if (line <= 5 && nextMonthPushDays > 0) {
        for (let i = line + 1; i <= 5; i++) {
          temp[i] = []
          let start = nextMonthPushDays + (i - line - 1) * 7
          for (let d = start; d <= start + 6; d++) {
            temp[i].push(
              Object.assign(
                { day: d, disabled: true },
                this.getLunarInfo(this.computedNextYear(), this.computedNextMonth(true), d),
                this.getEvents(this.computedNextYear(), this.computedNextMonth(true), d)
              )
            )
          }
        }
      }
      this.days = temp
    },
    computedPrevYear() {
      let value = this.year
      if (this.month - 1 < 0) {
        value--
      }
      return value
    },
    computedPrevMonth(isString) {
      let value = this.month
      if (this.month - 1 < 0) {
        value = 11
      } else {
        value--
      }
      // 用于显示目的（一般月份是从0开始的）
      if (isString) {
        return value + 1
      }
      return value
    },
    computedNextYear() {
      let value = this.year
      if (this.month + 1 > 11) {
        value++
      }
      return value
    },
    computedNextMonth(isString) {
      let value = this.month
      if (this.month + 1 > 11) {
        value = 0
      } else {
        value++
      }
      // 用于显示目的（一般月份是从0开始的）
      if (isString) {
        return value + 1
      }
      return value
    },
    // 获取农历信息
    getLunarInfo(y, m, d) {
      let lunarInfo = calendar.solar2lunar(y, m, d)
      let lunarValue = lunarInfo.IDayCn
      let isLunarFestival = false
      let isGregorianFestival = false
      if (this.festival.lunar[lunarInfo.lMonth + '-' + lunarInfo.lDay] !== undefined) {
        lunarValue = this.festival.lunar[lunarInfo.lMonth + '-' + lunarInfo.lDay]
        isLunarFestival = true
      } else if (this.festival.gregorian[m + '-' + d] !== undefined) {
        lunarValue = this.festival.gregorian[m + '-' + d]
        isGregorianFestival = true
      }
      return {
        lunar: lunarValue,
        isLunarFestival: isLunarFestival,
        isGregorianFestival: isGregorianFestival
      }
    },
    // 获取自定义事件
    getEvents(y, m, d) {
      if (Object.keys(this.events).length === 0) return false
      let eventName = this.events[y + '-' + m + '-' + d]
      let data = {}
      if (eventName !== undefined) {
        data.eventName = eventName
      }
      return data
    },
    // 上月
    prev(e) {
      if (!this.monthSwiper.animating) {
        this.monthSwiper.slidePrev()
        e.stopPropagation()
        if (this.month === 0) {
          this.month = 11
          this.year = parseInt(this.year) - 1
        } else {
          this.month = parseInt(this.month) - 1
        }
        this.render(this.year, this.month)
        this.$emit('selectMonth', this.month + 1, this.year)
        this.$emit('prev', this.month + 1, this.year, this.day)
      }
    },
    //  下月
    next(e) {
      if (!this.monthSwiper.animating) {
        this.monthSwiper.slideNext()
        e.stopPropagation()
        if (this.month === 11) {
          this.month = 0
          this.year = parseInt(this.year) + 1
        } else {
          this.month = parseInt(this.month) + 1
        }
        this.render(this.year, this.month)
        this.$emit('selectMonth', this.month + 1, this.year)
        this.$emit('next', this.month + 1, this.year, this.day)
      }
    },
    // 选中日期
    select(k1, k2, e) {
      if (e !== undefined) e.stopPropagation()
      // 取消上次选中
      if (this.today.length > 0) {
        this.days.forEach(v => {
          v.forEach(vv => {
            vv.selected = false
          })
        })
      }
      // 设置当前选中天
      this.days[k1][k2].selected = true
      this.day = this.days[k1][k2].day
      this.today = [k1, k2]
      this.$emit('select', [
        this.year,
        this.zero ? this.zeroPad(this.month + 1) : this.month + 1,
        this.zero ? this.zeroPad(this.days[k1][k2].day) : this.days[k1][k2].day
      ])
      this.getLendDetail(this.year, this.month, this.day)
    },
    changeYear() {
      if (this.yearsShow) {
        this.yearsShow = false
        return false
      }
      this.yearsShow = true
      this.years = []
      for (let i = ~~this.year - 10; i < ~~this.year + 10; i++) {
        this.years.push(i)
      }
    },
    selectYear(value) {
      this.yearsShow = false
      this.year = value
      this.render(this.year, this.month)
      this.$emit('selectYear', value)
    },
    // 返回今天
    setToday() {
      let now = new Date()
      this.year = now.getFullYear()
      this.month = now.getMonth()
      this.day = now.getDate()
      this.render(this.year, this.month)
      this.monthSwiper.slideTo(this.month + 1, 0)
      // 遍历当前日找到选中
      this.days.forEach(v => {
        let day = v.find(vv => {
          return vv.day === this.day && !vv.disabled
        })
        if (day !== undefined) {
          day.selected = true
        }
      })
      this.getLendDetail(this.year, this.month, this.day)
    },
    // 日期补零
    zeroPad(n) {
      return String(n < 10 ? '0' + n : n)
    },
    initMonth() {
      const $this = this
      this.monthSwiper = new Swiper('#month', {
        loop: true,
        direction: 'vertical',
        on: {
          init() {
            if ($this.month === 0) {
              this.slideTo(1, 0)
            } else {
              this.slideTo($this.month - 0 + 1, 0)
            }
          }
        }
      })
    },
    getLendDetail(year, month, day) {
      this.$emit('getLendDetail', year, month, day)
    }
  },
  mounted() {
    this.init()
    this.initMonth()
  }
}
</script>

<style scoped lang="scss">
@import './../../assets/css/theme';
@import './../../assets/css/mixins';

.calendar {
  margin: auto;
  width: 100%;
  min-width: 300px;
  background: #fff;
  user-select: none;
  .calendar-tools {
    height: 70px;
    font-size: 20px;
    line-height: 40px;
    color: #5e7a88;
    span {
      cursor: pointer;
    }
    .calendar-info {
      height: 100%;
      padding-top: 3px;
      font-size: 16px;
      text-align: center;
      display: flex;
      justify-content: center;
      position: relative;
      > div.year {
        font-size: 18px;
        font-weight: 600;
        color: $color-text;
        line-height: 70px;
      }
      .calendar-prev {
        width: 7px;
        padding: 0 10px;
        line-height: 70px;
      }
      > div.month {
        width: 50px;
        height: 30px;
        line-height: 30px;
        color: $color-text;
        font-size: $font-size-medium;
        font-weight: 600;
        margin: 20px 0;
      }
      .calendar-next {
        width: 7px;
        padding: 0 10px;
        line-height: 70px;
      }
      .today {
        position: absolute;
        font-size: $font-size-small-s;
        line-height: 70px;
        right: 115px;
      }
    }
  }
  table {
    clear: both;
    width: 100%;
    margin-bottom: 10px;
    border-collapse: collapse;
    color: #444;
    .table-header {
      height: 30px;
      border-bottom: 1px solid #ebebeb;
      td {
        vertical-align: top;
      }
    }
    tr {
      height: 50px;
    }
    td {
      margin: 2px !important;
      padding: 0;
      width: 14.28571429%;
      height: 50px;
      text-align: center;
      font-size: 14px;
      line-height: 125%;
      cursor: pointer;
      position: relative;
      vertical-align: top;
      &.week {
        pointer-events: none !important;
        cursor: default !important;
      }
      &.disabled {
        color: #ccc;
        pointer-events: none !important;
        cursor: default !important;
        div {
          color: #ccc;
        }
      }
      span {
        display: block;
        width: 50px;
        height: 50px;
        font-size: 16px;
        line-height: 50px;
        margin: 0 auto;
        border-radius: 50%;
        &.isSpecial {
          line-height: 35px;
        }
      }
      &:not(.disabled) span.red {
        color: #ff543f;
      }
      &.selected span {
        background-color: #5e7a88;
        color: #fff;
      }
      .text {
        position: absolute;
        top: 28px;
        left: 0;
        right: 0;
        text-align: center;
        padding: 2px;
        font-size: 12px;
        line-height: 1.2;
        color: #444;
      }
      .isGregorianFestival,
      .isLunarFestival {
        color: #ff543f;
      }
      &.selected {
        span {
          &.red {
            background-color: #ff543f;
            color: #fff;
          }
        }
        .isGregorianFestival,
        .isLunarFestival {
          color: #fff;
        }
      }
    }
    thead {
      td {
        text-transform: uppercase;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
  .calendar-years {
    position: absolute;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: auto;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    &.show {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0px);
    }
    span {
      margin: 1px 5px;
      display: inline-block;
      width: 60px;
      line-height: 30px;
      border-radius: 20px;
      text-align: center;
      border: 1px solid #fbfbfb;
      color: #999;
      &.active {
        border: 1px solid #5e7a88;
        background-color: #5e7a88;
        color: #fff;
      }
    }
  }
}
</style>
