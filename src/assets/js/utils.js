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

export function getRetBaseURL () {
  let index = window.location.href.indexOf('#')
  return window.location.href.substr(0, index + 1)
}

export const Base64Utils = {
  objectToBase64 (obj) {
    return Base64.encode(JSON.stringify(obj))
  },
  base64ToObject (str) {
    return str ? JSON.parse(Base64.decode(str)) : null
  }
}
