'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Events = sequelize.define('User_Events', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User_Events.belongsTo(models.Users);
        User_Events.belongsTo(models.Events);
      }
    }
  });
  return User_Events;
};
