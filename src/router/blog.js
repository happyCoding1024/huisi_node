const { 
  getList,
  getDetail 
} = require('../controller/blog')  
const { SuccessModel, ErrorModel } = require('./model/resModel') 

const handleBlogRouter = (req, res) => {
  // 获取请求的方法
  const method = req.method
  // 获取 url
  const url = req.url
  // 获取路由
  const path = url.split('?')[0]
  
  // 实现接口
  // 1. 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    const { author, keyword } = req.query
    const listData = getList(author, keyword)
    return new SuccessModel(listData)
  }
  
  // 2. 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const { id } = req.query;
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 3. 新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      'msg': '这是新建博客的接口'
    }
  }

  // 4. 更新博客
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      'msg': '这是更新博客的接口'
    }
  }

  // 5. 删除博客
  if (method === 'POST' && path === '/api/blog/delete') {
    return {
      'msg': '这是删除博客的接口'
    }
  }

}

module.exports = handleBlogRouter;