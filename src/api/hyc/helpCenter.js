import request from '@/assets/js/requestHYC'

// QA类别查询
export function queryQAType() {
  return request({
    url: '/QueryQAType',
    method: 'get',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' }
  })
}
