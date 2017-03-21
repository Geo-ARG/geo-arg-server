let config = require('../config/secret.json')
let jwt = require('jsonwebtoken')
module.exports = {
  verifyLogin: function (req, res, next) {
    if (req.headers.token == 'null') {
      res.json("Authentication failed, you aren't authorized .")
    } else {
      let decoded = jwt.decode(req.headers.token)
      console.log(decoded);
      if (decoded.hasOwnProperty('id')) {
        if (jwt.verify(req.headers.token, config.secret)) {
          next()
        } else {
          res.json('Authentication failed, wrong token or token is expired.')
        }
      } else if (decoded.hasOwnProperty('UserId')) {
        if (jwt.verify(req.headers.token, config.secret)) {
          next()
        } else {
          res.json('Authentication failed, wrong token or token is expired.')
        }
      }
    }
  }
}
