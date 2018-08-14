process.env.NODE_ENV = 'test';
const authctrl = require('../../controllers/AuthController');

const chai = require('chai');
const should = chai.should();

describe('Auth Test', () => {
    it('should produce valid token', (done) => {
        authctrl.genToken('abc')
            .then(token => {
                return authctrl.verify(token)
            })
            .then(result => {
                let openId = result.openId;
                openId.should.eql('abc');
            })
        done();
    });
});