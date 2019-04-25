<template>
  <div class="table-container" >
    <table>
      <thead>
      <tr>
        <th>项目名称</th>
        <th>返还本金（元）</th>
        <th>锁定期</th>
        <th>状态</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in InvestedList" :key="item.id">
        <td>{{ item.projectName }}</td>
        <td>{{ item.invAmount }}</td>
        <td>{{ item.invOverDate.substr(0, 10) }}</td>
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
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import { userProjectDetail } from '@/api/djs/Mine/lend'
import { mapGetters } from 'vuex'
export default {
  name: 'yjq',
  components: { Pagination },
  data() {
    return {
      investedTotal: null,
      listQueryInvested: {
        page: 1,
        size: 10
      },
      InvestedList: null
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
    }
  },
  created() {
    this.getInvestedList()
  }
}
</script>

<style scoped lang="scss">
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
</style>
