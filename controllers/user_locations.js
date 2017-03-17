const models = require('../models')

module.exports = {
  getUserLocations: (req, res) => {
    models.User_Locations.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserLocation: (req, res) => {
    models.User_Locations.findById(req.params.id).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUserLocation: (req, res) => {
    models.User_Locations.create({
      userId: req.body.userId,
      locationId: req.body.locationId
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserLocation: (req, res) => {
    models.User_Locations.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if(data) {
        res.status(200).json({message: `Deleted userLocation with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no userLocation with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateUserLocation: (req, res) => {
    models.User_Locations.findById(req.params.id).then(function (user) {
      user.update({
        userId: req.body.userId,
        locationId: req.body.locationId
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
