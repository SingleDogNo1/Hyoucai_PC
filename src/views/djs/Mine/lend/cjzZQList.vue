<template>
  <div class="detail">
    <div style="height:20px;font-size:12px;lint-height:20px;width:800px;margin: 10px auto;">
      <span style="color:#FB891F;cursor:pointer" @click="$router.push({ name: 'cjz-project', params: { projectNo } })">返回上一级</span>
      <span style="color:#FB891F"> | </span>
      <span style="color:#FB891F;cursor:pointer" @click="$router.push({ name: 'cjz-projects' })">出借中</span>
      <span style="color:#FB891F"> > </span>
      <span style="color:#FB891F;cursor:pointer" @click="$router.push({ name: 'cjz-project', params: { projectNo } })">{{ projectName }}</span>
      <span style="color:#FB891F"> > </span>
      <span>债权列表</span>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>流水号</th>
            <th>借款人约定的借款利率</th>
            <th>借款金额(元)</th>
            <th>还款状态</th>
            <th>还款进度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in listZQ" :key="item.id">
            <td>{{ item.applicationNo }}</td>
            <td>{{ item.investRate }}%</td>
            <td>{{ item.invAmt }}</td>
            <td>{{ item.repaymentStatus }}</td>
            <td>{{ item.numberPeriod }}/ {{ item.repaymentPeriod }}</td>
            <td><a @click="showZQDetail(item)">查看</a></td>
          </tr>
        </tbody>
      </table>
      <Pagination
        v-show="totalZQ > 0"
        class="pagination"
        :count-page="totalZQ"
        :cur-page="listQueryZQ.page"
        @handleCurrentChange="handleCurrentChangeZQ"
      ></Pagination>
    </div>
    <Dialog :show.sync="showDialogTransfer" title="赎回" :onConfirm="setTransfer" confirmText="确认赎回">
      <table class="dialog-table" v-if="transferObj">
        <thead>
          <tr>
            <th>赎回手续费说明</th>
            <th>累计收益(元)</th>
            <th>赎回金额(元)</th>
            <th>赎回手续费(元)</th>
            <th>实际赎回金额(元)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ transferObj.costdes }}</td>
            <td>{{ transferObj.inComeAmt }}</td>
            <td>{{ transferObj.transferAmt }}</td>
            <td>{{ transferObj.transferFee }}</td>
            <td>{{ transferObj.factTransferAmt }}</td>
          </tr>
        </tbody>
      </table>
      <p class="dialog-text">同意<span class="agreement" @click="$router.push({ name: 'debtAssignmentAgreement' })">《债权转让协议》</span></p>
    </Dialog>
    <Dialog :show.sync="showMsg" title="汇有财温馨提示" :singleButton="true"
      ><p class="dialog-text">{{ resultMsg }}</p></Dialog
    >
    <el-dialog class="ZQDetail" title="提示" :visible.sync="dialogVisible" width="840" top="20vh">
      <div slot="title" class="title">
        <span>借款流水号：{{ ZQDetail.applicationNo }}</span>
      </div>
      <div class="section">
        <h3>个人消费</h3>
        <div class="content-1 rows">
          <div class="column">
            <span>{{ ZQDetail.invAmt }}元</span><span>借款金额</span>
          </div>
          <div class="column">
            <span>{{ ZQDetail.numberPeriod }}/{{ ZQDetail.repaymentPeriod }}</span
            ><span>还款进度</span>
          </div>
          <div class="column">
            <span>{{ ZQDetail.repayTypeName }}</span
            ><span>还款方式</span>
          </div>
          <div class="column">
            <span>{{ ZQDetail.repaymentStatus }}</span
            ><span>还款状态</span>
          </div>
          <div class="column">
            <span>{{ ZQDetail.investRate }}%</span><span>借款人约定的借款利率</span>
          </div>
        </div>
      </div>
      <div class="section">
        <h3>贷款详情</h3>
        <div class="content-2">
          <span>借款流水号：{{ ZQDetail.applicationNo }}</span> <span>贷款期限：{{ ZQDetail.loanTerm }}个月</span>
          <span>还款方式：{{ ZQDetail.repayTypeName }}</span> <span>募标起始日期：{{ ZQDetail.loanSignDate }}</span>
        </div>
      </div>
      <div class="section">
        <h3>借款人信息</h3>
        <div class="content-2">
          <span>借款人姓名：{{ ZQDetail.ownBondName }}</span> <span>性别：{{ ZQDetail.gender }}</span> <span>年龄：{{ ZQDetail.age }}</span>
        </div>
      </div>
      <div class="section">
        <h3>协议</h3>
        <div class="content-2">
          <template v-for="(item, index) in ZQDetail.agreementList">
            <a :key="index" :href="item.agreementUrl + '?relationId=' + ZQDetail.id">{{ item.agreementName }}</a>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import Dialog from '@/components/Dialog/Dialog'
import { transferFeeCalculate, transferProject, bondRelationByInvId, userProjectDetail } from '@/api/djs/Mine/lend'
import { mapGetters } from 'vuex'

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
      invId: this.$route.params.invId,
      tabIndex: 0,
      ZQDetail: {},
      listZQ: null,
      totalZQ: null,
      listQueryDetail: {
        page: 1,
        size: 10
      },
      listQueryZQ: {
        page: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    showZQDetail(item) {
      this.ZQDetail = item
      this.dialogVisible = true
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
    handleCurrentChangeZQ(val) {
      this.listQueryZQ.page = val
      this.getListBondRelation()
    },
    getListBondRelation() {
      bondRelationByInvId({
        userName: this.user.userName,
        invId: this.invId,
        curPage: this.listQueryZQ.page,
        maxLine: this.listQueryZQ.size
      }).then(res => {
        if (res.data.resultCode === '1') {
          this.listZQ = res.data.list
          this.totalZQ = res.data.countPage
        }
      })
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
        }
      })
    }
  },
  created() {
    this.getListBondRelation()
    this.getList()
  }
}
</script>

<style scoped lang="scss">
.detail {
  background: #fff;
  .tab {
    border: 1px solid #e5e5e5;
    height: 63px;
    .tab-item {
      float: left;
      width: 100px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &.active {
        border-top: 3px solid #fb9d1f;
        border-left: 1px solid #e5e5e5;
        border-right: 1px solid #e5e5e5;
        border-bottom: 1px solid #fff;
        color: rgba(251, 137, 31, 1);
      }
    }
  }
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
        span {
          display: inline-block;
          height: 20px;
          line-height: 20px;
          color: #fff;
          width: 70px;
          background: rgba(251, 137, 31, 1);
          border-radius: 4px;
          opacity: 0.4955;
          &.active {
            cursor: pointer;
            opacity: 1;
          }
        }
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
        a {
          color: #606266;
        }
      }
    }
  }
  .pagination {
    margin-top: 20px;
  }
}
</style>
