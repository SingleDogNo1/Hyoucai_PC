<template>
  <div id="app"></div>
</template>

<script>
import { showFlag } from '@/api/common/common'

export default {
  name: 'app',
  created() {
    showFlag().then(res => {
      if (res.data.resultCode === '1') {
        let temp = res.data.data.platformFlag === '1' ? 'djs' : 'hyc'
        window.location.href = `./${temp}/#/`
      }
    })
  }
}
</script>

<style scoped></style>
