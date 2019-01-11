<template>
  <div class="satefy">
    <img src="./safe_banner.png" alt class="safe_banner" />
    <div class="satefy2" id="satefy-url2"><img src="./bg_satefy2.png" /></div>
    <div class="satefy3" id="satefy-url3"><img src="./bg_satefy3.png" /></div>
    <div class="satefy4" id="satefy-url4"><img src="./bg_satefy4.png" /></div>
    <div class="satefy5" id="satefy-url5"><img src="./bg_satefy5.png" /></div>
    <div class="satefy6" id="satefy-url6"><img src="./bg_satefy6.png" /></div>
    <div class="satefy7" id="satefy-url7"><img src="./bg_satefy7.png" /></div>
    <div class="satefy8" id="satefy-url8"><img src="./bg_satefy8.png" /></div>
  </div>
</template>
<script>
export default {
  created() {
    this.$nextTick(() => {
      this.getLocal()
    })
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    getLocal() {
      // 找到锚点
      let id = localStorage.getItem('jumpId')
      let anchorElement = document.getElementById(id)
      // 如果锚点存在，就跳转
      if (id) {
        setTimeout( ()=> {
          anchorElement.scrollIntoView()
        }, 100)
      }
    }
  },
  destroyed() {
    localStorage.setItem('jumpId', '')
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';

.satefy {
  .safe_banner {
    font-size: 0;
    width: 100%;
  }
}
</style>
