<template>
  <div class="menu">
    <header class="avatar">
      <div class="user">
        <img src="./avatar.png" alt="">
        <p>
          <em>中午好</em>
          <span>SingleDogNo.1</span>
        </p>
      </div>
      <div class="safe">
        <span>安全等级</span>
        <span class="level">中</span>
      </div>
    </header>
    <router-link tag="li" to="/mine/overview">zonglan</router-link>
    <router-link tag="li" to="/mine/basicInfo">jibenxinxi</router-link>
    <router-link tag="li" to="/mine/bankcard">card</router-link>
    <router-link tag="li" to="/mine/referralCode">tuijianma</router-link>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'UserMenu'
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
@import '../../assets/css/mixins';
@import '../../assets/css/theme';

.menu {
  box-sizing: border-box;
  width: 276px;
  background: #fff;
  padding-bottom: 46px;
  color: #414141;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  .avatar {
    padding: 30px 30px 0;
    .user {
      display: flex;
      p {
        flex: 1;
        margin-left: 15px;
        em {
        }
      }
    }
  }
}
</style>
