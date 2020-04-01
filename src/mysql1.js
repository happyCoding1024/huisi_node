const { exec } = require('./mysql')

const sql = 'select * from users'

const res = exec(sql)
console.log(res)

