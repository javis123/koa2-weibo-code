/**
 * @description 查询粉丝列表
 * @author zk
 */

const { User,UserRelation } = require('../db/model/index')
const { formatUser } = require('./_format')

async function getUsersByFollower(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [
      ['id', 'desc']
    ],
    include: [
      {
        model: UserRelation,
        where: {
          followerId
        }
      }
    ]
  })
  const count = result.count
  const userList = result.rows.map(row => row.dataValues)
  formatUser(userList)
  return {
    count,
    userList
  }
}
/**
 * 
 * @param {number} userId 登录用户id
 * @param {number} followerId 被关注人id
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  })
  return result.dataValues
}

/**
 * 
 * @param {number} userId 登录用户Id
 * @param {number} followerId 被关注人id
 * @returns 
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  })
  return result
}
module.exports = {
  getUsersByFollower,
  addFollower,
  deleteFollower
}