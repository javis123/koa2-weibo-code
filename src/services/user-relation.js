/**
 * @description 查询粉丝列表
 * @author zk
 */

const { User,UserRelation } = require('../db/model/index')

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
  return {
    count,
    userList
  }
}

module.exports = {
  getUsersByFollower
}