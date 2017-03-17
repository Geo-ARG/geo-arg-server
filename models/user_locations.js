'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Locations = sequelize.define('User_Locations', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        User_Locations.belongsTo(models.Users);
        User_Locations.belongsTo(models.Locations);
      }
    }
  });
  return User_Locations;
};
