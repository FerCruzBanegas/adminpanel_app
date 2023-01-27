'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: 'Request Timer Tone',
          name: 'requestTimeTone',
          value: null,
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Request Timer Tone Use',
          name: 'isRequestTimerToneEnable',
          value: null,
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Open App on  Request',
          name: 'openAppOnRequest',
          value: null,
          type: 'appSettings',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Timer Tone File',
          name: 'requestToneFile',
          value: null,
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
