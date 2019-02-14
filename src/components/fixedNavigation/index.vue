<template>
  <ul class="fixed-nav">
    <li @click="toCaculator">
      <p>收益</p>
      <p>计算器</p>
    </li>
    <li @click="toRiskAssessment">
      <p>风险</p>
      <p>评测</p>
    </li>
    <li @click="toDownload" @mouseenter="showCode" @mouseleave="hideCode">
      <p>扫码</p>
      <p>下载</p>
      <transition name="slide">
        <div class="code" v-show="codeFlag"></div>
      </transition>
    </li>
    <li @click="toTop(speed)">
      <p>返回</p>
      <p>顶部</p>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      codeFlag: false,
      speed: 50
    }
  },
  methods: {
    showCode() {
      this.codeFlag = true
    },
    hideCode() {
      this.codeFlag = false
    },
    toTop(i) {
      //参数i表示间隔的幅度大小，以此来控制速度
      document.documentElement.scrollTop -= i
      if (document.documentElement.scrollTop > 0) {
        var c = setTimeout(() => this.toTop(i), 16)
      } else {
        clearTimeout(c)
      }
    },
    toCaculator() {
      this.$router.push({
        name: 'calculator'
      })
    },
    toRiskAssessment() {
      this.$router.push({
        name: 'riskAss'
      })
    },
    toDownload() {
      this.$router.push({
        name: 'download'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins';

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fixed-nav {
  width: 56px;
  height: 244px;
  position: fixed;
  right: 4.5%;
  bottom: 60px;
  text-align: center;
  z-index: 9999;
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  li {
    position: relative;
    width: 100%;
    height: 40px;
    padding: 10px 0;
    line-height: 20px;
    font-size: 16px;
    color: #fff;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    p {
      opacity: 0;
      transition: all 0.5s;
    }
    .code {
      position: absolute;
      z-index: 999;
      @include square(188px);
      top: -66px;
      left: -198px;
      background: url('./images/down_code.png') 0 / contain;
    }
  }
  li:nth-child(1) {
    background: url('./images/icon_fiexed1.png') center center no-repeat;
    background-size: 40px 40px;
  }
  li:nth-child(2) {
    background: url('./images/icon_fiexed2.png') center center no-repeat;
  }
  li:nth-child(3) {
    background: url('./images/icon_fiexed3.png') center center no-repeat;
  }
  li:nth-child(4) {
    background: url('./images/icon_fiexed4.png') center center no-repeat;
  }
  li:hover {
    background: #f8be38;
    p {
      opacity: 1;
    }
  }
}
</style>
