import request from '@/assets/js/requestDJS'
import qs from 'qs'

function userProjectList(data) {
  return request({
    url: '/UserProjectList',
    method: 'POST',
    data: qs.stringify(data)
  })
}

function userProjectDetail(data) {
  return request({
    url: '/UserProjectDetail',
    method: 'POST',
    data: qs.stringify(data)
  })
}

export {
  userProjectList, // 获取用户出借列表
  userProjectDetail // 获取用户出借详情
}
