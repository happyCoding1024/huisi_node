const { exec } = require('../db/mysql')

// 获取 headerList
const getHeaderList = () => {
  const sql = `
    select content from headerlist 
  `
  return exec(sql)
}

module.exports = {
  getHeaderList
}