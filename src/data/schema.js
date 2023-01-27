import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

// Query
import news from './queries/news';
import intl from './queries/intl';
import adminUserLogin from './queries/siteadmin/adminUserLogin';
import adminUserLogout from './queries/siteadmin/adminUserLogout'
import getAllUsers from './queries/siteadmin/User/getAllUsers';
import getAllCategory from './queries/siteadmin/Category/getAllCategory';
import getAllBookings from './queries/siteadmin/Bookings/getAllBookings';
import viewBookingDetails from './queries/siteadmin/Bookings/viewBookingDetails';
import getCurrencies from './queries/currency/getCurrencies';
import getCurrencyRates from './queries/currency/getCurrencyRates';
import getUser from './queries/siteadmin/User/getUser';
import getCategory from './queries/siteadmin/Category/getCategory';
import getCategories from './queries/siteadmin/Category/getCategories';
import getCountries from './queries/siteadmin/getCountries';
import getDashboardCount from './queries/siteadmin/getDashboardCount';
import getActiveCategories from './queries/siteadmin/Category/getActiveCategories';
import getPromoCode from './queries/siteadmin/PromoCode/getPromoCode';
import getAllPromoCode from './queries/siteadmin/PromoCode/getAllPromoCode';
import getSiteSettings from './queries/siteadmin/getSiteSettings';
import getCompletedBookings from './queries/siteadmin/Bookings/getCompletedBookings';
import getCancelledBookings from './queries/siteadmin/Bookings/getCancelledBookings';
import getCurrency from './queries/siteadmin/getCurrency';
import getBaseCurrency from './queries/siteadmin/getBaseCurrency';
import getCancelReasons from './queries/siteadmin/CancelReason/getCancelReasons';
import getReviews from './queries/siteadmin/getReviews';
import getAllCancelReason from './queries/siteadmin/CancelReason/getAllCancelReason';
import getCancelReason from './queries/siteadmin/CancelReason/getCancelReason';
import getPayoutList from './queries/siteadmin/AutoPayout/getPayoutList';
import getAllHomePageSettings from './queries/siteadmin/getAllHomePageSettings';
import getFailedPayoutList from './queries/siteadmin/AutoPayout/getFailedPayoutList';
import getEditStaticPage from './queries/siteadmin/getEditStaticPage';
import getMapViewData from './queries/siteadmin/Tracking/getMapViewData';
import getHeatMapData from './queries/siteadmin/Tracking/getHeatMapData';
import getAllHomePageCategorySettings from './queries/siteadmin/getAllHomePageCategorySettings';
import getEmailLogo from './queries/siteadmin/getEmailLogo';


