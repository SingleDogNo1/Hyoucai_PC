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
          <countUp :name="count1" :count="62458342.33"></countUp>
          <p class="desc">累计出借(元)</p>
        </li>
        <li>
          <countUp :name="count2" :count="68342.69"></countUp>
          <p class="desc">累计赚取(元)</p>
        </li>
        <li>
          <countUp :name="count3" :count="516400.90"></countUp>
          <p class="desc">昨日出借(元)</p>
        </li>
        <li>
          <countUp :name="count4" :count="772916.47"></countUp>
          <p class="desc">今日出借(元)</p>
        </li>
      </ul>
    </div>
    <div class="novice-area-wrap">
      <div class="novice-area-box">
        <div class="desc-warp">
          <img src="./images/text_novice_area.png">
          <a class="btn-know" href="javascript:void(0);">1分钟了解汇有财</a>
        </div>
        <div class="production-wrap">
          <div class="production-info">
            <div class="label-wrap">
              <img src="./images/icon_new.png">
              <span class="title">半月嗨</span>
              <span class="label">火爆出借</span>
              <span class="label">多重保障</span>
            </div>
            <div class="returns">
              <p class="title">
                <span class="large">12.0</span> %
              </p>
              <p class="desc">预期年化收益率</p>
            </div>
            <div class="term">
              <p class="title">
                <span class="large">30</span> 天
              </p>
              <p class="desc">项目期限</p>
            </div>
            <div class="amount">
              <p class="title">
                <span class="large">50000000</span> 元
              </p>
              <p class="desc">融资金额</p>
            </div>
          </div>
          <div class="btn-invest-now">
            <a href="javascript:void(0);">立即出借</a>
          </div>
        </div>
      </div>
    </div>
    <div class="lend-boutique-wrap">
      <img src="./images/text_lend_boutique.png">
      <ul>
        <li>
          <p class="title">
            <img src="./images/icon_hot.png">
            <span class="icon">普惠盈</span>
          </p>
          <div class="returns">
            <p class="title">
              <span class="large">12.0</span>%
            </p>
            <p class="desc">预期年化收益率</p>
          </div>
          <p class="lend-desc">100元起投</p>
          <p class="lend-desc">锁定期：30天</p>
          <p class="lend-desc">已售：89.70%</p>
          <a class="btn-invest-now" href="javascript:void(0);">立即出借</a>
          <a class="btn-view-detail" href="javascript:void(0);">查看详情</a>
        </li>
        <li>
          <p class="title">
            <img src="./images/icon_hot.png">
            <span class="icon">普惠盈</span>
          </p>
          <div class="returns">
            <p class="title">
              <span class="large">12.0</span>%
            </p>
            <p class="desc">预期年化收益率</p>
          </div>
          <p class="lend-desc">100元起投</p>
          <p class="lend-desc">锁定期：30天</p>
          <p class="lend-desc">已售：89.70%</p>
          <a class="btn-invest-now" href="javascript:void(0);">立即出借</a>
          <a class="btn-view-detail" href="javascript:void(0);">查看详情</a>
        </li>
        <li>
          <p class="title">
            <img src="./images/icon_hot.png">
            <span class="icon">普惠盈</span>
          </p>
          <div class="returns">
            <p class="title">
              <span class="large">12.0</span>%
            </p>
            <p class="desc">预期年化收益率</p>
          </div>
          <p class="lend-desc">100元起投</p>
          <p class="lend-desc">锁定期：30天</p>
          <p class="lend-desc">已售：89.70%</p>
          <a class="btn-invest-now" href="javascript:void(0);">立即出借</a>
          <a class="btn-view-detail" href="javascript:void(0);">查看详情</a>
        </li>
      </ul>
    </div>
    <div class="partner-wrap">
      <img src="./images/text_partner.png">
      <ul>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <img src="./images/text_novice_area.png">
        </li>
        <li>
          <a class="btn-more" href="javascript:void(0);">
            查看更多
            <i class="iconfont icon-more"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
