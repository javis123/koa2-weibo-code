/**
 * @description 数据格式化
 * @author zk
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
/**
 * 
 * @param {object} obj 
 * @returns {object}
 */
function _formatUserPicture(obj){
  if(obj.picture == null){
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}
/**
 * 
 * @param {Object|Array} list 
 * @returns 
 */
function formatUser(list) {
  if(list == null){
    return list
  }
  if(list instanceof Array){
    return list.map(_formatUserPicture)
  }
  return _formatUserPicture(list)
}

module.exports = {
  formatUser
}