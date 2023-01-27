import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import intl from './intl';
import siteSettings from './siteSettings';
import loader from './loader';

// External Reducers
import { reducer as formReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

import currency from './currency';
import account from './adminUserReducer';
import adminModalStatus from './modalReducer';
import mapData from './mapData';
import commonSettings from './commonSettings';



export default combineReducers({
  user,
  runtime,
  intl,
  form: formReducer,
  toastr: toastrReducer,
  currency,
  siteSettings,
  loader,
  account,
  adminModalStatus,
  mapData,
  commonSettings
});
