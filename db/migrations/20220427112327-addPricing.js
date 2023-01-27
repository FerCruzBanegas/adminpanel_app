'use strict';

module.exports = {

  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('OrderItems', 'pricingId', {
        type: Sequelize.INTEGER,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
