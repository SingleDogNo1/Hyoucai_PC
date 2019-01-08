const getters = {
  user: state => state.user.user,
  userBasicInfo: state => state.user.userBasicInfo,
  registerMobile: state => state.register.mobile,
  errorNum: state => state.login.errorNum
}
export default getters
