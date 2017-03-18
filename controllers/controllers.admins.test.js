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

  describe('GET /admins', function () {
    it('should return /admin endpoints', function (done) {
      chai.request(url)
        .get('/admins')
        .end(function (err, res) {
          res.should.have.status(success(res.status))
          res.should.be.an('object')
          res.body.endpoints.should.deep.equal([
            '/admins',
            '/admins/:id'
          ])
          done()
        })
    })
  })
})
