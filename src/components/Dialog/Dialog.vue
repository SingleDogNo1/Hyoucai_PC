<template>
  <div class="Dialog" v-if="show" @mousewheel="onMousewheel($event)">
    <div class="inner">
      <div v-if="showCloseBtn" class="close" @click="cancelBtnItem"><i class="iconfont icon-guanbi1"></i></div>
      <header v-if="showTitle">{{ title }}</header>
      <div class="top" v-if="showLogo"><img src="./hyc&jxbank@2x.png" alt="" /></div>
      <slot></slot>
      <div v-if="showFooter">
        <footer class="single" v-if="singleButton">
          <el-button @click="cancelItem">{{ confirmText }}</el-button>
        </footer>
        <footer v-else>
          <el-button type="primary" @click="confirmItem">{{ confirmText }}</el-button>
          <el-button @click="cancelItem">{{ cancelText }}</el-button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  mixins: [],
  props: {
    // 是否显示弹框
    show: {
      type: Boolean,
      default: false
    },
    showCloseBtn: {
      type: Boolean,
      default: false
    },
    // 标题文字
    title: {
      type: String,
      default: '温馨提示'
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 是否显示logo
    showLogo: {
      type: Boolean,
      default: false
    },
    // 是否显示按钮
    showFooter: {
      type: Boolean,
      default: true
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      default: '确定'
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: '取消'
    },
    // 是否只显示一个按钮 (如果是就只显示取消)
    singleButton: {
      type: Boolean,
      default: false
    },
    // 点击确定执行的函数
    onConfirm: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    // 点击取消执行的函数
    onClose: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    // 点击关闭按钮执行的函数
    onBtnClose: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    // 是否点击确认禁止关闭弹窗
    preventClose: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirmItem() {
      this.onConfirm()
      if (!this.preventClose) {
        this.$emit('update:show', false)
      }
    },
    cancelItem() {
      this.onClose()
      this.$emit('update:show', false)
    },
    cancelBtnItem() {
      this.onBtnClose()
      this.$emit('update:show', false)
    },
    onMousewheel(e) {
      e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/theme';
@import '../../assets/css/mixins';

.Dialog {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(0, 0, 0, 0.2);*/
  background-color: transparent;
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    padding: 30px 70px;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    box-shadow: 2px 2px 10px 0 #cdcdcd;
    border-radius: 6px;
    border: 1px solid #e3e3e3;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 20px;
      }
    }
    header {
      height: 34px;
      line-height: 34px;
      font-size: $font-size-large-x;
      color: $color-text;
      text-align: center;
      margin-bottom: 30px;
    }
    .top {
      margin-bottom: 30px;
      text-align: center;
      img {
        width: 85%;
      }
    }
    footer {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      &.single {
        justify-content: center;
      }
      button {
        @include cube(160px, 44px);
        &.el-button--default {
          border-color: #fb891f;
          color: #fb891f;
        }
      }
    }
  }
}
</style>
