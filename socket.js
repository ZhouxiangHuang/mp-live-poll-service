const IO = require('koa-socket');
const io = new IO();

const socket = app => {
    io.attach(app);

    io.on('connect', (ctx, data) => {
        console.log('connected!');
    })
}

module.exports = socket;