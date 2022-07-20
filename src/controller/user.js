/**
 * @description use controller
 * @author zk
 */
/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
const { 
  registerUserNameNotExistInfo 
  } = require('../model/ErrorInfo')
const { getUserInfo } = require('../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
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
module.exports = {
  isExist
}