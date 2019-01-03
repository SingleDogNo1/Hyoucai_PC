import Cookies from 'js-cookie'

export function getToken() {
  return Cookies.get('token')
}

export function setToken(token) {
  return Cookies.set('token', token)
}

export function getUser() {
  return Cookies.getJSON('user')
}

export function setUser(user) {
  return Cookies.set('user', user)
}

export function getUserBasicInfo() {
  return Cookies.getJSON('userBasicInfo')
}

export function setUserBasicInfo(info) {
  return Cookies.set('userBasicInfo', info)
}

export function getRegisterMobile() {
  return Cookies.getJSON('registerMobile')
}

export function setRegisterMobile(mobile) {
  return Cookies.set('registerMobile', mobile)
}

export function getErrorNum() {
  return Cookies.getJSON('errorNum')
}

export function setErrorNum(errorNum) {
  return Cookies.set('errorNum', errorNum)
}
