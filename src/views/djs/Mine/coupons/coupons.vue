<template>
  <div class="coupons">
    <header>
      <div class="card" :class="{'active':flag}" @click="changeFlag">可用卡券</div>
      <div class="card" :class="{'active':!flag}" @click="changeFlag">历史卡券</div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'coupons',
  mixins: [],
  components: {},
  data() {
    return {
      flag: true
    }
  },
  props: {},
  watch: {},
  methods: {
    changeFlag: function() {
      this.flag = !this.flag
    }
  },
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.coupons {
  header {
    width: 840px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(229, 229, 229, 1);
    display: flex;
    .card {
      width: 150px;
      height: 58px;
      text-align: center;
      background: rgba(255, 255, 255, 1);
      line-height: 58px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
    }
    .active {
      height: 58px;
      text-align: center;
      border-right: 1px solid rgba(229, 229, 229, 1);
      border-top: 2px solid rgba(251, 137, 31, 1);
      line-height: 58px;
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(251, 137, 31, 1);
    }
  }
}
</style>
