'use strict';
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    place: DataTypes.STRING,
    geolocation: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Events.hasMany(models.Quests),
        Events.belongsToMany(models.Users, { through: models.User_Events })
      }
    }
  });
  return Events;
};
