// 分析 chrome 占比 
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const fileName = path.join(__dirname, '../', '../',  'logs', 'access.log');
// 创建 readStream
const readStream = fs.createReadStream(fileName);
// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
});
// 初始化总行数和Chrome占的行数
let chromeNum = 0;
let sum = 0;
// 逐行读取
// 一行读完之后会触发
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  // 记录总行数
  sum++;
  const arr = lineData.split('--');
  // indexOf 用在字符串中时，如果要查找的字符串能够找到，则返回首字母的索引，找不到返回-1
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++;
  }
});
// 监听读取完成
rl.on('close', () => {
  console.log('chrome 占比：', chromeNum/sum);
})