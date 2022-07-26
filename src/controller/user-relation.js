/**
 * @description 粉丝逻辑的实现
 * @author zk
 */
const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')
/**
 * 根据userId获取粉丝列表
 * @param {number} userId 被关注者Id
 */
async function getFans(userId) {
  const result = await getUsersByFollower(userId)
  const { count, userList } = result
  return new SuccessModel({
    count,
    fansList: userList
  })
}

module.exports = {
  getFans
}