<template>
  <div class="rc-wrapper">
    <div class="inner">
      <div class="top">
        <h3>交易记录</h3>
        <ul>
          <li>
            <div>交易记录</div>
            <div class="tag" :class="{ active: timeIndex === i }" v-for="(item, i) in times" :key="i" @click="selectTime(i, item)">{{ item.key }}</div>
          </li>
          <li v-if="status.length">
            <div>状态</div>
            <div class="tag" :class="{ active: statusIndex === i }" v-for="(item, i) in status" :key="i" @click="selectStatus(i, item)">
              {{ item.key }}
            </div>
          </li>
        </ul>
      </div>
      <div class="content">
        <el-table :data="tableData" border class="record-table">
          <el-table-column prop="txDate" label="交易日期"> </el-table-column>
          <el-table-column prop="txType" label="交易类型"> </el-table-column>
          <el-table-column label="金额明细(元)">
            <template slot-scope="scope">
              <a :class="matchClass(scope.row.txAmount)">{{ scope.row.txAmount | plusFilter }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="txDesc" label="交易描述"> </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
          <pagination v-if="total" :total-count="total" :size-val="size" :page-val="page" @handleCurrentChange="handleCurrentChange"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination/pagination'
import { getTypes, getRecord } from '@/api/hyc/Mine/record'
import { getUser } from '@/assets/js/cache'
import { getAuth } from '@/assets/js/utils'

const ERR_OK = '1'
export default {
  name: 'record',
  data() {
    return {
      times: [],
      timeIndex: 0,
      timeType: '',
      status: [],
      statusIndex: 0,
      tranType: '',
      tableData: [],
      page: 1,
      size: 10,
      total: 0,
      userName: getUser().userName,
      authorization: getAuth()
    }
  },
  filters: {
    plusFilter(data) {
      let result = data
      if (data.indexOf('-') === -1) {
        result = '+' + data
      }
      return result
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.getRecordList()
    },
    getTypes() {
      let params1 = {
        userName: this.userName,
        authorization: this.authorization
      }
      getTypes(params1).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.status = data.data.txStatus
          this.times = data.data.txDate
          this.timeType = this.times[0].value
          this.tranType = this.status[0].value
          this.getRecordList()
        }
      })
    },
    getRecordList() {
      let params = {
        userName: this.userName,
        txDate: this.timeType,
        txType: this.tranType,
        curPage: this.page,
        maxLine: this.size,
        authorization: this.authorization
      }
      getRecord(params).then(res => {
        let data = res.data
        if (data.resultCode === ERR_OK) {
          this.tableData = data.data.list
          this.total = data.data.countPage * this.size
          this.page = data.data.curPage
        }
      })
    },
    selectStatus(index, item) {
      if (this.statusIndex === index) {
        return
      }
      this.statusIndex = index
      this.tranType = item.value
      this.page = 1
      this.getRecordList()
    },
    selectTime(index, item) {
      if (this.timeIndex === index) {
        return
      }
      this.timeIndex = index
      this.timeType = item.value
      this.page = 1
      this.getRecordList()
    },
    matchClass(val) {
      if (val.indexOf('-') > -1) {
        return 'minus'
      } else {
        return 'plus'
      }
    }
  },
  components: {
    pagination
  },
  created() {
    this.getTypes()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';
.rc-wrapper {
  height: 100%;
  margin: 0 auto 45px;
  color: $color-text;
  overflow: hidden;
  .inner {
    float: right;
    width: 840px;
    height: 100%;
    padding: 0 20px 20px;
    border: 1px solid #f5f5f5;
    border-top: 2px solid rgba(247, 190, 57, 1);
    background-color: #fff;
    .top {
      margin-bottom: 20px;
      h3 {
        height: 51px;
        line-height: 51px;
        padding-left: 4px;
        font-size: $font-size-small;
      }
      ul {
        border: 1px solid #e3e3e3;
        li {
          height: 60px;
          line-height: 60px;
          font-size: 0;
          background-color: #fff;
          border-bottom: 1px solid #e3e3e3;
          > div {
            display: inline-block;
            vertical-align: top;
            padding: 0 30px;
            text-align: center;
            font-size: $font-size-small-s;
            cursor: pointer;
            &.active {
              color: #fb891f;
            }
            &:first-child {
              width: 140px;
              padding: 0;
              border-right: 1px solid #e3e3e3;
              background-color: #f8f8fb;
              font-size: $font-size-small;
              cursor: default;
            }
          }
          &:last-child {
            border-bottom: 0;
          }
        }
      }
    }
    .content {
      .record-table {
        margin-top: 20px;
        border-color: #e3e3e3;
        /deep/ .el-table__header-wrapper {
          .el-table__header {
            thead {
              color: rgba(74, 74, 74, 1);
              th {
                font-weight: 400;
                background-color: #f8f8fb;
                .cell {
                  font-size: $font-size-small;
                }
              }
            }
          }
        }
      }
      /deep/ .el-table {
        th {
          padding: 7px 0;
          text-align: center;
        }
        td {
          padding: 7px 0;
          text-align: center;
          border-bottom: 1px solid rgba(227, 227, 227, 1);
          .cell {
            a {
              &.plus {
                color: #fc5541;
              }
              &.minus {
                color: #fc5541;
              }
            }
          }
        }
      }
      .pagination-wrapper {
        margin-top: 20px;
      }
    }
  }
}
</style>
