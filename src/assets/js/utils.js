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

export function postcall(url, params, target) {
  let tempform = document.createElement('form')
  tempform.setAttribute('name', 'form')
  tempform.action = url
  tempform.method = 'post'
  tempform.style.display = 'none'
  if (target) {
    tempform.target = target
  }

  for (let x in params) {
    let opt = document.createElement('input')
    opt.name = x
    opt.value = params[x]
    tempform.appendChild(opt)
  }

  let opt = document.createElement('input')
  opt.type = 'submit'
  opt.setAttribute('id', '_submit')
  tempform.appendChild(opt)
  document.body.appendChild(tempform)
  tempform.submit()
  document.body.removeChild(tempform)
}

//格式化时间倒计时(将XXX秒格式化为X天 HH:MM:DD，status为0，倒计时停止)
export function timeCountDown(t, status, callback) {
  let d = (t - (t % 86400)) / 86400
  let h = ((t - (t % 3600)) / 3600) % 24
  let i = ((t - (t % 60)) / 60) % 60
  let s = t % 60
  let stime = ''
  if (d > 0) {
    stime += d + '天'
  }
  stime += h < 10 ? '0' + h + ':' : h + ':'
  stime += i < 10 ? '0' + i + ':' : i + ':'
  stime += s < 10 ? '0' + s : s
  callback(stime)
  if(status === 0) return  
  t--
  if (t >= 0) {
    setTimeout(function() {
      timeCountDown(t, status, callback)
    }, 1000)
  } else {
    setTimeout(function() {
      timeCountDown(0, status, callback)
    }, 1000)
  }
}
