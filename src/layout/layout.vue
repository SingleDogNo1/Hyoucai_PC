<template>
  <div class="layout">
    <AppHeader />
    <div class="container">
      <keep-alive> <router-view></router-view> </keep-alive>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader/AppHeader'
import AppFooter from '@/components/AppFooter/AppFooter'

export default {
  name: 'layout',
  components: {
    AppHeader,
    AppFooter
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 90px;
}
</style>
