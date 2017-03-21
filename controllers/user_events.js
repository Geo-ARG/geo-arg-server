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
      userevent.getUser().then(function (user) {
        userevent.getEvent().then(function (events) {
          userevent.getQuest().then(function (quest) {
            res.send({User_Events: userevent, Users: user, Events: events, Quests: quest})
          })
        })
      })
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEventByUserIdEventId: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Quests}
      ],
      where: {
        UserId: req.params.userid,
        EventId: req.params.eventid
      }
    }).then(function (questList) {
      res.send(questList)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getUserEventByCompletionAndTypePhoto: (req, res) => {
    models.User_Events.findAll({
      include: [
        {model: models.Users},
        {model: models.Events},
        {model: models.Quests}
      ],
      where: {
        completion: false
      }
    }).then(function (userevents) {
      res.send(userevents.filter(userevent => {
        return userevent.Quest.type === 'Photo'
      }))
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
      if (quests.length > 0) {
        quests.map((quest) => {
          models.User_Events.create({
            UserId: req.body.UserId,
            EventId: req.body.EventId,
            QuestId: quest.dataValues.id,
            userAnswer: '',
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
      } else {
        models.User_Events.create({
          UserId: req.body.UserId,
          EventId: req.body.EventId,
          QuestId: req.body.QuestId,
          userAnswer: '',
          completion: false
        }).then(function (userevents) {
          res.send(userevents)
        }).catch(function (err) {
          res.send(err)
        })
      }
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
      if (userevent) {
        res.status(200).json({message: `Deleted userEvent with ID: ${req.params.id}`})
      } else {
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
      if (userevent) {
        res.status(200).json({message: `Deleted userEvent with ID: ${req.params.id}`})
      } else {
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
        completion: req.body.completion,
        userAnswer: req.body.userAnswer
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  },
  updateUserEventByQuestVerification: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (userevent) {
      if (req.body.status) {
        userevent.update({
          completion: true
        }).then(function (data) {
          res.send(data)
        }).catch(function (err) {
          res.send(err)
        })
      } else {
        userevent.update({
          userAnswer: null
        }).then(function (data) {
          res.send(data)
        }).catch(function (err) {
          res.send(err)
        })
      }
    })
  },
  updateUserEventByUserAnswer: (req, res) => {
    models.User_Events.findById(req.params.id).then(function (userevent) {
      if (req.body.userAnswer === userevent.Quest.answerKey) {
        userevent.update({
          completion: true
        }).then(function (data) {
          res.send(data)
        }).catch(function (err) {
          res.send(err)
        })
      } else {
        userevent.update({
          completion: false
        }).then(function (data) {
          res.send(data)
        }).catch(function (err) {
          res.send(err)
        })
      }
    })
  }
}
