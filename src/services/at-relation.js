/**
 * @description 微博 @用户关系 service
 * @author zk
 */
const { AtRelation } = require('../db/model/index')

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

module.exports = {
  createAtRelation
}