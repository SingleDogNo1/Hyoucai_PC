<template>
  <div class="table-container">
    <table>
      <thead>
      <tr>
        <th>累计利息收益(元)</th>
        <th>待收利息(元)</th>
        <th>加入日期</th>
        <th>到期时间</th>
        <th>出借本金(元)</th>
        <th>操作</th>
        <th>设置自动出借</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in listDetail" :key="item.id">
        <td>{{ item.takeBackInterest }}</td>
        <td>{{ item.waitAllBackInterest }}</td>
        <td>{{ item.intSumStartDate.split(' ')[0] }}</td>
        <td>{{ item.invOverDate }}</td>
        <td>{{ item.totalPrinAmount }}</td>
        <td>
          <button @click="$router.push({name:'cjz-zqList',query:{projectNo: $route.params.projectNo}})">详情</button>
        </td>
        <td>
          <el-switch
            v-model="value2"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </td>
      </tr>
      </tbody>
    </table>
    <Pagination
      v-show="totalDetail > 0"
      class="pagination"
      :count-page="totalDetail"
      :cur-page="listQueryDetail.page"
      @handleCurrentChange="handleCurrentChange"
    ></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import { userProjectDetail, transferFeeCalculate, transferProject } from '@/api/djs/Mine/lend'
import { mapGetters } from 'vuex'

export default {
  name: 'detail',
  components: { Pagination },
  data() {
    return {
      dialogVisible: false,
      showMsg: false,
      resultMsg: '',
      showDialogTransfer: false,
      transferId: '',
      transferObj: null,
      projectNo: this.$route.params.projectNo,
      listDetail: null,
      totalDetail: null,
      listQueryDetail: {
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleTransfer(id) {
      transferFeeCalculate({ projectNo: this.projectNo, invId: id }).then(res => {
        if (res.data.resultCode === '1') {
          this.transferObj = res.data
          this.showDialogTransfer = true
          this.transferId = id
        }
      })
    },
    setTransfer() {
      transferProject({
        userName: this.user.userName,
        projectNo: this.projectNo,
        invId: this.transferId
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.getList()
        } else {
          this.resultMsg = res.data.resultMsg
          this.showMsg = true
        }
      })
    },
    handleCurrentChange(val) {
      this.listQueryDetail.page = val
      this.getList()
    },
    getList() {
      userProjectDetail({
        projectNo: this.projectNo,
        curPage: this.listQueryDetail.page,
        maxLine: this.listQueryDetail.size,
        invStatus: 'INPZ,INVI,INVY'
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.listDetail = res.data.list
          this.totalDetail = res.data.countPage
        }
      })
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.table-container {
  min-height: 800px;
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
      a {
        color: rgba(251, 137, 31, 1);
        cursor: pointer;
      }
    }
  }
}
/deep/ .Dialog .inner {
  width: 500px;
  padding: 30px 30px;
  .dialog-table {
    width: 100%;
    margin: 0 auto;
    thead {
      background: rgba(0, 131, 254, 0.09);
      font-size: 12px;
      color: rgba(74, 74, 74, 1);
    }
    tr {
      border: 1px solid rgba(227, 227, 227, 1);
      th,
      td {
        border: 1px solid rgba(227, 227, 227, 1);
        height: 50px;
        font-size: 12px;
        width: 80px;
        text-align: center;
      }
    }
  }
  .dialog-text {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    span {
      color: rgba(251, 137, 31, 1);
      cursor: pointer;
    }
  }
}
/deep/ .ZQDetail {
  .el-dialog__header {
    padding: 0;
  }
  font-size: 14px;
  .title {
    padding-left: 20px;
    height: 60px;
    background: rgba(0, 131, 254, 0.09);
    line-height: 60px;
    span {
      color: rgba(155, 155, 155, 1);
      &.blue {
        color: rgba(0, 131, 254, 1);
        margin-left: 30px;
        cursor: pointer;
      }
    }
  }
  .section {
    border-bottom: 1px solid rgba(235, 235, 235, 1);
    margin-bottom: 30px;
    &:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    h3 {
      font-size: 14px;
      border-left: 6px solid rgba(251, 157, 31, 1);
      padding-left: 8px;
      margin-bottom: 20px;
    }
    div.content-1 {
      display: flex;
      padding-bottom: 30px;
      span {
        margin-right: 30px;
      }
      &.rows {
        justify-content: space-around;
        .column {
          display: flex;
          flex-direction: column;
          text-align: center;
          span:first-child {
            font-size: 18px;
            color: rgba(251, 137, 31, 1);
            margin-bottom: 10px;
          }
        }
      }
    }
    div.content-2 {
      span {
        float: left;
        margin-right: 60px;
        margin-bottom: 20px;
      }
      &:after {
        display: block;
        content: '';
        clear: both;
      }
    }
  }
}
.pagination {
  margin-top: 20px;
}
</style>
