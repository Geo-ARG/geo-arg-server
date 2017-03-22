const chai = require('chai')
const models = require('../models')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

let jwt = require('jsonwebtoken')
let hash = require('password-hash')

const url = 'http://localhost:3000'

function success (status) {
  let isSuccess = (status >= 200 && status < 400)
  if (isSuccess) return status
  else {
    if (status === 404) return 404
    else if (status === 500) return 500
  }
}

function deleteData() {
  return models.Admins.destroy({
    where: {}
  }).then(function () {

  })
}

describe('Admin status and response', function () {
  let createdId, hashedPass
  let dummyData = ['fadly@gmail.com', '123', 'gana@yahoo.com', '345']

  setTimeout(function () {
    deleteData()
  }, 500)

  describe('POST /admins', function () {
    it('return 200 <= status < 400, an object, and res.body[0].email should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/admins')
        .send({
          email: dummyData[0],
          password: dummyData[1]
        })
        .end(function (err, res) {
          createdId = res.body[0].id
          hashedPass = res.body[0].password
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].email.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /admins', function () {
    it('return 200 <= status < 400, an object, and res.body[0].password should equal hashedPass', function (done) {
      chai.request(url)
        .get('/admins')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].password.should.equal(hashedPass)
          done()
        })
    })
  })

  describe('PUT /admins/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.email should equal dummyData[2]', function (done) {
      chai.request(url)
        .put(`/admins/${createdId}`)
        .send({
          email: dummyData[2],
          password: dummyData[3]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.email.should.equal(dummyData[2])
          done()
        })
    })
  })

  describe('DELETE /admins/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/admins/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted admin with ID: ${createdId}`})
          done()
        })
    })
  })
})
