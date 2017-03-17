'use strict';
module.exports = function(sequelize, DataTypes) {
  var Locations = sequelize.define('Locations', {
    geolocation: DataTypes.GEOMETRY
  }, {
    classMethods: {
      associate: function(models) {
        Locations.belongsToMany(models.Users, { through: models.User_Locations })
      }
    }
  });
  return Locations;
};
