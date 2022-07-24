/**
 * @description blog router
 * @author zk
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewave/loginCheck')
const { genValidator } = require('../../middlewave/validate')
const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog-home')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content,image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image})
})

module.exports = router