<template>
  <div class="index">
    <div class="swiper-container-banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <a href="#">
            <img src="./images/bg_banner.png" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div>
        <div class="swiper-slide">
          <a href="#">
            <img src="./images/bg_banner.png" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div>
        <div class="swiper-slide">
          <a href="#">
            <img src="./images/bg_banner.png" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div>
        <div class="swiper-slide">
          <a href="#">
            <img src="./images/bg_banner.png" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div><div class="swiper-slide">
          <a href="#">
            <img src="./images/bg_banner.png" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div>
      </div>
      <div class="swiper-pagination-banner"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
export default {
  data() {
    return {}
  },
  methods: {
    getBanner() {
      setTimeout(() => {
        this.swiperH = new Swiper('.swiper-container-banner', {
          lazy: {
            loadPrevNext: true
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination-banner'
          }
        })
      }, 200)
    }
  },
  mounted() {
    this.getBanner()
  }
}
</script>

<style lang="scss" scoped>
.index {
}
</style>

