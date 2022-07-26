/**
 * @description 粉丝逻辑的实现
 * @author zk
 */
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { 
  getUsersByFollower,
  addFollower,
  deleteFollower,
  getFollowersByUser
} = require('../services/user-relation')
const { addFollowerFailInfo,deleteFollowerFailInfo } = require('../model/ErrorInfo')
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
/**
 * 查询关注者
 * @param {number} userId 
 * @returns 
 */
async function getFollowers(userId) {
  const result = await getFollowersByUser(userId)
  const { count,userList } = result
  return new SuccessModel({
    count,
    followersList: userList
  })
}
async function follow(myUserId, curUserId) {
  try{
    await addFollower(myUserId, curUserId)
    return new SuccessModel()
  }catch(ex){
    return new ErrorModel(addFollowerFailInfo)
  }
}


async function unFollow(myUserId, curUserId) {
  const result = deleteFollower(myUserId, curUserId)
  if(result){
    return new SuccessModel()
  }
  return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
  getFans,
  follow,
  unFollow,
  getFollowers
}