/**
 * @description user Api路由
 * @author zk
 */
const router = require('koa-router')()
const { isExist,register } = require('../../controller/user')
const { genValidator } = require('../../middlewave/validate')
const { jsonSchemaFileInfo } = require('../../model/ErrorInfo')
const { ErrorModel } = require('../../model/ResModel')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

router.post('/register',genValidator(userValidate),async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender})
})

router.post('/isExist',async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router