'use strict';
module.exports = function(sequelize, DataTypes) {
  var User_Locations = sequelize.define('User_Locations', {
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return User_Locations;
};
