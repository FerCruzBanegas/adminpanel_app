require('dotenv').config();
/* eslint-disable max-len */

module.exports = {
  // default locale is the first one
  locales: [
    /* @intl-code-template '${lang}-${COUNTRY}', */
    'en-US',
    'es',
    'fr-FR',
    'ru-RU',
    'ja-JP',
    'id-ID',
    'hr-HR',
    'zh-CN',
    'sv-SE'
    /* @intl-code-template-end */
  ],

  // Node.js app
  port: process.env.PORT || 3000,

  host: process.env.WEBSITE_HOSTNAME || `localhost:3000`,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // SITE URL
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:${process.env.PORT || 3000}`,

    apiEndpoint: process.env.API_ENDPOINT_URL || 'http://localhost:4000',

    socketUrl: process.env.SOCKET_URL || 'http://localhost:4001'
  },

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Maximum upload size
  maxUploadSize: 50,

  // Licence Upload
  licenseuploadDir: process.env.LICENSE_UPLOAD_DIR || '/images/license/',

  // Profile photo upload
  profilePhotouploadDir: process.env.PROFILE_PHOTO_UPLOAD_DIR || '/images/avatar/',

  // category photo upload
  categoryUploadDir: process.env.CATEGORY_PHOTO_UPLOAD_DIR || '/images/category/',

  // Logo photo upload
  logoUploadDir: process.env.LOGO_PHOTO_UPLOAD_DIR || '/images/logo/',

  // homepage photo upload
  homepageUploadDir: process.env.HOMEPAGE_UPLOAD_DIR || '/images/homepage/',

  // staticpage photo upload
  staticpageUploadDir: process.env.STATICPAGE_UPLOAD_DIR || '/images/staticpage/',

  //Content page photo upload
  contentPageUploadDir: process.env.CONTENTPAGE_UPLOAD_DIR || '/images/contentPage/',

  // favicon upload
  faviconUploadDir: process.env.FAVICON_UPLOAD_DIR || '/images/favicon/',

  // subCategory photo upload
  subCategoryUploadDir: process.env.SUB_CATEGORY_PHOTO_UPLOAD_DIR || '/images/sub-category/',

  // Document Upload
  documentUploadDir: process.env.DOCUMENT_UPLOAD_DIR || '/images/document/',

  //homepagecategory images
  homePageCategoryBannerUploadDir: process.env.HOMEPAGE_CATEGORY_BANNER_UPLOAD_DIR || '/images/homePageCategory/banner/',

  homePageCategoryLogoUploadDir: process.env.HOMEPAGE_CATEGORY_LOGO_UPLOAD_DIR || '/images/homePageCategory/logo/',

  //Promocode image directoy
  promoCodeImageUploadDir: process.env.PROMOCODE_DIR || '/images/promocode/',

  reviewImageUploadDir: process.env.REVIEW_PHOTO_UPLOAD_DIR || '/images/reviewImage/',

  toneUploadDir: process.env.TONE_UPLOAD_DIR || '/images/tone/',

  cmsUploadDir: process.env.CMS_UPLOAD_DIR || '/images/cms/',

  // Push Notification Server Key
  serverKey: process.env.FCM_SERVER_KEY,

  //Google map api key
  googleMapAPI: 'Client/Browser Google Map API Key',
  googleMapServerKey: process.env.GOOGLE_MAP_SERVER_KEY,

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Payment - Stripe
  payment: { /* From ENV */
    stripe: {
      secretKey: process.env.STRIPE_SECRET,
    }
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET },

    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID,
      secret:
        process.env.FACEBOOK_APP_SECRET,
    },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET,
    },

    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY,
      secret:
        process.env.TWITTER_CONSUMER_SECRET,
    },
  },

  unitTypes: {
    km: { value: 'metric', convertFromMeter: 1000 },
    mile: { value: 'imperial', convertFromMeter: 1609 }
  },

  emailConfig: {
    host: process.env.SMTP_HOST, /* From ENV */
    port: process.env.SMTP_PORT || 25,
    email: process.env.SMTP_LOGIN_EMAIL,
    sender: process.env.SMTP_FROM_NAME,
    senderEmail: process.env.SMTP_SENDER_EMAIL,
    password: process.env.SMTP_LOGIN_PASSWORD, /* FROM ENV */
    secure: process.env.SMTP_SECURE || false,
    tls: process.env.SMTP_TLS || false,
  }

};
