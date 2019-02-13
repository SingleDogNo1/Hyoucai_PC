import axios from '@/assets/js/requestHYC'
import qs from 'qs'

function getIncomeApi(data) {
  return axios({
    url: 'userInfo/incomeDetailed',
    method: 'post',
    data: qs.stringify(data)
  })
}

export default {
  getIncomeApi // 回款日历——收益明细
}
