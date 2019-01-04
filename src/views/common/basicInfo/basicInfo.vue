<template>
  <div class="basicInfo">
    <header>
      <div class="last_time">上次登录时间:{{this.name}}</div>
      <div class="data_full">
        <span class="text">资料完整度</span>
        <span class="bar"></span>
        <span class="crade">高</span>
      </div>
      <div class="authentication">
        <div class="identity">
          <img src="./identity.png">
        </div>
        <div class="phone">
          <img src="./phone.png">
        </div>
      </div>
    </header>
    <!-- 个人信息 -->
    <div class="ess_information">
      <h3 class="title">个人信息</h3>
      <div class="wrap">
        <div class="wrap_rows">
          <span class="wrap_left">昵称修改</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn" @click="isShow1 = !isShow1">修改</button>
        </div>
        <div v-show="isShow1">11111</div>
        <div class="wrap_rows">
          <span class="wrap_left">登录密码</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn" @click="isShow2 = !isShow2">修改</button>
        </div>
        <div v-show="isShow2">11111</div>
        <div class="wrap_rows">
          <span class="wrap_left">注册手机号</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn" @click="isShow3 = !isShow3">修改</button>
        </div>
        <div v-show="isShow3">11111</div>
        <div class="wrap_rows">
          <span class="wrap_left">风险测评</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn">重新测评</button>
        </div>
        <div class="wrap_rows last_rows">
          <span class="wrap_left">收货地址</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn" @click="isShow4 = !isShow4">修改</button>
        </div>
        <div v-show="isShow4">11111</div>
      </div>
    </div>
    <!-- 存管信息 -->
    <div class="dep_information">
      <h3 class="title">存管信息</h3>
      <div class="wrap">
        <div class="wrap_rows">
          <span class="wrap_left">真实姓名</span>
          <span class="wrap_center"></span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">身份证号</span>
          <span class="wrap_center"></span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">存管账户</span>
          <span class="wrap_center"></span>
        </div>
        <div class="wrap_rows">
          <span class="wrap_left">交易密码</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn">修改</button>
        </div>
        <div class="wrap_rows last_rows">
          <span class="wrap_left">电子账户手机号</span>
          <span class="wrap_center"></span>
          <button class="wrap_btn">修改</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserBasicInfo } from '@/api/common/basicInfo'
import { getAuth } from '@/assets/js/utils'
export default {
  name: 'basicInfo',
  mixins: [],
  components: {},
  data() {
    return {
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      name: '',
      transPassword: '',
      authorization: getAuth()
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.basicInfo {
  width: 840px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(229, 229, 229, 1);
  padding-bottom: 33px;
  header {
    // 头部样式
    width: 809px;
    box-shadow: 0px -2px 0px 0px rgba(247, 190, 57, 1);
    padding: 30px 0 0 30px;
    .last_time {
      width: 235px;
      height: 14px;
      font-size: $font-size-small-s;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(90, 90, 90, 1);
      line-height: 14px;
    }
    .data_full {
      font-size: $font-size-small-s;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 14px;
      margin-top: 19px;
      .bar {
        display: inline-block;
        width: 360px;
        height: 6px;
        background: linear-gradient(270deg, rgba(255, 107, 30, 1) 0%, rgba(255, 214, 17, 1) 100%);
        border-radius: 100px;
        margin: 0 12px 0 10px;
      }
    }
    .authentication {
      margin-top: 14px;
      .identity {
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-right: 15px;
        img {
          width: 100%;
        }
      }
      .phone {
        display: inline-block;
        width: 30px;
        height: 30px;
        img {
          width: 100%;
        }
      }
    }
  }
  .ess_information,
  .dep_information {
    margin-left: 29px;
    margin-top: 45px;
    .title {
      width: 103px;
      height: 18px;
      font-size: $font-size-small;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(90, 90, 90, 1);
      line-height: 18px;
      margin-bottom: 12px;
    }
    .wrap {
      width: 780px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 1px 1px 2px 0px rgba(218, 218, 218, 1);
      border-radius: 4px;
      border: 1px solid rgba(227, 227, 227, 1);
      .wrap_rows {
        height: 62px;
        line-height: 62px;
        border-bottom: 2px solid rgba(232, 232, 232, 1);
        margin-left: 21px;
        position: relative;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        .wrap_left {
          font-size: $font-size-small-s;
          color: rgba(90, 90, 90, 1);
        }
        .wrap_center {
          font-size: $font-size-small-s;
          color: rgba(155, 155, 155, 1);
          margin-left: 71px;
        }
        .wrap_btn {
          width: 100px;
          height: 34px;
          position: absolute;
          top: 18px;
          right: 20px;
          background: rgba(255, 255, 255, 1);
          border-radius: 6px;
          border: 1px solid rgba(251, 137, 31, 1);
          font-size: $font-size-small;
          color: rgba(251, 123, 31, 1);
        }
      }
      .last_rows {
        border-bottom: none;
      }
    }
  }
}
</style>
