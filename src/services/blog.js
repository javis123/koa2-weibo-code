
const { Blog,User } = require('../db/model/index')
const { formatUser,formatBlog } = require('./_format')

async function createBlog({ userId, content, image }) {
  const result = Blog.create({
    userId,
    content,
    image
  })
  return result.dataVaules
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

module.exports = {
  createBlog,
  getBlogListByUser
}