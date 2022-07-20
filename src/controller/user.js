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
  registerUserNameExistInfo 
} = require('../model/ErrorInfo')
const { getUserInfo,createUser } = require('../services/user')
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
module.exports = {
  isExist,
  register
}