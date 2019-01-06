import request from '@/assets/js/requestDJS'
import qs from 'qs'

//公司简介/动态列表数据
export function getList(data) {
  return request({
    url: 'ZxdtMtbdMsg',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

//动态详情
export function viewDetail(data) {
  return request({
    url: 'ZxdtMtbdDetailMsg',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
