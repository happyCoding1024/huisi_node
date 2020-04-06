const { REDIS_CONF } = require('../conf/db')
const redis = require('redis')

// 创建 redis 客户端
// const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
const redisClient = redis.createClient('6379', '127.0.0.1')

redisClient.on('error', err => {
  console.error(err)
})


// 封装 set 函数
function set(key, val) {
  if ( typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

// 封装 get 函数
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      // 如果随便传了一个key，redis中查不到value，那么就会返回一个 null
      if (val == null) {
        resolve(null)
        return
      }
      // 我们知道在 set 时当val是对象的时候需要先转换为JSOnN字符串的形式，现在再将其转换回去。
      // 由于有可能val本来就不是对象，所以可能会有错误，所以在这里捕获一下，如果val不是对象，那么就直接resolve(val)
      try {
        resolve(JSON.parse(val))
      } catch {
        resolve(val)
      }
    })
  })
}

// 测试 set 和 get 函数
// set(123456, { a: 1});
// get(123456).then(res => {
//   console.log(res)
// })

module.exports = {
  set,
  get
}