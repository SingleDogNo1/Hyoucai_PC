import request from '@/assets/js/requestDJS'
import qs from 'qs'

function investingProject(data) {
  return request({
    url: 'InvestingProject',
    method: 'POST',
    data: qs.stringify(data)
  })
}

function expireRepeat(data) {
  return request({
    url: 'ExpireRepeat',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export {
  investingProject, // 自动出借列表
  expireRepeat // 到期复投
}
