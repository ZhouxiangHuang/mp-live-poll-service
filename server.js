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

  joinPoll(socket, clientId);

  socket.on('chat message', function (msg) {
    app._io.emit('chat message', msg);
    console.log('client id: ' + clientId + 'message: ' + msg);
  });
})

let currentPoll = {};
const joinPoll = (socket, poll) => {
  socket.join(poll);
  currentPoll[socket.id] = poll;
  app._io.to(poll).emit('chat message', 'This is room ' + poll);
  console.log(currentPoll);
}

app.use(main);
app.listen(3000);