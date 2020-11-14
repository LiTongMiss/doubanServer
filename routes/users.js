const router = require('koa-router')()
const {login, regist } = require('../controller/user')
const {getCollection, getPublicInfo} = require('../controller/myCenter/myCenter')
const {SuccessModel, ErrorModel} = require('../model/resModel')
// const koaBody = require('koa-body')

//--------------------app端路由----------------------------
router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {

  ctx.body = 'this is a users/bar response'
})
//用户注册
router.post('/register', async (ctx, next)=>{
  const {username, password} = ctx.request.body
  const data = await regist(username, password)
  console.log('data', data)
  if(data.code == '200') {
    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('注册失败')
})
// 登录接口
router.post('/login',  async (ctx, next) => {
  // ctx.body = '登录页面!'
  const {username, password } = ctx.request.body
  const data = await login(username, password)
  if(data.username) {
    // 设置session
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    
    ctx.body = new SuccessModel()
    return
  } 
  ctx.body = new ErrorModel('登录失败')
})

// 我的书影音
// 我的发布
router.get('/publicInfo', async (ctx, next) => {
  const {userId} = ctx.request.body
  let data = await getPublicInfo(userId)
  console.log('返回data', data)
  if(data) {
    ctx.body = new SuccessModel(data, '获取数据成功')
  }else {
    ctx.body = new ErrorModel('获取数据失败')
  }
})
// 我的收藏
router.get('/collection', async (ctx, next) => {
  const {userId} = ctx.request.body
  let data = await getCollection(userId)
  console.log('返回data', data)
  if(data) {
    ctx.body = new SuccessModel(data, '获取数据成功')
  } else {
    ctx.body = new ErrorModel('获取数据失败')
  }
})

//--------------------后台管理系统路由-------------------------------

module.exports = router
