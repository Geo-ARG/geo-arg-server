'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.bulkInsert('Users', [
        { username: "user1", email: "user1@gmail.com", createdAt: Date.now(), updatedAt: Date.now() },
        { username: "user2", email: "user2@gmail.com", createdAt: Date.now(), updatedAt: Date.now() },
        { username: "user3", email: "user3@gmail.com", createdAt: Date.now(), updatedAt: Date.now() }
      ]),
      queryInterface.bulkInsert('Events', [
        {
          title: "Gotta catch'em All!",
          description: "Catch all pokemons.",
          date: Date.now(),
          place: "Pondok Indah Mall 2",
          eventScore: 300,
          geolocation: {
            type: 'Point',
            coordinates: [-6.2656401, 106.7807317],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          completion: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          title: "Gotta catch'em All!",
          description: "Catch all pokemons.",
          date: Date.now(),
          place: "Hacktiv8 Indonesia",
          eventScore: 300,
          geolocation: {
            type: 'Point',
            coordinates: [-6.2607134, 106.7794275],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          completion: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          title: "Gotta catch'em All!",
          description: "Catch all pokemons.",
          date: Date.now(),
          place: "Cilandak Town Square",
          eventScore: 300,
          geolocation: {
            type: 'Point',
            coordinates: [-6.2915772, 106.7974708],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          completion: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          title: "Gotta catch'em All!",
          description: "Catch all pokemons.",
          date: Date.now(),
          place: "Mal Taman Anggrek",
          eventScore: 300,
          geolocation: {
            type: 'Point',
            coordinates: [-6.1786686, 106.7899418],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          completion: false,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      ]),
      queryInterface.bulkInsert('Locations', [
        {
          geolocation: {
            type: 'Point',
            coordinates: [-6.1722221, 106.7877785],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          geolocation: {
            type: 'Point',
            coordinates: [-6.1856472, 106.7340838],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          geolocation: {
            type: 'Point',
            coordinates: [-6.2903085, 106.7891122],
            crs: { type: 'name', properties: { name: 'EPSG:4326'} }
          },
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      ]),
      queryInterface.bulkInsert('Quests', [
        { title: "Quest1", task: "Task1", EventId: 1, type: "Coordinate", answerKey: "-6.2656401, 106.7807317", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest2", task: "Task2", EventId: 1, type: "Text", answerKey: "Pikachu", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest3", task: "Task3", EventId: 1, type: "Photo", answerKey: "", verification: false, createdAt: Date.now(), updatedAt: Date.now() },

        { title: "Quest1", task: "Task1", EventId: 2, type: "Coordinate", answerKey: "-6.2607134, 106.7794275", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest2", task: "Task2", EventId: 2, type: "Text", answerKey: "Pikachu", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest3", task: "Task3", EventId: 2, type: "Photo", answerKey: "", verification: false, createdAt: Date.now(), updatedAt: Date.now() },

        { title: "Quest1", task: "Task1", EventId: 3, type: "Coordinate", answerKey: "-6.2915772, 106.7974708", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest2", task: "Task2", EventId: 3, type: "Text", answerKey: "Pikachu", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest3", task: "Task3", EventId: 3, type: "Photo", answerKey: "", verification: false, createdAt: Date.now(), updatedAt: Date.now() },

        { title: "Quest1", task: "Task1", EventId: 4, type: "Coordinate", answerKey: "-6.1786686, 106.7899418", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest2", task: "Task2", EventId: 4, type: "Text", answerKey: "Pikachu", verification: false, createdAt: Date.now(), updatedAt: Date.now() },
        { title: "Quest3", task: "Task3", EventId: 4, type: "Photo", answerKey: "", verification: false, createdAt: Date.now(), updatedAt: Date.now() }
      ]),
    ];
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
