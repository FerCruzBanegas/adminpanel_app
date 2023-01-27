import React from 'react';
import AdminLayout from '../../../../components/Layout/AdminLayout';
import EditPromoCode from './EditPromoCode';
import messages from '../../../../locale/messages';
import { restrictUrls } from '../../../../helpers/adminPrivileges';

function action({ store, params, intl }) {
  let isAdminAuthenticated = store.getState().runtime.isAdminAuthenticated;
  let adminPrivileges = store.getState().account && store.getState().account.privileges;
  let privileges = store.getState().commonSettings && store.getState().commonSettings.privileges;

  if (!isAdminAuthenticated) return { redirect: '/login' };

  if (!restrictUrls('/siteadmin/promo-code/', adminPrivileges, privileges)) return { redirect: '/siteadmin' };

  return {
    title: intl.formatMessage(messages.editPromoCode),
    component: <AdminLayout><EditPromoCode id={params.id} /></AdminLayout>,
  };
}

export default action;
