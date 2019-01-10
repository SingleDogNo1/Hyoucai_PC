<template>
  <div class="coupons">
    <header>
      <div class="card" :class="{ active: flag1 }" @click="changeFlag1">可用卡券</div>
      <div class="card" :class="{ active: flag2 }" @click="changeFlag2">历史卡券</div>
    </header>
    <div class="coupons_box">
      <div
        v-for="(item, index) in receiveList"
        :class="[
          { receive1: item.voucherType == 'VT01' },
          { receive2: item.secondType == 1 },
          { receive2_1: item.secondType == 2 },
          { receive3: item.voucherType == 'VT03' }
        ]"
        :key="index"
      >
        <div v-show="item.voucherType == 'VT01'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i>元</i> </span> <span class="vouche_aside">可加息券{{ item.validDays }}天</span>
          </p>
          <p class="start">起投金额：{{ item.voucherFaceValue }}元</p>
        </div>
        <div v-show="item.voucherType == 'VT02'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i>元</i> </span> <span class="vouche_aside">可与加息券同时使用</span>
          </p>
          <p class="start">起投金额：{{ item.voucherFaceValue }}元</p>
        </div>
        <div class="endData">有效期至:{{ item.validUseEndTime }}</div>
        <el-button class="receive1_btn" @click="open">立即领取</el-button>
      </div>
      <div
        v-for="(item, index) in receivedList"
        :class="[
          { receive1: item.voucherType == 'VT01' },
          { receive2: item.secondType == 1 },
          { receive2_1: item.secondType == 2 },
          { receive3: item.voucherType == 'VT03' }
        ]"
        :key="index"
      >
        <div v-show="item.voucherType == 'VT01'"></div>
        <div v-show="item.voucherType == 'VT02'">
          <p class="vouche_box">
            <span class="vouche"> {{ item.voucherFaceValue }} <i>元</i> </span> <span class="vouche_aside">可与加息券同时使用</span>
          </p>
          <p class="start">起投金额：{{ item.voucherFaceValue }}元</p>
        </div>
        <div class="endData">有效期至:{{ item.validUseEndTime }}</div>
        <el-button class="receive1_btn">立即使用</el-button>
      </div>
    </div>
    <div class="message_box"></div>
  </div>
</template>

<script>
import { geCoupon } from '@/api/djs/Mine/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'coupons',
  mixins: [],
  components: {},
  data() {
    return {
      flag1: true,
      flag2: false,
      receiveList: [],
      receivedList: [],
      unReList: []
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
    open() {
      this.$confirm('领取成功', {
        confirmButtonText: '确定',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    geCoupon: function() {
      let data = {}
      data.userName = this.user.userName
      data.clientType = 'QD01'
      geCoupon(data).then(res => {
        // let list = JSON.parse(JSON.stringify(res.data.data.list))
        // list.map(item => {
        //   switch (item.status) {
        //     case 1:
        //       this.receiveList.push(item)
        //       break
        //     case 2:
        //       this.receivedList.push(item)
        //       break
        //     case 3:
        //       this.unReList.push(item)
        //       break
        //   }
        //   this.receiveList.map(item => {
        //     item.voucherFaceValue = parseInt(item.voucherFaceValue)
        //   })
        // })
        console.log(res)
      })
    }
  },
  created() {
    this.geCoupon()
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/css/theme.scss';
.coupons {
  header {
    width: 840px;
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
    }
  }
  .coupons_box {
    height: auto;
    display: flex;
    padding-left: 29px;
    padding-top: 41px;
    .receive1 {
      background-image: url(./inserset.png);
      width: 378px;
      height: 105px;
      margin-right: 25px;
      margin-bottom: 30px;
    }
    .receive2 {
      background-image: url(./dikou.png);
      width: 378px;
      height: 105px;
      margin-right: 25px;
      margin-bottom: 30px;
    }
    .receive2_1 {
      background-image: url(./xianjin.png);
      width: 378px;
      height: 105px;
      margin-right: 25px;
      margin-bottom: 30px;
      position: relative;
      .vouche_box {
        padding-top: 19px;
        .vouche {
          font-size: $font-size-large-xxx;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          margin-left: 33px;
          i {
            font-size: $font-size-large-x;
            font-weight: 400;
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
      /deep/ .receive1_btn {
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
        span {
          display: inline-block;
          white-space: normal;
        }
      }
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
}
</style>
