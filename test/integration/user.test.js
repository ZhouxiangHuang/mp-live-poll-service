process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server');

describe('routes : /api/user', () => {

    let token;
    describe('POST /api/user/register', () => {
        it('should return token', (done) => {
            chai.request(server)
                .post('/api/user/register')
                .type('application/json')
                .send({
                    'code': 'test123',
                })
                .then(res => {
                    token = res.body.data.token;
                    describe('GET /api/user/detail', () => {
                        it('should return user info', (done) => {
                            chai.request(server)
                                .get('/api/user/detail')
                                .set('Authorization', token)
                                .query({
                                    name: 'foo',
                                    limit: 10
                                })
                                .end((err, res) => {
                                    const code = res.body.code;
                                    code.should.eql(200);
                                    code.should.not.eql(-200);
                                    done();
                                });
                        });
                    });

                    describe('GET /api/user/detail', () => {
                        it('should fail auth', (done) => {
                            chai.request(server)
                                .get('/api/user/detail')
                                .set('Authorization', 'acbd')
                                .query({
                                    name: 'foo',
                                    limit: 10
                                })
                                .end((err, res) => {
                                    const code = res.body.code;
                                    code.should.eql(-200);
                                    done();
                                });
                        });
                    });
                    done();
                });
        });
    });



});