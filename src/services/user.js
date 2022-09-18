/**
 * @description user service
 * @author zk
 */

const { User } = require('../db/model/index')
const { formatUser } = require('./_format')
const { addFollower } = require('./user-relation')
/**
 * 
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  const whereOpt = {
    userName
  }
  if(password){
    Object.assign(whereOpt, { password })
  }
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if(result == null){
    //未找到
    return result
  }
  //格式化
  const formatRes = formatUser(result.dataValues)
  return formatRes
}
/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 * @param {string} nickName 
 */
async function createUser({ userName, password, gender = 3, nickName}){
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName:userName
  })
  const data = result.dataValues
  addFollower(data.id, data.id)
  return data
}
/**
 *
 * @param {Object} param0 要修改的资料
 * @param {Object} param1 查询所需的资料
 */
async function updateUser(
  { newPassword, newNickName, newCity, newPicture },
  { password, userName }
) {
  const updateData = {}
  if(newPassword){
    updateData.password = newPassword
  }
  if(newNickName){
    updateData.nickName = newNickName
  }
  if(newCity){
    updateData.city = newCity
  }
  if(newPicture){
    updateData.picture = newPicture
  }
  const searchData = {
    userName
  }
  if(password){
    searchData.password = password
  }
  const result = await User.update(updateData,
    {
      where: searchData
    })
  return result[0] > 0
}
module.exports = {
  getUserInfo,
  createUser,
  updateUser
}