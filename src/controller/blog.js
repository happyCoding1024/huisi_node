// 获取博客列表
const getList = (author, keyword) => {
  // 先返回格式正确的假数据
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: '1585621628333',
      author: 'zhangsan'
    }, {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: '1685621628333',
      author: 'lisi'
    }
  ]
}

// 获取详情列表
const getDetail = (id) => {
  // 返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: '1585621628333',
    author: 'zhangsan'
  }
}

// 新建博客
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title，content 属性
  return {
    id: 3 // 表示新建的博客要插入数据表里面的第id项,将这个值返回给客户端
  }
}

// 更新博客
const updateBlog = (id, blogData={}) => {
  // 现在只是返回假数据，其实还需要改变数据库中的内容
  console.log(id, blogData)
  return true
}

// 删除博客
const deleteBlog = (id) => {
  // 先返回假数据
  console.log(id)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
