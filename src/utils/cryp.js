/**
 * @description 加密方法
 * @author zk
 */
const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

const SECRET_KEY = CRYPTO_SECRET_KEY

/**
 * md5加密
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}
/**
 * 加密方法
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto