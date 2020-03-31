const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

// 用于处理postData
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    // 如果不是POST请求那么就返回一个空对象，因为GET请求是没有POSTData的
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    // 在使用原生node开发时暂时只支持json格式的Postdata，其它格式的用原生支持起来比较麻烦，但是用框架时很容易地就可以支持了
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return 
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return 
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
}

const serverHandle = (req, res) => {
  // 设置返回内容的类型
  res.setHeader('Content-type', 'application/json')
  // 获取路由
  const url = req.url;
  req.path = url.split('?')[0] //由于其它函数都是在app.js中被调用，因此传递过去的req中有req.path
  // 获取参数
  req.query = querystring.parse(url.split('?')[1])

  // 处理 postData
  getPostData(req).then((postData) => {
    req.body = postData

      // 处理 blog 路由
    const blogData = handleBlogRouter(req, res)
    if (blogData) {
      res.end(
        JSON.stringify(blogData)
      )
      // return 一定不能少，因为一次http请求只能返回一次响应，不能重复地写响应头，如果没有 return 还有可能在下面的代码中再写响应头
      return 
    }
    // 处理 user 路由
    const userData = handleUserRouter(req, res)
    if (userData) {
      res.end(
        JSON.stringify(userData)
      )
      return 
    }
    
    // 未命中路由，返回 404
    res.writeHead('404', 'text/plain')
    res.write('404 not found')
  })
}

module.exports = serverHandle