'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    role: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(Location),
        User.hasMany(Event)
      }
    }
  });
  return User;
};
