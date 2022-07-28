/**
 * @description blog control
 * @author zk
 */

const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE } = require('../conf/constant')

async function create({ userId, content, image }) {
  try{
    const result = await createBlog({ userId, content: xss(content), image })
    return new SuccessModel(result)
  }catch(ex){
    console.error(ex.error, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { blogList, count } = result
  return new SuccessModel({
    blogList,
    count,
    pageIndex,
    pageSize: PAGE_SIZE,
    isEmpty: blogList.length === 0
  })
}

module.exports = {
  create,
  getHomeBlogList
}