import request from '@/assets/js/requestHYC'
import qs from 'qs'

export function investorsAuth(data) {
  return request({
    url: '/termsAuth/investorsAuth',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function queryKHAgreementList(data) {
  return request({
    url: '/extendApi/queryKHAgreementListNew',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  investorsAuth // 业务授权二合一协议
}
