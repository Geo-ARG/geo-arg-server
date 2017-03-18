const models = require('../models')

module.exports = {
  getEvents: (req, res) => {
    models.Events.findAll({
      include: [
        {model: models.Quests},
        {model: models.Users}
      ]
    }).then(function (events) {
      res.send(events)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getEvent: (req, res) => {
    models.Events.findById(req.params.id).then(function (events) {
      res.send(events)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createEvent: (req, res) => {
    models.Events.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      place: req.body.place,
      eventScore: req.body.eventScore,
      geolocation: req.body.geolocation,
      completion: false
    }).then(function (events) {
      res.send(events)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteEvent: (req, res) => {
    models.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (events) {
      if(events) {
        res.status(200).json({message: `Deleted event with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no event with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateEvent: (req, res) => {
    models.Events.findById(req.params.id).then(function (events) {
      events.update({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        place: req.body.place,
        eventScore: req.body.eventScore,
        geolocation: req.body.geolocation,
        completion: req.body.complete
      }).then(function (events) {
        res.send(events)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
