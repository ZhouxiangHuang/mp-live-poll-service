const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const IO = require('koa-socket');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wechat-live-polling');

const io = new IO();
io.attach(app)

const main = ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./index.html');
};

app._io.on('connection', socket => {
  console.log('建立连接了');
  let clientId = socket.client.id;

  joinPoll(socket, '水果讨论组');

  socket.on('chat message', function (msg) {
    app._io.emit('chat message', msg);
    console.log('client id: ' + clientId + 'message: ' + msg);
  });
})

const Poll = mongoose.model('Poll', {
  name: String,
  creatorId: String,
  users: Array,
  totalVotes: Number
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

app.use(main);
app.listen(3000);