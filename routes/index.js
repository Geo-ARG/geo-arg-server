var express = require('express');
var router = express.Router();
// const userController = require('../controllers/users')

/* GET home page. */
let dummy = {
  "id": 99,
  "quote" "ARG semangaatttt!"
}

router.get('/', function(req, res, next) {
  res.send(dummy);
});

// ==== Auth ====

router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/google',
      '/auth/facebook',
      '/auth/users/:id'
    ]
  })
})

// ==== API ====

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/events',
      '/api/scan',
      '/api/location',
      '/api/verification'
    ]
  })
})

// router.get('/api/events', userController.getEvents)
//
// router.get('/api/scan', userController.getUsers)
//
// router.post('/api/location', userController.createLocation)
//
// router.post('/api/verification', userController.createVerification)


// ==== Admin ====

router.get('/admin', function (req, res, next) {
  res.send({
    endpoints: [
      '/admin/events',
      '/admin/events/:id'
    ]
  })
})


module.exports = router;
