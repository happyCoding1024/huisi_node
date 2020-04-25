const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const handleHeaderRouter = require('./src/router/header')
const querystring = require('querystring')
const { set, get } = require('./src/db/redis')
const { access } = require('./src/utils/log')

// 设置 cookie 过期时间
const getCookieExpires = () => {  
  // 当前时间
  const d = new Date()
  // 重新设置 d 的时间为 24h
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  // 将 d 导出并且设置为 GMT 格式
  return d.toGMTString()
}

// 用于处理postData
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    // 如果不是POST请求那么就返回一个空对象，因为GET请求是没有POSTData的
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    console.log("req.headers['content-type'] = ", req.headers['content-type'])
    // 在使用原生node开发时暂时只支持json格式的Postdata，其它格式的用原生支持起来比较麻烦，但是用框架时很容易地就可以支持了
    // 在浏览器端使用axios发送POST请求时，req.headers['content-type']等于'application/json;charset=UTF-8'
    if (req.headers['content-type'] !== 'application/json' && req.headers['content-type'] !== 'application/json;charset=UTF-8') {
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
  
  // 获取 cookie
  // 将cookie变成对象的形式
  req.cookie = {}
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return 
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  }) 
  
  // 解析 Session，使用 JS 变量存储 session
  // let needSetCookie = false
  // let sessionId = req.cookie.sessionId
  // if (sessionId) {
  //   SESSION_DATA[sessionId] = SESSION_DATA[sessionId] || {}
  // } else {
  //   // 在这里先保证不重复即可
  //   needSetCookie = true
  //   sessionId = `${Date.now()}_${Math.random()}`
  //   SESSION_DATA[sessionId] = {} 
  // }
  // console.log(' login 前 req.session = ', req.session)
  // req.session = SESSION_DATA[sessionId]

  // 解析 session （使用 Redis）
  // 下面的这种逻辑能看懂，感觉符合
  // 一个思想就是程序中使用的session和redis中存储的session要实时保持一致
  // 程序中只需要使用session值，redis中需要存储id和session值
  // 其实这样的话程序中的session值会不会也比较大，能不能在进行登录验证时，直接使用redis中的session值呢？
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 Redis 中的 session 值
    set(userId, {});
  }
  // 获取 session
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    console.log('刚开始的 sessionData', sessionData);
    if (sessionData == null) {
      // 初始化 redis 中的session值
      set(req.sessionId, {});
      // 设置 session
      req.session = {};
      console.log('刚开始的session', req.session);
    } else {
      // 设置session
      req.session = sessionData;
    }
    // 处理 postData
    return getPostData(req)
  }).then((postData) => {
    req.body = postData;
    console.log('req.body = ', req.body);
    console.log('req = ', req);
    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; htppOnly; expires=${getCookieExpires()}`);
        }
        res.end(
          JSON.stringify(blogData)
        );
      });
      return;       // 一次请求一般只能是一个url，所以如果是blog请求，那么处理完blog请求之后就没必要再进行user的请求了。
    }

    // 处理 user 路由
    const userResult  = handleUserRouter(req, res);
    if (userResult) {
      userResult.then((userData)=> {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; htppOnly; expires=${getCookieExpires()}`);
        }
        res.end(
          JSON.stringify(userData)
        );
      });
      return;
    }

    // 处理 header 路由
    const headerResult = handleHeaderRouter(req, res);
    if (headerResult) {
      headerResult.then(headerData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; htppOnly; expires=${getCookieExpires()}`);
        }
        res.end(
          JSON.stringify(headerData)
        );
      });
      return;       // 一次请求一般只能是一个url，所以如果是blog请求，那么处理完blog请求之后就没必要再进行user的请求了。
    }

    // 未命中路由，返回404
    // 将状态码 404 写在res的header上
    res.writeHead(404, {"content-type": "text/plain"});
    res.write("404 Not Found\n");
    res.end(); // 这里面什么都不需要写，因为会显示res.writer里面的内容
  });
}

module.exports = {
  serverHandle
}