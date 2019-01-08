import request from '@/assets/js/requestHYC'
import qs from 'qs'
// 我的卡券
export function geCoupon(data) {
  return request({
    url: '/TouchStoneServiceNew/redPacketAndCoupon/couponPacketList',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
