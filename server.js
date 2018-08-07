const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
// var http = require('http').Server(app);
// var io = require('socket.io')(http);
const IO = require('koa-socket');
const io = new IO();
io.attach(app)


const main = ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./index.html');
};

// io.on('connection', function(socket){
//   console.log('a user connected');
// });

app._io.on('connection', socket => {
  console.log('建立连接了');
  
  socket.on('serverListen', function (clientMsg) {
    console.log(clientMsg);
  });

  socket.emit('serverEmit', '我接收到增加购物车的事件了');  /*发给指定用户*/

  app._io.emit('serverEmit', '我接收到增加购物车的事件了');  /*广播*/

})

app.use(main);
app.listen(3000);