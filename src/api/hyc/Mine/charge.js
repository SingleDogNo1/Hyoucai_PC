import request from '@/assets/js/requestHYC'
import Qs from 'qs'

export function bankCardQueryApi(data) {
  return request({
    url: '/bankCardQuery/query',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}

export function checkAmountApi(data) {
  return request({
    url: '/userTransaction/record',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}
export function rechargeApi(data) {
  return request({
    url: '/directRecharge/recharge',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}
export function amountInfoApi(data) {
  return request({
    url: '/personalAccount/amountInfo',
    method: 'POST',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: Qs.stringify(data)
  })
}
