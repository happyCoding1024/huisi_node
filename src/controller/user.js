const { exec } = require('../db/mysql')

// 登录
const login = (username, password) => {
  const sql = `select username, \`password\` from users where username='${username}' and password='${password}';`;
  // select查询结果都是一个数组
  return exec(sql).then(loginData => {
    // 记住两个对象即使就算是内容完全相同只要引用不同那也是不同的，所以下面这条语句永远会返回true
    //  return loginData !== {} 
    // 这样写当查询没有结果时，loginData[0]就是undefined，此时会报错
    // return loginData[0].username

    // 应该这样写,当查询结果时loginData[0]是一个对象，在后面使用 SuccessModel，当没有查询到时它是undefined，使用 ErrorModel
    return loginData[0]
  })
}

// 注册
const register = (username, password) => {
  const sql = `insert into users (username, \`password\`) values ('${username}', '${password}');`
  const sql_check = `select * from users where username = '${username}'`
  // select查询结果都是一个数组
  return exec(sql_check).then(registerSameName=> { 
    console.log('registerSameName = ', registerSameName) 
    // sql查询返回的结果是一个数组，如果是空数组说明没有重名的，就继续执行插入
    // 注意对于引用类型数据而言，空数组并不等于空数组，因为两个数组的引用时不同的，所以下面不能利用 registerSameName===[]作为判断条件
    // 在这里当查询不到时返回一个空数组，可以利用registerSameName[0]作为判断条件，如果没有重名的那么它的值为undefined
    if (!registerSameName[0]) {
      return exec(sql).then(result => {
        console.log('注册 result = ', result)
        if (result.affectedRows === 1) {
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
    } else {
      return Promise.resolve(false)
    }

  })
}

module.exports = { 
  login,
  register
}