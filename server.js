const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const socket = require('./socket')(app);
const bodyParser = require('koa-bodyparser');
const fs = require('fs');
const json = require('koa-json');
const db = require('./models/db');
app.use(json());

app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  }
}));

// const main = ctx => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream('./index.html');
// };
app.use(require('./middlewares/response'));
app.use(require('./middlewares/filter'));
app
    .use(router.routes())
    .use(router.allowedMethods())
    // .use(main)
    .listen(3000);