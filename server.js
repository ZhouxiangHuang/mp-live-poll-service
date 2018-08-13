const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const socket = require('./socket')(app);
const timer = require('./middlewares/timer')
const bodyParser = require('koa-bodyparser');
const response = require('./middlewares/response');
const filter = require('./middlewares/filter');
const json = require('koa-json');

app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  }
}));

const server = app
  .use(json())
  .use(timer)
  .use(response)
  .use(filter)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

module.exports = server;