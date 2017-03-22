const chai = require('chai')
const models = require('../models')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = require('../app')

function success (status) {
  let isSuccess = (status >= 200 && status < 400)
  if (isSuccess) return status
  else {
    if (status === 404) return 404
    else if (status === 500) return 500
  }
}

function deleteData () {
  return models.User_Locations.destroy({
    where: {}
  }).then(function () {

  })
}

describe('API/userlocations status and response', function () {
  let createdId
  let dummyData = [
    1,
    2,
    3,
    4
  ]

  deleteData()

  describe('GET /api', function () {
    it('should return /api endpoints', function (done) {
      chai.request(url)
        .get('/api')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/api/events',
            '/api/events/:id',
            '/api/locations',
            '/api/locations/:id',
            '/api/quests',
            '/api/quests/:id',
            '/api/userevents',
            '/api/userevents/:id',
            '/api/userlocations',
            '/api/userlocations/:id'
          ])
          done()
        })
    })
  })

  describe('POST /api/userlocations', function () {
    it('return 200 <= status < 400, an object, and res.body.LocationId should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/api/userlocations')
        .send({
          UserId: dummyData[1],
          LocationId: dummyData[0]
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.LocationId.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /api/userlocations', function () {
    it('return 200 <= status < 400, an object, and res.body[0].UserId should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/api/userlocations')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].UserId.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('PUT /api/userlocations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.LocationId should equal dummyData[2]', function (done) {
      chai.request(url)
        .put(`/api/userlocations/${createdId}`)
        .send({
          LocationId: dummyData[2],
          UserId: dummyData[0]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.LocationId.should.equal(dummyData[2])
          done()
        })
    })
  })

  describe('DELETE /api/userlocations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${createdId}`})
          done()
        })
    })
  })
})
