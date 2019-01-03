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
        <div class="qr-code" @mouseenter="showIOSCode" @mouseleave="hideIOSCode">
          <span>iOS下载</span> <transition name="slide"> <div class="ios code" v-show="IOSCodeFlag"></div> </transition>
        </div>
        <div class="qr-code" @mouseenter="showAndCode" @mouseleave="hideAndCode">
          <span>安卓下载</span> <transition name="slide"> <div class="and code" v-show="AndCodeFlag"></div> </transition>
        </div>
      </li>
    </ul>
    <div class="btm">
      <ul class="partner">
        <li v-for="(item, index) in friendLinks" :key="index">
          <a :href="item.fsLink">{{item.fsTitle}}</a>
        </li>
      </ul>
      <div class="copyright">
        <span>&copy;</span> <span>2013-2017 江西汇通金融信息服务有限公司 版权所有</span>
        <a href="http://www.miibeian.gov.cn/">赣ICP备13002945号-4 免责声明</a>
      </div>
      <div class="copy-img">
        <a target="_blank" href="http://si.trustutn.org/info?sn=396180320000637017253&certType=4"> <img src="./renzheng.png" alt="" /> </a>
        <a target="_blank" href="https://credit.szfw.org/CX20180307033115391632.html"> <img src="./cert.png" alt="" /> </a>
        <a target="_blank" href="https://v.pinpaibao.com.cn/cert/site/?site=www.hyoucai.com&at=realname"> <img src="./realnameAuth.png" alt="" /> </a>
        <a target="_blank" href="https://ss.knet.cn/verifyseal.dll?sn=e17033136010067212faqu000000&ct=df&a=1&pa=0.7946975489546229">
          <img src="./cnnic.png" alt="" />
        </a>
        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=36012102000103">
          <img src="./gongan_wb.png" alt="" />
        </a>
        <a target="_blank" href="http://www.jxcn.cn/jbzx/jbzn.htm"> <img src="./jubao.png" alt="" /> </a>
        <a target="_blank" href="https://www.hyoucai.com/page/noticeDetail.html?id=2277"> <img src="./infoLevel.png" alt="" /> </a>
        <a target="_blank" href="http://shuidi.cn/companyextreme-cba6d53b25e3568746166d73661021a7.html"> <img src="./credit.png" alt="" /> </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { getFriendLink } from '@/api/common/footer'

export default {
  name: 'AppFooter',
  mixins: [],
  components: {},
  data() {
    return {
      IOSCodeFlag: false,
      AndCodeFlag: false,
      friendLinks: []
    }
  },
  methods: {
    showIOSCode() {
      this.IOSCodeFlag = true
    },
    hideIOSCode() {
      this.IOSCodeFlag = false
    },
    showAndCode() {
      this.AndCodeFlag = true
    },
    hideAndCode() {
      this.AndCodeFlag = false
    }
  },
  mounted() {
    getFriendLink().then(res => {
      this.friendLinks = res.data.friendLinks
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixins';
@import '../../assets/css/theme';

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.app-footer-wrapper {
  border-top: 1px solid #e3e3e3;
  background: #fff;
  .top {
    margin: 0 auto;
    padding: 30px 0 24px 0;
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
      > div {
        line-height: 30px;
        color: #6a6a6a;
        font-size: $font-size-small-s;
        padding-left: 32px;
        cursor: pointer;
        &:hover {
          color: $color-theme;
        }
        &.qr-code {
          position: relative;
          .code {
            position: absolute;
            z-index: 999;
            @include square(188px);
            top: -50px;
            left: -80px;
            background: url('./down_code.png') 0 / contain;
          }
        }
      }
    }
  }
  .btm {
    height: 190px;
    background: #353b44;
    color: #fff;
    .partner {
      display: flex;
      justify-content: center;
      padding-top: 35px;
      li {
        padding: 0 18px;
        border-right: 1px solid #9b9b9b;
        font-size: $font-size-small-s;
        a {
          transition: all 0.3s ease;
          color: #fff;
          &:hover {
            color: $color-theme;
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
    .copyright {
      text-align: center;
      font-size: $font-size-small-s;
      padding: 30px 0 25px 0;
      a {
        color: #fff;
        margin-left: 10px;
      }
    }
    .copy-img {
      display: flex;
      justify-content: center;
      img {
        margin: 0 15px;
      }
    }
  }
}
</style>
