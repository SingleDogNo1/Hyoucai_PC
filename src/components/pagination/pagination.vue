<template>
  <div class="pagination">
    <el-pagination background layout="prev, pager, next" :total="totalCount" :page-size="sizeVal" :current-page="pageVal" @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  data() {
    return {
      count: this.totalCount,
      page: this.pageVal,
      size: this.sizeVal
    }
  },
  props: {
    totalCount: {
      type: Number,
      default: 0
    },
    sizeVal: {
      type: Number,
      default: 10
    },
    pageVal: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.$emit('handleCurrentChange', this.page)
    }
  },
  created() {},
  mounted() {},
  watch: {
    page: function(val) {
      console.log('val===', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  /deep/ .el-pagination {
    text-align: center;
    &.is-background {
      .el-pager {
        li {
          border-radius: 2px;
          border: 1px solid rgba(218, 218, 218, 1);
          background-color: #fff;
          font-weight: 400;
          color: #6a6a6a;
          &:not(.disabled).active {
            background-color: #fb9d1f;
            border: 1px solid #fb9d1f;
            color: #fff;
          }
        }
      }
      .btn-prev,
      .btn-next {
        border-radius: 2px;
        border: 1px solid rgba(218, 218, 218, 1);
        background-color: #fff;
        font-weight: 400;
        color: #6a6a6a;
        i {
          font-size: 13px;
        }
        &:disabled {
          color: #c0c4cc;
        }
      }
    }
  }
}
</style>
