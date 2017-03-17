const models = require('../models')

module.exports = {
  getLocations: (req, res) => {
    models.Locations.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getLocation: (req, res) => {
    models.Locations.findById(req.params.id).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createLocation: (req, res) => {
    models.Locations.create({
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteLocation: (req, res) => {
    models.Locations.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if(data) {
        res.status(200).json({message: `Deleted location with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no location with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateLocation: (req, res) => {
    models.Locations.findById(req.params.id).then(function (location) {
      location.update({
        latitude: req.body.latitude,
        longitude: req.body.longitude
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
