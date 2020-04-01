const { login } = require('../controller/user.js')
const { SuccessModel, ErrorModel } = require('./model/resModel')

const handleUserRouter = (req, res) => {
  // 获取请求的方法
  const method = req.method
  // 获取 url
  const url = req.url
  // 获取路由
  const path = url.split('?')[0]
  
  // 实现接口
  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    const result = login(username, password)
    return result ? new SuccessModel() : new ErrorModel('login fail')
  }
}

module.exports = handleUserRouter