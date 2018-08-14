const jwt = require('jsonwebtoken');

class AuthController {

    async genToken(openId) {
        // create a token
        let token = jwt.sign({
            openId: openId
        }, 'secret', {
            expiresIn: 86400 // expires in 24 hours
        });

        return token;
    };
}

module.exports = new AuthController();