'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: 'Maximum Emergency Contact',
          name: 'maximumEmergencyContact',
          value: '5',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
