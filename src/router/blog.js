const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')  
const { SuccessModel, ErrorModel } = require('./model/resModel') 

const handleBlogRouter = (req, res) => {
  // 获取请求的方法
  const method = req.method
  // 获取 url
  const url = req.url
  // 获取路由
  const path = url.split('?')[0]
  // 获取文章的 id
  const { id } = req.query

  // 实现接口
  // 1. 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  
  // 2. 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 3. 新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blogData = req.body
    const data = newBlog(blogData)
    return new SuccessModel(data)
  }

  // 4. 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    // 更新博客不仅需要postdata还需要id，id是通过querystring传递的
    const result = updateBlog(id, req.body)
    return result ? new SuccessModel(result) : new ErrorModel(result)
  }

  // 5. 删除博客
  if (method === 'POST' && path === '/api/blog/delete') {
    const result = deleteBlog(id)
    return result ? new SuccessModel(result) : new ErrorModel
  }

}

module.exports = handleBlogRouter;