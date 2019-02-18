import request from '@/assets/js/requestDJS'
import qs from 'qs'

function getIncomeApi(data) {
  return request({
    url: 'userInfo/incomeDetailed',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  getIncomeApi // 回款日历——收益明细
}
