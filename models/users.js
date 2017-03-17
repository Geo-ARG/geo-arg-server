'use strict';
module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Users.belongsToMany(Events, { through: User_Events }),
        Users.belongsToMany(Locations, { through: User_Locations })
      }
    }
  });
  return Users;
};
