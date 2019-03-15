<template>
  <div class="planDetail">
    <div class="detail-table" v-if="invList.length > 0">
      <!-- 申请中 -->
      <table cellspacing="0" v-if="invList.length > 0 && invStatus === 'JHB_SQZ'">
        <thead>
          <th>项目名称</th>
          <th>申请本金（元）</th>
          <th>历史平均年化收益率</th>
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
      <table cellspacing="0" v-if="invList.length > 0 && invStatus === 'JHB_TZZ'">
        <thead>
          <th style="width: 160px;">项目名称</th>
          <th style="width: 140px;">出借本金（元）</th>
          <th style="width: 170px;">历史平均年化收益率</th>
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
            <td style="text-align: left;">
              <span>{{ item.interestStartDate }}</span> <span>-</span> <span>{{ item.interestEndDate }}</span>
            </td>
            <td style="cursor:pointer;" @click="showLendDetail(item.id, item.projectType)"><span style="color: #FB891F;">查看</span></td>
          </tr>
        </tbody>
      </table>
      <!-- 已结清 -->
      <table cellspacing="0" v-if="invList.length > 0 && invStatus === 'JHB_YJQ'">
        <thead>
          <th>项目名称</th>
          <th>返还本金（元）</th>
          <th>历史平均年化收益率</th>
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
            <td style="text-align: left;">
              <span>{{ item.interestStartDate }}</span> <span>-</span> <span>{{ item.interestEndDate }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 已退款 -->
      <table cellspacing="0" v-if="invList.length > 0 && invStatus === 'JHB_YTK'">
        <thead>
          <th>项目名称</th>
          <th>退款本金（元）</th>
          <th>历史平均年化收益率</th>
          <th>申请本金（元）</th>
          <th>退款时间</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invList" :key="index">
            <td>{{ item.itemName && item.productName ? item.itemName : item.productName }}</td>
            <td>{{ item.refundAmount }}</td>
            <td>{{ item.yearRate }}</td>
            <td>{{ item.applyAmount }}</td>
            <td>{{ item.refundDate }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 分页器 -->
      <pagination
        class="page"
        :show="paginationOption.show"
        :cur-page="paginationOption.curPage"
        :countPage="paginationOption.countPage"
        @handleCurrentChange="changePage"
      ></pagination>
    </div>
    <NoData class="empty-data" v-else></NoData>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import NoData from '@/components/NoData'
import { getQSTList } from '@/api/hyc/Mine/lend'

export default {
  name: 'planDetail',
  components: {
    pagination,
    NoData
  },
  data() {
    return {
      invStatus: this.$route.params.status,
      tabShow: this.$route.query.tab,
      invList: [],
      paginationOption: {
        curPage: 1,
        countPage: 0
      }
    }
  },
  watch: {
    '$route.params.status'(newVal) {
      this.invStatus = newVal
      this.getQSTList(newVal)
    }
  },
  methods: {
    getQSTList(invStatus, page) {
      getQSTList({
        invStatus: invStatus,
        curPage: page
      }).then(res => {
        this.invList = res.data.data.list
        this.paginationOption.countPage = res.data.data.countPage
      })
    },
    showLendDetail(id, type) {
      this.$router.push({
        name: 'QSTDetail',
        query: {
          id: id,
          type: type
        }
      })
    },
    changePage(page) {
      this.paginationOption.curPage = page
      this.getQSTList(this.invStatus, page)
    }
  },
  created() {
    this.getQSTList(this.invStatus)
  },
  mounted() {
    setTimeout(() => {
      if (this.tabShow) {
        this.$router.push({
          name: 'QSTList',
          params: {
            status: this.tab
          }
        })
      }
    }, 200)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.planDetail {
  min-height: 512px;
  background: #fff;
  padding-top: 25px;
  position: relative;
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
    padding-bottom: 25px;
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
  .empty-data {
    height: 460px;
  }
}
</style>
