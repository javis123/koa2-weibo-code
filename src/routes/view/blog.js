/**
 * @description 微博 View 路由
 * @author zk
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewave/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index',{})
})

router.get('/profile', loginRedirect, async ( ctx, next) => {
  const userName = ctx.session.userInfo.userName
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const muUserName = myUserInfo.userName
  const { userName: curUserName } = ctx.params
  const isMe = myUserInfo === curUserName
  let curUserInfo
  if(isMe){
    curUserInfo = myUserInfo
  }else{
    const result = await isExist(curUserName)
    if(result.errno === 0){
      curUserInfo = result.data
    }
  }
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, count, pageIndex, pageSize } = result.data
  await ctx.render('profile', {
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    },
    userData: {
      isMe,
      userInfo: curUserInfo
    }
  })
})

router.get('/square', loginRedirect, async (ctx, next) => {
  const result = await getSquareBlogList(0)
  const { isEmpty, blogList, count, pageIndex, pageSize } = result.data
  await ctx.render('square',{
    blogData: {
      isEmpty,
      blogList,
      pageIndex,
      pageSize,
      count
    }
  })

})
module.exports = router