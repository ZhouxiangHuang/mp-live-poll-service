const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const socket = require('./socket')(app);

app
    .use(router.routes())
    .use(router.allowedMethods())

    .listen(3000);