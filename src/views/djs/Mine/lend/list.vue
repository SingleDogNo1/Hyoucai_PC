<template>
  <div class="lend-list">
    <router-view></router-view>
    <div class="table-container" v-if="tabIndex === 0">
      <table>
        <thead>
          <tr>
            <th>项目名称</th>
            <th>累计利息收益（元）</th>
            <th>历史平均年化收益率</th>
            <th>加入本金（元）</th>
            <th>购买笔数</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in InvestingList" :key="item.id">
            <td>{{ item.projectName }}</td>
            <td>{{ item.incomeAmount }}</td>
            <td>
              <span v-if="item.invRate === item.maxInvRate">{{ item.invRate }}%</span>
              <span v-else>{{ item.invRate }}% ~ {{ item.maxInvRate }}%</span>
            </td>
            <td>{{ item.invAmount }}</td>
            <td>
              <span class="red">{{ item.invCount }}</span
              >笔进行中
            </td>
            <td><span class="link" @click="$router.push({ name: 'lendDetail', query: { projectNo: item.projectNo } })">查看</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-container" v-if="tabIndex === 1">
      <table>
        <thead>
          <tr>
            <th>项目名称</th>
            <th>转让价格（元）</th>
            <th>转让日期</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in InvestedList" :key="item.id">
            <td>{{ item.projectName }}</td>
            <td>{{ item.transferAmount }}</td>
            <td>{{ item.transferTime.substr(0, 10) }}</td>
            <td>已转让</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-show="investedTotal > 0"
        class="pagination"
        :count-page="investedTotal"
        :cur-page="listQueryInvested.page"
        @handleCurrentChange="handleInvestedCurrentChange"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import { userProjectList, userProjectDetail } from '@/api/djs/Mine/lend'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'list',
  components: { Pagination },
  data() {
    return {
      tabIndex: 0,
      InvestingList: null,
      InvestedList: null,
      listQueryInvested: {
        page: 1,
        size: 10
      },
      investedTotal: null,
      settlementFlags: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleInvestedCurrentChange(val) {
      this.listQueryInvested.page = val
      this.getInvestedList()
    },
    getInvestedList() {
      userProjectDetail({ invStatus: 'INVZ', curPage: this.listQueryInvested.page, maxLine: this.listQueryInvested.size }).then(res => {
        if (res.data.resultCode === '1') {
          this.InvestedList = res.data.list
          this.investedTotal = res.data.countPage
        }
      })
    },
    getInvestingList() {
      userProjectList({ userName: this.user.userName }).then(res => {
        if (res.data.resultCode === '1') {
          this.InvestingList = res.data.list
          this.setInvTotalAmt(res.data.invTotalAmt)
          this.setTackBackInt(res.data.tackBackInt)
        }
      })
    },
    ...mapMutations({
      setInvTotalAmt: 'SET_INVTOTALAMT',
      setTackBackInt: 'SET_TACKBACKINT'
    })
  },
  created() {
    //判斷settlementFlags (0-未结清 1-已结清)
    this.settlementFlags = this.$route.query.settlementFlags
    if (this.settlementFlags === '1') {
      this.tabIndex = 1
    }
    this.getInvestingList()
    this.getInvestedList()
  }
}
</script>

<style scoped lang="scss">
.lend-list {
  background: #fff;
  .tab {
    border: 1px solid #e5e5e5;
    height: 60px;
    .tab-item {
      float: left;
      width: 120px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &.label {
        cursor: default;
        width: 140px;
        background: rgba(248, 248, 251, 1);
        border-right: 1px solid #e5e5e5;
      }
      &.active {
        color: rgba(251, 137, 31, 1);
      }
    }
  }
  .table-container {
    min-height: 800px;
  }
  table {
    margin: 20px auto;
    width: 800px;
    thead {
      background: rgba(0, 131, 254, 0.09);
      font-size: 12px;
      color: rgba(74, 74, 74, 1);
    }
    tr {
      border: 1px solid rgba(227, 227, 227, 1);
    }
    th,
    td {
      height: 50px;
      font-size: 12px;
      width: 80px;
      text-align: center;
      span {
        &.red {
          color: red;
        }
        &.link {
          color: rgba(251, 137, 31, 1);
          cursor: pointer;
        }
      }
    }
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>
