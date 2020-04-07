const { exec } = require('../db/mysql')

// 获取博客列表
const getList = (author, keyword) => {
  let sql_blog = `select * from blogs where 1=1 `
  if (author) {
    sql_blog += `and author = '${author}' `
  }
  if (keyword) {
    sql_blog += `and title like '%${keyword}%' `
  }
  sql_blog += 'order by createtime desc;'

  let sql_topic = `select * from topiclist where 1=1 `
  if (author) {
    sql_topic +=`and author = '${author}'`
  }
  // 获取博客列表和topic列表
  // 一定要注意同步和异步编程时的区别，下面的写法的思想要记住
  // 异步的执行顺序并不一定是代码的书写顺序
  let homeList = {}
  return exec(sql_blog).then(articleList => {
    return exec(sql_topic).then(topicList => {
      homeList = {
        articleList,
        topicList
      }
      return Promise.resolve(homeList)
    })
  })
  // 获取 Topic 列表，前端中显示在主页图片下方 
  // 返回的是一个promise
  return exec(sql)
}

// 获取详情
const getDetail = (id) => {
  let sql = `select * from blogs where 1=1 `
  if (id) {
    sql += `and id = ${id};`
  }
  return exec(sql) // 因为rows返回的是一个数组，这里需要返回一个对象，rows中的每一项都是一个对象;
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
const delBlog = (id, author) => {
  // id 就是要删除博客的id
  // 这个地方加上author 的作用在于防止恶意删除别人的文章，如果只有一个id
  // 那么就可以通过将url修改成别人博客地址的方式来删除别人的文章，加了author之后，
  // 完成登录功能之后author只能是自己的用户名。
  const sql = `
   delete from blogs where id ='${id}' and author = '${author}';
  `;
  return exec(sql).then((deleteData) => {
    if (deleteData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};


module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
