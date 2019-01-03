<template>
  <div class="Dialog">
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  mixins: [],
  components: {},
  data() {
    return {
      msg: 'Dialog'
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
@import '../../assets/css/theme';
@import '../../assets/css/mixins';

.Dialog {
  @include cube(500px, 200px);
  background: #000;
  margin-top: 50%;
  margin-left: 50%;
  transform: translate3d(-50%, -50%, 0);
}
</style>
