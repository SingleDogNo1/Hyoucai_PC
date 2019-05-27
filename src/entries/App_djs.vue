<template>
  <div id="app"><router-view></router-view></div>
</template>

<script>
export default {
  name: 'App_djs',
  created() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      // mobile
      if (window.location.href.indexOf(process.env.VUE_APP_PROJECT_ADDRESS_PC) > -1) {
        window.location.href = process.env.VUE_APP_PROJECT_ADDRESS_H5
      }
    }
  }
}
</script>

<style scoped></style>
