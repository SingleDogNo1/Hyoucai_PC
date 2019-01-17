import request from '@/assets/js/requestHYC'
import qs from 'qs'

function bondProtocol(data) {
  return request({
    url: '/BondProtocol',
    method: 'post',
    data: qs.stringify(data)
  })
}
function getProtocolTemplateId() {
  // 协议
  return request({
    url: '/protocol/getProtocolTemplateId',
    method: 'post'
  })
}

export {
  bondProtocol, // 查询债权转让协议填充数据
  getProtocolTemplateId
}
