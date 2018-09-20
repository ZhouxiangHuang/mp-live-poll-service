const Koa = require('koa');
const app = new Koa();
const router = require('./router');
// const socket = require('./socket');
const timer = require('./middlewares/timer')
const bodyParser = require('koa-bodyparser');
const response = require('./middlewares/response');
const filter = require('./middlewares/filter');
const json = require('koa-json');
const db = require('./models/db');
const auth = require('./middlewares/auth');

const socket = require('socket.io');
const io = new socket(app)

io.on('connection', socket => {
  console.log('connected');
})

// socket(app); //start socket
db.connect('mongodb://localhost/wechat-live-polling'); //start mongoose



app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  }
}));

const server = app
  .use(response)
  .use(auth)
  .use(filter)
  .use(json())
  .use(timer)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(8080);

module.exports = server;


// const Koa = require('koa');
// const socket = require('socket.io');
// const http = require('http');

// const app = new Koa()

// // Basic.
// app.use(async ctx => {
//   ctx.body = 'Hello World'
// })

// const server = http.createServer(app.callback())
// const io = socket(server)

// io.on('connection', function(socket){
//     console.log('a user connected')
// })

// server.listen(8080)