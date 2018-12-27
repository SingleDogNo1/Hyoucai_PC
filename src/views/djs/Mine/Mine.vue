<template>
  <div class="mine-wrapper">
    <ul class="menu">
      <router-link tag="li" to="/mine/overview">zonglan</router-link>
      <router-link tag="li" to="/mine/basicInfo">jibenxinxi</router-link>
      <router-link tag="li" to="/mine/bankcard">card</router-link>
      <router-link tag="li" to="/mine/referralCode">tuijianma</router-link>
    </ul>
    <div class="wrapper">
      <keep-alive> <router-view> </router-view> </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'Mine'
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
.mine-wrapper {
  width: 1140px;
  height: 100%;
  margin: 30px auto 50px auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  .menu {
    box-sizing: border-box;
    width: 276px;
    background: #fff;
    padding-bottom: 46px;
    color: #414141;
    font-size: 14px;
    border: 1px solid #e5e5e5;
  }
  .wrapper {
    flex: 1;
    width: 842px;
    margin-left: 20px;
  }
}
</style>
