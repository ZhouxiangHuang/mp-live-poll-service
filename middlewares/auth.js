const authctrl = require('../controllers/AuthController');

module.exports = async (ctx, next) => {
    if (ctx.request.url == '/api/user/register' || ctx.request.url == '/api/user/validate') {

    } else {
        let token = ctx.request.header.authorization;
        try {
            let result = await authctrl.verify(token);
            ctx.state.user = {
                openId: result.openId
            }
        } catch (err) {
            return ctx.error({
                msg: '验证失败'
            });
        }
    }
    await next();
}