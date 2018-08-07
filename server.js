const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
var http = require('http').Server(app);
var io = require('socket.io')(http);


const main = ctx => {
  ctx.type = 'html';
  ctx.body = fs.createReadStream('./index.html');
};

io.on('connection', function(socket){
  console.log('a user connected');
});

app.use(main);
app.listen(3000);