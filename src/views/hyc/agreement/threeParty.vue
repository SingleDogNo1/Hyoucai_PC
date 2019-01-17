<template>
  <div>
    <threePartySS v-if="protocolTemplateId==1"></threePartySS>
    <threePartyZH v-if="protocolTemplateId==3"></threePartyZH>
    <threePartyHZ v-if="protocolTemplateId==2"></threePartyHZ>
  </div>
</template>
<script>
import threePartySS from './threePartySS'
import threePartyZH from './threePartyZH'
import threePartyHZ from './threePartyHZ'
import { getProtocolTemplateId } from '@/api/hyc/agreement'
export default {
  name: 'agreement',
  data() {
    return {
      protocolTemplateId: 1
    }
  },
  components: {
    threePartySS,
    threePartyZH,
    threePartyHZ
  },
  methods: {
    getProtocolTemplateId: function() {
      getProtocolTemplateId().then(res => {
        this.protocolTemplateId = res.data.data.protocolTemplateId
      })
    }
  },
  created() {
    this.getProtocolTemplateId()
  }
}
</script>
<style scoped lang="scss">
</style>
