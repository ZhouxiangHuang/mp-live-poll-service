const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const socket = require('./socket')(app);
const fs = require('fs');


const main = ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./index.html');
};

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(main)
    .listen(3000);