'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: 'Schedule Default Interval',
          name: 'defaultScheduleInterval',
          value: '10',
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
