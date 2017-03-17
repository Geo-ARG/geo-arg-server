'use strict';
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    place: DataTypes.STRING,
    geolocation: DataTypes.GEOMETRY,
    score: DataTypes.INTEGER,
    complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        Events.hasMany(models.Quests),
        Events.hasMany(models.User_Events);
        Events.belongsToMany(models.Users, { through: models.User_Events })
      }
    }
  });
  return Events;
};
