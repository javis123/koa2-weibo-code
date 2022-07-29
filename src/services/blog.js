
const { Blog,User,UserRelation } = require('../db/model/index')
const { formatUser,formatBlog } = require('./_format')

async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  })
  // console.log(result)
  return result.dataValues
}
/**
 * 根据用户获取微博列表
 * @param {Object} param0 查询参数 { userName, pageIndex, pageSize = 10 }
 * @returns 
 */
async function getBlogListByUser(
  { userName, pageIndex, pageSize = 10 }
) {
  const userWhereOpts = {}
  if(userName){
    userWhereOpts.userName = userName
  }
  const result = await Blog.findAndCountAll({
    limit: pageSize, //每页限制多少条
    offset: pageSize * pageIndex,//跳过多少条
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ],
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = blogList.map(blogItem => {
    const user = blogItem.user.dataValues
    blogItem.user = formatUser(user)
    return blogItem
  })
  formatBlog(blogList)
  return {
    count: result.count,
    blogList
  }
}

async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10}) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [
      ['id','desc']
    ],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
      },
      {
        model: UserRelation,
        attributes: ['userId','followerId'],
        where: { userId }
      }
    ]
  })
  let blogList = result.rows.map(row => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map(blogItem => {
    // console.log(blogItem)
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
}