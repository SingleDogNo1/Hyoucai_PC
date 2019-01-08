import request from '@/assets/js/requestHYC'
import qs from 'qs'
// 风险评测
export function saveEvaluatingResultApi(data) {
  return request({
    url: '/user/saveEvaluatingResult',
    method: 'post',
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}
