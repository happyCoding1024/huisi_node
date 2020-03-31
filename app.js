const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

const serverHandle = (req, res) => {
  // 设置返回内容的类型
  res.setHeader('Content-type', 'application/json')
  // 获取路由
  const url = req.url;
  req.path = url.split('?')[0] //由于其它函数都是在app.js中被调用，因此传递过去的req中有req.path
  // 获取参数
  req.query = querystring.parse(url.split('?')[1])
  // 处理 blog 路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(
      JSON.stringify(blogData)
    )
  }
  // 处理 user 路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(
      JSON.stringify(userData)
    )
  }
  
  // 未命中路由，返回 404
  // res.writeHead('404', 'text/plain')
  // res.write('404 not found')
}

module.exports = serverHandle