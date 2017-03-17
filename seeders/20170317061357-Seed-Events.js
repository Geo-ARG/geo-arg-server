'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Event', [
      {
        eventTitle: 'Hacktiv8 Campus Hunt',
        description: 'Find an instructor whose nickname Spiderman',
        date: new Date(),
        location: 'Campus Hacktiv8, Pondok Indah, Jak-Sel',
        rewards: '300 pts',
        userId: 1
      },
      {
        eventTitle: 'Hacktiv8 Campus Hunt',
        description: 'Find an instructor whose nickname Spiderman',
        date: new Date(),
        location: 'Campus Hacktiv8, Pondok Indah, Jak-Sel',
        rewards: '300 pts',
        userId: 1
      }
    ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
