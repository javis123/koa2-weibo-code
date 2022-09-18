/**
 * @description blog router
 * @author zk
 */

const router = require('koa-router')()
const { loginCheck } = require('../../middlewave/loginCheck')
const { genValidator } = require('../../middlewave/validate')
const blogValidate = require('../../validator/blog')
const { create } = require('../../controller/blog-home')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
  const { content,image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image})
})

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  const { pageIndex } = ctx.params
  const userId = ctx.session.userInfo.id
  const result = await getHomeBlogList(userId, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router