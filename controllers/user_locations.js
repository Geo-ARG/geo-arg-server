const models = require('../models')

module.exports = {
  getUserLocations: (req, res) => {
    models.User_Locations.findAll().then(function (userlocation) {
      res.send(userlocation)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserLocation: (req, res) => {
    models.User_Locations.findById(req.params.id).then(function (userlocation) {
      res.send(userlocation)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUserLocation: (req, res) => {
    models.User_Locations.create({
      UserId: req.body.UserId,
      LocationId: req.body.LocationId
    }).then(function (userlocation) {
      res.send(userlocation)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserLocation: (req, res) => {
    models.User_Locations.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (userlocation) {
      if(userlocation) {
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
        UserId: req.body.UserId,
        LocationId: req.body.LocationId
      }).then(function (userlocation) {
        res.send(userlocation)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
