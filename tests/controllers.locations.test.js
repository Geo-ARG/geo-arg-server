const chai = require('chai');
const expect = chai.expect
const should = chai.should()
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

describe('API/locations status and response', function() {
  let createdId
  let dummyData = [
    6.12345,
    106.4321,
    6.5432,
    106.1234,
    6.5439,
    106.1232,
    {
      "type": "Point",
      "coordinates": [
        6.12345,
        106.4321
      ]
    },
    {
      "type": "Point",
      "coordinates": [
        6.5432,
        106.1234
      ],
      "crs": {
        "type": "name",
        "properties": {
          "name": "EPSG:4326"
        }
      }
    }
  ]

  describe('POST /api/locations', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should be object geometry', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[0],
          longitude: dummyData[1],
        })
        .end(function (err, res) {
          createdId = res.body.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.geolocation.type.should.equal('Point')
          res.body.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
  })

  describe('GET /api/locations', function () {
    it('return 200 <= status < 400, an object, and res.body[0].geolocation should be geometry', function (done) {
      chai.request(url)
        .get('/api/locations')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body[0].geolocation.should.deep.equal(dummyData[6])
          done()
        })
    })
  })
  describe('POST /api/locations', function () {
    it('return 200 <= status < 400, an object, add new user faraway', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[2],
          longitude: dummyData[3],
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.geolocation.type.should.equal('Point')
          res.body.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
    it('return 200 <= status < 400, an object, add new user close', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[4],
          longitude: dummyData[5],
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.geolocation.type.should.equal('Point')
          res.body.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
  })

  describe('POST /api/locations/scan', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should be object geometry', function (done) {
      chai.request(url)
        .post('/api/locations/scan')
        .send({
          latitude: dummyData[4],
          longitude: dummyData[5],
        })
        .end(function (err, res) {
          console.log(res.body);
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.should.be.an('array')
          res.body[0].nearby.should.deep.equal(true)
          done()
        })
    })
  })

  describe('PUT /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should equal dummyData[6]', function (done) {
      chai.request(url)
        .put(`/api/locations/${createdId}`)
        .send({
          latitude: dummyData[2],
          longitude: dummyData[3],
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.geolocation.should.deep.equal(dummyData[7])
          done()
        })
    })
  })

  describe('DELETE /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/locations/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted location with ID: ${createdId}`})
          done()
        })
    })
  })
})
