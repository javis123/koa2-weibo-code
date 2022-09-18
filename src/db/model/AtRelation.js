/**
 * @description @关系的模型
 * @author zk
 */
const seq = require('../seq')
const { INTEGER,BOOLEAN } = require('../types')

const AtRelation = seq.define('at_relation',{
  blogId: {
    type: INTEGER,
    allowNull: false,
    comment: '微博id'
  },
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户Id'
  },
  isRead: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否已被读取'
  }
})

module.exports = AtRelation