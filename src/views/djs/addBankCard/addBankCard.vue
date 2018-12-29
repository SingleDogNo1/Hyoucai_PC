<template>
  <div class="wrapper">
    <h3>绑定银行卡</h3>
    <div class="item">
      <span class="title">&emsp;姓名</span>
      <div class="info-wrapper"><i class="iconfont icon-user"></i> <input type="text" placeholder="请输入姓名" /></div>
    </div>
    <div class="item">
      <span class="title">身份证</span>
      <div class="info-wrapper"><i class="iconfont icon-certificate"></i> <input type="text" placeholder="请输入身份证号码" /></div>
    </div>
    <div class="item add-card">
      <span class="title">银行卡</span>
      <div class="info-wrapper">
        <i class="iconfont icon-Bankcard"></i> <input type="text" placeholder="请输入银行卡号" />
        <div class="bank-support">
          <el-popover placement="right" width="200" trigger="hover">
            <ul class="bank-list">
              <li>绑卡支持以下银行：</li>
              <li v-for="(list, i) in bankList" :key="i">
                <img :src="list.src" /><span>{{ list.name }}</span>
              </li>
            </ul>
            <el-button slot="reference"><i class="iconfont icon-changjianwenti"></i></el-button>
          </el-popover>
        </div>
      </div>
    </div>
    <div class="item">
      <span class="title">手机号</span>
      <div class="info-wrapper"><i class="iconfont icon-phone1"></i> <input type="text" placeholder="请输入手机号" /></div>
    </div>
    <div class="item validation">
      <span class="title">验证码</span>
      <div class="info-wrapper">
        <i class="iconfont icon-validation"></i> <input type="text" placeholder="请输入验证码" />
        <div class="get-code-wrapper" v-if="!showCountDown"><button>获取验证码</button></div>
        <div class="count-down-wrapper" v-else>
          <button>{{ countDown }}S</button>
        </div>
      </div>
    </div>
    <div class="item">
      <span class="title">&emsp;&emsp;&emsp;</span>
      <div class="info-wrapper"><input type="button" value="确认绑卡" /></div>
    </div>
  </div>
</template>

<script>
import bankImg from './image/abc.png'
export default {
  name: 'addBankCard',
  data() {
    return {
      showCountDown: true,
      countDown: 60,
      bankList: [
        {
          src: bankImg,
          name: '江西银行'
        },
        {
          src: bankImg,
          name: '华夏银行'
        },
        {
          src: bankImg,
          name: '上海银行'
        },
        {
          src: bankImg,
          name: '农业银行'
        },
        {
          src: bankImg,
          name: '招商银行'
        },
        {
          src: bankImg,
          name: '中国银行'
        },
        {
          src: bankImg,
          name: '厦门银行'
        }
      ]
    }
  },
  methods: {},
  components: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixins';
@import '../../../assets/css/theme';
.wrapper {
  width: 1140px;
  margin: 20px auto 40px;
  background-color: #fff;
  border: 1px solid #f5f5f5;
  h3 {
    padding: 45px 0;
    font-size: $font-size-medium;
    color: $color-text;
    text-align: center;
  }
  .item {
    margin-bottom: 15px;
    /*overflow: hidden;*/
    font-size: 0;
    text-align: center;
    .title {
      display: inline-block;
      vertical-align: top;
      margin: 8px 10px 0 0;
      font-size: $font-size-medium;
      color: $color-text;
    }
    .info-wrapper {
      display: inline-block;
      vertical-align: top;
      width: 284px;
      height: 40px;
      line-height: 40px;
      border-radius: 2px;
      border: 1px solid rgba(205, 205, 205, 1);
      /*overflow: hidden;*/
      font-size: 0;
      i {
        display: inline-block;
        vertical-align: top;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        padding: 0 12px;
        font-size: 18px;
        color: rgba(205, 205, 205, 1);
        border-right: 1px solid rgba(205, 205, 205, 1);
      }
      input {
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        height: 100%;
        width: 239px;
        padding-left: 12px;
        font-size: $font-size-small-s;
        &::-webkit-input-placeholder {
          color: rgba(205, 205, 205, 1);
        }
        &::-moz-placeholder {
          color: rgba(205, 205, 205, 1);
        }
        &:-ms-input-placeholder {
          color: rgba(205, 205, 205, 1);
        }
      }
    }
    &.add-card {
      .info-wrapper {
        position: relative;
        .bank-support {
          position: absolute;
          right: -40px;
          top: 10px;
          line-height: 1;
          button {
            display: inline-block;
            @include square(20px);
            padding: 0;
            border-style: dashed;
            border-color: $color-text;
          }
          i {
            height: 0;
            margin-top: 0;
            line-height: 0.9;
            padding: 0;
            border-right: 0;
            color: $color-text-s;
            font-size: 16px;
          }
        }
      }
    }
    &.validation {
      .info-wrapper {
        input {
          width: 148px;
        }
        div {
          display: inline-block;
          vertical-align: top;
          width: 90px;
          height: 100%;
          &.get-code-wrapper {
            cursor: pointer;
            button {
              cursor: pointer;
              color: #0083fe;
            }
          }
          button {
            display: inline-block;
            background-color: #fff;
            width: 100%;
            height: 18px;
            line-height: 18px;
            margin-top: 11px;
            text-align: center;
            border-left: 1px solid #dadada;
            color: $color-text-s;
            font-size: $font-size-small-s;
          }
        }
      }
    }
    &:last-child {
      margin-top: 40px;
      .info-wrapper {
        border: 0;
      }
      input {
        width: 100%;
        color: #fff;
        font-size: $font-size-medium;
        background: rgba(250, 96, 12, 1);
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
.bank-list {
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  li {
    float: left;
    width: 50%;
    margin-top: 10px;
    font-size: $font-size-small-ss;
    color: $color-text-gray;
    img {
      @include square(20px);
      margin-right: 5px;
    }
    // 标题
    &:first-child {
      float: none;
      width: 100%;
      margin-bottom: 10px;
      margin-top: 0;
    }
  }
}
</style>
