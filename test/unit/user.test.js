process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../server');

describe('routes : /api/user', () => {

  describe('POST /api/user/register', () => {
    it('should return json', (done) => {
      chai.request(server)
        .post('/api/user/register')
        .type('application/json')
        .send({
          'code': 'test123',
        })
        .end((err, res) => {

          // should.not.exist(err);
          // res.status.should.eql(200);
          // res.type.should.eql('application/json');
          // res.body.status.should.equal('success');
          // res.body.message.should.eql('hello, world!');
          done();
        });
    });
  });

  describe('GET /api/user/detail', () => {
    it('should return json', (done) => {
      chai.request(server)
        .get('/api/user/detail')
        .end((err, res) => {
          done();
        });
    });
  });

});