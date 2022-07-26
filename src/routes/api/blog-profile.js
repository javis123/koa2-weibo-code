/**
 * @description 个人路由API主页
 * @author zk
 */

const router = require('koa-router')()
const { loginCheck, loginRedirect } = require('../../middlewave/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { follow,unFollow } = require('../../controller/user-relation')
const { getBlogListStr } = require('../../utils/blog')

router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

router.post('/follow', loginCheck, async (ctx, next) => {
  const { userId:curUserId } = ctx.request.body
  const myUserId = ctx.session.userInfo.id
  ctx.body = await follow(myUserId, curUserId)
})

router.post('/unfollow', loginCheck, async (ctx, next) => {
  const { userId:curUserId } = ctx.request.body
  const myUserId = ctx.session.userInfo.id
  ctx.body = await unFollow(myUserId, curUserId)
})

module.exports = router