process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server');

describe('POST /api/user/validate', () => {
    it('should validate code', (done) => {
        chai.request(server)
            .post('/api/user/validate')
            .type('application/json')
            .send({
                'code': 'test123',
            })
            .end((err, res) => {
                let code = res.body.code;
                code.should.eql(200);
                done();
            });
    })
});


// describe('Poll Test', () => {
//     it('should create a poll', (done) => {

//     });
// });