// 获取环境变量，是 dev 还是 prod
// process.env.NODE_ENV 中到底是什么值是在package.json中script中定义的，npm run dev,那么它的值就是dev
const env = process.env.NODE_ENV
// 数据库配置
let MYSQL_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'huisi'    
  }
}

if (env === 'prod') {
  // 真正线上环境时，数据库的地址要改为线上的地址，其它的参数也要改为线上数据的参数
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'huisi'    
  }
}

module.exports = {
  MYSQL_CONF
}
