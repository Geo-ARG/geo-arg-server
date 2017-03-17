var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const locationController = require('../controllers/locations')
const adminController = require('../controllers/events')

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
      '/api/event',
      '/api/event/:id',
      '/api/location',
      '/api/location/scan',
      '/api/location/scan/:id',
      '/api/verification'
    ]
  })
})

// Location

router.get('/api/location/scan', locationController.getLocations)

router.get('/api/location/scan/:id', locationController.getLocation)

router.post('/api/location', locationController.createLocation)

router.put('/api/location/:id', locationController.updateLocation)

router.delete('/api/location/:id', locationController.deleteLocation)

router.get('/api/event', adminController.getEvents)

router.get('/api/event/:id', adminController.getEvent)

router.get('/api/location/scan', userController.getUsers)

router.get('/api/location/scan/:id', userController.getUser)
//
// router.post('/api/location', userController.createLocation)
//
// router.post('/api/verification', userController.createVerification)


// ==== Admin ====

router.get('/admin', function (req, res, next) {
  res.send({
    endpoints: [
      '/admin/event',
      '/admin/event/:id'
    ]
  })
})

router.get('/admin/event', adminController.getEvents)

router.get('/admin/event/:id', adminController.getEvent)

router.post('/admin/event', adminController.createEvent)

router.put('/admin/event/:id', adminController.updateEvent)

router.delete('/admin/event/:id', adminController.deleteEvent)

module.exports = router;
