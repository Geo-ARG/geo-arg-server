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

  describe('GET /api', function () {
    it('should return /api endpoints', function (done) {
      chai.request(url)
        .get('/api')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/api/event',
            '/api/event/:id',
            '/api/location',
            '/api/location/scan',
            '/api/location/scan/:id',
            '/api/verification'
          ])
          done()
        })
    })
  })
})
