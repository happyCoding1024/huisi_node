const fs = require('fs')
const path = require('path')

// 生成 writeStream
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a' // 如果是'w'，那么在重新npm ru dev 之后以前的log文件就会被覆盖掉
  })
  return writeStream
}

// 将日志内容写入到文件中
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

// 写访问日志
function access(log) {
  const writeStream = createWriteStream('access.log')
  writeLog(writeStream, log)
}

module.exports = {
  access
}