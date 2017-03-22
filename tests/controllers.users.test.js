const chai = require('chai')
const models = require('../models')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = require('../app.js')

function success (status) {
  let isSuccess = (status >= 200 && status < 400)
  if (isSuccess) return status
  else {
    if (status === 404) return 404
    else if (status === 500) return 500
  }
}

function deleteData () {
  return models.Users.destroy({
    where: {}
  }).then(function () {

  })
}

describe('Auth/users status and response', function () {
  let createdId
  let dummyData = ['fadly', 'fadly@gmail.com', 'gana', 'gana@yahoo.com']

  deleteData()

  describe('GET /auth', function () {
    it('should return /auth endpoints', function (done) {
      chai.request(url)
        .get('/auth')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/auth/users',
            '/auth/users/:id',
            '/auth/admins',
            '/auth/admins/:id',
            '/auth/admins/login'
          ])
          done()
        })
    })
  })

  describe('POST /auth/users', function () {
    it('return 200 <= status < 400, an object, and res.body.User.username should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/auth/users')
        .send({
          username: dummyData[0],
          email: dummyData[1]
        })
        .end(function (err, res) {
          createdId = res.body.User.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.User.username.should.equal(dummyData[0])
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
