'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('BookingCancelReason'),
      queryInterface.dropTable('BookingHistory'),
      queryInterface.dropTable('BookingLocations'),
      queryInterface.dropTable('BookingPromoCode'),
      queryInterface.dropTable('CancelReason'),
      queryInterface.dropTable('FailedTransactionHistory'),
      queryInterface.dropTable('Location'),
      queryInterface.dropTable('Payout'),
      queryInterface.dropTable('Pricing'),
      queryInterface.dropTable('PromoCode'),
      queryInterface.dropTable('Reviews'),
      queryInterface.dropTable('ThreadItems'),
      queryInterface.dropTable('Threads'),
      queryInterface.dropTable('TransactionHistory'),
      queryInterface.dropTable('UserProfile'),
      queryInterface.dropTable('EmailToken'),
      queryInterface.dropTable('UserVerifiedInfo'),
      queryInterface.dropTable('Vehicles'),
      queryInterface.dropTable('UserLogin'),
      queryInterface.dropTable('User'),
      queryInterface.dropTable('Category'),
      queryInterface.removeColumn('Currencies', 'isPayment'),
      queryInterface.dropTable('Booking')
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([]);
  }
};