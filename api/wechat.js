class WechatApi {
    // 用户微信信息
    async userInfo(code) {
        return {
            openid: Math.random() * 10000000 + 'abcasdf'
        }
    }
}

module.exports = new WechatApi();