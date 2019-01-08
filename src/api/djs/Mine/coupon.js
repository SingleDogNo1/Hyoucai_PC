import request from '@/assets/js/requestDJS'
import qs from 'qs'
// 我的卡券
export function geCoupon(data) {
  return request({
    url: '/CouponPacketList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
