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
        </div>
        <div class="swiper-slide">
          <a href="#">
            <img src="./images/bg_banner.png" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div>
      </div>
      <div class="swiper-pagination-banner"></div>
    </div>
    <div class="notice-wrap">
      <div class="notice-box">
        <img class="notice-text" src="./images/text_notice.png">
        <div class="notice-swiper-wrap">
          <div class="notice-item">
            <span>[网站公告]</span>
            <div class="swiper-container-notice">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
              </div>
            </div>
          </div>
          <div class="notice-item">
            <span>[行业资讯]</span>
            <div class="swiper-container-notice">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
              </div>
            </div>
          </div>
          <div class="notice-item">
            <span>[媒体报道]</span>
            <div class="swiper-container-notice">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
                <div class="swiper-slide">
                  <a href="javascript:void(0);">暖心圣诞 浓情元旦 华为Mate20&iPhone免费拿</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a href="#" class="more">
          更多
          <i class="iconfont icon-more"></i>
        </a>
      </div>
    </div>
    <div class="introduction-wrap">
      <ul>
        <li>
          <a>
            <img src="./images/icon_introdution1.png">
            <div>
              <p class="title">平台背景</p>
              <p class="desc">江西省首批互联网中介平台</p>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img src="./images/icon_introdution2.png">
            <div>
              <p class="title">信息披露</p>
              <p class="desc">信息详细真实透明</p>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img src="./images/icon_introdution3.png">
            <div>
              <p class="title">银行存管</p>
              <p class="desc">江西银行资金存管</p>
            </div>
          </a>
        </li>
        <li>
          <a>
            <img src="./images/icon_introdution4.png">
            <div>
              <p class="title">严格风控</p>
              <p class="desc">专业风控甄选优质项目</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="lend-data-wrap">
      <img src="./images/text_lend_data.png">
      <ul>
        <li>
          <p class="title">256,571,216.26</p>
          <p class="desc">累计投资(元)</p>
        </li>
      </ul>
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
        this.swiperBanner = new Swiper('.swiper-container-banner', {
          lazy: {
            loadPrevNext: true
          },
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination-banner',
            clickable: true
          }
        })
      }, 200)
    },
    getNotice() {
      setTimeout(() => {
        this.swiperNotice = new Swiper('.swiper-container-notice', {
          direction: 'vertical',
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          loop: true
        })
      }, 200)
    }
  },
  mounted() {
    this.getBanner()
    this.getNotice()
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.index {
  .swiper-container-banner {
    height: 500px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
    }
    .swiper-pagination-banner {
      position: absolute;
      text-align: center;
      -webkit-transition: 300ms opacity;
      -o-transition: 300ms opacity;
      transition: 300ms opacity;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      z-index: 10;
      /deep/ .swiper-pagination-bullet {
        background: rgba(255, 255, 255, 0.6);
        opacity: 1;
        margin: 0 5px;
      }
      /deep/ .swiper-pagination-bullet-active {
        width: 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 4px;
      }
    }
  }
  .notice-wrap {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #ebebeb;
    .notice-box {
      display: flex;
      line-height: 50px;
      width: 1140px;
      margin: 0 auto;
      .notice-text {
        display: block;
        width: 88px;
        height: 18px;
        margin-top: 15px;
        margin-right: 20px;
      }
      .notice-swiper-wrap {
        height: 50px;
        .notice-item {
          display: flex;
          display: inline-block;
          width: 320px;
          height: 100%;
          line-height: 50px;
          margin-right: 10px;
          span {
            font-size: $font-size-small-ss;
            color: $color-text;
          }
          .swiper-container-notice {
            width: 247px;
            position: relative;
            display: inline-block;
            vertical-align: top;
            height: 100%;
            margin-left: 5px;
            font-size: $font-size-small-ss;
            overflow: hidden;
            .swiper-slide {
              width: 203px;
              height: 100%;
              text-align: left;
              a {
                width: 100%;
                display: inline-block;
                color: $color-text;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          .swiper-container-notice:after {
            content: '/';
            position: absolute;
            color: #cdcdcd;
            width: 19px;
            height: 50px;
            right: 0;
            top: 0;
            margin: 0 auto;
            text-align: center;
          }
        }
        .notice-item:last-child {
          //width: 300px;
          margin-right: 0;
          .swiper-container-notice:after {
            display: none;
          }
        }
      }
      .more {
        width: 50px;
        display: inline-block;
        color: $color-text-blue;
        font-size: $font-size-small-ss;
        text-align: right;
      }
    }
  }
  .introduction-wrap {
    width: 1140px;
    height: 52px;
    margin: 0 auto;
    margin-top: 40px;
    padding: 0 27px;
    ul {
      display: flex;
      width: 100%;
      li {
        display: flex;
        width: 232px;
        height: 100%;
        margin-right: 100px;
        flex: none;
        a {
          display: flex;
          img {
            display: inline-block;
            width: 52px;
            height: 52px;
          }
          .title {
            width: 80px;
            display: inline-block;
            margin-left: 12px;
            vertical-align: top;
            font-size: $font-size-medium-x;
            color: $color-text;
          }
          .desc {
            width: 168px;
            display: inline-block;
            margin-left: 12px;
            vertical-align: middle;
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
        }
      }
      li:nth-child(2),
      li:nth-child(3) {
        width: 176px;
      }
      li:nth-child() {
        margin-right: 0;
      }
    }
  }
  .lend-data-wrap {
    width: 1140px;
    margin: 0 auto;
    margin-top: 70px;
    padding: 0 48px;
    img {
      display: block;
      width: 158px;
      height: 38px;
      margin: 0 auto;
    }
    ul {
      margin-top: 40px;
      li {
        display: inline-block;
        position: relative;
        width: 20%;
        text-align: center;
        .title {
          font-size: $font-size-large-xxx;
          color: $color-text;
        }
        .desc {
          margin-top: 24px;
          font-size: $font-size-small-s;
          color: $color-text-s;
        }
      }
      li:after {
        content: '/';
        position: absolute;
        color: #cdcdcd;
        width: 19px;
        height: 50px;
        right: 0;
        top: 20px;
        margin: 0 auto;
      }
    }
  }
}
</style>

