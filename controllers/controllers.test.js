const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = 'http://localhost:3000'

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
  let dummyData = ['fadly', 'fadly@gmail.com', 'gana', 'gana@yahoo.com']

  describe('GET /auth', function () {
    it('should return /auth endpoints', function (done) {
      chai.request(url)
        .get('/auth')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/auth/google',
            '/auth/facebook',
            '/auth/users',
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
            '/api/event',
            '/api/event/:id',
            '/api/location',
            '/api/location/scan',
            '/api/location/scan/:id',
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

  describe('POST /auth/users', function () {
    it('return 200 <= status < 400, an object, and res.body.username should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/auth/users')
        .send({
          username: dummyData[0],
          email: dummyData[1]
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.username.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /auth/users', function () {
    it('return 200 <= status < 400, an object, and res.body[0].email should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/auth/users')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].email.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('PUT /auth/users/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.email should equal dummyData[3]', function (done) {
      chai.request(url)
        .put(`/auth/users/${createdId}`)
        .send({
          username: dummyData[2],
          email: dummyData[3]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.email.should.equal(dummyData[3])
          done()
        })
    })
  })

  describe('DELETE /auth/users/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/auth/users/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted user with ID: ${createdId}`})
          done()
        })
    })
  })
})
