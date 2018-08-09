const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const userctrl = require('../controllers/users/userController');   // 引入用户模块逻辑层

router
  .post('/api/user/register', userctrl.register)
  .get('/api/user/detail', (cxt, next) => {

  })
  

app
  .use(router.routes())
  .use(router.allowedMethods());