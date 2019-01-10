<template>
  <div class="Dialog" v-if="show" @mousewheel="onMousewheel($event)">
    <div class="inner">
      <header v-if="showTitle">{{ title }}</header>
      <slot></slot>
      <footer class="single" v-if="singleButton">
        <el-button @click="cancelItem">{{ confirmText }}</el-button>
      </footer>
      <footer v-else>
        <el-button type="primary" @click="confirmItem">{{ confirmText }}</el-button>
        <el-button @click="cancelItem">{{ cancelText }}</el-button>
      </footer>
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
  background: transparent;
  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    padding: 30px 70px;
    transform: translate3d(-50%, -50%, 0);
    background: #fff;
    box-shadow: 2px 2px 10px 0 #cdcdcd;
    border-radius: 6px;
    border: 1px solid #e3e3e3;
    header {
      height: 34px;
      line-height: 34px;
      font-size: $font-size-large-x;
      color: $color-text;
      text-align: center;
      margin-bottom: 30px;
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
