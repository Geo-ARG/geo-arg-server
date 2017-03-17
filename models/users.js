'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.User_Events);
        Users.hasMany(models.User_Locations);
        Users.belongsToMany(models.Events, { through: models.User_Events }),
        Users.belongsToMany(models.Locations, { through: models.User_Locations })
      }
    }
  });
  return Users;
};
