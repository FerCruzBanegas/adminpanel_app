'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('PrivilegesLink', [
        {
          privilegeId: 1,
          url: '/siteadmin/settings/site',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 1,
          url: '/siteadmin/settings/mobile-app',
          createdAt: new Date(),
          updatedAt: new Date()
        }, {
          privilegeId: 2,
          url: '/siteadmin/homepage/banner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          url: '/siteadmin/homepage/category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          url: '/siteadmin/homepage/topfeature',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          url: '/siteadmin/homepage/user',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          url: '/siteadmin/homepage/partner',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 2,
          url: '/siteadmin/homepage/footer',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 3,
          url: '/siteadmin/users',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 4,
          url: '/siteadmin/partners',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 5,
          url: '/siteadmin/category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 6,
          url: '/siteadmin/sub-category',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 7,
          url: '/siteadmin/location',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 7,
          url: '/siteadmin/add-location',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 7,
          url: '/siteadmin/edit-location',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 8,
          url: '/siteadmin/pricing/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 9,
          url: '/siteadmin/jobs',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 9,
          url: '/siteadmin/completed-jobs',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 9,
          url: '/siteadmin/cancelled-jobs',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 10,
          url: '/siteadmin/tracking',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 10,
          url: '/siteadmin/tracking',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 11,
          url: '/siteadmin/ratings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 12,
          url: '/siteadmin/promo-code/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 13,
          url: '/siteadmin/notifications',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 14,
          url: '/siteadmin/cancel-reasons',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          url: '/siteadmin/payout',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 15,
          url: '/siteadmin/failed-payout/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 16,
          url: '/siteadmin/staticpage/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 17,
          url: '/siteadmin/contentpage/',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          privilegeId: 18,
          url: '/siteadmin/precaution-notification',
          createdAt: new Date(),
          updatedAt: new Date()
        },

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