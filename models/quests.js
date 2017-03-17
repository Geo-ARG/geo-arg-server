'use strict';
module.exports = function(sequelize, DataTypes) {
  var Quests = sequelize.define('Quests', {
    title: DataTypes.STRING,
    task: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    verification: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Quests.belongsTo(Events)
      }
    }
  });
  return Quests;
};
