<template>
  <section class="content">
    <div class="image">
      <img :src="imgSrc">
    </div>
    <p class="type">{{resultTitle}}</p>
    <p class="detail">{{resultFont}}</p>
    <button class="invest" @click="goInvest">去投资</button>
    <button class="agin" @click="getAgin">重新测评</button>
  </section>
</template>
<script>
export default {
  name: 'Result',
  data() {
    return {
      title: '风险评测'
    }
  },
  props: ['resultTitle', 'resultFont', 'resultType'],
  computed: {
    imgSrc() {
      switch (this.resultType) {
        case 'BSX':
          return require('./baoshou.png')
        case 'JSX':
          return require('./jinshen.png')
        case 'JJX':
          return require('./jiji.png')
        case 'JQX':
          return require('./jinqu.png')
        case 'JINX':
          return require('./jijin.png')
        default:
          return require('./baoshou.png')
      }
    }
  },
  methods: {
    goInvest() {
      this.$router.push({
        name: 'lend'
      })
    },
    getAgin() {
      this.$emit('changeShow')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';
.content {
  padding-top: 50px;
  .image {
    width: 180px;
    height: 120px;
    margin: 0 auto;
    img {
      width: 180px;
      height: 120px;
    }
  }
  .type {
    width: 55px;
    height: $font-size-medium;
    font-size: $font-size-medium;
    color: rgba(74, 74, 74, 1);
    line-height: $font-size-medium;
    margin: 20px auto 10px;
  }
  .detail {
    width: 645px;
    height: 52px;
    font-size: 14px;
    color: rgba(155, 155, 155, 1);
    line-height: 26px;
    margin: 0 auto;
  }
  .invest {
    width: 300px;
    height: 40px;
    background: rgba(251, 123, 31, 1);
    border-radius: 4px;
    display: block;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
    margin: 54px auto 24px;
    cursor: pointer;
  }
  .agin {
    width: 300px;
    height: 40px;
    border-radius: 4px;
    background: #fff;
    border: 1px solid rgba(251, 123, 31, 1);
    display: block;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: rgba(251, 123, 31, 1);
    margin: 0 auto 60px;
    cursor: pointer;
  }
}
</style>
