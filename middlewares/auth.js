const authctrl = require('../controllers/AuthController');

module.exports = async (ctx, next) => {
    let token = 'abc';
    let result = await authctrl.verify(token);
    console.log(Object.keys(result));
    await next();
}