<template>
  <div class="mine-wrapper">
    <user-menu></user-menu>
    <div class="wrapper">
        <router-view />
    </div>
  </div>
</template>

<script>
import userMenu from '@/components/UserMenu/UserMenu'

export default {
  name: 'Mine',
  mixins: [],
  components: {
    userMenu
  },
  data() {
    return {
      msg: 'Mine'
    }
  },
  props: {},
  watch: {},
  methods: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.mine-wrapper {
  width: 1140px;
  height: 100%;
  margin: 30px auto 50px auto;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .wrapper {
    flex: 1;
    width: 842px;
    margin-left: 20px;
  }
}
</style>
