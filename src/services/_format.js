/**
 * @description 数据格式化
 * @author zk
 */

const { DEFAULT_PICTURE } = require('../conf/constant')
const timeFormat = require('../utils/dt')
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

function _formatBlogTime(obj) {
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}
/**
 * 
 * @param {Object|Array} list blogList
 * @returns 
 */
function formatBlog(list){
  if(list == null){
    return list
  }
  if(list instanceof Array) {
    return list.map(_formatBlogTime)
  }
  return _formatBlogTime(list)
}


module.exports = {
  formatUser,
  formatBlog
}