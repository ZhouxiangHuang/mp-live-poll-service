const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const IO = require('koa-socket');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const pollSchema = require('./models/pollSchema');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wechat-live-polling');

const io = new IO();
io.attach(app);

app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  }
}));

var Poll = mongoose.model('Poll', pollSchema);

//创建投票
router.post('/pollCreate', async ctx => {
  console.log(ctx)
  //接收客户端提交的数据 、主要做的操作就是增加数据
  console.log(ctx.request.body);
  var reqBody = ctx.request.body;
  var pollObj = {
    title: reqBody.title,
    description: reqBody.description,
    creatorId: reqBody.openID,
    anonymous: reqBody.anonymous,
    options: reqBody.options
  }
  var poll = new Poll(pollObj);
  ctx.body = await savePoll(poll);
})

function savePoll(poll) {
  return new Promise(resolve => {
    poll.save(function (error, doc) {
      if (error || !doc) {
        resolve({
          "success": false,
          "message": '增加数据失败'
        });
      } else {
        resolve({
          "success": true,
          "message": '增加数据成功'
        });
      }
    })
  });
}


// const main = ctx => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream('./index.html');
// };

// app._io.on('connection', socket => {
//   console.log('建立连接了');
//   let clientId = socket.client.id;

//   joinPoll(socket, '水果讨论组');

//   socket.on('chat message', function (msg) {
//     app._io.emit('chat message', msg);
//     console.log('client id: ' + clientId + 'message: ' + msg);
//   });
// })


// const joinPoll = (socket, pollName) => {
//   socket.join(pollName);
//   const poll = new Poll({
//     name: '西瓜还是哈密瓜?',
//     creatorId: socket.client.id,
//     users: [{ openId: 'oZeTp0klTNQFcYxmT4X-Nv8Jysvw' }],
//     totalVotes: 0,
//   })
//   poll.save(function (error, doc) {
//     if (error || !doc) {
//       console.log(error);
//     } else {
//       app._io.to(pollName).emit('chat message', 'This is room ' + pollName);
//     }
//   })
//   console.log(poll);
// }

// app.use(main);
app.use(async (ctx, next) => {
  next();
  if (ctx.status === 404) {
    ctx.status = 404;
    ctx.body = "无此接口"
  }
});

const joinPoll = (socket, pollName) => {
  socket.join(pollName);
  const poll = new Poll({
    name: '西瓜还是哈密瓜?',
    creatorId: socket.client.id,
    users: [],
    totalVotes: 0,
  })
  poll.save();
  app._io.to(pollName).emit('chat message', 'This is room ' + pollName);
  console.log(poll);
}

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); // 作用： 这是官方文档的推荐用法,我们可以看到router.allowedMethods()用在了路由匹配router.routes()之后,所以在当所有路由中间件最后调用.此时根据ctx.status设置response响应头
app.listen(3000);