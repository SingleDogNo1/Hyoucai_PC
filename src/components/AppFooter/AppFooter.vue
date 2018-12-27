<template>
  <footer class="app-footer-wrapper">
    <ul class="top">
      <li>
        <h3><i class="iconfont icon-about"></i> <span>关于我们</span></h3>
        <div>关键指标与数据</div>
        <div>愿景与模式</div>
        <div>视野与价值</div>
        <div>企业文化</div>
        <div>高管介绍</div>
      </li>
      <li>
        <h3><i class="iconfont icon-help"></i> <span>帮助中心</span></h3>
        <div>常见问题</div>
        <div>安全保障</div>
        <div>项目介绍</div>
        <div>平台特色</div>
        <div>网站操作</div>
      </li>
      <li>
        <h3><i class="iconfont icon-safe"></i> <span>安全保障</span></h3>
        <div>大数据风控</div>
        <div>合作保障机构</div>
        <div>项目管理</div>
        <div>企业模式</div>
        <div>资金安全</div>
      </li>
      <li>
        <h3><i class="iconfont icon-tell_footer"></i> <span>联系我们</span></h3>
        <div>400-0997-979</div>
        <div>(周一带周六)</div>
        <div>上午09:00 - 12:00</div>
        <div>下午 13:00 - 18:00</div>
        <div>cs@idjshi.com</div>
      </li>
      <li>
        <h3><i class="iconfont icon-phone"></i> <span>APP下载</span></h3>
        <div>iOS下载</div>
        <div>安卓下载</div>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'AppFooter'
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

.app-footer-wrapper {
  .top {
    margin: 0 auto;
    @include cube(1140px, auto);
    display: flex;
    justify-content: space-between;
    li {
      h3 {
        margin-bottom: 10px;
        color: $color-text-b;
        font-size: $font-size-medium;
        i {
          font-size: $font-size-large;
          margin-right: 8px;
        }
      }
      div {
        line-height: 30px;
        color: #6a6a6a;
        font-size: $font-size-small-s;
        padding-left: 32px;
        cursor: pointer;
        &:hover {
          color: $color-theme;
        }
      }
    }
  }
  .btm {
    height: 190px;
  }
}
</style>
