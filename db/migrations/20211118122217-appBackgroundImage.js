'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('HomePage', [
        {
          title: "safety Grid Image4",
          name: "safetyGridImage4",
          value: "jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "signup Grid Image4",
          name: "signupGridImage4",
          value: "jpg",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};
