<template>
  <div class="info-disclosure">
    <div class="bg-header">
      <h3>信息披露中心</h3>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/theme.scss';
.info-disclosure {
  .bg-header {
    width: 100%;
    height: 200px;
    background: url('./images/bg_header.png') center center no-repeat;
    padding-top: 34px;
    h3 {
      width: 184px;
      margin: 0 auto;
      text-align: center;
      font-size: $font-size-large-xxx;
      color:rgba(255,255,255,1);
    }
  }
}
</style>

