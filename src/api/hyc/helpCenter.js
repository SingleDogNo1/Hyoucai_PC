import request from '@/assets/js/requestHYC'
import qs from 'qs'

// QA类别查询
export function queryQAType() {
  return request({
    url: '/QueryQAType',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
}

// 查询QA信息(todo后续考虑加分页)
export function queryQuestionAnswer(data) {
  return request({
    url: '/QueryQuestionAnswer',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
