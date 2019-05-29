<template>
  <div>
    <threePartySS :data="feeData" v-if="protocolTemplateId == 1"></threePartySS>
    <threePartyHZ :data="feeData" v-if="protocolTemplateId == 2"></threePartyHZ>
    <threePartyZH :data="feeData" v-if="protocolTemplateId == 3"></threePartyZH>
  </div>
</template>
<script>
import threePartySS from './threePartySS'
import threePartyZH from './threePartyZH'
import threePartyHZ from './threePartyHZ'
import { getProtocolTemplateId, getTrilateralParamsApi } from '@/api/hyc/agreement'
export default {
  name: 'agreement',
  data() {
    return {
      protocolTemplateId: 1,
      productId: this.$route.query.productId,
      feeData: {
        createTime: '',
        createUser: 'frank.yang',
        id: '',
        loanProductId: '_',
        maxRepayAmountRate: '_',
        overdueAmountRate: '_',
        overdueFourRate: '_',
        overdueMaxAmountRate: '_',
        overdueMinAmount: '_',
        overdueOneFourRate: '_',
        overdueOneRate: '_',
        overduePerDayRate: '_',
        previousRepayRate: '_',
        serverRate: '_',
        trilateralType: '_',
        updateTime: 0,
        updateUser: ''
      }
    }
  },
  components: {
    threePartySS,
    threePartyZH,
    threePartyHZ
  },
  methods: {
    getProtocolTemplateId() {
      getProtocolTemplateId().then(res => {
        this.protocolTemplateId = res.data.data.protocolTemplateId
      })
    }
  },
  created() {
    const $this = this
    ;(async function initData() {
      await $this.getProtocolTemplateId()
      await getTrilateralParamsApi({
        trilateralProtocolType: $this.protocolTemplateId,
        loanProductId: $this.productId
      }).then(res => {
        $this.feeData = res.data.data
      })
    })()
  }
}
</script>
<style scoped lang="scss"></style>
