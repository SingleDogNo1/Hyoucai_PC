<template>
  <div class="lend-list">
    <ul class="tab">
      <li class="tab-item" @click="tabIndex=0" :class="{'active': tabIndex === 0}">出借期数</li>
      <li class="tab-item" @click="tabIndex=1" :class="{'active': tabIndex === 1}">债权列表</li>
    </ul>
    <div class="table-container">
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
          <td>{{item.projectName}}</td>
          <td>{{item.txSn }}</td>
          <td>{{item.invAmount}}</td>
          <td>{{item.intSumStartDate}}</td>
          <td>{{item.invOverDate }}</td>
          <td>{{item.projectName}}</td>
          <td>
            <span v-if="item.repeatStatus === 0" @click="handleSetAutoLend(item.id)">设置自动出借</span>
            <span v-if="item.repeatStatus === 1" @click="handleCancelAutoLend(item.id)">取消本金自动出借</span>
            <span v-if="item.repeatStatus === 2" @click="handleCancelAutoLend(item.id)">取消本息自动出借</span>
          </td>
        </tr>
        </tbody>
      </table>
      <Pagination v-show="total>0" class="pagination" :count-page="total" :cur-page="page" @handleCurrentChange = "handleCurrentChange"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
export default {
  name: 'detail',
  components: { Pagination },
  data() {
    return {
      tabIndex: 0,
      page: 1,
      size: 10,
      total: null
    }
  }
}
</script>

<style scoped lang="scss">
.lend-list {
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
  }
  table {
    margin: 0 auto;
    width: 800px;
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
}
</style>
