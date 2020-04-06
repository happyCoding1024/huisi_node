const fs = require('fs')
const path = require('path')
const http = require('http');
const fullFilePath = path.resolve(__dirname, 'data.txt') 

// 读取文件内容
// fs.readFile(fullFilePath, (err, data) => {
//   if (err) {
//     console.error(err) 
//     return 
//   }
//   // data 是二进制形式，需要准换为字符串
//   console.log(data.toString())
// })

// 写入文件
// 写入文件的内容
// const content = `123
// 456
// 789
// `
// const option = {
//   // 写入的内容是追加还是重写
//   flag: 'a', // a 追加写入，w 覆盖
// }
// fs.writeFile(fullFilePath, content, option, (err) => {
//   err ? console.error(err) : console.log('写入成功')
// })

// // 判断文件是否存在
// fs.exists(fullFilePath, (exist) => {
//   console.log(exist)
// })

// node 中的 pipe 方法
// process.stdin.pipe(process.stdout)

// 服务端接收客户端通过POST发送来的数据
// const http = require('http');
// const server = http.createServer((req, res) => {
//   if (req.method === 'POST') {
//     // req 的内容传递到 res
//     // 仅用一行代码就可以实现，而且会自动根据内容的大小分批次传输
//     req.pipe(res); 
//     console.log(res)
//   }
// })

// server.listen(3000, () => {
//   console.log('server is listening on 3000')
// })

// 利用 stream 实现读取文件的内容直接传递到 res 中

const server = http.createServer((req, res) => {
   if (req.method === 'GET') {
       const readStream = fs.createReadStream(fullFilePath);
       // 文件IO:readStream 网络IO：res
       readStream.pipe(res); // 读取文件的内容直接返回到res中
   } 
});
server.listen(3000);



