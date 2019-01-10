import request from '@/assets/js/requestDJS'
import qs from 'qs'

function bondProtocol(data) {
  return request({
    url: '/BondProtocol',
    method: 'post',
    data: qs.stringify(data)
  })
}

export {
  bondProtocol // 查询债权转让协议填充数据
}
