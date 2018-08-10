const IO = require('koa-socket');
const io = new IO();

const socket = app => {
    io.attach(app);

    app._io.on('connect', (ctx, data) => {
        console.log('connected!');
    })

    app._io.emit('chat message', 'tsup');

}

module.exports = socket;