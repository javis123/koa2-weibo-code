/**
 * @description 登录验证中间件
 * @author zk
 */

const { ErrorModel } = require('../model/ResModel')
const { loginCheckFailInfo } = require('../model/ErrorInfo')
/**
 * 
 * @param {Object} ctx ctx
 * @param {Function} next next
 * @returns 
 */
async function loginCheck(ctx, next) {
  if(ctx.session && ctx.session.userInfo){
    await next()
    return
  }
  ctx.body = new ErrorModel(loginCheckFailInfo)
}
/**
 * 
 * @param {Object} ctx 
 * @param {Function} next 
 * @returns 
 */
async function loginRedirect(ctx, next) {
  if(ctx.session && ctx.session.userInfo){
    await next()
    return
  }
  const curUrl = ctx.url
  ctx.redirect('/login?url=' + encodeURIComponent(curUrl))
}

module.exports = {
  loginCheck,
  loginRedirect
}