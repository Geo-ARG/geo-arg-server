'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Events = sequelize.define('User_Events', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User_Events;
};