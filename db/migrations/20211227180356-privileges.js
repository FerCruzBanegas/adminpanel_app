'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Privileges', [{
        name: 'Manage Site and Mobile App Settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Homepage Settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Users',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Providers',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Categories',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage SubCategories',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Location',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Fare',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Jobs',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Tracking',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Ratings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Promo Code',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Notifications',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Cancel Reason',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Payout',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage Static Content',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Manage CMS Pages',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Precaution Notification',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('names', {
      name: {
        ne: null
      }
    })
  }
};