import { getUser } from './cache'
import { Base64 } from 'js-base64'

export function getAuth() {
  const user = getUser()
  if (!user) return null
  let userName = user.userName
  let token = user.token
  let spile = Base64.encode(`${userName}:${token}`)
  return `DSCJ ${spile}`
}

export function getRetBaseURL() {
  let index = window.location.href.indexOf('#')
  return window.location.href.substr(0, index + 1)
}

export const Base64Utils = {
  objectToBase64(obj) {
    return Base64.encode(JSON.stringify(obj))
  },
  base64ToObject(str) {
    return str ? JSON.parse(Base64.decode(str)) : null
  }
}

export const myDOM = {
  hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
  },
  addClass(el, className) {
    if (this.hasClass(el, className)) {
      return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
  },
  removeClass(el, className) {
    if (this.hasClass(el, className)) {
      var newClass = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' '
      while (newClass.indexOf(' ' + className + ' ') >= 0) {
        newClass = newClass.replace(' ' + className + ' ', ' ')
      }
      el.className = newClass.replace(/^\s+|\s+$/g, '')
    }
  },
  customAttribute(el, name, val) {
    if (val) {
      return el.setAttribute(`data-${name}`, val)
    } else {
      return el.getAttribute(`data-${name}`)
    }
  }
}
