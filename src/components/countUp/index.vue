<template>
  <p class="title" :id="name">{{ count }}</p>
</template>

<script>
import CountUp from 'countup.js/dist/countUp'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    count: {
      type: [Number, String],
      default: 0.0
    }
  },
  methods: {
    countUp() {
      console.log('111', this.count)
      let demo = new CountUp(this.name, 0, this.count, 2, 2.5)
      demo.start()
    }
  },
  mounted() {
    this.countUp()
  }
}
</script>
