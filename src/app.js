const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isProd } = require('./utils/env')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')
const { SESSION_SECRET_KEY } = require('./conf/secretKeys')
const koaStatic = require('koa-static')
const path = require('path')

const profileAPIRouter = require('./routes/api/blog-profile')
const blogViewRouter = require('./routes/view/blog')
const homeAPIRouter = require('./routes/api/blog-home')
const utilsAPIRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error')

// error handler
let onerrorConf = {}
if(isProd){
  onerrorConf = {
    redirect : '/error'
  }
}
onerror(app,onerrorConf)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', '/uploadFiles')))


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.keys = [SESSION_SECRET_KEY]
app.use(session({
  key: 'weibo.sid', //cookie的name
  prefix: 'weibo:sess', //redis key的前缀，默认为koa:sess
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))
// routes
app.use(profileAPIRouter.routes(),profileAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())//404和错误页要放到最底下

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
