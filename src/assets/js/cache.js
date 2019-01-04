import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token) {
  Cookies.set('token', token)
}

export function getUser() {
  return Cookies.getJSON('user')
}

export function setUser(user) {
  Cookies.set('user', user)
}

export function removeUser() {
  Cookies.remove('user')
}

export function getUserBasicInfo() {
  return Cookies.getJSON('userBasicInfo')
}

export function setUserBasicInfo(info) {
  Cookies.set('userBasicInfo', info)
}

export function removeUserBasicInfo() {
  Cookies.remove('userBasicInfo')
}

export function getRegisterMobile() {
  return Cookies.getJSON('registerMobile')
}

export function setRegisterMobile(mobile) {
  Cookies.set('registerMobile', mobile)
}

export function getErrorNum() {
  return Cookies.getJSON('errorNum')
}

export function setErrorNum(errorNum) {
  Cookies.set('errorNum', errorNum)
}

export function setLoginUsername(username) {
  Cookies.set('loginUsername', username)
}

export function getLoginUsername() {
  return Cookies.get('loginUsername')
}