// Mutations
import addAdminUser from './mutations/siteadmin/addAdminUser';
import addCategory from './mutations/siteadmin/Category/addCategory';
import updateUser from './mutations/siteadmin/Users/updateUser';
import updatePartner from './mutations/siteadmin/Users/updatePartner';
import uploadProfileImage from './mutations/siteadmin/Users/uploadProfileImage';
import deleteUser from './mutations/siteadmin/Users/deleteUser';
import addPromoCode from './mutations/siteadmin/PromoCode/addPromoCode';
import deletePromoCode from './mutations/siteadmin/PromoCode/deletePromoCode';
import updatePromoCode from './mutations/siteadmin/PromoCode/updatePromoCode';
import updateCurrency from './mutations/siteadmin/Currency/updateCurrency';
import setBaseCurrency from './mutations/siteadmin/Currency/setBaseCurrency';
import allowPaymentCurrency from './mutations/siteadmin/Currency/allowPaymentCurrency';
import updateSiteSettings from './mutations/siteadmin/updateSiteSettings';
import changeAdminUser from './mutations/siteadmin/changeAdminUser';
import updateHomePageHome from './mutations/siteadmin/updateHomePageHome';
import updateHomePageCity from './mutations/siteadmin/updateHomePageCity';
import updateHomePageSafety from './mutations/siteadmin/updateHomePageSafety';
import updateHomePageSignup from './mutations/siteadmin/updateHomePageSignup';
import updateHomePageFooter from './mutations/siteadmin/updateHomePageFooter';
import updateCancelReason from './mutations/siteadmin/CancelReason/updateCancelReason';
import removeCancelReason from './mutations/siteadmin/CancelReason/removeCancelReason';
import siteSettings from './mutations/siteadmin/siteSettings';
import addLocation from './mutations/siteadmin/ManageLocation/addLocation';
import getLocationList from './queries/siteadmin/Location/getLocationList';
import getLocation from './queries/siteadmin/Location/getLocation';
import updateLocation from './mutations/siteadmin/ManageLocation/updateLocation';
import updatePayout from './mutations/siteadmin/AutoPayout/updatePayout';
import deleteLocation from './mutations/siteadmin/ManageLocation/deleteLocation';
import updateStaticPage from './mutations/siteadmin/updateStaticPage';
import updateCategoryStatus from './mutations/siteadmin/Category/updateCategoryStatus';
import deleteCategory from './mutations/siteadmin/Category/deleteCategory';
import updateHomePageCategory from './mutations/siteadmin/updateHomePageCategory';
import uploadIdentityImage from './mutations/siteadmin/Users/uploadIdentityImage';
import removeExperienceDocument from './mutations/siteadmin/Users/removeExperienceDocument';

import addSubCategory from './mutations/siteadmin/SubCategory/addSubCategory';
import updateSubCategoryStatus from './mutations/siteadmin/SubCategory/updateSubCategoryStatus';
import deleteSubCategory from './mutations/siteadmin/SubCategory/deleteSubCategory';
import getActiveSubCategories from './queries/siteadmin/SubCategory/getActiveSubCategories';

// Location
import getAllLocation from './queries/siteadmin/Location/getAllLocation';

// Fare
import addUpdatePricing from './mutations/siteadmin/Pricing/addUpdatePricing';
import getPricing from './queries/siteadmin/Pricing/getPricing';
import getAllPricing from './queries/siteadmin/Pricing/getAllPricing';
import deletePricing from './mutations/siteadmin/Pricing/deletePricing';
import updatePricingStatus from './mutations/siteadmin/Pricing/updatePricingStatus';

//ContentPage
import updateContentPageDetails from './mutations/siteadmin/ContentPage/updateContentPageDetails';
import addContentPageDetails from './mutations/siteadmin/ContentPage/addContentPageDetails';
import getContentPageDetails from './queries/siteadmin/getContentPageDetails';
import getContentPage from './queries/siteadmin/getContentPage';
import getContentPageById from './queries/siteadmin/getContentPageById';
import deleteContentPage from './mutations/siteadmin/ContentPage/deleteContentPage';
import updateContentPageStatus from './mutations/siteadmin/ContentPage/updateContentPageStatus';
//TempImages
import updateTempImages from './mutations/siteadmin/TempImages/updateTempImages';

//Payout
import updateCashPayout from './mutations/siteadmin/AutoPayout/updateCashPayout';

// Admin Roles
import createAdminRole from './mutations/siteadmin/AdminRoles/createAdminRole';
import getAllAdminRoles from './queries/siteadmin/AdminRoles/getAllAdminRoles';
import deleteAdminRole from './mutations/siteadmin/AdminRoles/deleteAdminRole';

// Admin Users
import getAllAdminUsers from './queries/siteadmin/AdminUser/getAllAdminUsers';
import createAdminUser from './mutations/siteadmin/AdminUser/createAdminUser';
import deleteAdminUser from './mutations/siteadmin/AdminUser/deleteAdminUser';
import getAdminUser from './queries/siteadmin/AdminUser/getAdminUser';
import getAdminUserExists from './queries/siteadmin/getAdminUserExists';

