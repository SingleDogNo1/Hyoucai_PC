<template>
  <div class="planDetail">
    <div class="nav">
      <h1>状态</h1>
      <ul>
        <li v-for="(item, index) in status" :key="index" :class="{ active: index === statusIndex }" @click="changeStatus(index, item.statusCode)">
          {{ item.statusName }}
        </li>
      </ul>
    </div>
    <div class="detail-table">
      <!-- 申请中 -->
      <table cellspacing="0" v-if="invList.length > 0 && status[statusIndex].statusCode === 'JHB_SQZ'">
        <thead>
          <th>项目名称</th>
          <th>申请本金（元）</th>
          <th>历史平均年化收益率（元）</th>
          <th>申请时间</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invList" :key="index">
            <td>{{ item.itemName && item.productName ? item.itemName : item.productName }}</td>
            <td>{{ item.applyAmount }}</td>
            <td>{{ item.yearRate }}</td>
            <td>{{ item.invDate }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 出借中 -->
      <table cellspacing="0" v-if="invList.length > 0 && status[statusIndex].statusCode === 'JHB_TZZ'">
        <thead>
          <th style="width: 160px;">项目名称</th>
          <th style="width: 140px;">出借本金（元）</th>
          <th style="width: 170px;">历史平均年化收益率（元）</th>
          <th style="width: 120px;">利息（元）</th>
          <th style="width: 120px;">锁定期</th>
          <th>操作</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invList" :key="index">
            <td>{{ item.itemName && item.productName ? item.itemName : item.productName }}</td>
            <td>{{ item.invAmount }}</td>
            <td>{{ item.yearRate }}</td>
            <td>
              <p v-if="item.interest">
                {{ item.interest }}<i v-if="parseFloat(item.couponAmt) !== 0">+{{ item.couponAmt }}</i>
              </p>
              <p v-else>0</p>
            </td>
            <td>
              <span>{{ item.interestStartDate }}</span> <span>-</span>
              <p>{{ item.interestEndDate }}</p>
            </td>
            <td style="cursor:pointer;" @click="showLendDetail(item.id)">查看</td>
          </tr>
        </tbody>
      </table>
      <!-- 已结清 -->
      <table cellspacing="0" v-if="invList.length > 0 && status[statusIndex].statusCode === 'JHB_YJQ'">
        <thead>
          <th>项目名称</th>
          <th>返还本金（元）</th>
          <th>历史平均年化收益率（元）</th>
          <th>获得收益（元）</th>
          <th>锁定期</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invList" :key="index">
            <td>{{ item.itemName && item.productName ? item.itemName : item.productName }}</td>
            <td>{{ item.returnAmount }}</td>
            <td>{{ item.yearRate }}</td>
            <td>
              <p v-if="item.interest">
                {{ item.interest }}<i v-if="parseFloat(item.couponAmt) !== 0">+{{ item.couponAmt }}</i>
              </p>
              <p v-else>0</p>
            </td>
            <td>
              <span>{{ item.interestStartDate }}</span> <span>-</span>
              <p>{{ item.interestEndDate }}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 已退款 -->
      <table cellspacing="0" v-if="invList.length > 0 && status[statusIndex].statusCode === 'JHB_YTK'">
        <thead>
          <th>项目名称</th>
          <th>申请本金（元）</th>
          <th>历史平均年化收益率（元）</th>
          <th>申请时间</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invList" :key="index">
            <td>{{ item.itemName && item.productName ? item.itemName : item.productName }}</td>
            <td>{{ item.refundAmount }}</td>
            <td>{{ item.yearRate }}</td>
            <td>{{ item.refundDate }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页器 -->
      <pagination class="page" :show="paginationOption.show" :countPage="paginationOption.countPage" @handleCurrentChange="changePage"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import { getInvestStatusApi, getDefaultStatusApi, getQSTList } from '@/api/hyc/Mine/lend'

export default {
  name: 'planDetail',
  mixins: [],
  components: {
    pagination
  },
  data() {
    return {
      status: [],
      statusIndex: 0,
      invList: [],
      paginationOption: {
        countPage: 0
      }
    }
  },
  props: {},
  watch: {},
  methods: {
    showLendDetail(id) {
      console.log(id)
      // this.$router.push({
      //   name: '',
      //   query: {
      //     id: id
      //   }
      // })
    },
    changePage(page) {
      this.getInvestDetail(this.status[this.statusIndex].statusCode, page)
    },
    changeStatus(index, status) {
      this.statusIndex = index
      this.getInvestDetail(status)
    },
    getInvestDetail(invStatus, curPage) {
      getQSTList({
        invStatus: invStatus,
        curPage: curPage
      }).then(res => {
        this.invList = res.data.data.list
        this.paginationOption.countPage = res.data.data.countPage
      })
    }
  },
  created() {
    const $this = this
    async function initStatus() {
      // 获取状态
      await getInvestStatusApi({
        projectType: 2
      }).then(res => {
        $this.status = res.data.data.list
      })
      // 获取默认显示的状态
      await getDefaultStatusApi().then(res => {
        const status = res.data.data.invStatus
        $this.status.find((value, index) => {
          if (value.statusCode === status) {
            $this.statusIndex = index
          }
        })
      })
      // 渲染默认显示的列表
      await $this.getInvestDetail($this.status[$this.statusIndex].statusCode)
    }
    initStatus()
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.planDetail {
  .nav {
    display: flex;
    height: 60px;
    border: 1px solid #e3e3e3;
    margin-bottom: 20px;
    h1 {
      width: 140px;
      height: 100%;
      line-height: 60px;
      background: #f8f8fb;
      border-right: 1px solid #e3e3e3;
      font-size: $font-size-small;
      color: $color-text;
      text-align: center;
    }
    ul {
      flex: 1;
      display: flex;
      background: #fff;
      li {
        cursor: pointer;
        width: 120px;
        line-height: 60px;
        text-align: center;
        color: $color-text;
        font-size: $font-size-small-s;
        &.active {
          color: $color-theme;
        }
      }
    }
  }
  .detail-table {
    min-height: 432px;
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
    }
  }
  .page {
    margin-top: 25px;
  }
}
</style>
