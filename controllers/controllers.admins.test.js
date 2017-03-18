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

describe('Admin status and response', function () {
  let createdId
  let dummyData = ['fadly@gmail.com', '123', 'gana@yahoo.com', '345']

  describe('POST /admins', function () {
    it('return 200 <= status < 400, an object, and res.body.email should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/admins')
        .send({
          email: dummyData[0],
          password: dummyData[1]
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.email.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /admins', function () {
    it('return 200 <= status < 400, an object, and res.body[0].password should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/admins')
        .end(function (err, res) {
          console.log(res.body);
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].password.should.equal(dummyData[1])
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
