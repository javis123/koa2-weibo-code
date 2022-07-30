/**
 * @description 微博 @用户关系 service
 * @author zk
 */
const { PAGE_SIZE } = require('../conf/constant')
const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog,formatUser } = require('./_format')

/**
 * 创建微博 @ 用户关系
 * @param {number} userId 用户id
 * @param {number} blogId 微博id
 */
async function createAtRelation(userId, blogId){
  const result = await AtRelation.create({
    userId,
    blogId
  })
  return result.dataValues
}
/**
 * 获取@ 我的微博数量
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  const count = result.count
  return count
}

async function getAtUserBlogList({userId, pageIndex, pageSize = PAGE_SIZE}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    oder: [
      ['id','desc']
    ],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)
  const count = result.count
  blogList = blogList.map(blogItem => {
    blogItem.user = blogItem.user.dataValues
    blogItem.user = formatUser(blogItem.user)
    return blogItem
  })
  blogList = formatBlog(blogList)
  return {
    count,
    blogList
  }
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList
}