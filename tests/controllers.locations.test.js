const chai = require('chai');
const models = require('../models')
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

function deleteData() {
  return models.Locations.destroy({
    where: {}
  }).then(function () {

  })
}

describe('API/locations status and response', function() {
  let createdId, dummyId1, dummyId2, dummyId3, dummyId4, dummyId5
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
    },
    1
  ]

  deleteData()

  describe('POST /api/locations', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should be an object geometry', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[0],
          longitude: dummyData[1],
          UserId: dummyData[8]
        })
        .end(function (err, res) {
          createdId = res.body.Locations.id
          dummyId3 = res.body.User_Locations.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.Locations.geolocation.type.should.equal('Point')
          res.body.Locations.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
  })

  describe('GET /api/locations', function () {
    it('return 200 <= status < 400, an object, and res.body[0].geolocation should deep equal dummyData[6]', function (done) {
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
    it('return 200 <= status < 400, an object, should add new user whose location is far', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[2],
          longitude: dummyData[3],
          UserId: dummyData[8]
        })
        .end(function (err, res) {
          dummyId1 = res.body.Locations.id
          dummyId4 = res.body.User_Locations.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.Locations.geolocation.type.should.equal('Point')
          res.body.Locations.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
    it('return 200 <= status < 400, an object, should add new user whose location is nearby', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[4],
          longitude: dummyData[5],
          UserId: dummyData[8]
        })
        .end(function (err, res) {
          dummyId2 = res.body.Locations.id
          dummyId5 = res.body.User_Locations.id
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.Locations.geolocation.type.should.equal('Point')
          res.body.Locations.geolocation.coordinates.should.be.an('array')
          done()
        })
    })
  })

  describe('POST /api/locations/scan', function () {
    it('return 200 <= status < 400, an object, and res.body[0].nearby should deep equal true', function (done) {
      chai.request(url)
        .post('/api/locations/scan')
        .send({
          latitude: dummyData[4],
          longitude: dummyData[5]
        })
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.should.be.an('array')
          res.body[0].nearby.should.deep.equal(true)
          done()
        })
    })
  })

  describe('PUT /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should deep equal dummyData[7]', function (done) {
      chai.request(url)
        .put(`/api/locations/${createdId}`)
        .send({
          latitude: dummyData[2],
          longitude: dummyData[3]
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
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/locations/${dummyId1}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted location with ID: ${dummyId1}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/locations/${dummyId2}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted location with ID: ${dummyId2}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${dummyId3}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${dummyId3}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${dummyId4}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${dummyId4}`})
          done()
        })
    })
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/userlocations/${dummyId5}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted userLocation with ID: ${dummyId5}`})
          done()
        })
    })
  })
})
