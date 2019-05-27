<template>
  <div class="app-container">
    <div class="total-info">
      <div class="item">
        <div>
          <img src="./logo.png" alt="" />
          <p>汇有财</p>
        </div>
      </div>
      <div class="item">
        <div>
          <span class="total-income">{{ tackBackInt }}元</span>
        </div>
        <div><span>累计利息收益</span></div>
      </div>
      <div class="item">
        <div>
          <span class="total-lend">{{ invTotalAmt }}元</span>
        </div>
        <div><span>累计出借</span></div>
      </div>
    </div>
    <div class="lend-list">
      <ul class="tab">
        <li class="tab-item label">状态</li>
        <router-link class="tab-item" tag="li" to="/mine/lend/cjz">出借中</router-link>
        <router-link class="tab-item" tag="li" to="/mine/lend/yjq">已结清</router-link>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'lend',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'lend'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {
    ...mapGetters(['invTotalAmt', 'tackBackInt'])
  },
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme';
@import '../../../../assets/css/mixins';
.total-info {
  font-size: 14px;
  width: 840px;
  height: 180px;
  background: #fff;
  border-top: 3px solid #f7be39;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  .item {
    display: flex;
    flex-direction: column;
    text-align: center;
    div {
      margin-top: 12px;
      .total-income {
        font-size: 24px;
        color: rgba(252, 85, 65, 1);
      }
      .total-lend {
        font-size: 20px;
        color: rgba(74, 74, 74, 1);
      }
    }
  }
}
.lend-list {
  background: #fff;
  .tab {
    border: 1px solid #e5e5e5;
    height: 60px;
    .tab-item {
      float: left;
      width: 120px;
      text-align: center;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
      &.label {
        cursor: default;
        width: 140px;
        background: rgba(248, 248, 251, 1);
        border-right: 1px solid #e5e5e5;
      }
      &.active {
        color: rgba(251, 137, 31, 1);
      }
    }
  }
}
.router-link-active {
  color: rgba(251, 137, 31, 1);
}
</style>
