/**
 * @description 微博 View 路由
 * @author zk
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewave/loginCheck')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index',{})
})

module.exports = router