
/* eslint-disable global-require */

// The top-level (parent) route
const routes = {
  path: '',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      load: () => new Promise((resolve, reject) => {
        resolve(
          require('./home'));
        reject(error);
      }),
    },
    {
      path: '/contact',
      load: () => new Promise((resolve, reject) => {
        resolve(
          require('./contact'));
        reject(error);
      }),
    },
    {
      path: '/about',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./about'));
        reject(error);
      }),
    },
    {
      path: '/privacy',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./privacy'));
        reject(error);
      }),
    },
    {
      path: '/login',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./login'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/dashboard'));
        reject(error);
      }),
    },
    {
      path: '/inputform',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/inputform'));
        reject(error);
      }),
    },
    {
      path: '/table',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/table'));
        reject(error);
      }),
    },

    {
      path: '/siteadmin/users',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/users'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/partners',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/partners'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/category',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/category'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/sub-category',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/subCategory'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/jobs',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/booking'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/category/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/addCategory'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/sub-category/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/addSubCategory'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/:from/view/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/viewBooking'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/users/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editUser'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/partners/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editPartner'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/category/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editCategory'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/sub-category/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editSubCategory'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/promo-code/list',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/promoCode/promoCodeList'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/promo-code/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/promoCode/addPromoCode'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/promo-code/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/promoCode/editPromoCode'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/completed-jobs',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/completedBooking'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/cancelled-jobs',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/cancelledBooking'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/currency',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/currency'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/site',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/siteSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/change/admin',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/changeAdmin'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/notifications',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/manageNotifications'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/cancel-reasons',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/manageCancelReasons'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/ratings',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/ratings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/cancel-reasons/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/addCancelReason'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/cancel-reasons/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editCancelReason'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/add-location',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/addLocation'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/location',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/manageLocationList'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/edit-location/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editLocation'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/homepage/banner',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/homeSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/homepage/topfeature',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/categorySettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/homepage/category',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/citySettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/homepage/user',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/safetySettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/homepage/partner',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/signupSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/homepage/footer',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/footerSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/payout',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/autoPayout'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/failed-payout',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/failedPayout'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/staticpage/manage',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/staticPage'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/contentpage/manage',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/contentPage'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/contentpage/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/addContentPage'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/contentpage/edit/:pageId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editContentPage'));
        reject(error);
      }),
    },
    {
      path: '/support',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/support'));
        reject(error);
      }),
    },
    {
      path: '/partner/privacy-policy',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/partnerPrivacyPolicy'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/staticpage/edit/:pageId',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/editStaticPage'));
        reject(error);
      }),
    },
    {
      path: '/user',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/user'));
        reject(error);
      }),
    },
    {
      path: '/partner',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/partner'));
        reject(error);
      }),
    },
    {
      path: '/legal',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./static/legal'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/pricing/list',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/pricing/pricingList'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/pricing/add',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/pricing/addPricing'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/pricing/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/pricing/editPricing'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/admin-roles',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/adminRoles'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/admin-users',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/adminUser'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/precaution-notification',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/precautionNotification/updatePrecautionNotification'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/:from/chat-message/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/chatMessage'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/settings/mobile-app',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/mobileSettings'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/tracking',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/tracking'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/sms-methods',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/smsMethod'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/sms-method/edit/:id',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/smsMethod/editSmsMethod'));
        reject(error);
      }),
    },
    {
      path: '/siteadmin/schedule-jobs',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./site-admin/scheduleBooking'));
        reject(error);
      }),
    },


    //****** It should be before last route.
    {
      path: '/:pageUrl',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./page'));
        reject(error);
      }),
    },
    //******* */

    // Wildcard routes, e.g. { path: '(.*)', ... } (must go last)
    {
      path: '(.*)',
      load: () => new Promise((resolve, reject) => {
        resolve(require('./not-found'));
        reject(error);
      }),
    },
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Untitled Page'}`;
    route.description = route.description || '';

    return route;
  },
};

// The error page is available by permanent url for development mode
if (__DEV__) {
  routes.children.unshift({
    path: '/error',
    action: require('./error').default,
  });
}

export default routes;


