<template>
  <div class="__certification__flow" @click="regFlow"><slot></slot></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Base64Utils } from '@/assets/js/utils'

export default {
  name: 'CertificationFlow',
  data() {
    return {}
  },
  props: {
    regFlowTo: {
      /*
       * 规定认证到哪一步为止
       * openAccount  # 开户
       * password  # 是否设置了交易密码
       * makeAgre  # 是否签约
       * risk  # 是否通过风险测评(default)
       */
      type: String,
      default: 'risk'
    },
    validBankCard: {
      // 是否校验银行卡
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['user', 'userBasicInfo'])
  },
  methods: {
    link(routerName) {
      this.$router.push({
        name: routerName,
        query: {
          entrance: Base64Utils.objectToBase64({ fullPath: this.$route.fullPath })
        }
      })
    },
    regFlow() {
      switch (this.regFlowTo) {
        case 'openAccount':
          if (!this.user) {
            this.link('login')
            return
          }
          if (!this.userBasicInfo.escrowAccountInfo) {
            this.link('account')
          } else {
            this.$emit('regSuccess')
          }
          break
        case 'password':
          if (!this.user) {
            this.link('login')
            return
          }
          if (!this.userBasicInfo.escrowAccountInfo) {
            this.link('progress')
          } else {
            if (this.validBankCard && !this.userBasicInfo.escrowAccountInfo.bankCard) {
              this.link('AddBankCard')
            } else if (this.userBasicInfo.escrowAccountInfo.transPassword == null) {
              this.link('progress')
            } else {
              this.$emit('regSuccess')
            }
          }
          break
        case 'makeAgre':
          if (!this.user) {
            this.link('login')
            return
          }
          if (!this.userBasicInfo.escrowAccountInfo) {
            this.link('progress')
          } else {
            if (this.validBankCard && !this.userBasicInfo.escrowAccountInfo.bankCard) {
              this.link('AddBankCard')
            } else if (this.userBasicInfo.escrowAccountInfo.transPassword == null) {
              this.link('progress')
            } else {
              if (this.userBasicInfo.escrowAccountInfo && (!this.userBasicInfo.userIsOpenAccount.isAutoTender || !this.userBasicInfo.userIsOpenAccount.isBondTransfer)) {
                this.link('signAgreement')
              } else {
                this.$emit('regSuccess')
              }
            }
          }
          break
        case 'risk':
          if (!this.user) {
            this.link('login')
            return
          }
          if (!this.userBasicInfo.escrowAccountInfo) {
            this.link('progress')
          } else {
            if (this.validBankCard && !this.userBasicInfo.escrowAccountInfo.bankCard) {
              this.link('AddBankCard')
            } else if (this.userBasicInfo.escrowAccountInfo.transPassword == null) {
              this.link('progress')
            } else {
              if (this.userBasicInfo.escrowAccountInfo && (!this.userBasicInfo.userIsOpenAccount.isAutoTender || !this.userBasicInfo.userIsOpenAccount.isBondTransfer)) {
                this.link('signAgreement')
              } else {
                if (
                  this.userBasicInfo.evaluatingResult == null &&
                  (this.userBasicInfo.userIsOpenAccount.isAutoTender && this.userBasicInfo.userIsOpenAccount.isBondTransfer)
                ) {
                  this.link('risk_test')
                } else {
                  this.$emit('regSuccess')
                }
              }
            }
          }
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
