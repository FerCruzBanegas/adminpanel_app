'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query("update SiteSettings set title = 'User Android Version', name='userAndroidVersion' where name = 'riderAndroidVersion';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Partner Android Version', name='partnerAndroidVersion' where name = 'driverAndroidVersion';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'User iOS Version', name='userIosVersion' where name = 'riderIosVersion';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Partner iOS Version', name='partnerIosVersion' where name = 'driverIosVersion';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Maximum Allowable distance', name='allowableDistace' where name = 'preferredDistanceType';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Maximum Allowed Services for booking', name='allowedServices' where name = 'multipleStopsWaitingTime';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Job request notification Interval', name='notificationInterval' where name = 'distance';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Maximum Allowed Services for booking', name='allowedServices' where name = 'multipleStopsWaitingTime';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Partner iOS App'  where name = 'sleepPartnerios';"),
      queryInterface.sequelize.query("update SiteSettings set title = 'Partner Android App'  where name = 'sleepPartnerAndroid';"),
      queryInterface.sequelize.query("delete from SiteSettings where name ='duration';"),
      queryInterface.sequelize.query("delete from SiteSettings where name ='estimatedPrice';"),
      queryInterface.sequelize.query("delete from SiteSettings where name ='pickupLocation';"),
      queryInterface.sequelize.query("delete from SiteSettings where name ='destinationLocation';"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
