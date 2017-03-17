const models = require('../models')

module.exports = {
  getEvents: (req, res) => {
    models.Events.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getEvent: (req, res) => {
    models.Events.findById(req.params.id).then(function (data) {
      res.send(data)
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
      geolocation: req.body.geolocation,
      score: req.body.score,
      complete: req.body.complete
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteEvent: (req, res) => {
    models.Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if(data) {
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
    models.Events.findById(req.params.id).then(function (event) {
      event.update({
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        place: req.body.place,
        geolocation: req.body.geolocation,
        score: req.body.score,
        complete: req.body.complete
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
