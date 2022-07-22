/**
* @description use controller
* @author zk
*/
/**
* 用户名是否存在
* @param {string} userName 用户名
*/
const { 
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  loginFailInfo,
  changeInfoFailInfo
} = require('../model/ErrorInfo')
const {
  getUserInfo,
  createUser,
  updateUser
} = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const doCrypto = require('../utils/cryp')
/**
* 查看用户名是否注册
* @param {string} userName 用户名
* @returns 
*/
async function isExist(userName) {
  const result = await getUserInfo(userName)
  if(result == null){
    return new ErrorModel(registerUserNameNotExistInfo)
  }else{
    return new SuccessModel(result)
  }
}
/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 
 * @param {number} gender 
 */
async function register({ userName, password, gender }){
  const userInfo = await getUserInfo(userName)
  if(userInfo){
    return new ErrorModel(registerUserNameExistInfo)
  }
  try{
    await createUser({ 
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  }catch(err){
    return new ErrorModel(
      registerUserNameExistInfo
    )
  }
}
/**
 * 登录
 * @param {Object} ctx 
 * @param {string} userName 
 * @param {string} password 
 * @returns 
 */
async function login( ctx, userName, password) {
  password = doCrypto(password)
  const userInfo = await getUserInfo(userName, password)
  if(!userInfo){
    return new ErrorModel(loginFailInfo)
  }
  if(ctx.session.userInfo == null) {
    ctx.session.userInfo = userInfo
  }
  return new SuccessModel()
}
/**
 *
 * @param {Object} ctx ctx
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo( ctx,{ nickName, city, picture }){
  const userName = ctx.session.userInfo.userName
  const result = await updateUser(
    {
      newNickName: nickName,
      newCity: city,
      newPicture: picture
    },
    { userName })
  if(result){
    Object.assign(ctx.session.userInfo, { nickName, city, picture })
    return new SuccessModel()
  }
  return new ErrorModel(changeInfoFailInfo)
}
module.exports = {
  isExist,
  register,
  login,
  changeInfo
}