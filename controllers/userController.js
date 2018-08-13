const wechatApi = require('../api/wechat');
const UserModel = require('../models/userModel');

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
        return ctx.success({
            msg: '注册成功',
            data: result
        });
    }

    // 用户登录
    async login(ctx) {
        // await ……
    }

    // 用户信息
    async detail(ctx) {
        let queries = ctx.request.query;
        let user = await UserModel.find({
            openId: '6540748.577970519abcasdf'
        });
        return ctx.success({
            data: user
        })
    }
}

module.exports = new UserController();