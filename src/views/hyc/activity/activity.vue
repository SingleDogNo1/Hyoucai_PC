<template>
  <div class="activity">
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <a :href="item.url">
          <img class="activityPic" :src="item.picUrl" alt="" /> <span class="activityDate">活动期限：{{ item.startTime }}-{{ item.endTime }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHot } from '@/api/hyc/activity/activity'
export default {
  name: 'activity',
  mixins: [],
  components: {},
  data() {
    return {
      list: []
    }
  },
  props: {},
  watch: {},
  methods: {
    getHot() {
      let data = {
        curPage: '1',
        maxLine: '10'
      }
      getHot(data).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.list = data.list
          this.list.forEach(function(item) {
            /* eslint-disable */
            item.startTime = item.startTime.replace(/\-/g, '.')
            item.endTime = item.endTime.replace(/\-/g, '.')
            /* eslint-disable */
            let str1 = item.startTime.substring('0', '4')
            let str2 = item.endTime.substring('0', '4')
            if (str1 ===  str2) {
              item.endTime = item.endTime.substring('5', '10')
            }
          })
        }
      })
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getHot()
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.activity {
  width: 100%;
  background: #f4f4f4;
  ul {
    width: 1140px;
    min-height: 400px;
    margin: 0 auto;
    padding: 10px 0 60px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    li {
      width: 360px;
      height: 210px;
      background: #ffffff;
      margin: 30px 0 0 30px;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      box-sizing: border-box;
      .activityPic {
        display: inline-block;
        width: 320px;
        height: 140px;
        padding: 20px 20px 0 20px;
      }
      .activityDate {
        display: inline-block;
        width: 100%;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        font-family: PingFangSC-Regular, sans-serif;
        color: #9b9b9b;
        text-indent: 20px;
        padding: 18px 0;
      }
    }
    li:nth-child(3n + 1) {
      margin-left: 0;
    }
  }
}
</style>
