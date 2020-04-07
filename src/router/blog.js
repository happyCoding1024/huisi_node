const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
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
  if(method === 'GET' && req.path === '/api/blog/list') {

    let author = req.query.author || ''; // 获取到传入的作者名，如果没有传入赋值为空字符串
    const keyword = req.query.keyword || '';

    // 加一个验证，必须登录之后才可以看到博客列表而且只能看到自己的博客列表
    if (req.query.isadmin) {
      // 登录验证
      if (loginCheckResult) {
        // 未登录
        return loginCheckResult;
      }
      // 已登录
      // 强制只能查自己的博客列表
      // 解释一下为什么下面这一条语句就能做到强制只能查询自己的博客列表，req.session.name是在用户登录时赋值的，登录时用户名是什么，它的值就是什么
      // 客户端是没有办法改的，将这个值直接赋给author，可以保证登录的那个人可以查看自己的但是查不了别人的，因为author始终是自己
      author = req.session.username;
    }

    const result = getList(author, keyword); // getList 返回一个promise对象
    return result.then((listData) => {
      return new SuccessModel(listData);
    }, (err) => {
      console.log(err);
    })
  }
  
  // 2. 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const res_prm = getDetail(id)
    return res_prm.then((blogDetail) => {
      return new SuccessModel(blogDetail[0])
    })
  }

  // 3. 新建博客
  if (method === 'POST' && path === '/api/blog/new') {
    // 如果有返回值说明是未登录状态此时return终止后面代码的执行
    if (loginCheckResult) {
      return loginCheckResult
    } 
    req.body.author = req.session.username 
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
  if (method === 'POST' && path === '/api/blog/del') {
    
    // 如果 loginCheckResult 有值说明没有登录
    if(loginCheckResult) {
      return loginCheckResult;
    }

    const author = req.session.username;
    // 在删除文章的时候校验一下作者，只有登录的作者本人才可以删除自己的文章
    const result = delBlog(id, author);
    return result.then((val) => {
       if (val) {
         return new SuccessModel();
       } else {
         return new ErrorModel('delete fail');
       }
   })
  }
}

module.exports = handleBlogRouter;