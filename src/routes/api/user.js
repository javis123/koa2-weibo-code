/**
 * @description user Api路由
 * @author zk
 */
const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
  logout
} = require('../../controller/user')
const { loginCheck } = require('../../middlewave/loginCheck')
const { genValidator } = require('../../middlewave/validate')
const { jsonSchemaFileInfo, loginCheckFailInfo } = require('../../model/ErrorInfo')
const { ErrorModel } = require('../../model/ResModel')
const userValidate = require('../../validator/user')

router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({ userName, password, gender})
})

router.post('/isExist',async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

router.post('/login',async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(ctx, userName, password)
})

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, city, picture } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})
module.exports = router