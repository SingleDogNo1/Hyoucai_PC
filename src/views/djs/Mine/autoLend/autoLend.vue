<template>
  <div class="autoLend">
    <h1>自动出借</h1>
    <div class="filter">
      <button @click="repeatStatus=''" :class="{active: repeatStatus ===''}">全部</button>
      <button @click="repeatStatus='1'" :class="{active: repeatStatus ==='1'}">已设置</button>
      <button @click="repeatStatus='2'" :class="{active: repeatStatus ==='2'}">未设置</button>
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
      <tbody></tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'autoLend',
  mixins: [],
  components: {},
  data() {
    return {
      repeatStatus: ''
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
    th,
    td {
      height: 50px;
    }
  }
}
</style>
