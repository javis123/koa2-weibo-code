/**
 * @description 用户关注与被关注的关系
 * @author zk
 */
const seq = require('../seq')
const { INTEGER } = require('../types')
 
const UserRelation = seq.define('user_relation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户的 id'
  }
})
 
module.exports = UserRelation