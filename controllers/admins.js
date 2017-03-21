const models = require('../models')
let jwt = require('jsonwebtoken')
let hash = require('password-hash')
let config = require('../config/secret.json')

module.exports = {
  getAdmins: (req, res) => {
    models.Admins.findAll().then(function (admin) {
      res.send(admin)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getAdmin: (req, res) => {
    models.Admins.findById(req.params.id).then(function (admin) {
      res.send(admin)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createAdmin: (req, res) => {
    let toLowerCaseEmail = req.body.email.toLowerCase()
    models.Admins.findOrCreate({
      where: {
        email: toLowerCaseEmail
      },
      defaults: {
        password: hash.generate(req.body.password)
      }
    }).then(function (admin) {
      res.send(admin)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteAdmin: (req, res) => {
    models.Admins.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (admin) {
      if(admin) {
        res.status(200).json({message: `Deleted admin with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no admin with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateAdmin: (req, res) => {
    models.Admins.findById(req.params.id).then(function (admin) {
      admin.update({
        email: req.body.email,
        password: hash.generate(req.body.password)
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  },
  verifyAdmin: (req, res) => {
    models.Admins.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (data) {
      if (hash.verify(req.body.password, data.password)) {
        let token = jwt.sign({id: data.id}, config.secret, {algorithm: 'HS256'}, {expiresIn: '1h'})
        res.send({
          token: token
        })
      } else {
        res.send({message: 'Authentication failed. Wrong password.'})
      }
    }).catch(function () {
      res.send({message: 'Authentication failed. Email not found.'})
    })
  }
}
