const login = (username, password) => {
  // 先使用假数据
  return (username === 'zhangsan' && password === '123') ? true : false
}

module.exports = { 
  login
}