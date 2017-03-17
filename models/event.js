'use strict';
module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    eventTitle: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    rewards: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Event.belongsTo(User),
        Event.hasMany(Quest)
      }
    }
  });
  return Event;
};
