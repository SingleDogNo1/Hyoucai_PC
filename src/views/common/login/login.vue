<template>
  <div class="app-container">
    <div class="form-container">
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import { isExistUser } from '@/api/common/register'
import LoginForm from '@/components/loginForm'
export default {
  name: 'mobile',
  components: { LoginForm },
  data() {
    return {
      agree: true,
      mobile: ''
    }
  },
  methods: {
    nextStep() {
      isExistUser(this.mobile)
      //this.$router.push({ name: 'registerForm' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/css/theme.scss';
.app-container {
  min-width: 1140px;
  width: 100%;
  height: 500px;
  background: url('./mobile_bg.png') center center;
  .form-container {
    width: 1140px;
    height: 100%;
    margin: 0 auto;
    padding: 35px 0;
  }
}
</style>
