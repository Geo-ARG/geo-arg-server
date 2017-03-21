var express = require('express');
var router = express.Router();
const userController = require('../controllers/users')
const adminController = require('../controllers/admins')
const locationController = require('../controllers/locations')
const eventController = require('../controllers/events')
const questController = require('../controllers/quests')
const userEventController = require('../controllers/user_events')
const userLocationController = require('../controllers/user_locations')
const middleware = require('../middlewares/auth')

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
      '/api/events/:id',
      '/api/locations',
      '/api/locations/:id',
      '/api/quests',
      '/api/quests/:id',
      '/api/userevents',
      '/api/userevents/:id',
      '/api/userlocations',
      '/api/userlocations/:id'
    ]
  })
})

// ==== Event ====

router.get('/api/events', eventController.getEvents)

router.get('/api/events/:id', eventController.getEvent)

router.post('/api/events', eventController.createEvent)

router.put('/api/events/:id', eventController.updateEvent)

router.delete('/api/events/:id', eventController.deleteEvent)

// ==== Location ====

router.get('/api/locations', locationController.getLocations)

router.post('/api/locations/scan', locationController.getLocation)

router.post('/api/locations', locationController.createLocation)

router.put('/api/locations/:id', locationController.updateLocation)

router.delete('/api/locations/:id', locationController.deleteLocation)

// ==== Quest ====

router.get('/api/quests', questController.getQuests)

router.get('/api/quests/:id', questController.getQuest)

router.post('/api/quests', questController.createQuest)

router.put('/api/quests/:id', questController.updateQuest)

router.delete('/api/quests/:id', questController.deleteQuest)

router.delete('/api/quests/event/:id', questController.deleteQuestByEventId)

// ==== User_Events ====

router.get('/api/userevents', userEventController.getUserEvents)

router.get('/api/userevents/:id', userEventController.getUserEvent)

router.get('/api/userevents/user/:userid/event/:eventid', userEventController.getUserEventByUserIdEventId)

router.get('/api/userevents/quests/photo', userEventController.getUserEventByCompletionAndTypePhoto)

router.post('/api/userevents', userEventController.createUserEvent)

router.put('/api/userevents/:id', userEventController.updateUserEvent)

router.put('/api/userevents/:id/quests/verification', userEventController.updateUserEventByQuestVerification)

router.put('/api/userevents/:id/quests/useranswer', userEventController.updateUserEventByUserAnswer)

router.delete('/api/userevents/:id', userEventController.deleteUserEvent)

router.delete('/api/userevents/event/:id', userEventController.deleteUserEventByEventId)


// ==== User_Locations ====

router.get('/api/userlocations', userLocationController.getUserLocations)

router.get('/api/userlocations/:id', userLocationController.getUserLocation)

router.post('/api/userlocations', userLocationController.createUserLocation)

router.put('/api/userlocations/:id', userLocationController.updateUserLocation)

router.delete('/api/userlocations/:id', userLocationController.deleteUserLocation)

// ==== Admin ====

router.post('/admins/login', adminController.verifyAdmin)

router.get('/admins', adminController.getAdmins)

router.get('/admins/:id', adminController.getAdmin)

router.post('/admins', adminController.createAdmin)

router.put('/admins/:id', adminController.updateAdmin)

router.delete('/admins/:id', adminController.deleteAdmin)

module.exports = router;
