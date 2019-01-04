<template>
  <div class="layout">
    <AppHeader />
    <div class="container">
        <router-view></router-view>
    </div>
    <AppFooter />
    <FixedNavigation />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader/AppHeader'
import AppFooter from '@/components/AppFooter/AppFooter'
import FixedNavigation from '@/components/fixedNavigation/index'

export default {
  name: 'layout',
  components: {
    AppHeader,
    AppFooter,
    FixedNavigation
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.container {
  padding-top: 90px;
}
</style>
