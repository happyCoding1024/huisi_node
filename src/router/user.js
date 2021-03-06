const { login, register } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('./model/resModel')
const { set, get } = require('../db/redis')

// 设置 cookie 过期时间
const getCookieExpires = () => {  
  // 当前时间
  const d = new Date()
  // 重新设置 d 的时间为 24h
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // 将 d 导出并且设置为 GMT 格式
  return d.toGMTString()
}

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
    // const { username, password } = req.query
    const res_prm = login(username, password)
    return res_prm.then(loginData => {
      // 这个地方必须判断loginData是否存在，如果不存在读取username会报错
      if (loginData) {
        req.session.username = loginData.username
        console.log(' login 中 req.session = ', req.session)
        // 设置session
        set(req.sessionId, req.session)
        return new SuccessModel()
      } else {
        return new ErrorModel('登录失败')
      }
    })
  }

  // 注册
  if (method === 'POST' && path === '/api/user/register') {
    const { username, password } = req.body
    const res_prm = register(username, password)
    return res_prm.then(registerStatus => {
      // 这个地方必须判断loginData是否存在，如果不存在读取username会报错
      if (registerStatus) {
        return new SuccessModel()
      } else {
        return new ErrorModel('注册失败')
      }
    })
  }

  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          session: req.session
        })
      )
    }
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  } 
}

module.exports = handleUserRouter