const getters = {
  user: state => state.user.user,
  registerMobile: state => state.register.mobile,
  errorNum: state => state.login.errorNum
}
export default getters
