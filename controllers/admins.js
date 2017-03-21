const models = require('../models')

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
    models.Admins.create({
      email: req.body.email,
      password: req.body.password
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
      if (admin) {
        res.status(200).json({message: `Deleted admin with ID: ${req.params.id}`})
      } else {
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
        password: req.body.password
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
