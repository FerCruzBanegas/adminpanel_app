'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SmsMethods', [{
        name: 'Twilio',
        status: false,
        accountId: "",
        securityId: "",
        phoneNumber: "",
        phoneDialCode: "",
        phoneCountryCode: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SmsMethods', [{
        name: 'Nexmo',
        status: false,
        accountId: "",
        securityId: "",
        phoneNumber: "",
        phoneDialCode: "",
        phoneCountryCode: "",
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};