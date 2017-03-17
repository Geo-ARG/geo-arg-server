const models = require('../models')
const sequelize = require('sequelize')

module.exports = {
  getLocations: (req, res) => {
    models.Locations.findAll({
      include: [
        {model: models.User_Locations},
        {model: models.Users},
      ]
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getLocation: (req, res) => {
    models.Locations.findAll({
      attributes: [
        sequelize.fn('ST_DWithin',
        sequelize.col('geolocation'),
        sequelize.literal(`ST_Point(6.23242, 106.12312)::geography`),
        1000)]
    // models.query("SELECT * FROM 'Locations' WHERE ST_DWithin('geolocation', ST_Point(6.23242, 106.12312)::geography, 10000);").spread(function(results, metadata) {
    //   console.log(results);
    //   console.log(metadata);
    }).then(function(filter) {
      console.log(filter);
      res.send(filter)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createLocation: (req, res) => {
    var point = {
      type: 'Point',
      coordinates: [+req.body.longitude, +req.body.latitude],
      crs: { type: 'name', properties: { name: 'EPSG:4326'} }
    };
    models.Locations.create({
      geolocation: point,
      userId: req.body.userId
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
    var point = {
      type: 'Point',
      coordinates: [+req.body.longitude, +req.body.latitude],
      crs: { type: 'name', properties: { name: 'EPSG:4326'} }
    };
    models.Locations.findById(req.params.id).then(function (location) {
      location.update({
        geolocation: point
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
