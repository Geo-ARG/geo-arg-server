const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = 'http://localhost:3000'
//    "prestart": "./node_modules/.bin/sequelize db:migrate && ./node_modules/.bin/sequelize db:seed:all",

function success (status) {
  let isSuccess = (status >= 200 && status < 400)
  if (isSuccess) return status
  else {
    if (status === 404) return 404
    else if (status === 500) return 500
  }
}

describe('API status and response', function () {
  let createdId
  let dummy = ['fadly', '123', 'fadly@gmail.com', 'gana', '123', 'gana@yahoo.com']

  describe('GET /auth', function () {
    it('should return /auth endpoints', function (done) {
      chai.request(url)
        .get('/auth')
        .end(function (err, res) {
          console.log(res.body.endpoints);
          console.log(res.status);
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/auth/google',
            '/auth/facebook',
            '/auth/users/:id'
          ])
          done()
        })
    })
  })

  describe('GET /api', function () {
    it('should return /api endpoints', function (done) {
      chai.request(url)
        .get('/api')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/api/events',
            '/api/scan',
            '/api/location',
            '/api/verification'
          ])
          done()
        })
    })
  })

  describe('GET /admin', function () {
    it('should return /admin endpoints', function (done) {
      chai.request(url)
        .get('/admin')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/admin/events',
            '/admin/events/:id'
          ])
          done()
        })
    })
  })

  // describe('POST /auth/users/register', function () {
  //   it('should return 200 <= status < 300 || status === 304, an object, and req.body.name equal fadly', function (done) {
  //     chai.request(url)
  //       .post('/auth/users/register')
  //       .send({
  //         username: dummy[0],
  //         password: dummy[1],
  //         email: dummy[2]
  //       })
  //       .end(function (err, res) {
  //         createdId = res.body._id
  //         res.should.have.status(success(res.status))
  //         res.should.be.an('object')
  //         res.body.username.should.equal('fadly')
  //         done()
  //       })
  //   })
  // })
  //
  // describe('POST /auth/users/login', function () {
  //   it('should return 200 <= status < 300 || status === 304, an object, and req.body should have property token', function (done) {
  //     chai.request(url)
  //       .post('/auth/users/login')
  //       .send({
  //         username: dummy[0],
  //         password: dummy[1]
  //       })
  //       .end(function (err, res) {
  //         res.should.have.status(success(res.status))
  //         res.should.be.an('object')
  //         res.body.should.have.deep.property('token')
  //         done()
  //       })
  //   })
  // })
  //
  // describe('GET /auth/users', function () {
  //   it('return 200 <= status < 300 || status === 304, an object, and req.body[0].username should equal dummy[0]', function (done) {
  //     chai.request(url)
  //       .get('/auth/users')
  //       .end(function (err, res) {
  //         res.should.have.status(success(res.status))
  //         res.should.be.an('object')
  //         res.body[0].username.should.equal(dummy[0])
  //         done()
  //       })
  //   })
  // })
  //
  // describe('PUT /auth/users/:id', function () {
  //   it('should return 200 <= status < 300 || status === 304, an object, and res.body.email should equal dummy[2]', function (done) {
  //     chai.request(url)
  //       .put(`/auth/users/${createdId}`)
  //       .send({
  //         username: dummy[3],
  //         password: dummy[4]
  //       })
  //       .end(function (err, res) {
  //         res.should.have.status(success(res.status))
  //         res.body.should.be.an('object')
  //         res.body.email.should.equal(dummy[2])
  //         done()
  //       })
  //   })
  // })
  //
  // describe('DELETE /auth/users/:id', function () {
  //   it('should return 200 <= status < 300 || status === 304, an object, and res.body should have property message', function (done) {
  //     chai.request(url)
  //       .delete(`/auth/users/${createdId}`)
  //       .end(function (err, res) {
  //         res.should.have.status(success(res.status))
  //         res.body.should.be.an('object')
  //         res.body.should.have.deep.property('message')
  //         done()
  //       })
  //   })
  // })
  //
  // describe('GET /auth/users/logout', function () {
  //   it('should return 200 <= status < 300 || status === 304, an object, and res.body.message should equal User session destroyed', function (done) {
  //     chai.request(url)
  //       .get(`/auth/users/logout`)
  //       .end(function (err, res) {
  //         res.should.have.status(success(res.status))
  //         res.body.should.be.an('object')
  //         res.body.message.should.equal('User session destroyed')
  //         done()
  //       })
  //   })
  // })
})
