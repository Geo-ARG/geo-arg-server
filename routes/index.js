var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const locationController = require('../controllers/locations')

/* GET home page. */
let dummy = {
  "id": 99,
  "quote": "ARG semangaatttt!"
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
      '/auth/users',
      '/auth/users/:id'
    ]
  })
})

router.get('/auth/users', userController.getUsers)

router.get('/auth/users/:id', userController.getUser)

router.post('/auth/users', userController.createUser)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

// ==== API ====

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/events',
      '/api/location',
      '/api/location/scan',
      '/api/verification'
    ]
  })
})

router.get('/api/location/scan', locationController.getLocations)

router.get('/api/location/scan/:id', locationController.getLocation)

router.post('/api/location', locationController.createLocation)

router.put('/api/location/:id', locationController.updateLocation)

router.delete('/api/location/:id', locationController.deleteLocation)

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
