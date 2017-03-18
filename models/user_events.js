'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Events = sequelize.define('User_Events', {
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    completion: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User_Events;
};