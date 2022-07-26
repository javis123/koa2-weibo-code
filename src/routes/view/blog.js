/**
 * @description 微博 View 路由
 * @author zk
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewave/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans } = require('../../controller/user-relation')

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
  const myUserName = myUserInfo.userName
  const { userName: curUserName } = ctx.params
  //看是不是登陆的人
  const isMe = myUserName === curUserName
  let curUserInfo
  if(isMe){
    curUserInfo = myUserInfo
  }else{
    //看你查的这个人是否存在
    const result = await isExist(curUserName)
    if(result.errno === 0){
      curUserInfo = result.data
    }
  }
  const userId = curUserInfo.id
  //获取粉丝列表
  const { count: fansCount, fansList } = (await getFans(userId)).data
  console.log(fansList.picture)
  //查看是否已关注此人
  const amIFollowed = fansList.some(fan => {
    return fan.userName === myUserName
  })
  //获取微博列表
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
      userInfo: curUserInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      amIFollowed
    },
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