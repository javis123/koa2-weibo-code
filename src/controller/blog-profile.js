/**
 * @description 个人主页control
 * @author zk
 */
const { getBlogListByUser } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
/**
 * 
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页面
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
    pageIndex,
    pageSize: PAGE_SIZE
  })
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
  getProfileBlogList
}