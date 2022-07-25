/**
 * @description 广场页的路由
 * @author zk
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getSquareCacheList } = require('../cache/blog')
/**
 * 
 * @param {number} pageIndex  跳过的页数
 */
async function getSquareBlogList(pageIndex = 0) {
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList
  const needData = {
    isEmpty: blogList.length === 0,
    blogList,
    count: result.count,
    pageIndex,
    pageSize: PAGE_SIZE
  }
  return new SuccessModel(needData)
}

module.exports = {
  getSquareBlogList
}