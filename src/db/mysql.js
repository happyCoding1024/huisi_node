const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 的函数
// function exec(sql) {
//   con.query(sql, (err, result) => {
//     return err ? err : result
//   })
// }

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