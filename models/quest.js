'use strict';
module.exports = function(sequelize, DataTypes) {
  var Quest = sequelize.define('Quest', {
    questTitle: DataTypes.STRING,
    task: DataTypes.STRING,
    eventId: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Quest.belongsTo(Event)
      }
    }
  });
  return Quest;
};
