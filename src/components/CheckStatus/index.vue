<template>
  <div class="check-area-container">
    <div @click="getInfo"><slot></slot></div>
    <Dialog
      title="温馨提示"
      :show="showDialog"
      confirmText="开通汇有财账户"
      :singleButton="true"
      :showCloseBtn="true"
      :onBtnClose="closeDialog"
      :onClose="openAccount"
    >
      <p style="text-align: center;font-size:14px;">您还未开通汇有财账户</p>
    </Dialog>
  </div>
</template>

<script>
import { userInfoCompleteNotice } from '@/api/common/openAccount'
import Dialog from '@/components/Dialog/Dialog'
export default {
  name: 'index',
  data() {
    return {
      showDialog: false,
      status: ''
    }
  },
  props: {
    success: {
      default: () => {},
      type: Function
    },
    triggerMode: {
      // 触发方式 0:自动触发 1:点击触发
      type: String,
      default: '1'
    }
  },
  components: {
    Dialog
  },
  methods: {
    async getInfo() {
      const res = await userInfoCompleteNotice()
      if (['REAL_NAME', 'BANK_CARD'].includes(res.data.data.status)) {
        this.status = res.data.data.status
        this.showDialog = true
      } else {
        this.$emit('success')
        this.success()
      }
    },
    openAccount() {
      if (this.status === 'REAL_NAME') {
        this.$router.push({ name: 'realNameAuth', query: { from: this.$route.name } })
      } else if (this.status === 'BANK_CARD') {
        this.$router.push({ name: 'realNameBindCard', query: { from: this.$route.name } })
      }
    },
    closeDialog() {
      this.showDialog = false
    }
  },
  created() {
    if (this.triggerMode === '0') this.getInfo()
  }
}
</script>

<style scoped>
.check-area-container {
  display: inline-block;
}
</style>
