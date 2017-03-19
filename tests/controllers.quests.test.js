const chai = require('chai')
const models = require('../models')
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

function deleteData() {
  return models.Quests.destroy({
    where: {}
  }).then(function () {

  })
}

describe('API/quests status and response', function () {
  let createdId
  let dummyData = [
    'Go to PIM 3rd F',
    'Find a girl',
    'Text',
    'Chelsea Islan',
    'Go to PIM 2nd F',
    'Find a boy',
    'Text',
    'Syanmil'
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

  describe('POST /api/quests', function () {
    it('return 200 <= status < 400, an object, and res.body.task should equal dummyData[1]', function (done) {
      chai.request(url)
        .post('/api/quests')
        .send({
          title: dummyData[0],
          task: dummyData[1],
          type: dummyData[2],
          answerKey: dummyData[3]
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.task.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('GET /api/quests', function () {
    it('return 200 <= status < 400, an object, and res.body[0].answerKey should equal dummyData[3]', function (done) {
      chai.request(url)
        .get('/api/quests')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].answerKey.should.equal(dummyData[3])
          done()
        })
    })
  })

  describe('PUT /api/quests/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.type should equal dummyData[6]', function (done) {
      chai.request(url)
        .put(`/api/quests/${createdId}`)
        .send({
          title: dummyData[4],
          task: dummyData[5],
          type: dummyData[6],
          answerKey: dummyData[7]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.type.should.equal(dummyData[6])
          done()
        })
    })
  })

  describe('DELETE /api/quests/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/quests/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted quest with ID: ${createdId}`})
          done()
        })
    })
  })
})
