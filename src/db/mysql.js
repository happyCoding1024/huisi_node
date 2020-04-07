const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 使用回调函数
// function exec(sql) {
//   con.query(sql, (err, result) => {
//     return err ? err : result
//   })
// }

const sql = `select * from blogs;`
// 使用 promise
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

module.exports = {
  exec
}