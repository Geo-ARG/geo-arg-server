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
  return models.Events.destroy({
    where: {}
  }).then(function () {

  })
}

describe('API/events status and response', function () {
  let createdId
  let dummyData = [
    'Hacktiv8 Campus Hunt',
    'Find an instructor whose nickname Spiderman',
    'Campus Hacktiv8, Pondok Indah, Jak-Sel',
    300,
    'Pizza Hut Treasure Hunt',
    'Find all you can eat vouchers',
    'Pizza Hut, Mall Pondok Indah, Jak-Sel',
    150
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

  describe('POST /api/events', function () {
    it('return 200 <= status < 400, an object, and res.body.title should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/api/events')
        .send({
          title: dummyData[0],
          description: dummyData[1],
          date: new Date(),
          place: dummyData[2],
          eventScore: dummyData[3]
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.title.should.equal(dummyData[0])
          done()
        })
    })
  })

  describe('GET /api/events', function () {
    it('return 200 <= status < 400, an object, and res.body[0].description should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/api/events')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].description.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('PUT /api/events/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.place should equal dummyData[6]', function (done) {
      chai.request(url)
        .put(`/api/events/${createdId}`)
        .send({
          title: dummyData[4],
          description: dummyData[5],
          place: dummyData[6],
          eventScore: dummyData[7]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.place.should.equal(dummyData[6])
          done()
        })
    })
  })

  describe('DELETE /api/events/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/events/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted event with ID: ${createdId}`})
          done()
        })
    })
  })
})
