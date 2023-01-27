'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('StaticPage', [
        {
          pageName: "Legal",
          content: "",
          metaTitle: "Legal",
          metaDescription: "Legal",
          createdAt: new Date(),
          updatedAt: new Date(),
          pageBanner: null
        }
      ]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
