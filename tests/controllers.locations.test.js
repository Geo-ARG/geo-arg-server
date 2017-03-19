const chai = require('chai');
const expect = chai.expect
const chaiHTTP = require('chai-http')
const url = 'http://localhost:3000'
chai.use(chaiHTTP)

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
    '06.12345',
    '106.4321',
    1,
    '06.5432',
    '106.1234',
    2,
    '06.5455',
    '106.1222',
    3,
    {
      "type": "Point",
      "coordinates": [
        06.12345,
        106.4321
      ]
    },
    {
      "type": "Point",
      "coordinates": [
        06.5432,
        106.1234
      ]
    }
  ]
  describe('POST /api/locations/scan', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should be object geometry', function (done) {
      chai.request(url)
        .post('/api/locations')
        .send({
          latitude: dummyData[0],
          longitude: dummyData[1],
          userId: dummyData[2]
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
          res.body[0].geolocation.should.equal(dummyData[9])
          done()
        })
    })
  })

  describe('PUT /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body.geolocation should equal dummyData[6]', function (done) {
      chai.request(url)
        .put(`/api/locations/${createdId}`)
        .send({
          id: dummyData[4],
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

  describe('DELETE /api/locations/:id', function () {
    it('return 200 <= status < 400, an object, and res.body should return message', function (done) {
      chai.request(url)
        .delete(`/api/locations/${createdId}`)
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.body.should.be.an('object')
          res.body.should.deep.equal({message: `Deleted event with ID: ${createdId}`})
          done()
        })
    })
  })
})
