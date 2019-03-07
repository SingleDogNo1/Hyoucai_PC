<template>
  <div class="lend-wrapper">
    <header>
      <div class="icon">
        <img src="./icon.png" alt="" />
        <p>汇有财</p>
      </div>
      <div class="earning">
        <p>{{ personalAccount.totalIncome }}元</p>
        <span>累计利息收益</span>
      </div>
      <div class="lend">
        <p>{{ personalAccount.totalInvAmount }}元</p>
        <span>累计出借</span>
      </div>
    </header>
    <section>
      <div class="nav bid-type">
        <h1>出借类别</h1>
        <ul>
          <li :class="{ active: typeStatusIndex === 0 }" @click="showQST(QSTStatus[QSTStatusIndex].statusCode)">轻松投</li>
          <li :class="{ active: typeStatusIndex === 1 }" @click="showZXT">自选投</li>
        </ul>
      </div>
      <div class="nav bid-status" v-if="typeStatusIndex === 0">
        <h1>状态</h1>
        <ul>
          <li
            v-for="(item, index) in QSTStatus"
            :key="index"
            :class="{ active: index === QSTStatusIndex }"
            @click="changeQSTStatus(index, item.statusCode)"
          >
            {{ item.statusName }}
          </li>
        </ul>
      </div>
      <div class="nav bid-date" v-if="dateStatus && dateStatus.length > 0">
        <h1>交易时间</h1>
        <ul>
          <li
            v-for="(item, index) in dateStatus"
            :key="index"
            :class="{ active: index === dateStatusIndex }"
            @click="changeDateStatus(index, item.value)"
          >
            {{ item.key }}
          </li>
        </ul>
      </div>
      <div class="nav bid-status" v-if="typeStatusIndex === 1">
        <h1>状态</h1>
        <ul>
          <li
            v-for="(item, index) in ZXTStatus"
            :key="index"
            :class="{ active: index === ZXTStatusIndex }"
            @click="changeZXTStatus(index, item.value)"
          >
            {{ item.key }}
          </li>
        </ul>
      </div>
      <div class="detail-wrapper"><router-view></router-view></div>
    </section>
  </div>
</template>

<script>
import { getInvestStatusApi, getDefaultStatusApi, getSanBiaoStatusApi } from '@/api/hyc/Mine/lend'
import { mapGetters } from 'vuex'
export default {
  name: 'lend',
  data() {
    return {
      typeStatusIndex: 0, // 出借类别索引 0: 轻松投  1: 自选投
      QSTStatus: [], // 轻松投状态tab
      QSTStatusIndex: 0, // 轻松投状态tab的索引
      ZXTStatus: [], // 汇选投状态tab
      ZXTStatusIndex: 0, // 汇选投状态tab的索引
      dateStatus: [], // 交易时间tab
      dateStatusIndex: 0, // 交易时间tab的索引
      productType: '',
      settlementFlags: '',
      status: this.$route.params.status // 从其他途径跳转来的参数（个人中心弹窗 refund）
    }
  },
  computed: {
    ...mapGetters(['personalAccount'])
  },
  methods: {
    changeQSTStatus(index, status) {
      console.log('status===', status, index)
      this.QSTStatusIndex = index
      this.$router.push({
        name: 'QSTList',
        params: { status }
      })
    },
    changeZXTStatus(index, status) {
      this.ZXTStatusIndex = index
      this.$router.push({
        name: 'ZXTList',
        params: {
          date: this.dateStatus[this.dateStatusIndex].value,
          status: status
        }
      })
    },
    changeDateStatus(index, status) {
      this.dateStatusIndex = index
      this.$router.push({
        name: 'ZXTList',
        params: {
          date: status,
          status: this.ZXTStatus[this.ZXTStatusIndex].value
        }
      })
    },
    showQST(status) {
      this.typeStatusIndex = 0
      this.dateStatus = []
      const $this = this
      async function initQSTTab() {
        // 获取轻松投状态
        getInvestStatusApi({
          projectType: 2
        }).then(res => {
          $this.QSTStatus = res.data.data.list
        })
        // 获取轻松投默认显示的状态
        await getDefaultStatusApi().then(res => {
          const status = res.data.data.invStatus
          if ($this.settlementFlags === '1' && $this.productType === '2') {
            $this.QSTStatusIndex = 2
          } else {
            $this.QSTStatus.find((value, index) => {
              if (value.statusCode === status) {
                $this.QSTStatusIndex = index
              }
            })
          }
        })
        console.log($this.$route.query)
        // 跳转到轻松投详情
        await $this.$router.push({
          name: 'QSTList',
          params: { status }
        })
      }
      initQSTTab()
    },
    showZXT() {
      this.typeStatusIndex = 1
      const $this = this
      async function initZXTTab() {
        // 获取散标时间和状态
        await getSanBiaoStatusApi().then(res => {
          const statusList = res.data.data
          $this.dateStatus = statusList.dateStatus
          $this.ZXTStatus = statusList.invStatus
        })
        if ($this.settlementFlags === '1' && $this.productType === '0') {
          $this.ZXTStatusIndex = 4
          // 跳转到散标详情
          await $this.$router.push({
            name: 'ZXTList',
            params: {
              date: $this.dateStatus[$this.dateStatusIndex].value,
              status: 'INJQ'
            }
          })
        } else {
          // 跳转到散标详情
          await $this.$router.push({
            name: 'ZXTList',
            params: {
              date: $this.dateStatus[$this.dateStatusIndex].value,
              status: $this.ZXTStatus[$this.ZXTStatusIndex].value
            }
          })
        }
      }
      initZXTTab()
    }
  },
  created() {
    const $this = this
    //判断productType(0：散标，1：债转标，2：集合标)
    //settlementFlags(0-未结清 1-已结清)
    $this.productType = $this.$route.query.productType
    $this.settlementFlags = $this.$route.query.settlementFlags
    async function initStatus() {
      // 获取状态
      await getInvestStatusApi({
        projectType: 2
      }).then(res => {
        $this.QSTStatus = res.data.data.list
      })
      // 获取默认显示的状态
      await getDefaultStatusApi().then(res => {
        const status = res.data.data.invStatus
        if ($this.status === 'QST_YTK') {
          // 跳转到已退款
          $this.QSTStatusIndex = 3
        } else {
          $this.QSTStatus.find((value, index) => {
            if (value.statusCode === status) {
              $this.QSTStatusIndex = index
            }
          })
        }
      })
      if ($this.settlementFlags === '1' && $this.productType === '2') {
        $this.showQST('JHB_YJQ')
      }
      if ($this.settlementFlags === '1' && $this.productType === '0') {
        $this.showZXT()
      } else {
        await $this.$router.push({
          name: 'QSTList',
          params: {
            status: $this.QSTStatus[$this.QSTStatusIndex].statusCode
          }
        })
      }
    }
    initStatus()
  }
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
    .icon {
      p {
        font-size: $font-size-small-ss;
        margin-top: 5px;
        padding-left: 11px;
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
        width: 90px;
        line-height: 60px;
        text-align: center;
        color: $color-text;
        font-size: $font-size-small-s;
        &.active {
          color: $color-theme;
        }
      }
    }
    &.bid-status {
      border-bottom: 1px solid #e3e3e3;
    }
  }
}
</style>