import CountUp from '@/components/countUp/index'
export default {
  data() {
    return {
      count1: 'count1',
      count2: 'count2',
      count3: 'count3',
      count4: 'count4'
    }
  },
  components: {
    CountUp
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
    padding: 0 20px;
    margin-bottom: 50px;
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
        width: 25%;
        text-align: center;
        .title {
          font-size: $font-size-large-xxx;
          color: $color-text;
        }
        .desc {
          margin-top: 20px;
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
        top: 25px;
        margin: 0 auto;
      }
      li:last-child:after {
        display: none;
      }
    }
  }
  .novice-area-wrap {
    background: #f4f4f4;
    padding-top: 70px;
    .novice-area-box {
      width: 1140px;
      height: 180px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .desc-warp {
        width: 218px;
        height: 100%;
        img {
          display: block;
          width: 180px;
          height: 84px;
        }
        .btn-know {
          display: block;
          width: 218px;
          height: 48px;
          line-height: 48px;
          margin-top: 26px;
          background: linear-gradient(92deg, rgba(251, 157, 31, 1) 0%, rgba(251, 123, 31, 1) 100%);
          color: #fff;
          font-size: $font-size-medium-x;
          text-align: center;
        }
      }
      .production-wrap {
        width: 880px;
        height: 100%;
        background: #fff url('./images/bg_novice_area.png') center center no-repeat;
        background-size: 166px 130px;
        padding: 35px 40px 35px 30px;
        display: flex;
        justify-content: space-between;
        .production-info {
          width: 660px;
          height: 100%;
          .label-wrap {
            width: 660px;
            height: 22px;
            img {
              display: inline-block;
              width: 22px;
              height: 22px;
              vertical-align: middle;
            }
            .title {
              display: inline-block;
              width: 55px;
              height: 20px;
              line-height: 18px;
              font-size: $font-size-medium;
              color: $color-text;
              margin-left: 10px;
              vertical-align: middle;
            }
            .label {
              display: inline-block;
              width: 60px;
              height: 20px;
              line-height: 18px;
              color: #fc5541;
              border: 1px solid #fc5541;
              font-size: $font-size-small-ss;
              margin-left: 10px;
              text-align: center;
              vertical-align: middle;
            }
          }
          .returns {
            display: inline-block;
            width: 130px;
            margin-top: 18px;
            margin-left: 26px;
            .title {
              font-size: $font-size-large-xxx;
              color: #fc5541;
              .large {
                font-size: 48px;
              }
            }
            .desc {
              width: 98px;
              text-align: center;
              margin-left: 6px;
              font-size: $font-size-small-s;
              color: $color-text-gray;
            }
          }
          .term,
          .amount {
            display: inline-block;
            margin-top: 28px;
            margin-left: 108px;
            .title {
              font-size: $font-size-medium;
              color: $color-text;
              .large {
                font-size: $font-size-large-xxx;
              }
            }
            .desc {
              text-align: center;
              font-size: $font-size-small-s;
              color: $color-text-gray;
            }
          }
        }
        .btn-invest-now {
          display: block;
          width: 190px;
          height: 100%;
          padding: 43px 0;
          a {
            display: block;
            width: 150px;
            height: 44px;
            line-height: 44px;
            background: linear-gradient(92deg, #fcad3e 0%, #fe645d 100%);
            color: #fff;
            text-align: center;
          }
        }
      }
    }
  }
  .lend-boutique-wrap {
    background: #f4f4f4;
    padding-top: 60px;
    img {
      display: block;
      width: 159px;
      height: 38px;
      margin: 0 auto;
      padding-bottom: 40px;
      text-align: center;
    }
    ul {
      width: 1140px;
      height: 400px;
      margin: 0 auto;
      padding-bottom: 60px;
      display: flex;
      justify-content: space-between;
      li {
        width: 220px;
        height: 328px;
        background: #fff;
        box-shadow: 1px 1px 10px #eee;
        border-radius: 2px;
        padding: 34px 70px;
        transition: all 0.5s;
        border-top: 4px solid #fff;
        cursor: pointer;
        .title {
          width: 88px;
          height: 22px;
          margin: 0 auto;
          img {
            display: inline-block;
            width: 22px;
            height: 22px;
            margin-right: 6px;
            vertical-align: middle;
            padding-bottom: 0;
          }
          .icon {
            display: inline-block;
            font-size: $font-size-medium-x;
            color: $color-text;
            vertical-align: middle;
          }
        }
        .returns {
          height: 88px;
          margin-top: 40px;
          margin-bottom: 30px;
          .title {
            text-align: center;
            width: 100%;
            font-size: 42px;
            color: #fc5541;
            height: 64px;
            line-height: 64px;
            .large {
              color: #fc5541;
              font-size: 64px;
              //vertical-align: bottom;
            }
          }
          .desc {
            margin-top: 6px;
            text-align: center;
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
        }
        .lend-desc {
          width: 100%;
          height: 14px;
          line-height: 14px;
          font-size: $font-size-small-s;
          color: $color-text;
          text-align: center;
          margin-bottom: 14px;
        }
        .btn-invest-now {
          position: absolute;
          display: block;
          width: 220px;
          height: 46px;
          line-height: 46px;
          color: #ffb01a;
          margin-top: 20px;
          border: 1px solid #ffb01a;
          border-radius: 6px;
          text-align: center;
          transition: all 0.5s;
          opacity: 1;
        }
        .btn-view-detail {
          position: absolute;
          display: block;
          opacity: 0;
          width: 220px;
          height: 46px;
          line-height: 46px;
          color: #fff;
          margin-top: 20px;
          background: rgba(251, 123, 31, 1);
          border-radius: 6px;
          text-align: center;
          transition: all 0.5s;
        }
      }
      li:hover {
        border-top: 4px solid #fb9d1f;
        box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.16);
        .btn-invest-now {
          opacity: 0;
        }
        .btn-view-detail {
          opacity: 1;
        }
      }
    }
    ul.one {
      width: 360px;
    }
    ul.two {
      width: 900px;
    }
  }
  .partner-wrap {
    padding-top: 60px;
    margin-bottom: 62px;
    img {
      display: block;
      width: 158px;
      height: 38px;
      margin: 0 auto;
    }
    ul {
      width: 1140px;
      margin: 0 auto;
      margin-top: 90px;
      li {
        display: inline-block;
        width: 146px;
        height: 35px;
        margin-right: 20px;
        vertical-align: middle;
        padding: 57px 33px 43px 33px;
        text-align: center;
        .btn-more {
          display: inline-block;
          height: 18px;
          line-height: 18px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text-blue;
        }
      }
      li:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
