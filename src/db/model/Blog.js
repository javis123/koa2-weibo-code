/**
 * @description Blog模型
 * @author zk
 */
const seq = require('../seq')
const { INTEGER, TEXT, STRING} = require('../types')
const Blog = seq.define('blog',{
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户ID'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址'
  }
})
module.exports = Blog