const chai = require('chai')
const should = chai.should()
const expect = chai.expect
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)

const url = 'http://geo-arg-server-dev.ap-southeast-1.elasticbeanstalk.com/'

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
  let dummyData = [
    'Hacktiv8 Campus Hunt',
    'Find an instructor whose nickname Spiderman',
    'Campus Hacktiv8, Pondok Indah, Jak-Sel',
    '300 pts',
    'Pizza Hut Treasure Hunt',
    'Find all you can eat vouchers',
    'Pizza Hut, Mall Pondok Indah, Jak-Sel',
    '150 pts'
  ]

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

  describe('POST /api/event', function () {
    it('return 200 <= status < 400, an object, and res.body.title should equal dummyData[0]', function (done) {
      chai.request(url)
        .post('/api/event')
        .send({
          title: dummyData[0],
          description: dummyData[1],
          date: new Date(),
          place: dummyData[2],
          score: dummyData[3],
          complete: false
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

  describe('GET /api/event/scan', function () {
    it('return 200 <= status < 400, an object, and res.body[0].description should equal dummyData[1]', function (done) {
      chai.request(url)
        .get('/api/event/scan')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].description.should.equal(dummyData[1])
          done()
        })
    })
  })

  describe('PUT /api/event/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.place should equal dummyData[6]', function (done) {
      chai.request(url)
        .put(`/api/event/${createdId}`)
        .send({
          title: dummyData[4],
          description: dummyData[5],
          place: dummyData[6],
          score: dummyData[7]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.place.should.equal(dummyData[6])
          done()
        })
    })
  })

  describe('DELETE /api/event/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/event/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted event with ID: ${createdId}`})
          done()
        })
    })
  })
})
