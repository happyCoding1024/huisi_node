const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'huisi'
})

// 开始连接
con.connect()

// 统一执行 sql 的函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

const sql = `select * from users;`
exec(sql).then((res) => {
  console.log(res)
}, (err) => {
  console.log(err)
})