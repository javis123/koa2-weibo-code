/**
 * @description 链接redis方法
 * @author zk
 */
const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error',err => {
  console.error(err)
})
/**
 * redis set
 * @param {string} key key
 * @param {string} val val
 * @param {int} timeout 过期时间，单位是秒
 */
function set(key, val, timeout = 60 * 60){
  if(typeof val === 'object'){
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}
/**
 * redis get
 * @param {string} key 键
 */
function get(key){
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if(err){
        reject(err)
        return
      }
      if(val == null){
        resolve(null)
        return
      }
      try{
        resolve(JSON.parse(val))
      }catch(err){
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}