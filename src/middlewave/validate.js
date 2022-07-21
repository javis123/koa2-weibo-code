/**
 * @description json schema 验证中间件
 */
const { ErrorModel } = require('../model/ResModel')
const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
/**
 * 
 * @param {Function} validateFn 验证函数
 * @returns 
 */
function genValidator(validateFn){
  return async function(ctx,next){
    const data = ctx.request.body
    const err = validateFn(data)
    if(err){
      //验证失败
      console.log(err)
      ctx.body =  new ErrorModel(jsonSchemaFileInfo)
      return
    }
    //验证成功
    await next()
  }
}
module.exports = {
  genValidator
}
