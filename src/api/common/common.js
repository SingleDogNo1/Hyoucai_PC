import request from '@/assets/js/requestHYC'

function showFlag() {
  return request({
    url: 'Platform/showFlag',
    method: 'POST'
  })
}

export {
  showFlag // 当前平台展现标识
}
