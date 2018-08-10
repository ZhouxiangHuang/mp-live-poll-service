class UserController {
    // 用户注册
    async register(ctx) {
        // await ……
        console.log('register');
    }

    // 用户登录
    async login(ctx) {
        // await ……
    }

    // 用户信息
    async detail(ctx) {
        console.log('detail');
    }
}

module.exports = new UserController();