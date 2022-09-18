/**
 * @description 数据格式化
 * @author zk
 */

const { DEFAULT_PICTURE,REG_FOR_AT_WHO } = require('../conf/constant')
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
function _formatBlogContent(obj){
  obj.content = obj.content.replace(REG_FOR_AT_WHO,(match, nickName, userName) => {
    return `<a href = '/profile/${userName}'>@${nickName}</a>`
  })
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
    return list.map(_formatBlogTime).map(_formatBlogContent)
  }
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}


module.exports = {
  formatUser,
  formatBlog
}