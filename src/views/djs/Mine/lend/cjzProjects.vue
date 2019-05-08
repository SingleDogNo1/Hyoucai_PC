<template>
  <div class="table-container">
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
          <span v-else>{{ item.invRate }}% - {{ item.maxInvRate }}%</span>
        </td>
        <td>{{ item.invAmount }}</td>
        <td>
              <span class="red">{{ item.invCount }}</span
              >笔进行中
        </td>
        <td><span class="link" @click="$router.push({ name: 'cjz-project', params: { projectNo: item.projectNo } })">查看</span></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { userProjectList } from '@/api/djs/Mine/lend'
export default {
  name: 'cjz',
  data() {
    return {
      InvestingList: null,
      listQueryInvested: {
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
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
    this.getInvestingList()
  }
}
</script>

<style scoped lang="scss">
.table-container {
  min-height: 800px;
  position: relative;
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
</style>
