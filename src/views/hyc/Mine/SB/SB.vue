<template>
  <div class="sanbiao">
    <div class="detail-table" v-if="invList.length > 0">
      <!-- 申请中 -->
      <table cellspacing="0" v-if="invList && invList.length > 0">
        <thead>
          <th style="width: 270px;">项目名称</th>
          <th style="width: 120px;">出借本金（元）</th>
          <th style="width: 120px;">利息（元）</th>
          <th style="width: 110px;">历史平均年化收益率</th>
          <th style="width: 100px;">锁定期</th>
          <th>查看详情</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invList" :key="index">
            <td>
              <span>{{ item.productName }}</span> <em>{{ item.invStatusDesc }}</em>
            </td>
            <td v-if="item.invStatus === 'INTK'">{{ item.applyAmount }}</td>
            <td v-else>{{ item.invAmount }}</td>
            <td>{{ item.waitAmount }}</td>
            <td>{{ item.yearRate }}</td>
            <td style="text-align: left;">
              <span>{{ item.interestStartDate }}</span> <span> - </span>
              <span>{{ item.interestEndDate }}</span>
            </td>
            <td style="cursor:pointer; color:#FB891F;" v-if="item.invStatus === 'INVI'" @click="showDetail(item.productId, item.id)">
              <span style="color: #FB891F;">查看</span>
            </td>
            <td style="cursor:pointer; color:#FB891F;" v-else><span style="color: #eee;">查看</span></td>
          </tr>
        </tbody>
      </table>
      <!-- 分页器 -->
      <pagination
        class="page"
        :show="paginationOption.show"
        :cur-page="paginationOption.curPage"
        :count-page="paginationOption.countPage"
        @handleCurrentChange="changePage"
      ></pagination>
    </div>
    <NoData v-else></NoData>
  </div>
</template>

<script>
import { getZXTList } from '@/api/hyc/Mine/lend'
import pagination from '@/components/pagination/pagination'
import NoData from '@/components/NoData'

export default {
  name: 'SB',
  mixins: [],
  components: {
    pagination,
    NoData
  },
  data() {
    return {
      dateStatus: this.$route.params.date,
      invStatus: this.$route.params.status,
      invList: [], // 数据列表
      paginationOption: {
        curPage: 1,
        countPage: 0
      }
    }
  },
  props: {},
  watch: {
    '$route.params.date'(newVal) {
      this.dateStatus = newVal
      this.getZXTList(newVal, this.invStatus)
    },
    '$route.params.status'(newVal) {
      this.invStatus = newVal
      this.getZXTList(this.dateStatus, newVal)
    }
  },
  methods: {
    getZXTList(dateStatus, invStatus, curPage) {
      getZXTList({
        dateStatus: dateStatus,
        invStatus: invStatus,
        curPage: curPage
      }).then(res => {
        this.invList = res.data.data.list
        this.paginationOption.countPage = res.data.data.countPage
      })
    },
    showDetail(productId, id) {
      this.$router.push({
        name: 'ZXTDetail',
        query: {
          productId,
          id
        }
      })
    },
    changePage(page) {
      this.paginationOption.curPage = page
      this.getZXTList(this.dateStatus, this.invStatus, page)
    }
  },
  created() {
    this.getZXTList(this.dateStatus, this.invStatus)
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.sanbiao {
  min-height: 512px;
  background: #fff;
  padding-top: 25px;
  position: relative;
  .nav {
    display: flex;
    height: 60px;
    border-top: 1px solid #e3e3e3;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    &.status {
      border-bottom: 1px solid #e3e3e3;
      margin-bottom: 20px;
    }
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
        width: 80px;
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
    .no-data {
      height: 100%;
      text-align: center;
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
    }
    td {
      span {
        line-height: 1.8;
      }
      em {
        color: #fff;
        padding: 3px 10px;
        margin-left: 10px;
        background: #099ef5;
        border-radius: 5px;
        position: relative;
        &::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-right-color: #099ef5;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .page {
    margin-top: 25px;
  }
}
</style>
