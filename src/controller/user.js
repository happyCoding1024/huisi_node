const { exec } = require('../db/mysql')

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

module.exports = { 
  login
}