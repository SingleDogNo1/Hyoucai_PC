<template>
  <div class="__no__data">
    <!--<section>-->
    <!--<div v-if="type === 'data'" class="data"></div>-->
    <!--<div v-if="type === 'event'" class="data"></div>-->
    <!--<div v-if="type === 'redpacket'" class="redpacket"></div>-->
    <!--<div v-if="type === 'coupon'" class="coupon"></div>-->
    <!--<div v-if="type === 'message'" class="message"></div>-->
    <!--<div v-if="type === 'notice'" class="notice"></div>-->
    <!--<div v-if="type === 'network'" class="network"></div>-->
    <!--</section>-->
    <img src="./bd_ico@2x.png" alt="" />
    <p v-if="type === 'data'">暂无数据</p>
    <p v-if="type === 'production'">暂无产品</p>
    <p v-if="type === 'event'">这里空空如也</p>
    <p v-if="type === 'redpacket'">暂无红包</p>
    <p v-if="type === 'coupon'">暂无加息券</p>
    <p v-if="type === 'message'">暂时没有新消息</p>
    <p v-if="type === 'notice'">暂无公告消息</p>
    <div v-if="type === 'network'">
      <h6>您的网络不稳定，请刷新重试</h6>
      <button @click="refresh">刷新</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    type: {
      /*
       * type === 'data'       没有数据(default)
       * type === 'prodution'   没有产品
       * type === 'event'       这里空空如也（活动中心没有数据）
       * type === 'redpacket'  没有红包
       * type === 'coupon'     没有加息券
       * type === 'message'    没有新消息
       * type === 'notice'     没有公告
       * type === 'network'    没有网络
       */
      type: String,
      default: 'data'
    }
  },
  methods: {
    refresh() {
      this.$router.go(0)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/theme.scss';
@import '../../assets/css/mixins.scss';

.__no__data {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  img {
    display: block;
    width: 103px;
    margin: 0 auto 24px;
  }
  // section {
  // div {
  // margin: 0 auto 0.08rem;
  // background-size: 100% 100%;
  // $list: data, redpacket, coupon, message, notice, network;
  // @each $item in $list {
  // &.#{$item} {
  // @include cube(1.23rem, 1.22rem);
  // @include bg-image(#{$item});
  // background-size: contain;
  // background-position: center;
  // }
  // }
  // }
  // }
  p,
  div {
    font-size: 16px;
    color: $color-text-s;
    text-align: center;
  }
  button {
    width: 0.88rem;
    height: 0.28rem;
    margin-top: 0.24rem;
    font-size: 0.11rem;
    color: $color-button;
    background: transparent;
    letter-spacing: 0;
    border: 0.01rem solid $color-button;
    border-radius: 0.02rem;
  }
}
</style>
