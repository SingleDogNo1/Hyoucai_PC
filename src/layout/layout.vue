<template>
  <div class="layout">
   <header class="app-header">
     header
   </header>
    <div class="container">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <footer class="app-footer">footer</footer>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'layout',
  created() {
    new Swiper({})
  }
}
</script>

<style lang="scss" scoped>
</style>
