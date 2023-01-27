'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: 'Job',
          name: 'job',
          value: '1',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Duration',
          name: 'duration',
          value: '1',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Estimated Price',
          name: 'estimatedPrice',
          value: '1',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Job Description',
          name: 'description',
          value: '1',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Job Photo',
          name: 'photo',
          value: '1',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Job Location',
          name: 'location',
          value: '1',
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
