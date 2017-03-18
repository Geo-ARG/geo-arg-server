var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const locationController = require('../controllers/locations')
const eventController = require('../controllers/events')
const questController = require('../controllers/quests')
const userEventController = require('../controllers/user_events')
const userLocationController = require('../controllers/user_locations')

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
      '/api/quest/verification',
      '/api/quest',
      '/api/quest/:id',
    ]
  })
})

// ==== Location ====

router.get('/api/location/scan', locationController.getLocations)

router.post('/api/location/scan', locationController.getLocation)

router.post('/api/location', locationController.createLocation)

router.put('/api/location/:id', locationController.updateLocation)

router.delete('/api/location/:id', locationController.deleteLocation)

router.get('/api/event', eventController.getEvents)

router.get('/api/event/:id', eventController.getEvent)

router.get('/api/location/scan', userController.getUsers)

router.get('/api/location/scan/:id', userController.getUser)

router.get('/api/test', userController.getUser)

// router.post('/api/quest/verification', userController.createVerification)

// ==== Quest ====

router.get('/api/quest', questController.getQuests)

router.get('/api/quest/:id', questController.getQuest)

router.post('/api/quest', questController.createQuest)

router.put('/api/quest/:id', questController.updateQuest)

router.delete('/api/quest/:id', questController.deleteQuest)

// ==== User_Events ====

router.get('/api/userevent', userEventController.getUserEvents)

router.get('/api/userevent/:id', userEventController.getUserEvent)

router.post('/api/userevent', userEventController.createUserEvent)

router.put('/api/userevent/:id', userEventController.updateUserEvent)

router.delete('/api/userevent/:id', userEventController.deleteUserEvent)

// ==== User_Locations ====

router.get('/api/userlocation', userLocationController.getUserLocations)

router.get('/api/userlocation/:id', userLocationController.getUserLocation)

router.post('/api/userlocation', userLocationController.createUserLocation)

router.put('/api/userlocation/:id', userLocationController.updateUserLocation)

router.delete('/api/userlocation/:id', userLocationController.deleteUserLocation)

// ==== Event ====

router.get('/admin', function (req, res, next) {
  res.send({
    endpoints: [
      '/admin/event',
      '/admin/event/:id'
    ]
  })
})

router.get('/admin/event', eventController.getEvents)

router.get('/admin/event/:id', eventController.getEvent)

router.post('/admin/event', eventController.createEvent)

router.put('/admin/event/:id', eventController.updateEvent)

router.delete('/admin/event/:id', eventController.deleteEvent)

module.exports = router;
