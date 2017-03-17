'use strict';
module.exports = function(sequelize, DataTypes) {
  var Location = sequelize.define('Location', {
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Location.belongsTo(User)
      }
    }
  });
  return Location;
};
