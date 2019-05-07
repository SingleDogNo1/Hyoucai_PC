<template>
  <div class="table-container">
    <div style="height:20px;font-size:12px;lint-height:20px;width:800px;margin: 10px auto;">
      <span style="color:#FB891F;cursor:pointer" @click="$router.push({name:'cjz-projects'})">返回上一级</span>
      <span style="color:#FB891F"> | </span>
      <span style="color:#FB891F;cursor:pointer" @click="$router.push({name:'cjz-projects'})">出借中</span>
      <span style="color:#FB891F"> > </span>
      <span>{{projectName}}</span>
    </div>
    <table>
      <thead>
      <tr>
        <th>累计利息收益(元)</th>
        <th>待收利息(元)</th>
        <th>加入日期</th>
        <th>到期时间</th>
        <th>出借本金(元)</th>
        <th>操作</th>
        <th v-if="showAutolend">设置自动出借</th>
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
          <button @click="$router.push({name:'cjz-zqList',params:{projectNo:$route.params.projectNo,invId: item.id}})">详情</button>
        </td>
        <td v-if="showAutolend">
          <el-switch
            :value="item.repeatStatus!==0"
            @change="handleSetAutolend(item)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
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
    <Dialog :show.sync="showDialogSet" title="设置自动出借，省心赚钱" :onConfirm="setAutoLend">
      <p class="dialog-text"><el-radio v-model="status" label="1">本金到期后自动出借</el-radio></p>
      <p class="dialog-text"><el-radio v-model="status" label="2">本息到期后自动出借</el-radio></p>
      <p class="dialog-text"><router-link target="_blank" class="agreement" :to="{ name: 'autoLendAgreement' }">自动出借服务条款</router-link></p>
    </Dialog>
    <Dialog :show.sync="showDialogCancel" :onConfirm="cancelAutoLend"> <p class="dialog-text">您确认要取消自动出借吗？</p> </Dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import { userProjectDetail, transferFeeCalculate, transferProject } from '@/api/djs/Mine/lend'
import { expireRepeat } from '@/api/djs/Mine/autoLend'
import { mapGetters } from 'vuex'
import Dialog from '@/components/Dialog/Dialog'

export default {
  name: 'detail',
  components: { Pagination, Dialog },
  data() {
    return {
      projectName: '',
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
      },
      showAutolend: false, // 是否支持自动出借
      showDialogSet: false,
      showDialogCancel: false,
      status: '1',
      invId: ''
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    handleSetAutolend(item) {
      if (item.repeatStatus === 0) {
        this.showDialogSet = true
        this.invId = item.id
        this.status = '1'
      } else {
        this.invId = item.id
        this.showDialogCancel = true
      }
    },
    setAutoLend() {
      expireRepeat({ invId: this.invId, repeatStatus: this.status }).then(res => {
        if (res.data.resultCode === '1') {
          this.getList()
        }
      })
    },
    cancelAutoLend() {
      expireRepeat({ invId: this.invId, repeatStatus: 0 }).then(res => {
        if (res.data.resultCode === '1') {
          this.getList()
        }
      })
    },
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
          this.projectName = res.data.list[0].projectName
          if (res.data.list[0].doubleBonuCouponEntity && res.data.list[0].doubleBonuCouponEntity.dbCouponRate !== null) {
            this.showAutolend = true
          }
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
    margin: 10px auto;
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
      button {
        width: 70px;
        height: 22px;
        background: rgba(251, 137, 31, 1);
        border-radius: 4px;
        color: #fff;
        font-size: 12px;
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
.dialog-text {
  text-align: center;
  /deep/ .el-radio span {
    font-size: 18px;
    &.el-radio__input {
      top: -2px;
    }
  }
  margin-bottom: 10px;
  .agreement {
    font-size: 14px;
    color: #fb7b1f;
    cursor: pointer;
  }
}
</style>
