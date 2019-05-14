import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function realNameCertification(data) {
  return request({
    url: '/RealNameCertification',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  realNameCertification // 实名认证
}
