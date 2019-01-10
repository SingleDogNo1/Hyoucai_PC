const getters = {
  user: state => state.user.user,
  userBasicInfo: state => state.user.userBasicInfo,
  registerMobile: state => state.register.mobile, // 注册手机号
  errorNum: state => state.login.errorNum, // 登录错误次数
  invTotalAmt: state => state.lend.invTotalAmt, //累计出借金额
  tackBackInt: state => state.lend.tackBackInt // 累计利息收益
}
export default getters
