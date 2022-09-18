/**
 * @description blog control
 * @author zk
 */

const xss = require('xss')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { getFollowersBlogList } = require('../services/blog')
const { PAGE_SIZE,REG_FOR_AT_WHO } = require('../conf/constant')
const { getUserInfo } = require('../services/user')
const { createAtRelation } = require('../services/at-relation')
/**
 * 创建微博
 * @param {Object} param0 
 * @returns 
 */
async function create({ userId, content, image }) {
  //首先拿到这群@的用户名
  const AtUserNameList = []
  content.replace(REG_FOR_AT_WHO,(match, nickName, userName) => {
    //目的不是修改，而是获取他们对应的userName
    AtUserNameList.push(userName)
    return match
  })
  console.log(AtUserNameList)
  //第二步，获取他们的用户信息
  const atUserList = await Promise.all(AtUserNameList.map(userName => getUserInfo(userName)))
  console.log(atUserList)
  //第三步，获取他们的id
  const atUserIdList = atUserList.map(userInfo => userInfo.id)
  console.log(atUserIdList)
  try{
    //创建blog
    const result = await createBlog({ userId, content: xss(content), image })
    console.log(result)
    //创建@关系
    await atUserIdList.map(userId => createAtRelation(userId, result.id))
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