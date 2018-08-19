// const Koa = require('koa');
const Router = require('koa-router');

// const app = new Koa();
const router = new Router();

//引入控制模块Controllers
const userctrl = require('./controllers/userController');
const pollctrl = require('./controllers/pollController');

router
  //用户接口
  .post('/api/user/register', userctrl.register)
  .post('/api/user/login', userctrl.login)
  .get('/api/user/detail', userctrl.detail)

  //投票接口
  .post('/api/poll/create', pollctrl.create)
  .get('/api/poll/get-all-poll', pollctrl.getAllPoll)
  .get('/api/poll/get-poll', pollctrl.getPoll)

module.exports = router;

// app
//   .use(router.routes())
//   .use(router.allowedMethods());