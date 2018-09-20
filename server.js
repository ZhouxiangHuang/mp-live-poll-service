// const Koa = require('koa');
// const app = new Koa();
// const router = require('./router');
// // const socket = require('./socket');
// const timer = require('./middlewares/timer')
// const bodyParser = require('koa-bodyparser');
// const response = require('./middlewares/response');
// const filter = require('./middlewares/filter');
// const json = require('koa-json');
// const db = require('./models/db');
// const auth = require('./middlewares/auth');

// const socket = require('socket.io');
// const io = new socket(app)

// io.on('connection', socket => {
//   console.log('connected');
// })

// // socket(app); //start socket
// db.connect('mongodb://localhost/wechat-live-polling'); //start mongoose



// app.use(bodyParser({
//   extendTypes: {
//     json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
//   }
// }));

// const server = app
//   .use(response)
//   .use(auth)
//   .use(filter)
//   .use(json())
//   .use(timer)
//   .use(router.routes())
//   .use(router.allowedMethods())
//   .listen(8080);

// module.exports = server;


var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: true
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wsServer.on('connection', function(request) {
    console.log('connected');
});