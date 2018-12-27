<template>
    <div class="container">
      <div class="form-container"></div>
    </div>
</template>

<script>
export default {
  name: 'form'
}
</script>

<style scoped lang="scss">
.container {
  min-height: 528px;
  background: rgba(239, 239, 239, 1);
  padding: 30px 0 28px;
  .form-container {
    width: 1140px;
    margin: 0 auto;
    min-height: 470px;
    background: #fff;
    border: 1px solid rgba(227, 227, 227, 1);
  }
}
</style>
