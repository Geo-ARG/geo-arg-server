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

router.get('/auth/users', middleware.verifyLogin, userController.getUsers)

router.get('/auth/users/:id', middleware.verifyLogin, userController.getUser)

router.post('/auth/users', userController.createUser)

router.put('/auth/users/:id', middleware.verifyLogin, userController.updateUser)

router.delete('/auth/users/:id', middleware.verifyLogin, userController.deleteUser)

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

router.get('/api/events', middleware.verifyLogin, eventController.getEvents)

router.get('/api/events/:id', middleware.verifyLogin, eventController.getEvent)

router.post('/api/events', middleware.verifyLogin, eventController.createEvent)

router.put('/api/events/:id', middleware.verifyLogin, eventController.updateEvent)

router.delete('/api/events/:id', middleware.verifyLogin, eventController.deleteEvent)

// ==== Location ====

router.get('/api/locations', middleware.verifyLogin, locationController.getLocations)

router.post('/api/locations/scan', middleware.verifyLogin, locationController.getLocation)

router.post('/api/locations', middleware.verifyLogin, locationController.createLocation)

router.put('/api/locations/:id', middleware.verifyLogin, locationController.updateLocation)

router.delete('/api/locations/:id', middleware.verifyLogin, locationController.deleteLocation)

// ==== Quest ====

router.get('/api/quests', middleware.verifyLogin, questController.getQuests)

router.get('/api/quests/:id', middleware.verifyLogin, questController.getQuest)

router.post('/api/quests', middleware.verifyLogin, questController.createQuest)

router.put('/api/quests/:id', middleware.verifyLogin, questController.updateQuest)

router.delete('/api/quests/:id', middleware.verifyLogin, questController.deleteQuest)

router.delete('/api/quests/event/:id', middleware.verifyLogin, questController.deleteQuestByEventId)

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

router.get('/admins', middleware.verifyLogin, adminController.getAdmins)

router.get('/admins/:id', middleware.verifyLogin, adminController.getAdmin)

router.post('/admins', adminController.createAdmin)

router.put('/admins/:id', middleware.verifyLogin, adminController.updateAdmin)

router.delete('/admins/:id', middleware.verifyLogin, adminController.deleteAdmin)

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFvYUBhb2EuY29tIiwiaWF0IjoxNDkwMTAxNjUyfQ.Yvlx4IvO6IqOQNoA4h3rBXhCKkiPolt59zUQ57HrI4M
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksImlhdCI6MTQ5MDEwMzM1OH0.L6oaItOqc-JJ0UUn7idWqEOQCKdLWdziAKq4fvvBR5U
module.exports = router;
