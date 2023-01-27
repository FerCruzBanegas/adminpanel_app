'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("update Privileges set name = 'Manage Service Providers' where name = 'Manage Providers';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
