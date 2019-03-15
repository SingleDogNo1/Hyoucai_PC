<template>
  <div class="coupons">
    <header>
      <div class="card" :class="{ active: flag1 }" @click="changeFlag1">可用卡券</div>
      <div class="card" :class="[{ active: flag2 }, { actives: flag2 }]" @click="changeFlag2">历史卡券</div>
    </header>
    <!-- 可用卡券 -->
    <div class="coupons_box" :class="{ bg: flag }" v-if="flag1">
      <!-- 立即领取 -->
      <div
        v-for="(item, index) in receiveList"
        :class="[
          { receive1: item.voucherType == 'VT01' },
          { receive2: item.secondType == 1 },
          { receive2_1: item.secondType == 2 && item.intoAccount == 0 },
          { receive2_2: item.secondType == 2 && item.intoAccount == 1 },
          { receive3: item.voucherType == 'VT03' }
        ]"
        :key="index + 'c'"
      >
        <!-- 加息券待领取 -->
        <div v-if="item.voucherType == 'VT01'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">%</i> <i class="font">利息</i> </span>
            <span class="vouche_aside">可加息{{ item.validDays }}天</span>
          </p>
          <p class="start">出借限额：{{ item.amountMin | toThousands }}元至{{ item.amountMax | toThousands }}元</p>
          <button class="receive_btn" @click="receiveCoupon(item.id)">立即领取</button>
          <!-- 领取确定弹框 -->
          <Dialog :show.sync="isShow1" :onConfirm="receiveCouponSuccess" :title="'领取成功'"></Dialog>
        </div>
        <!-- 红包待领取 -->
        <div v-if="item.voucherType == 'VT02'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">元</i> </span>
            <span class="vouche_aside" v-if="item.commonUse === 0">不可与加息券同时使用</span>
            <span class="vouche_aside" v-if="item.commonUse === 1">可与加息券同时使用</span>
          </p>
          <p class="start">起投金额：{{ item.amountMin | toThousands }}元</p>
          <button v-show="item.intoAccount == 0" class="receive_btn" @click="receiveRedPacket(item.id)">立即领取</button>
          <button v-show="item.intoAccount == 1" class="receive_btn" @click="receiveRedPacket(item.id)">计入账户</button>
          <!-- 领取确定弹框 -->
          <Dialog :show.sync="isShow2" :onConfirm="receiveRedPacketSuccess" :title="'领取成功'"></Dialog>
        </div>
        <div class="endData">有效期至{{ item.validUseEndTime }}</div>
      </div>
      <!-- 立即使用 -->
      <div
        v-for="(item, index) in receivedList"
        :class="[
          { receive1: item.voucherType == 'VT01' },
          { receive2: item.secondType == 1 },
          { receive2_1: item.secondType == 2 && item.intoAccount == 0 },
          { receive2_3: item.secondType == 2 && item.intoAccount == 1 },
          { receive3: item.voucherType == 'VT03' }
        ]"
        :key="index + 'a'"
      >
        <div v-if="item.voucherType == 'VT01'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">%</i> <i class="font">利息</i> </span>
            <span class="vouche_aside">可加息{{ item.validDays }}天</span>
          </p>
          <p class="start">出借限额：{{ item.amountMin | toThousands }}元至{{ item.amountMax | toThousands }}元</p>
          <button class="receive1_btn" @click="immdiateUse(item.id)">立即使用</button>
        </div>
        <div v-if="item.voucherType == 'VT02'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">元</i> </span>
            <span class="vouche_aside" v-if="item.commonUse === 0">不可与加息券同时使用</span>
            <span class="vouche_aside" v-if="item.commonUse === 1">可与加息券同时使用</span>
          </p>
          <p class="start">起投金额：{{ item.amountMin | toThousands }}元</p>
          <button v-show="!item.intoAccount == 1" class="receive1_btn" @click="immdiateUseRed(item.id)">立即使用</button>
          <button v-show="item.intoAccount == 1" class="receive_cash_btn">立即使用</button>
        </div>
        <div class="endData">有效期至{{ item.validUseEndTime }}</div>
      </div>
    </div>
    <!-- 历史卡券 -->
    <div class="message_box" :class="{ bg: flags }" v-if="flag2">
      <!-- 已过期 -->
      <div
        v-for="(item, index) in expiredList"
        :class="[
          { receive1: item.voucherType == 'VT01' },
          { receive2: item.secondType == 1 },
          { receive2_1: item.secondType == 2 && item.intoAccount == 0 },
          { receive2_2: item.secondType == 2 && item.intoAccount == 1 },
          { receive3: item.voucherType == 'VT03' }
        ]"
        :key="index"
      >
        <!-- 加息券 -->
        <div v-if="item.voucherType == 'VT01'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">%</i> <i class="font">利息</i> </span>
            <span class="vouche_aside">可加息{{ item.validDays }}天</span>
          </p>
          <p class="start">出借限额：{{ item.amountMin | toThousands }}元至{{ item.amountMax | toThousands }}元</p>
        </div>
        <!-- 红包 -->
        <div v-if="item.voucherType == 'VT02'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">元</i> </span>
            <span class="vouche_aside" v-if="item.commonUse === 0">不可与加息券同时使用</span>
            <span class="vouche_aside" v-if="item.commonUse === 1">可与加息券同时使用</span>
          </p>
          <p class="start">起投金额：{{ item.amountMin | toThousands }}元</p>
        </div>
        <div class="endData">有效期至{{ item.validUseEndTime }}</div>
        <button class="receive1_btn">已过期</button>
      </div>
      <!-- 已使用 -->
      <div
        v-for="(item, index) in usedList"
        :class="[
          { receive1: item.voucherType == 'VT01' },
          { receive2: item.secondType == 1 },
          { receive2_1: item.secondType == 2 && item.intoAccount == 0 },
          { receive2_2: item.secondType == 2 && item.intoAccount == 1 },
          { receive3: item.voucherType == 'VT03' }
        ]"
        :key="index + 'b'"
      >
        <!-- 加息券 -->
        <div v-if="item.voucherType == 'VT01'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">%</i> <i class="font">利息</i> </span>
            <span class="vouche_aside">可加息{{ item.validDays }}天</span>
          </p>
          <p class="start">出借限额：{{ item.amountMin | toThousands }}元至{{ item.amountMax | toThousands }}元</p>
        </div>
        <!-- 红包 -->
        <div v-if="item.voucherType == 'VT02'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i class="vouche_i">元</i> </span>
            <span class="vouche_aside" v-if="item.commonUse === 0">不可与加息券同时使用</span>
            <span class="vouche_aside" v-if="item.commonUse === 1">可与加息券同时使用</span>
          </p>
          <p class="start">起投金额：{{ item.amountMin | toThousands }}元</p>
        </div>
        <div class="endData">有效期至{{ item.validUseEndTime }}</div>
        <button class="receive1_btn">已使用</button>
      </div>
    </div>
  </div>
