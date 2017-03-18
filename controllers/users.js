const models = require('../models')

module.exports = {
  getUsers: (req, res) => {
    models.Users.findAll({
      include: [
        {model: models.Locations},
        {model: models.Events}
      ]
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUser: (req, res) => {
    models.Users.findById(req.params.id).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUser: (req, res) => {
    models.Users.create({
      username: req.body.username,
      email: req.body.email,
      totalScore: 0
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUser: (req, res) => {
    models.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if(data) {
        res.status(200).json({message: `Deleted user with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no user with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateUser: (req, res) => {
    models.Users.findById(req.params.id).then(function (user) {
      user.update({
        username: req.body.username,
        email: req.body.email,
        totalScore: req.body.totalScore
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
