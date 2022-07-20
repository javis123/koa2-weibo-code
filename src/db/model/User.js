/**
 * @description 用户数据模型
 * @author zk
 */

const seq = require('../seq')
const { STRING,DECIMAL } = require('../types')

const User = seq.define('user',{
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    commit: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNull: false
  },
  nickName: {
    type: STRING,
    allowNull: false
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    commit: '性别（1为男性，2为女性，3为保密'
  },
  picture: {
    type: STRING,
    commit: '头像，图片地址'
  },
  city: {
    type: STRING,
    commit: '城市'
  },
})

module.exports = User