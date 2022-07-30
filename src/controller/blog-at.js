/**
 * '@description 处理@ 信息的control
 * @author zk
 */
const { getAtRelationCount,getAtUserBlogList } = require('../services/at-relation')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 获取@ 我的微博数量
 * @param {number} userId 
 */
async function getAtMeCount(userId){
  const count = await getAtRelationCount(userId)
  // console.log(count)
  return new SuccessModel({ count })
}
/**
 * 获取at我的微博列表
 * @param {number} userId userid
 * @param {number} pageIndex page Index
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({ userId, pageIndex })
  const blogList = result.blogList
  return new SuccessModel({
    blogList,
    count: result.count,
    pageIndex,
    pageSize: PAGE_SIZE,
    isEmpty: blogList.length === 0
  })
}
module.exports = {
  getAtMeCount,
  getAtMeBlogList
}