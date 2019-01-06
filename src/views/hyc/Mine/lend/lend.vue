<template>
  <div class="lend-wrapper">
    <header>
      <img src="./icon.png" alt="">
      <div class="earning">
        <p>123.456元</p>
        <span>累计利息收益</span>
      </div>
      <div class="lend">
        <p>1234.567元</p>
        <span>累计出借</span>
      </div>
    </header>
    <section>
      <div class="nav bid-type">
        <h1>出借类别</h1>
        <ul>
          <router-link tag="li" :to="{name: 'QST'}">轻松投</router-link>
          <router-link tag="li" :to="{name: 'ZXT'}">自选投</router-link>
        </ul>
      </div>
      <div class="detail-wrapper">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'lend',
  mixins: [],
  components: {},
  data() {
    return {}
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
@import '../../../../assets/css/mixins';
@import '../../../../assets/css/theme';

.lend-wrapper {
  min-height: 100%;
  header {
    @include cube(100%, 180px);
    background: #fff;
    border-top: 3px solid $color-theme;
    padding: 0 60px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    img {
      @include square(60px);
      margin-right: 125px;
    }
    div {
      span {
        display: block;
        font-size: $font-size-small-s;
        color: $color-text-gray;
        text-align: center;
      }
    }
    .earning {
      margin-right: 160px;
      p {
        font-size: $font-size-large-x;
        color: $color-sub-theme;
        margin-bottom: 10px;
      }
    }
    .lend {
      p {
        font-size: $font-size-large;
        color: $color-text;
        margin-bottom: 10px;
      }
    }
  }
  .nav {
    display: flex;
    height: 60px;
    border: 1px solid #e3e3e3;
    border-bottom: none;
    h1 {
      width: 140px;
      height: 100%;
      line-height: 60px;
      background: #f8f8fb;
      border-right: 1px solid #e3e3e3;
      font-size: $font-size-small;
      color: $color-text;
      text-align: center;
    }
    ul {
      flex: 1;
      display: flex;
      background: #fff;
      li {
        cursor: pointer;
        width: 120px;
        line-height: 60px;
        text-align: center;
        color: $color-text;
        font-size: $font-size-small-s;
        &.router-link-active {
          color: $color-theme;
        }
      }
    }
  }
  .detail-wrapper {
    min-height: 512px;
    background: #fff;
  }
}
</style>