</template>
<script>
import { geCoupon, couponPacketHistory, receiveCoupon, receiveRedPacket } from '@/api/hyc/Mine/coupon'
import Dialog from '@/components/Dialog/Dialog'
import { mapGetters } from 'vuex'
export default {
  name: 'coupons',
  mixins: [],
  components: {
    Dialog
  },
  data() {
    return {
      flag: false,
      flags: false,
      isShow1: false,
      isShow2: false,
      flag1: true,
      flag2: false,
      receiveList: [],
      receivedList: [],
      unReList: [],
      expiredList: [],
      usedList: []
    }
  },
  props: {},
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    changeFlag1: function() {
      this.flag1 = true
      this.flag2 = false
    },
    changeFlag2: function() {
      this.flag2 = true
      this.flag1 = false
    },
    // 可用卡券
    geCoupon: function() {
      let data = {}
      data.clientType = 'QD01'
      geCoupon(data).then(res => {
        if (res.data.data.list.length == 0) {
          this.flag = true
        }
        let list = res.data.data.list
        this.receiveList.length = 0
        this.receivedList.length = 0
        this.unReList.length = 0
        list.map(item => {
          switch (item.status) {
            case 1:
              this.receiveList.push(item)
              break
            case 2:
              this.receivedList.push(item)
              break
            case 3:
              this.unReList.push(item)
              break
          }
          this.receiveList.map(item => {
            item.voucherFaceValue = parseInt(item.voucherFaceValue)
            item.amountMin = parseInt(item.amountMin)
            item.amountMax = parseInt(item.amountMax)
          })
          this.receivedList.map(item => {
            item.voucherFaceValue = parseInt(item.voucherFaceValue)
            item.amountMin = parseInt(item.amountMin)
            item.amountMax = parseInt(item.amountMax)
          })
        })
      })
    },
    // 历史卡券
    couponPacketHistory: function() {
      let obj = {
        userName: this.user.userName
      }
      couponPacketHistory(obj).then(res => {
        if (res.data.data.list == 0) {
          this.flags = true
        }
        let list = JSON.parse(JSON.stringify(res.data.data.list))
        list.map(item => {
          switch (item.status) {
            case 1:
              this.expiredList.push(item)
              break
            case 2:
              this.usedList.push(item)
              break
          }
          this.expiredList.map(item => {
            item.voucherFaceValue = parseInt(item.voucherFaceValue)
            item.amountMin = parseInt(item.amountMin)
            item.amountMax = parseInt(item.amountMax)
          })
          this.usedList.map(item => {
            item.voucherFaceValue = parseInt(item.voucherFaceValue)
            item.amountMin = parseInt(item.amountMin)
            item.amountMax = parseInt(item.amountMax)
          })
        })
      })
    },
    // 领取加息券
    receiveCoupon: function(id) {
      this.isShow1 = true
      let obj = {}
      obj.userName = this.user.userName
      obj.couponId = id
      receiveCoupon(obj)
    },
    // 领取红包
    receiveRedPacket: function(id) {
      this.isShow2 = true
      let obj = {}
      obj.userName = this.user.userName
      obj.redPacketId = id
      receiveRedPacket(obj)
    },
    // 立即使用
    immdiateUse: function(id) {
      this.$router.push({
        name: 'lend',
        query: {
          couponId: id
        }
      })
    },
    immdiateUseRed: function(id) {
      this.$router.push({
        name: 'lend',
        query: {
          redPacketId: id
        }
      })
    },
    // 领取成功
    receiveCouponSuccess: function() {
      this.isShow1 = false
      this.geCoupon()
    },
    receiveRedPacketSuccess: function() {
      this.isShow2 = false
      this.geCoupon()
    }
  },
  filters: {
    toThousands(num) {
      num = (num || 0).toString()
      let result = ''
      let float = ''
      if (num.indexOf('.') > 0) {
        float = num.split('.')[1]
        num = num.split('.')[0]
      }
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num && float) {
        result = num + result + '.' + float
      } else {
        result = num + result
      }
      return result
    }
  },
  created() {
    this.geCoupon()
    this.couponPacketHistory()
  },
  mounted() {},
  destroyed() {}
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
.coupons {
  header {
    width: 844px;
    height: 57px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(229, 229, 229, 1);
    display: flex;
    .card {
      width: 150px;
      height: 58px;
      text-align: center;
      background: rgba(255, 255, 255, 1);
      line-height: 58px;
      font-size: $font-size-small;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      border-bottom: 1px solid rgba(229, 229, 229, 1);
      cursor: pointer;
    }
    .active {
      height: 58px;
      text-align: center;
      border-right: 1px solid rgba(229, 229, 229, 1);
      border-top: 2px solid rgba(251, 137, 31, 1);
      line-height: 58px;
      font-size: $font-size-small-s;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(251, 137, 31, 1);
      border-bottom: 1px solid #fff;
    }
    .actives {
      border-left: 1px solid rgba(229, 229, 229, 1);
    }
  }
  .coupons_box,
  .message_box {
    background: #fff;
    min-height: 700px;
    padding-left: 29px;
    padding-top: 41px;
    overflow: hidden;
    .receive1,
    .receive2,
    .receive2_1,
    .receive2_2,
    .receive2_3 {
      float: left;
      width: 378px;
      height: 105px;
      margin-right: 25px;
      margin-bottom: 30px;
      position: relative;
      padding-right: 52px;
      .vouche_box {
        padding-top: 19px;
        .vouche {
          font-size: $font-size-large-xxx;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          margin-left: 33px;
          .vouche_i {
            font-size: $font-size-large-x;
            font-weight: 400;
            margin-left: -8px;
          }
        }
        .vouche_aside {
          display: inline-block;
          padding: 1px 6px;
          text-align: center;
          height: 18px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 1);
          font-size: $font-size-small-ss;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
          margin-left: 8px;
          position: relative;
          top: -4px;
        }
      }
      .start {
        margin-left: 33px;
        font-size: $font-size-small-ss;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
      .receive_btn,
      .receive1_btn,
      .receive_cash_btn {
        display: inline-block;
        width: 52px;
        height: 105px;
        background: rgba(255, 227, 17, 1);
        border-radius: 4px;
        padding: 13px 17px;
        font-size: 18px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(255, 58, 41, 1);
        line-height: 20px;
        top: 0;
        right: 0;
        position: absolute;
        cursor: pointer;
        span {
          display: inline-block;
          white-space: normal;
        }
      }
      .receive_cash_btn {
        color: rgba(155, 155, 155, 1);
        background: rgba(235, 235, 235, 1);
      }
      .endData {
        margin-left: 33px;
        font-size: $font-size-small-ss;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
    }
    .receive1 {
      background-image: url(./insersetlq.png);
      .vouche_box {
        .vouche {
          .font {
            font-size: 16px;
          }
        }
      }
    }
    .receive2 {
      background-image: url(./dikoulq.png);
    }
    .receive2_1 {
      background-image: url(./touzilq.png);
    }
    .receive2_2 {
      background-image: url(./xianjin.png);
    }
    .receive2_3 {
      background-image: url(./xianjinsy.png);
      .vouche_box {
        .vouche {
          color: rgba(155, 155, 155, 1);
        }
        .vouche_aside {
          border: 1px solid rgba(155, 155, 155, 1);
          color: rgba(155, 155, 155, 1);
        }
      }
      .start {
        color: rgba(155, 155, 155, 1);
      }
      /deep/ .receive1_btn {
        color: rgba(155, 155, 155, 1);
        background: rgba(235, 235, 235, 1);
      }
      .endData {
        color: rgba(155, 155, 155, 1);
      }
    }
  }
  .bg {
    background: #fff url(./bg.png) no-repeat center;
  }
  .message_box {
    .receive1,
    .receive2,
    .receive2_1,
    .receive2_2 {
      .vouche_box {
        .vouche {
          color: rgba(155, 155, 155, 1);
        }
        .vouche_aside {
          border: 1px solid rgba(155, 155, 155, 1);
          color: rgba(155, 155, 155, 1);
        }
      }
      .start {
        color: rgba(155, 155, 155, 1);
      }
      /deep/ .receive1_btn {
        color: rgba(155, 155, 155, 1);
        background: rgba(235, 235, 235, 1);
      }
      .endData {
        color: rgba(155, 155, 155, 1);
      }
    }
    .receive1 {
      background-image: url(./jiaxigq.png);
      .vouche_box {
        .vouche {
          .font {
            font-size: 16px;
          }
        }
      }
    }
    .receive2 {
      background-image: url(./dikouysy.png);
    }
    .receive2_1 {
      background-image: url(./touziysy.png);
    }
    .receive2_2 {
      background-image: url(./xianjinsy.png);
    }
  }
}
</style>
