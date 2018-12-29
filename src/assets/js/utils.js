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
