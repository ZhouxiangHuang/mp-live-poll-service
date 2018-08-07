// const Koa = require('koa');
// const app = new Koa();

// // response
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

// app.listen(3000);


for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}