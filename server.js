const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const socket = require('./socket');
const timer = require('./middlewares/timer')
const bodyParser = require('koa-bodyparser');
const response = require('./middlewares/response');
const filter = require('./middlewares/filter');
const json = require('koa-json');
const db = require('./models/db');

socket(app); //start socket
db.connect('mongodb://localhost/wechat-live-polling');//start mongoose

app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  }
}));

const server = app
  .use(filter)
  .use(json())
  .use(timer)
  .use(response)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

module.exports = server;