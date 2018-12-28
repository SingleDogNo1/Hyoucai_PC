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
