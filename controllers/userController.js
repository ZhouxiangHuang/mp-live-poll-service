class UserController {
    // 用户注册
    async register(ctx) {
        let reqBody = ctx.request.body;
        console.log(reqBody);
    }

    // 用户登录
    async login(ctx) {
        // await ……
    }

    // 用户信息
    async detail(ctx) {
        return ctx.success({
            msg: '创建投票成功!',
            data: '哈哈哈'
        });
    }
}

module.exports = new UserController();