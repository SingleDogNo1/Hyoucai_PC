<template>
  <div class="autoLend">
    <h1>自动出借</h1>
    <div class="filter">
      <button @click="setRepeatStatus('')" :class="{ active: repeatStatus === '' }">全部</button>
      <button @click="setRepeatStatus(1)" :class="{ active: repeatStatus === 1 }">已设置</button>
      <button @click="setRepeatStatus(0)" :class="{ active: repeatStatus === 0 }">未设置</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>项目名称</th>
          <th>交易流水</th>
          <th>出借本金(元)</th>
          <th>加入日期</th>
          <th>到期时间</th>
          <th>复投加息</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.projectName }}</td>
          <td>{{ item.txSn }}</td>
          <td>{{ item.invAmount }}</td>
          <td>{{ item.intSumStartDate }}</td>
          <td>{{ item.invOverDate }}</td>
          <td>{{ item.doubleBonuCouponEntity && item.doubleBonuCouponEntity.dbValidDays !== 0 ? `+${item.doubleBonuCouponEntity.dbCouponRate}%` : '无' }}</td>
          <td>
            <span v-if="item.repeatStatus === 0" @click="handleSetAutoLend(item.id)">设置自动出借</span>
            <span v-if="item.repeatStatus === 1" @click="handleCancelAutoLend(item.id)">取消本金自动出借</span>
            <span v-if="item.repeatStatus === 2" @click="handleCancelAutoLend(item.id)">取消本息自动出借</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination v-show="total > 0" class="pagination" :count-page="total" :cur-page="page" @handleCurrentChange="handleCurrentChange"></Pagination>
    <Dialog :show.sync="showDialogSet" title="设置自动出借，省心赚钱" :onConfirm="setAutoLend">
      <p class="dialog-text"><el-radio v-model="status" label="1">本金到期后自动出借</el-radio></p>
      <p class="dialog-text"><el-radio v-model="status" label="2">本息到期后自动出借</el-radio></p>
      <p class="dialog-text"><span class="agreement" @click="$router.push({ name: 'autoLendAgreement' })">自动出借服务条款</span></p>
    </Dialog>
    <Dialog :show.sync="showDialogCancel" :onConfirm="cancelAutoLend"> <p class="dialog-text">您确认要取消自动出借吗？</p> </Dialog>
  </div>
</template>

<script>
import { investingProject, expireRepeat } from '@/api/djs/Mine/autoLend'
import { mapGetters } from 'vuex'
import Pagination from '@/components/pagination/pagination'
import Dialog from '@/components/Dialog/Dialog'

export default {
  name: 'autoLend',
  mixins: [],
  components: { Pagination, Dialog },
  data() {
    return {
      repeatStatus: '',
      items: [],
      page: 1,
      size: 10,
      total: null,
      showDialogSet: false,
      showDialogCancel: false,
      invId: '',
      status: '1'
    }
  },
  props: {},
  watch: {},
  methods: {
    handleSetAutoLend(id) {
      this.showDialogSet = true
      this.invId = id
      this.status = '1'
    },
    setAutoLend() {
      expireRepeat({ invId: this.invId, repeatStatus: this.status }).then(res => {
        if (res.data.resultCode === '1') {
          this.getList()
        }
      })
    },
    handleCancelAutoLend(id) {
      this.showDialogCancel = true
      this.invId = id
    },
    cancelAutoLend() {
      expireRepeat({ invId: this.invId, repeatStatus: 0 }).then(res => {
        if (res.data.resultCode === '1') {
          this.getList()
        }
      })
    },
    setRepeatStatus(status) {
      this.repeatStatus = status === '' ? '' : status
      this.getList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    getList() {
      investingProject({ userName: this.user.userName, curPage: this.page, maxLine: this.size, repeatStatus: this.repeatStatus }).then(res => {
        this.items = res.data.list
        this.total = res.data.countPage
      })
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created() {
    this.getList()
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.autoLend {
  height: 100%;
  background: #fff;
  border-top: 3px solid #f7be39;
  padding: 20px;
  h1 {
    font-size: 16px;
    font-weight: 400;
    color: rgba(90, 90, 90, 1);
  }
  .filter {
    margin-top: 30px;
    button {
      width: 88px;
      height: 36px;
      margin-right: 20px;
      border-radius: 6px;
      border: 1px solid rgba(251, 137, 31, 1);
      background: #fff;
      color: rgba(251, 137, 31, 1);
      font-size: 14px;
      cursor: pointer;
      &.active {
        background: rgba(251, 137, 31, 1);
        color: #fff;
        font-size: 16px;
      }
    }
  }
  table {
    width: 100%;
    margin-top: 40px;
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
        color: rgba(251, 137, 31, 1);
        cursor: pointer;
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
}
</style>
