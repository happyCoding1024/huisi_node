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

module.exports = {
  getList,
  getDetail
}
