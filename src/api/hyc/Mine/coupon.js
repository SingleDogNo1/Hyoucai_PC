import request from '@/assets/js/requestHYC'
import qs from 'qs'
// 我的卡券
export function geCoupon(data) {
  return request({
    url: '/redPacketAndCoupon/couponPacketList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 历史卡券
export function couponPacketHistory(data) {
  return request({
    url: '/redPacketAndCoupon/couponPacketHistory',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 领取加息券
export function receiveCoupon(data) {
  return request({
    url: '/ReceiveCoupon',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
// 领取红包
export function receiveRedPacket(data) {
  return request({
    url: '/ReceiveRedPacket',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
