'use strict';
module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define('Events', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.DATE,
    place: DataTypes.STRING,
    geolocation: DataTypes.GEOMETRY,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Events.hasMany(Quests),
        Events.belongsToMany(Users, { through: User_Events })
      }
    }
  });
  return Events;
};
