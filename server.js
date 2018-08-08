const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const IO = require('koa-socket');
const io = new IO();
io.attach(app)

const main = ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./index.html');
};

app._io.on('connection', socket => {
  console.log('建立连接了');
  let clientId = socket.client.id;

  socket.on('chat message', function (msg) {
    app._io.emit('chat message', msg);
    console.log('client id: ' + clientId + 'message: ' + msg);
  });

  // socket.emit('serverEmit', '我接收到增加购物车的事件了'); /*发给指定用户*/

  // app._io.emit('serverEmit', '我接收到增加购物车的事件了'); /*广播*/

})


app.use(main);
app.listen(3000);