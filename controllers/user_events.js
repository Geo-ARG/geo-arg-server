const models = require('../models')

module.exports = {
  getUserEvents: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Users},
        {model: models.Events},
        {model: models.Quests}
      ]
    }).then(function (userevent) {
      res.send(userevent)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEvent: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (userevent) {
      res.send(userevent)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getImageList: (req, res) => {
    models.Quests.findAll({
      where: {
        type: 'Photo'
      }
    }).then(function (quests) {
      console.log(quests[1].dataValues);
    })
    models.User_Events.findById(req.params.id).then(function (userevent) {
      res.send(userevent)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createUserEvent: (req, res) => {
    models.Quests.findAll({
      where: {
        EventId: req.body.EventId
      }
    }).then(function (quests) {
      let arr = []
      quests.map((quest) => {
        models.User_Events.create({
          UserId: req.body.UserId,
          EventId: req.body.EventId,
          QuestId: quest.dataValues.id,
          completion: false
        }).then(function (userevents) {
          arr.push(userevents)
          if (arr.length === quests.length) {
            res.send(arr)
          }
        }).catch(function (err) {
          res.send(err)
        })
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserEvent: (req, res) => {
    models.User_Events.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (userevent) {
      if(userevent) {
        res.status(200).json({message: `Deleted userEvent with ID: ${req.params.id}`})
      }
      else {
        res.send(`There is no userEvent with such ID`)
      }
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteUserEventByEventId: (req, res) => {
    models.User_Events.destroy({
      where: {
        EventId: req.params.id
      }
    }).then(function (userevent) {
      if(userevent) {
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
    models.User_Events.findById(req.params.id).then(function (userevent) {
      userevent.update({
        UserId: req.body.UserId,
        EventId: req.body.EventId,
        QuestId: req.body.QuestId,
        completion: req.body.completion
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
