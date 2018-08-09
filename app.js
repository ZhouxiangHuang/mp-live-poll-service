var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

router.get('/hello/:id', (ctx, next) => {
    console.log(ctx.params.id);
    ctx.body = 'Hello World!';
    next();
});

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);