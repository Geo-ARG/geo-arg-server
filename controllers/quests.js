const models = require('../models')

module.exports = {
  getQuests: (req, res) => {
    models.Quests.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getQuest: (req, res) => {
    models.Quests.findById(req.params.id).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createQuest: (req, res) => {
    models.Quests.create({
      title: req.body.title,
      task: req.body.task,
      eventId: req.body.eventId,
      verification: req.body.verification
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteQuest: (req, res) => {
    models.Quests.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      if(data) {
        res.status(200).json({message: `Deleted quest with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no quest with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateQuest: (req, res) => {
    models.Quests.findById(req.params.id).then(function (quest) {
      quest.update({
        title: req.body.title,
        task: req.body.task,
        eventId: req.body.eventId,
        verification: req.body.verification
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
