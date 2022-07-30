/**
 * @description 微博 View 路由
 * @author zk
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewave/loginCheck')
const { getProfileBlogList } = require('../../controller/blog-profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans,getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount,getAtMeBlogList } = require('../../controller/blog-at')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo
  const { id: userId } = userInfo
  // console.log('userId:',userId)
  const fansResult = (await getFans(userId)).data
  const { count: fansCount, fansList } = fansResult
  // console.log(fansList)
  const followersResult = (await getFollowers(userId)).data
  const { count: followersCount, followersList } = followersResult
  const res = await getHomeBlogList(userId,0)
  const { blogList, count, pageIndex, pageSize, isEmpty } = res.data
  //获取at的数量
  const { count: blogAtCount } = (await getAtMeCount(userId)).data
  // console.log('这是被at的数量：',blogAtCount)
  await ctx.render('index',{
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount: blogAtCount
    },
    blogData: {
      blogList,
      count,
      pageIndex,
      pageSize,
      isEmpty
    }
  })
})

router.get('/profile', loginRedirect, async ( ctx, next) => {
  const userName = ctx.session.userInfo.userName
  ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  const myUserInfo = ctx.session.userInfo
  const myUserName = myUserInfo.userName
  const { userName: curUserName } = ctx.params
  let blogAtCount
  //看是不是登陆的人
  const isMe = myUserName === curUserName
  let curUserInfo
  if(isMe){
    curUserInfo = myUserInfo
    blogAtCount = (await getAtMeCount(myUserInfo.id)).data.count
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
  // console.log(fansList.picture)
  //获取关注人列表
  const { count: followersCount, followersList} = (await getFollowers(userId)).data
  //查看是否已关注此人
  const amIFollowed = fansList.some(fan => {
    return fan.userName === myUserName
  })
  //获取微博列表
  const result = await getProfileBlogList(curUserName, 0)
  const { isEmpty, blogList, count, pageIndex, pageSize } = result.data
  // console.log('贝阿特的数量为：',blogAtCount)
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
      followersData: {
        count: followersCount,
        list: followersList
      },
      amIFollowed,
      atCount: blogAtCount
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
//at-me路由
router.get('/at-me',loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  //获取@数量
  const { count: blogAtCount } = (await getAtMeCount(userId)).data
  //获取第一列列表
  const result = await getAtMeBlogList(userId)
  const { blogList, count, pageIndex, pageSize, isEmpty } = result.data
  //渲染页面
  await ctx.render('atMe', {
    atCount: blogAtCount,
    blogData: {
      blogList,
      count,
      pageIndex,
      pageSize,
      isEmpty
    }
  })
  //标记为已读
  if(blogAtCount > 0){

  }
})
module.exports = router