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
    return {
      msg: '这是登录的接口'
    }
  }
}

module.exports = handleUserRouter