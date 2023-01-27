'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesLink', [
        {
          privilegeId: 9,
          url: '/siteadmin/schedule-jobs',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PrivilegesLink', {
      privilegeId: {
        ne: null
      }
    })
  }
};