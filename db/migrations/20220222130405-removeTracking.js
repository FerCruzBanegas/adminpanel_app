'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("delete from Privileges where name = 'Manage Tracking';"),
      queryInterface.sequelize.query("delete from PrivilegesLink where url = '/siteadmin/tracking';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
