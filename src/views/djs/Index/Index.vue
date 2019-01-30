<template>
  <div class="index">
    <div class="swiper-container-banner" id="swiper-container-banner">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide swiper-no-swiping stop-swiping"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <a :href="item.linkUrl">
            <img :src="item.picUrl" class="swiper-lazy">
            <div class="swiper-lazy-preloader"></div>
          </a>
        </div>
      </div>
      <div class="swiper-pagination-banner"></div>
      <div class="form-container">
        <login-form style="margin-top: 35px"></login-form>
      </div>
    </div>
    <div class="notice-wrap">
      <div class="notice-box">
        <span class="notice-text"></span>
        <div class="notice-swiper-wrap">
          <div class="notice-item">
            <span>[网站公告]</span>
            <div class="swiper-container-notice" id="swiper-container-notice1">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in noticeList" :key="index">
                  <router-link
                    :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: 'WZGG' } }"
                  >
                    {{
                    item.title
                    }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="notice-item">
            <span>[行业资讯]</span>
            <div class="swiper-container-notice" id="swiper-container-notice2">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in industryList" :key="index">
                  <router-link
                    :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: 'HYZX' } }"
                  >
                    {{
                    item.title
                    }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="notice-item">
            <span>[媒体报道]</span>
            <div class="swiper-container-notice" id="swiper-container-notice3">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in mediaList" :key="index">
                  <router-link
                    :to="{ name: 'announcementDetail', params: { id: item.id }, query: { paramCode: 'MTBD' } }"
                  >
                    {{
                    item.title
                    }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-link :to="{ name: 'announcement', query: { paramCode: 'WZGG' } }" class="more">
          更多
          <i class="iconfont icon-more"></i>
        </router-link>
      </div>
    </div>
    <div class="introduction-wrap">
      <ul>
        <li>
          <router-link to="/infoDisclosure?paramCode=GSJJ">
            <div>
              <span></span>
              <p class="title">平台背景</p>
              <p class="desc">江西省首批互联网中介平台</p>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/infoDisclosure?paramCode=YYSJ">
            <div>
              <span></span>
              <p class="title">信息披露</p>
              <p class="desc">信息详细真实透明</p>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/infoDisclosure?paramCode=ZJCG">
            <div>
              <span></span>
              <p class="title">银行存管</p>
              <p class="desc">江西银行资金存管</p>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/safety" @click.native="JumpSafety('satefy-url4')">
            <div>
              <span></span>
              <p class="title">严格风控</p>
              <p class="desc">专业风控甄选优质项目</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="lend-data-wrap" v-if="user">
      <div class="text-title"></div>
      <ul>
        <li>
          <countUp v-if="accumulativeInvAmountSum" :name="count1" :count="accumulativeInvAmountSum"></countUp>
          <p class="desc">累计出借(元)</p>
        </li>
        <li>
          <countUp v-if="accumulativeProfitAmtSum" :name="count2" :count="accumulativeProfitAmtSum"></countUp>
          <p class="desc">累计赚取(元)</p>
        </li>
        <li>
          <countUp v-if="invYesdayAmt" :name="count3" :count="invYesdayAmt"></countUp>
          <p class="desc">昨日出借(元)</p>
        </li>
        <li>
          <countUp v-if="invTodayAmt" :name="count4" :count="invTodayAmt"></countUp>
          <p class="desc">今日出借(元)</p>
        </li>
      </ul>
    </div>
    <div class="novice-area-wrap" v-if="noviceProjectList && noviceProjectList.length > 0">
      <div class="novice-area-box">
        <div class="desc-warp">
          <div class="text-title"></div>
          <button class="btn-know" href="javascript:void(0);">1分钟了解汇有财</button>
        </div>
        <div class="production-wrap" v-for="(item, index) in noviceProjectList" :key="index">
          <div class="production-info">
            <div class="label-wrap">
              <img :src="item.iconUrl">
              <span class="title">{{ item.projectName }} {{ item.projectNo }}</span>
              <span
                class="label"
                v-for="(tagItem, index) in item.tags"
                :key="index"
              >{{ tagItem.tagName }}</span>
            </div>
            <div class="returns">
              <p class="title">
                <span class="large">{{ item.investRate }}</span> %
              </p>
              <p class="desc">历史平均年化收益率</p>
            </div>
            <div class="term">
              <p class="title">
                <span class="large">{{ item.investMent }}</span> 天
              </p>
              <p class="desc">锁定期</p>
            </div>
            <div class="amount">
              <p class="title">
                <span class="large">{{ item.maxInvTotalAmt }}</span> 元
              </p>
              <p class="desc">融资金额</p>
            </div>
          </div>
          <div class="btn-invest-now">
            <router-link :to="{ name: 'download' }">下载APP</router-link>
          </div>
        </div>
      </div>
    </div>
    <div
      class="lend-boutique-wrap"
      v-if="popularProjectList && popularProjectList.length > 0"
    >
      <div class="text-title"></div>
      <ul :class="{ two: hycPopularProjectList.length == 2 }">
        <li v-for="(item, index) in hycPopularProjectList" :key="index" @click="toDownload">
          <p class="title">
            <img :src="item.iconUrl">
            <span class="icon">{{ item.itemName }}</span>
          </p>
          <div class="returns">
            <p class="title">
              <span class="large">{{ item.investRate }}</span>%
            </p>
            <p class="desc">预期年化收益率</p>
          </div>
          <p class="lend-desc">{{ item.showMinInvAmount }}起投</p>
          <p class="lend-desc">锁定期：{{ item.loanMent }}</p>
          <p class="lend-desc">已投：{{ item.showInvestPercent }}</p>
          <div class="actions">
            <a class="btn-invest-now" href="javascript:void(0);">下载APP</a>
            <a class="btn-view-detail" href="javascript:void(0);">查看详情</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="partner-wrap">
      <div class="text-title"></div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li>
          <router-link
            class="btn-more"
            href="javascript:void(0);"
            to="/infoDisclosure?paramCode=HZHB"
          >
            查看更多
            <i class="iconfont icon-more"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="activity-pop" v-if="isShowActivityPop">
      <div class="content">
        <i @click="closePop" class="el-icon-circle-close-outline"></i>
        <div class="activity-img">
          <button class="btn-to-investment">去投资</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/dist/js/swiper'
import CountUp from '@/components/countUp/index'
import LoginForm from '@/components/loginForm'
import { getBanner, getOperateData, getQualityList } from '@/api/djs/index'
import { getList } from '@/api/djs/announcement'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      count1: 'count1',
      count2: 'count2',
      count3: 'count3',
      count4: 'count4',
      accumulativeInvAmountSum: '',
      accumulativeProfitAmtSum: '',
      invYesdayAmt: '',
      invTodayAmt: '',
      isShowActivityPop: false,
      bannerList: [],
      noticeList: [],
      industryList: [],
      mediaList: [],
      noviceProjectList: [],
      popularProjectList: [],
      hycPopularProjectList: []
    }
  },
  components: {
    CountUp,
    LoginForm
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    getBanner() {
      let postData = {
        bannerType: 'PCBN'
      }
      getBanner(postData).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.bannerList = data.bannelList
          setTimeout(() => {
            this.swiperBanner = new Swiper('.swiper-container-banner', {
              noSwipingSelector: 'div',
              noSwipingClass: 'form-container, stop-swiping',
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
              },
              autoplayDisableOnInteraction: false
            })
            /*鼠标移入停止轮播，鼠标离开 继续轮播*/
            let comtainer = document.getElementById('swiper-container-banner')
            comtainer.onmouseenter = () => {
              this.swiperBanner.autoplay.stop()
            }
            comtainer.onmouseleave = () => {
              this.swiperBanner.autoplay.start()
            }
          }, 200)
        } else {
          this.$notify.error({
            title: '错误',
            message: data.resultMsg
          })
        }
      })
    },
    getNotice() {
      let postData1 = {
        curPage: 1,
        maxLine: 3,
        paramCode: 'WZGG'
      }
      getList(postData1).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.noticeList = data.zxdtMtbdlist
          setTimeout(() => {
            this.swiperNotice1 = new Swiper('#swiper-container-notice1', {
              direction: 'vertical',
              autoplay: {
                delay: 3000,
                disableOnInteraction: false
              },
              loop: true
            })
            /*鼠标移入停止轮播，鼠标离开 继续轮播*/
            let comtainer = document.getElementById('swiper-container-notice1')
            comtainer.onmouseenter = () => {
              this.swiperNotice1.autoplay.stop()
            }
            comtainer.onmouseleave = () => {
              this.swiperNotice1.autoplay.start()
            }
          }, 200)
        }
      })
      let postData2 = {
        curPage: 1,
        maxLine: 3,
        paramCode: 'HYZX'
      }
      getList(postData2).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.industryList = data.zxdtMtbdlist
          setTimeout(() => {
            this.swiperNotice2 = new Swiper('#swiper-container-notice2', {
              direction: 'vertical',
              autoplay: {
                delay: 3000,
                disableOnInteraction: false
              },
              loop: true
            })
            /*鼠标移入停止轮播，鼠标离开 继续轮播*/
            let comtainer = document.getElementById('swiper-container-notice2')
            comtainer.onmouseenter = () => {
              this.swiperNotice2.autoplay.stop()
            }
            comtainer.onmouseleave = () => {
              this.swiperNotice2.autoplay.start()
            }
          }, 200)
        }
      })
      let postData3 = {
        curPage: 1,
        maxLine: 3,
        paramCode: 'MTBD'
      }
      getList(postData3).then(res => {
        let data = res.data
        if (data.resultCode === '1') {
          this.mediaList = data.zxdtMtbdlist
          setTimeout(() => {
            this.swiperNotice3 = new Swiper('#swiper-container-notice3', {
              direction: 'vertical',
              autoplay: {
                delay: 3000,
                disableOnInteraction: false
              },
              loop: true
            })
            /*鼠标移入停止轮播，鼠标离开 继续轮播*/
            let comtainer = document.getElementById('swiper-container-notice3')
            comtainer.onmouseenter = () => {
              this.swiperNotice3.autoplay.stop()
            }
            comtainer.onmouseleave = () => {
              this.swiperNotice3.autoplay.start()
            }
          }, 200)
        }
      })
    },
    getOperateData() {
      getOperateData().then(res => {
        let data = res.data
        function toDecimal2(x) {
          var f = Math.round(x * 100) / 100
          var s = f.toString()
          var rs = s.indexOf('.')
          if (rs < 0) {
            rs = s.length
            s += '.'
          }
          while (s.length <= rs + 2) {
            s += '0'
          }
          return s
        }
        this.accumulativeInvAmountSum = toDecimal2(data.accumulativeInvAmountSum)
        this.accumulativeProfitAmtSum = toDecimal2(data.accumulativeProfitAmtSum)
        this.invYesdayAmt = toDecimal2(data.invYesdayAmt)
        this.invTodayAmt = toDecimal2(data.invTodayAmt)
      })
    },
    getQualityList(data) {
      getQualityList(data).then(res => {
        let data = res.data
        this.noviceProjectList = data.noviceProjectList
        this.noviceProjectList.forEach(val => {
          val.investMent = val.investMent.substr(0, val.investMent.length - 1)
        })
        this.popularProjectList = data.popularProjectList
      })
    },
    closePop() {
      this.isShowActivityPop = false
    },
    JumpSafety(id) {
      localStorage.setItem('jumpId', id)
      let jumpId = localStorage.getItem('jumpId')
      let anchorElement = document.getElementById(jumpId)
      // 如果锚点存在，就跳转
      if (jumpId && anchorElement) {
        anchorElement.scrollIntoView()
      }
    }
  },
  mounted() {
    this.getBanner()
    this.getNotice()
    this.getOperateData()
    if (this.user) {
      let postData = {
        userName: this.user.userName
      }
      this.getQualityList(postData)
    } else {
      this.getQualityList()
    }
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
      height: 500px;
      object-fit: cover;
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
    .form-container {
      position: absolute;
      top: 0;
      left: calc(50% - 570px);
      width: 1140px;
      height: 0;
      margin: 0 auto;
      //padding: 35px 0;
      z-index: 99;
    }
  }
  .notice-wrap {
    width: 100%;
    height: 49px;
    border-bottom: 1px solid #ebebeb;
    background: #fff;
    .notice-box {
      display: flex;
      line-height: 50px;
      width: 1140px;
      margin: 0 auto;
      .notice-text {
        display: block;
        margin-top: 16px;
        margin-right: 20px;
        width: 88px;
        height: 18px;
        background: url('./images/bg_index.png') -5px -5px;
        background-size: 205px auto;
      }
      .notice-swiper-wrap {
        height: 50px;
        .notice-item {
          display: flex;
          display: inline-block;
          width: 320px;
          height: 100%;
          //line-height: 49px;
          margin-right: 10px;
          span {
            vertical-align: top;
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
              a:hover {
                color: #efa21c;
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
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
    background: #fff;
    ul {
      height: 52px;
      padding: 0 27px;
      width: 1140px;
      display: flex;
      margin: 0 auto;
      li {
        display: flex;
        width: 232px;
        height: 100%;
        margin-right: 100px;
        flex: none;
        position: relative;
        a {
          display: flex;
          span {
            position: absolute;
            left: 0;
            top: 0;
            width: 52px;
            height: 52px;
            display: inline-block;
            transition: all 0.5s;
          }
          span:hover {
            transform: scale(1.4);
          }
          .title {
            width: 80px;
            display: inline-block;
            margin-left: 64px;
            vertical-align: top;
            font-size: $font-size-medium-x;
            color: $color-text;
          }
          .desc {
            width: 168px;
            display: inline-block;
            margin-left: 64px;
            vertical-align: middle;
            font-size: $font-size-small-s;
            color: $color-text-s;
          }
        }
      }
      li:nth-child(1) {
        span {
          background: url('./images/bg_index.png') -5px -242px;
          background-size: 205px auto;
        }
      }
      li:nth-child(2) {
        width: 176px;
        span {
          background: url('./images/bg_index.png') -5px -304px;
          background-size: 205px auto;
        }
      }
      li:nth-child(3) {
        width: 176px;
        span {
          background: url('./images/bg_index.png') -5px -366px;
          background-size: 205px auto;
        }
      }
      li:nth-child(4) {
        span {
          background: url('./images/bg_index.png') -5px -428px;
          background-size: 205px auto;
        }
      }
      li:last-child() {
        margin-right: 0;
      }
    }
  }
  .lend-data-wrap {
    width: 100%;
    margin: 0 auto;
    padding: 50px 20px;
    background: #fff;
    .text-title {
      width: 158px;
      height: 38px;
      margin: 0 auto;
      background: url('./images/bg_index.png') -5px -193px;
      background-size: 205px auto;
    }
    ul {
      width: 1140px;
      margin: 0 auto;
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
    padding-top: 60px;
    padding-bottom: 60px;
    .novice-area-box {
      width: 1140px;
      height: 180px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .desc-warp {
        width: 218px;
        height: 100%;
        .text-title {
          display: block;
          width: 195px;
          height: 84px;
          background: url('./images/bg_index.png') -5px -1192px;
          background-size: 205px auto;
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
        background: #fff url('./images/bg_index.png') center -1276px no-repeat;
        background-size: 205px auto;
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
              width: 137px;
              text-align: center;
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
    .text-title {
      display: block;
      width: 159px;
      height: 38px;
      margin: 0 auto;
      margin-bottom: 40px;
      text-align: center;
      background: url('./images/bg_index.png') -5px -145px;
      background-size: 205px auto;
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
          height: 48px;
          line-height: 48px;
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
    padding-bottom: 62px;
    background: #fff;
    .text-title {
      display: block;
      width: 158px;
      height: 38px;
      margin: 0 auto;
      background: url('./images/bg_index.png') -5px -97px;
      background-size: 205px auto;
    }
    ul {
      width: 1140px;
      margin: 0 auto;
      margin-top: 42px;
      li {
        display: inline-block;
        width: 212px;
        height: 146px;
        margin-right: 20px;
        vertical-align: middle;
        text-align: center;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
        }
        .btn-more {
          display: inline-block;
          height: 146px;
          line-height: 146px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-text-blue;
        }
        &:nth-child(1) {
          background: url('./images/bg_index.png') -10px -1916px;
          background-size: 410px auto;
        }
        &:nth-child(2) {
          background: url('./images/bg_index.png') -10px -2072px;
          background-size: 410px auto;
        }
        &:nth-child(3) {
          background: url('./images/bg_index.png') -10px -2228px;
          background-size: 410px auto;
        }
        &:nth-child(4) {
          background: url('./images/bg_index.png') -10px -980px;
          background-size: 410px auto;
        }
        &:nth-child(5) {
          background: url('./images/bg_index.png') -10px -1136px;
          background-size: 410px auto;
        }
        &:nth-child(6) {
          background: url('./images/bg_index.png') -10px -1292px;
          background-size: 410px auto;
        }
        &:nth-child(7) {
          background: url('./images/bg_index.png') -10px -1448px;
          background-size: 410px auto;
        }
        &:nth-child(8) {
          background: url('./images/bg_index.png') -10px -1604px;
          background-size: 410px auto;
        }
        &:nth-child(9) {
          background: url('./images/bg_index.png') -10px -1760px;
          background-size: 410px auto;
        }
      }
      li:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
  .activity-pop {
    position: fixed;
    z-index: 100000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    .content {
      position: fixed;
      display: table;
      z-index: 100001;
      width: 500px;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
      i {
        position: absolute;
        right: 0;
        top: 0;
        color: #fff;
        font-size: 30px;
      }
      .activity-img {
        margin-top: 42px;
        width: 100%;
        height: 380px;
        border-radius: 10px;
        .btn-to-investment {
          margin-top: 280px;
          width: 220px;
          height: 56px;
          border-radius: 25px;
          color: #dd2e3d;
          background: #f8ce55;
          box-shadow: 0px 5px 1px 1px #f6a04b;
          font-size: $font-size-large;
        }
      }
    }
  }
}
</style>
