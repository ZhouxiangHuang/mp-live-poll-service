const wechatApi = require('../api/wechat');
const UserModel = require('../models/userModel');
const authctrl = require('./AuthController');

class UserController {
    // 用户注册
    async register(ctx) {
        let reqBody = ctx.request.body;
        let userWechatInfo = await wechatApi.userInfo(reqBody.code);
        let user = {
            openId: userWechatInfo.openid,
        }
        let result = await UserModel.create(user);
        if (!result) return ctx.error({
            msg: '注册失败'
        });

        let token = await authctrl.genToken(userWechatInfo.openid);
        return ctx.success({
            msg: '注册成功',
            data: {token: token}
        });
    }

    // 用户登录
    async login(ctx) {
        // await ……
    }

    // 用户信息
    async detail(ctx) {
        let queries = ctx.request.query;
        let userWechatInfo = await wechatApi.userInfo(queries.code);
        let user = await UserModel.find({
            openId: userWechatInfo.openid
        });
        return ctx.success({
            data: user
        })
    }
}

module.exports = new UserController();