<template>
  <div class="app-container">
    <div class="total-info">
      <div class="item">
        <div><img src="./logo.png" alt="" /></div>
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
    <router-view></router-view>
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
</style>
