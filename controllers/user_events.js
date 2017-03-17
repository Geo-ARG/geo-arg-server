const models = require('../models')

module.exports = {
  getUserEvents: (req, res) => {
    models.User_Events.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEvent: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUserEvent: (req, res) => {
    models.User_Events.create({
      userId: req.body.userId,
      eventId: req.body.eventId
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserEvent: (req, res) => {
    models.User_Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if(data) {
        res.status(200).json({message: `Deleted userEvent with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no userEvent with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateUserEvent: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (user) {
      user.update({
        userId: req.body.userId,
        eventId: req.body.eventId
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
