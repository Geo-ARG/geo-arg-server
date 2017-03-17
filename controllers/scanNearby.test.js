const chai = require('chai');
const expect = chai.expect
const chaiHTTP = require('chai-http')
const url = 'http://localhost:3000'
chai.use(chaiHTTP)

function success (status) {
  if (status >= 200 && status < 300 || status === 304) {
    return status
  } else {
    return '500 or 404'
  }
}

describe('Scan Nearby User', function() {
  it('expect to return nearby username and userid', function(done){
    chai.request(url)
      .get('/api/scan')
      .end(function (err, res) {
        expect(res).to.have.status(success(res.status))
        expect(res.body).be.an('array')
        done()
      })
  })
})
