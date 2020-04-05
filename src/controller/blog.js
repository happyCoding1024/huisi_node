const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += 'order by createtime desc;' 
  // 返回的是一个promise
  return exec(sql)
}

// 获取详情列表
const getDetail = (id) => {
  let sql = `select * from blogs where 1=1 `
  if (id) {
    sql += `and id = ${id};`
  }
  return exec(sql);
}

// 新建博客
const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title，content 属性，新建博客是需要提供作者，作者是登录时获得的
  const { title, content, author } = blogData
  let sql = `insert into blogs (title, content, createtime, author) values ('${title}', '${content}', '${Date.now()}', '${author}')`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
}

// 更新博客
const updateBlog = (id, blogData={}) => {
  // id 就是要更新博客的 id
  // blogData 包含 title content 属性
  // 返回 true 或 false 告诉前端是否更新成功
  const { title, content } = blogData
  let sql = `update blogs set title='${title}', content='${content}' where id=${id};`
  return exec(sql).then(updateData => {
    return updateData.affectedRows > 0  
  })
}

// 删除博客
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}';`
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}
