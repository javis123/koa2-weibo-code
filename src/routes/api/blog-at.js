/**
 * @description 微博@ 关系 加载更多
 * @author zk
 */
const router = require('koa-router')()
const { loginCheck } = require('../../middlewave/loginCheck')
const { getAtMeBlogList } = require('../../controller/blog-at')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/atMe')

router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  console.log(pageIndex)
  const { id: userId } = ctx.session.userInfo
  const result = await getAtMeBlogList(userId, pageIndex)
  console.log('返回的结果为：',result)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})
module.exports = router