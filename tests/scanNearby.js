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

describe('Scan Nearby User', function() {
  it('expect to return nearby username and userid', function(done){
    chai.request(url)
      .get('/api/scan')
      .end(function (err, res) {
        expect(res).to.have.status(success(res.status))
        expect(res.body).be.an('array')
        expect(res.body.nearby).to.include.keys('user');
        done()
      })
  })
})
