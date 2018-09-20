const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

class AuthController {

    async genToken(openId) {
        // create a token
        let token = jwt.sign({
            openId: openId
        }, authConfig.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        return token;
    };

    async verify(token) {
        try {
            let result = await jwt.verify(token, authConfig.secret);
            return result;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = new AuthController();