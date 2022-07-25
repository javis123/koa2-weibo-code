/**
 * @description 微博缓存层
 * @author zk
 */

const { get,set } = require('./_redis')
const { getBlogListByUser } = require('../services/blog')

const KEY_PREFIX = 'weibo:cache:'

/**
 * 获取广场页的博客
 * @param {number} pageIndex pageIndex
 * @param {number} pageSize pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`
  let result = await get(key)
  if(result != null){
    return result
  }
  result = await getBlogListByUser({ pageSize, pageIndex })
  set(key, result, 60)
  return result
}

module.exports = {
  getSquareCacheList
}