//Precaution Notification
import updatePrecautionNotification from './mutations/siteadmin/PrecautionNotification/updatePrecautionNotification';
import getAllPrecautionNotification from './queries/siteadmin/PrecautionNotification/getAllPrecautionNotification';
import updatePrecautionNotificationImage from './mutations/siteadmin/PrecautionNotification/updatePrecautionNotificationImage';

import getAllThreadItems from './queries/siteadmin/Threads/getAllThreadItems';
import getMoreThreads from './queries/siteadmin/Threads/getMoreThreads';

import updateMobileSettings from './mutations/siteadmin/updateMobileSettings';

import getAllSubCategory from './queries/siteadmin/SubCategory/getAllSubCategory';
import getSubCategory from './queries/siteadmin/SubCategory/getSubCategory';
import getPrivileges from './queries/siteadmin/AdminRoles/getPrivileges';

import removeCurrency from './mutations/siteadmin/Currency/removeCurrency';
import updateTone from './mutations/siteadmin/updateTone';

import getAllSmsMethod from './queries/siteadmin/SmsMethod/getAllSmsMethod';
import getSmsMethod from './queries/siteadmin/SmsMethod/getSmsMethod';
import updateSmsMethod from './mutations/siteadmin/SmsMethod/updateSmsMethod';


const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      news,
      intl,
      adminUserLogin,
      adminUserLogout,
      getAllUsers,
      getAllCategory,
      getAllBookings,
      viewBookingDetails,
      getCurrencies,
      getCurrencyRates,
      getUser,
      getCategory,
      getCategories,
      getCountries,
      getDashboardCount,
      getActiveCategories,
      getAllPromoCode,
      getPromoCode,
      getCompletedBookings,
      getCancelledBookings,
      getCurrency,
      getBaseCurrency,
      getSiteSettings,
      getCancelReasons,
      getReviews,
      getAllCancelReason,
      getCancelReason,
      getLocationList,
      getLocation,
      getPayoutList,
      getAllHomePageSettings,
      getFailedPayoutList,
      getEditStaticPage,
      getPricing,
      getAllPricing,
      getAllLocation,
      getContentPageDetails,
      getContentPage,
      getContentPageById,
      getAllAdminRoles,
      getAllAdminUsers,
      getAdminUser,
      getAdminUserExists,
      getAllPrecautionNotification,
      getAllThreadItems,
      getMoreThreads,
      getMapViewData,
      getHeatMapData,
      getAllSubCategory,
      getAllHomePageCategorySettings,
      getSubCategory,
      getActiveSubCategories,
      getPrivileges,
      getAllSmsMethod,
      getSmsMethod,
      getEmailLogo
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      addAdminUser,
      addCategory,
      updateUser,
      updatePartner,
      uploadProfileImage,
      deleteUser,
      addPromoCode,
      deletePromoCode,
      updatePromoCode,
      updateSiteSettings,
      changeAdminUser,
      updateCurrency,
      setBaseCurrency,
      allowPaymentCurrency,
      updateSiteSettings,
      updateHomePageHome,
      updateHomePageCity,
      updateHomePageSafety,
      updateHomePageSignup,
      updateHomePageFooter,
      updateCancelReason,
      removeCancelReason,
      siteSettings,
      addLocation,
      updateLocation,
      updatePayout,
      deleteLocation,
      updateStaticPage,
      addUpdatePricing,
      deletePricing,
      updateCategoryStatus,
      deleteCategory,
      updatePricingStatus,
      updateContentPageDetails,
      addContentPageDetails,
      deleteContentPage,
      updateContentPageStatus,
      updateTempImages,
      updateCashPayout,
      createAdminRole,
      deleteAdminRole,
      createAdminUser,
      deleteAdminUser,
      updatePrecautionNotification,
      updatePrecautionNotificationImage,
      updateMobileSettings,
      updateHomePageCategory,
      addSubCategory,
      updateSubCategoryStatus,
      deleteSubCategory,
      uploadIdentityImage,
      removeExperienceDocument,
      removeCurrency,
      updateTone,
      updateSmsMethod
    }
  })
});

export default schema;