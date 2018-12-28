import { getUser } from './cache'
import { Base64 } from 'js-base64'

export function toThousands(num) {
  num = (num || 0).toString()
  let result = ''
  let float = ''
  if (num.indexOf('.') > 0) {
    float = num.split('.')[1]
    num = num.split('.')[0]
  }
  while (num.length > 3) {
    result = '，' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num && float) {
    result = num + result + '.' + float
  } else {
    result = num + result
  }
  return result
}

export function getAuth() {
  const user = getUser()
  if (!user) return null
  let userName = user.userName
  let token = user.token
  let spile = Base64.encode(`${userName}:${token}`)
  return `DSCJ ${spile}`
}
