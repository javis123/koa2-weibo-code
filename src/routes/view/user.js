/**
 * @description user view 路由配置
 * @author zk
 */

const router = require('koa-router')()
/**
 * 
 * @param {Object} ctx ctx
 */
function getUserInfo(ctx) {
  let data = {
    isLogin: false
  }
  const userInfo = ctx.session.userInfo
  if(userInfo){
    data = {
      isLogin: true,
      userName: userInfo.userName
    }
  }
  return data
}
router.get('/login',async (ctx, next) => {
  await ctx.render('login',getUserInfo(ctx))
})

router.get('/register',async (ctx, next) => {
  await ctx.render('register',getUserInfo(ctx))
})

module.exports = router