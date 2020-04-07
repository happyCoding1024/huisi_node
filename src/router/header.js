const { SuccessModel, ErrorModel } = require('./model/resModel')
const { getHeaderList } = require('../controller/headerlist')

const handleHeaderRouter = (req, res) => {
  // 获取请求的方法
  const method = req.method
  // 获取 url
  const url = req.url
  // 获取路由
  const path = url.split('?')[0]
  
  // 获取headerList
  if (method === 'GET' && path === '/api/header/headerList') {
    const result = getHeaderList()
    return result.then((val) => {
      return new SuccessModel(val)
    })
  }
}

module.exports = handleHeaderRouter