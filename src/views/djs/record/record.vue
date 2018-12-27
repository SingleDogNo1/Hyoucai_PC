<template>
  <div class="wrapper">
    <div class="top">
    </div>
    <div class="content">
      <div class="pagination-wrapper">
        <pagination :total-count="total" :size-val="size" :page-val="page" @handleCurrentChange="handleCurrentChange"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { toThousands } from '@/assets/js/utils'
import pagination from '@/components/pagination/pagination'
export default {
  name: 'lend',
  data() {
    return {
      Times: [
        {
          name: '全部',
          id: 1
        },
        {
          name: '全部',
          id: 2
        },
        {
          name: '全部',
          id: 3
        },
        {
          name: '全部',
          id: 4
        },
        {
          name: '全部',
          id: 5
        },
        {
          name: '全部',
          id: 6
        }
      ],
      status: [
        {
          name: '全部',
          id: 1
        },
        {
          name: '全部',
          id: 2
        },
        {
          name: '全部',
          id: 3
        },
        {
          name: '全部',
          id: 4
        },
        {
          name: '全部',
          id: 5
        },
        {
          name: '全部',
          id: 6
        }
      ],
      tableData: [
        {
          date: '2018-08-18 18:18:45',
          type: '提现',
          count: '-1234',
          des: '提现成功'
        }
      ],
      page: 1,
      size: 10,
      total: 100
    }
  },
  filters: {
    setMoney(val) {
      return toThousands(val)
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
    }
  },
  components: {
    pagination
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';
.wrapper {
  .top {

  }
  .content {
    width: 840px;
    margin: 0 auto;
    .pagination-wrapper {
      margin-bottom: 29px;
    }
  }
}
</style>
