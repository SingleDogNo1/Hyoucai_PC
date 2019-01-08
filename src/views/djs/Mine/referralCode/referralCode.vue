<template>
  <div class="referralCode">
    <div class="referral-code-wrap">
      <div class="my-referral-code">
        <img src="./images/icon_qrcode.png">
        <div class="desc">
          <p class="title">我的推荐码</p>
          <p class="content">11963</p>
          <p class="copy-text">
            复制邀请码链接
            <i class="iconfont icon-more"></i>
          </p>
        </div>
      </div>
      <p class="referral-man">
        <span>推荐人</span>
        <span class="referral-name">陈希美</span>
      </p>
    </div>
    <div class="tips">
      <p class="my-referral-man">
        <span>我推荐的人</span>
        <span class="bold">2位</span>
      </p>
      <p class="amount">
        <span>当前合计在投金额</span>
        <span class="bold">50,000.00元</span>
      </p>
    </div>
    <el-table :data="tableData" border class="referral-table">
      <el-table-column prop="date" label="注册日期"></el-table-column>
      <el-table-column prop="name" label="推荐人姓名"></el-table-column>
      <el-table-column prop="status" label="在投状态"></el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <pagination
        :total-count="total"
        :size-val="size"
        :page-val="page"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'referralCode',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'referralCode'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';

.referralCode {
  background: #fff;
  height: 100%;
  border: 1px solid #e5e5e5;
  border-top: 2px solid $color-theme;
  padding: 0 30px;
  .referral-code-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;
    border-bottom: 1px solid #e3e3e3;
    .my-referral-code {
      width: 286px;
      display: flex;
      justify-content: space-between;
      //margin-top: 15px;
      img {
        display: block;
        width: 112px;
        height: 112px;
        margin-right: 40px;
      }
      .desc {
        margin-top: 15px;
        .title {
          font-size: $font-size-small;
          color: $color-text-s;
        }
        .content {
          margin-top: 8px;
          font-size: $font-size-medium;
          color: $color-text;
        }
        .copy-text {
          margin-top: 16px;
          font-size: $font-size-small;
          color: #5a5a5a;
        }
      }
    }
    .referral-man {
      height: 112px;
      line-height: 112px;
      span {
        font-size: $font-size-small;
        color: $color-text;
      }
      .referral-name {
        border: 1px solid #9b9b9b;
        font-size: $font-size-small-s;
        color: $color-text-s;
        padding: 0 4px;
        margin-left: 8px;
      }
    }
  }
  .tips {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .my-referral-man,
    .amount {
      span {
        font-size: $font-size-small;
        color: $color-text;
      }
      .bold {
        margin-left: 6px;
        font-weight: 600;
      }
    }
  }
  .referral-table {
    margin-top: 20px;
    /deep/ .cell {
      text-align: center;
    }
  }
}
</style>
