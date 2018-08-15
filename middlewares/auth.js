const authctrl = require('../controllers/AuthController');

module.exports = async (ctx, next) => {
    if (ctx.request.url == '/api/user/register') {

    } else {
        let token = ctx.request.header.authorization;
        try {
            let result = await authctrl.verify(token);
            ctx.state.user = {
                openId: result.openId
            }
        } catch (err) {
            return ctx.error({
                msg: 'Authorization Failed!'
            });
        }
    }
    await next();
}