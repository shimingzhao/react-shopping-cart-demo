const sessionActions = require('../actions/sessionActions');
const expect = require('chai').expect;
should = require('should');
app = require('../server');

var Cookies;

describe('Functional Test <Sessions>:', function () {
  it('should create user session for valid user', function (done) {
    request(app)
      .post('/v1/sessions')
      .set('Accept', 'application/json')
      .send({"email": "user_test@example.com", "password": "123"})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('user_test@example.com');
        // Save the cookie to use it later to retrieve the session
        Cookies = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  it('should get user session for current user', function (done) {
    var req = request(app).get('/v1/sessions');
    // Set cookie to get saved user session
    req.cookies = Cookies;
    req.set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.id.should.equal('1');
        res.body.short_name.should.equal('Test user');
        res.body.email.should.equal('user_test@example.com');
        done();
      });
  });
});


// describe('login test', ()=>{
//   it('login api call test', ()=>{
//     return sessionActions.login(100,'')
//       .then(data => {
//         expect(data).toBeDefined()
//         // console.log(data)
//       })
//   })
// })


// describe('testforadd', function() {
//   it('1plus1equal2', function() {
//     expect(add(1, 1)).to.be.equal(2);
//   });
//   it('3plus-3equal0', function() {
//     expect(add(3, -3)).to.be.equal(0);
//   });
// });
//
// describe('#getUser() using Promises', () => {
//   it('should load user data', () => {
//     return github.getUser('vnglst')
//       .then(data => {
//         expect(data).toBeDefined()
//         expect(data.entity.name).toEqual('Koen van Gilst')
//       })
//   })
// })