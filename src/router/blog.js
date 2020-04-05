const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')  
const { SuccessModel, ErrorModel } = require('./model/resModel') 

// 登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel()
    )
  }
}

const handleBlogRouter = (req, res) => {
  // 获取请求的方法
  const method = req.method
  // 获取 url
  const url = req.url
  // 获取路由
  const path = url.split('?')[0]
  // 获取文章的 id
  const { id } = req.query
  // 获取登录状态
  const loginCheckResult = loginCheck(req)

  // 实现接口
  // 1. 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    let { author, keyword, isadmin } = req.query
    const res_prm = getList(author, keyword)
    if (isadmin) {
      // 管理员界面
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult
      }
    }
    // 强制查询自己的博客，在url中输入别人的名字是无效的
    // author = req.session.username
    // acthor = 'lisi'
    // .then 方法返回的也是一个promise对象，在回调函数中 SucessModel(listData) 将会当做它的then方法的参数
    return res_prm.then((listData) => {
      return new SuccessModel(listData)
    })

  }
  
  // 2. 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const res_prm = getDetail(id)
    return res_prm.then((blogDetail) => {
      return new SuccessModel(blogDetail)
    })
  }

  // 3. 新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    // 如果有返回值说明是未登录状态此时return终止后面代码的执行
    if (loginCheckResult) {
      return loginCheckResult
    } 
    req.body.author = req.session.username // 假数据，登录实现时登录的是谁作者就是谁
    const blogData = req.body
    const res_prm = newBlog(blogData)
    return res_prm.then(blogId => {
      return new SuccessModel(blogId)
    }) 

  }

  // 4. 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    // 如果有返回值说明是未登录状态此时return终止后面代码的执行
    if (loginCheckResult) {
      return loginCheckResult
    } 
    // 更新博客不仅需要postdata还需要id，id是通过querystring传递的
    const res_prm = updateBlog(id, req.body)
    return res_prm.then(updateStatus => {
      return updateStatus ? new SuccessModel() : new ErrorModel()
    })
  }

  // 5. 删除博客
  if (method === 'POST' && path === '/api/blog/delete') {
    // 如果有返回值说明是未登录状态此时return终止后面代码的执行
    if (loginCheckResult) {
      return loginCheckResult
    }     
    const author = req.session.username
    const res_prm = deleteBlog(id, author)
    return res_prm.then(deleteStatus => {
      return deleteStatus ? new SuccessModel() : new ErrorModel()
    })
  }

}

module.exports = handleBlogRouter;